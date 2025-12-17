import React, { useState, useEffect, useRef } from 'react';
import { ModuleData, ModuleStatus, UserState, GeminiFeedback } from './types';
import { INITIAL_MODULES } from './data/curriculum';
import { validateCodeWithGemini } from './services/geminiService';
import Dashboard from './components/Dashboard';
import Professor from './components/Professor';
import IntroFlow from './components/IntroFlow';

// --- COMPONENTS ---

const Header = ({ onBack, title, xp }: { onBack: () => void, title?: string, xp?: number }) => (
  <div className="bg-dark/90 backdrop-blur-lg border-b border-white/5 px-4 h-16 flex items-center justify-between fixed top-0 w-full z-50 shadow-2xl">
    <div className="flex items-center gap-4">
        <button onClick={onBack} className="bg-white/5 hover:bg-white/10 text-gray-300 w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 transition-all active:scale-95 group">
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        </button>
        <div className="flex flex-col">
            <span className="font-black text-white text-base tracking-tight leading-none">Code<span className="text-indigo-500">Master</span></span>
            {title && <span className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest truncate max-w-[150px]">{title}</span>}
        </div>
    </div>
    {xp !== undefined && (
        <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="text-yellow-400 text-sm drop-shadow">⚡</span>
            <span className="text-xs font-mono font-bold text-indigo-100">{xp}</span>
        </div>
    )}
  </div>
);

// --- SOUND ENGINE ---
const playSound = (type: 'success' | 'error' | 'click' | 'transition' | 'denied') => {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
        osc.start(now);
        osc.stop(now + 1);
    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'transition') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(400, now + 0.3);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    }
};

export default function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [modules, setModules] = useState<ModuleData[]>(INITIAL_MODULES);
  const [userState, setUserState] = useState<UserState>({
    currentModuleId: null, xp: 0, completedModules: [], streak: 1
  });

  // STATE FOR PROJECT PERSISTENCE (Optional now, mostly for page reloads)
  const [projectCode, setProjectCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('cm_project_code') || '';
    }
    return '';
  });

  const [learningStep, setLearningStep] = useState<'intro' | 'practice' | 'verifying' | 'success'>('intro');
  const [currentCode, setCurrentCode] = useState('');
  const [profMessage, setProfMessage] = useState('');
  const [profMood, setProfMood] = useState<'neutral' | 'happy' | 'thinking' | 'waiting' | 'explaining'>('neutral');
  const [feedback, setFeedback] = useState<GeminiFeedback | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') synth.current = window.speechSynthesis;
    return () => { if (synth.current) synth.current.cancel(); };
  }, []);

  const activeModule = modules.find(m => m.id === userState.currentModuleId);

  // --- STRICT LITERAL TTS ENGINE ---
  const speakDynamic = (text: string) => {
    if (!synth.current) return;
    synth.current.cancel();
    setIsSpeaking(true);

    const voices = synth.current.getVoices();
    const bestVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Premium'))) || voices.find(v => v.lang.includes('es'));

    let readableText = text
        .replace(/`/g, "") 
        .replace(/<br\/>/g, ". ") 
        .replace(/<!--/g, "") 
        .replace(/-->/g, ""); 
        
    readableText = readableText.replace(/</g, " ").replace(/>/g, " ");

    const utterance = new SpeechSynthesisUtterance(readableText);
    if (bestVoice) utterance.voice = bestVoice;
    utterance.rate = 1.0; 
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.current?.speak(utterance);
  };

  const startModule = async (moduleId: number) => {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    
    if (synth.current) synth.current.cancel();
    playSound('transition');

    setUserState(prev => ({ ...prev, currentModuleId: moduleId }));
    setLearningStep('intro');
    
    // --- RESET LOGIC ---
    // Instead of loading previous project code, we ALWAYS load the module's initial template.
    // This ensures a fresh start for every specific lesson.
    setCurrentCode(mod.task.initialCode);
    setProjectCode(''); // Clear persistence context
    
    setFeedback(null);
    setActiveTab('code'); 
    setProfMood('explaining'); 
    setProfMessage(mod.theory.text);
    speakDynamic(mod.theory.text);
  };

  const handleStartPractice = () => {
    setLearningStep('practice');
    setProfMood('waiting');
    setActiveTab('code');
    playSound('transition');
    const msg = "Editor listo. Tu turno.";
    setProfMessage(msg);
    speakDynamic(msg);
  };

  const handleCheckCode = async () => {
    if (!activeModule) return;
    playSound('click');

    setLearningStep('verifying');
    setProfMood('thinking');
    setProfMessage("Analizando...");
    setActiveTab('preview'); 
    
    if (synth.current) synth.current.cancel();
    setIsSpeaking(false);
    
    const result = await validateCodeWithGemini(
      activeModule.task.instruction, 
      currentCode,
      {
        moduleTitle: activeModule.title,
        theoryText: activeModule.theory.text
      }
    );
    
    setFeedback(result);

    if (result.correct) {
      setLearningStep('success');
      setProfMood('happy');
      playSound('success');
      setProfMessage(result.message);
      speakDynamic(result.message);
      
      // We save purely for accidental reloads, but startModule will wipe it on next level.
      setProjectCode(currentCode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cm_project_code', currentCode);
      }

      handleSuccess(activeModule.id);
    } else {
      setLearningStep('practice');
      setProfMood('neutral');
      playSound('error');
      setProfMessage(result.message);
      speakDynamic(result.message);
    }
  };

  const handleSuccess = (moduleId: number) => {
    setUserState(prev => {
        const isNewCompletion = !prev.completedModules.includes(moduleId);
        if(!isNewCompletion) return prev;
        return {
            ...prev,
            xp: prev.xp + (activeModule?.xpReward || 0),
            completedModules: [...prev.completedModules, moduleId]
        };
    });
    setModules(prev => prev.map(m => {
        if (m.id === moduleId) return { ...m, status: ModuleStatus.COMPLETED };
        if (m.id === moduleId + 1) return { ...m, status: ModuleStatus.ACTIVE };
        return m;
    }));
  };

  const handleNextModule = () => {
    if (!activeModule) return;
    const nextId = activeModule.id + 1;
    const nextModule = modules.find(m => m.id === nextId);
    if (nextModule) {
      startModule(nextId);
    } else {
      setUserState(prev => ({ ...prev, currentModuleId: null }));
    }
  };

  if (!hasSeenIntro) return <IntroFlow onComplete={() => setHasSeenIntro(true)} />;

  if (!userState.currentModuleId || !activeModule) {
    return (
        <div className="min-h-screen w-full bg-dark pt-16 selection:bg-indigo-500/30">
             <div className="fixed top-0 w-full z-50">
                 <Header onBack={() => {}} title="" xp={userState.xp} />
             </div>
             <Dashboard modules={modules} onSelectModule={startModule} userXp={userState.xp} />
        </div>
    );
  }

  // THEORY MODE
  if (learningStep === 'intro') {
      const isCodeLoaded = currentCode && currentCode.length > 0;

      return (
        <div className="flex flex-col min-h-screen bg-dark text-white relative selection:bg-indigo-500/30">
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
            <Header onBack={() => { if(synth.current) synth.current.cancel(); setUserState(prev => ({...prev, currentModuleId: null})); }} title="Briefing" xp={userState.xp} />
            
            <div className="flex-grow flex flex-col items-center p-6 pt-24 pb-24 w-full overflow-y-auto custom-scrollbar">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
                    
                    {/* AVATAR COLUMN */}
                    <div className="flex flex-col gap-6 animate-slide-up md:sticky md:top-28">
                        <Professor 
                            message={profMessage} 
                            mood={profMood} 
                            isSpeaking={isSpeaking}
                            onStopSpeaking={() => {if(synth.current) synth.current.cancel(); setIsSpeaking(false);}}
                            extraInfo={{ history: activeModule.theory.historyFact, tip: activeModule.theory.proTip }}
                        />
                    </div>

                    {/* CONTENT CARD */}
                    <div className="bg-surface/50 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col gap-6 animate-fade-in delay-100 group hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center gap-5 border-b border-white/5 pb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                                {activeModule.theory.visualIcon}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">{activeModule.title}</h2>
                                <div className="h-1 w-12 bg-indigo-500 mt-2 rounded-full"></div>
                            </div>
                        </div>
                        
                        <p className="text-gray-300 text-lg leading-relaxed font-light">{activeModule.description}</p>
                        
                        {/* EXAMPLE 1: ANATOMY */}
                        <div className="flex flex-col gap-2">
                             <div className="flex justify-between items-end">
                                <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">Lección 1: Anatomía (Explicada)</span>
                             </div>
                             <div className="bg-[#0b1121] rounded-xl p-5 border border-white/5 relative overflow-hidden shadow-inner group-hover:border-indigo-500/20 transition-colors">
                                <pre className="font-mono text-gray-400 text-sm overflow-x-auto whitespace-pre-wrap leading-6">{activeModule.theory.exampleCode}</pre>
                             </div>
                        </div>

                        {/* EXAMPLE 2: CLEAN SYNTAX */}
                        <div className="flex flex-col gap-2 mt-2">
                             <div className="flex justify-between items-end">
                                <span className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Lección 2: Sintaxis Pura (Resultado)</span>
                             </div>
                             <div className="bg-[#0b1121] rounded-xl p-5 border border-green-500/20 relative overflow-hidden shadow-inner">
                                <pre className="font-mono text-green-300 text-sm overflow-x-auto whitespace-pre-wrap leading-6">{activeModule.theory.cleanCode}</pre>
                             </div>
                        </div>

                        <button onClick={handleStartPractice} className="w-full bg-white text-black hover:bg-indigo-50 font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] mt-4 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95">
                            {/* Always show "Inicializar" because we reset every time */}
                            <>
                                <span>Inicializar Entorno</span> 
                                <span className="text-xl">🚀</span>
                            </>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  // WORKSPACE MODE
  return (
    <div className="flex flex-col h-screen w-full bg-[#0b1121] text-white overflow-hidden fixed inset-0">
      <Header 
        onBack={() => { 
            // GO BACK TO INTRO
            if(synth.current) synth.current.cancel(); 
            setLearningStep('intro');
        }} 
        title={activeModule.title} 
        xp={userState.xp} 
      />
      
      <main className="flex-grow pt-16 flex flex-col md:flex-row h-full overflow-hidden relative">
        
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex w-[350px] bg-surface border-r border-white/5 flex-col p-6 z-20 overflow-y-auto custom-scrollbar shadow-[10px_0_30px_rgba(0,0,0,0.3)]">
             <Professor message={profMessage} mood={profMood} isSpeaking={isSpeaking} onStopSpeaking={() => {if(synth.current) synth.current.cancel(); setIsSpeaking(false);}} />
             
             <div className="bg-white/5 p-5 rounded-xl border border-white/5 mt-6 backdrop-blur-sm">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> Objetivo
                </h4>
                <p className="text-gray-200 text-sm leading-relaxed font-medium">{activeModule.task.instruction}</p>
             </div>
        </div>
        
        {/* MAIN CONTENT AREA */}
        <div className="flex-grow flex flex-col h-full bg-[#0b1121] relative overflow-hidden">
           
           {/* TAB 1: CODE EDITOR */}
           <div className={`
             flex flex-col h-full absolute inset-0 transition-transform duration-300 bg-[#0b1121] z-10
             ${activeTab === 'code' ? 'translate-x-0' : '-translate-x-full'}
             md:relative md:translate-x-0 md:h-2/3 md:border-b md:border-white/5
           `}>
                <div className="bg-[#0b1121] text-gray-500 text-xs px-5 py-3 flex justify-between items-center border-b border-white/5 shrink-0 select-none">
                    <div className="flex items-center gap-3">
                        <span className="text-indigo-400 font-mono font-bold bg-indigo-500/10 px-2 py-0.5 rounded">index.html</span>
                        <span className="text-[10px] opacity-50 uppercase tracking-wider">Lectura/Escritura</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                </div>
                
                {/* Mobile Mission Banner */}
                <div className="md:hidden bg-indigo-900/10 border-b border-indigo-500/10 p-4 shrink-0 backdrop-blur-sm">
                    <p className="text-xs text-indigo-200 leading-relaxed font-medium">
                       <span className="text-indigo-400 font-bold block mb-1 text-[10px] uppercase tracking-wider">Misión Actual:</span> 
                       {activeModule.task.instruction}
                    </p>
                </div>

                <div className="relative flex-grow">
                    {/* Line Numbers Simulation */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0b1121] border-r border-white/5 flex flex-col items-center pt-4 gap-[0.1rem] text-gray-700 font-mono text-sm select-none pointer-events-none z-10">
                        {[...Array(20)].map((_, i) => <div key={i} className="h-6 leading-6">{i + 1}</div>)}
                    </div>

                    <textarea
                        // KEY is critical here. It forces React to kill the component and rebuild it
                        // whenever the module ID changes. This ensures a 100% clean slate.
                        key={activeModule.id} 
                        value={currentCode}
                        onChange={(e) => { setCurrentCode(e.target.value); playSound('click'); }}
                        // PASTE IS NOW ALLOWED (Prop removed)
                        disabled={learningStep === 'success' || learningStep === 'verifying'}
                        className={`
                            w-full h-full bg-[#0b1121] text-indigo-100 font-mono text-sm p-4 pl-12 resize-none focus:outline-none leading-6 
                            caret-indigo-500 selection:bg-indigo-500/30 placeholder-gray-700
                            ${learningStep === 'success' ? 'opacity-50 grayscale' : ''}
                        `}
                        spellCheck={false}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        placeholder="<!-- Escribe tu código aquí... -->"
                    />
                </div>
                
                {/* FAB Mobile */}
                <div className="absolute bottom-8 right-6 md:hidden z-30">
                    <button
                        onClick={handleCheckCode}
                        disabled={learningStep === 'verifying'}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center border border-indigo-400/20 active:scale-90 transition-all"
                    >
                        {learningStep === 'verifying' ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span className="text-2xl ml-1">▶</span>
                        )}
                    </button>
                </div>
           </div>

           {/* TAB 2: PREVIEW */}
           <div className={`
             flex flex-col h-full absolute inset-0 transition-transform duration-300 bg-white z-20
             ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full'}
             md:relative md:translate-x-0 md:h-1/2
           `}>
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between shrink-0 h-10 select-none">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="text-lg">👁️</span> Renderizado
                    </span>
                    <div className="flex gap-1.5 opacity-50">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    </div>
                </div>
                
                <iframe
                    title="preview"
                    className="w-full h-full bg-white"
                    srcDoc={`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;padding:1.5rem;color:#1a1a1a;line-height:1.6;}</style></head><body>${currentCode}</body></html>`}
                />

                {/* OVERLAY: FEEDBACK */}
                {(feedback || learningStep === 'verifying') && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 p-6 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-slide-up z-30 max-h-[60%] overflow-y-auto">
                        
                        {learningStep === 'verifying' && (
                             <div className="flex flex-col items-center justify-center py-4 gap-4 text-indigo-300">
                                 <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                 <span className="text-xs font-mono font-bold uppercase tracking-widest animate-pulse">Verificando semántica...</span>
                             </div>
                        )}

                        {feedback && (
                            <div className="text-center md:text-left">
                                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                                    <h3 className={`font-black text-xl md:text-2xl tracking-tight ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                                        {feedback.correct ? '¡Compilación Exitosa!' : 'Error de Sintaxis'}
                                    </h3>
                                    {feedback.correct && <span className="text-yellow-400 font-mono text-xs border border-yellow-500/30 px-3 py-1 rounded-full bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.2)]">+{activeModule.xpReward} XP</span>}
                                </div>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed font-medium">{feedback.message}</p>
                                
                                {!feedback.correct && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
                                        <p className="text-red-300 text-xs font-mono flex items-start gap-2">
                                            <span>debug &gt;</span> 
                                            {feedback.tips[0]}
                                        </p>
                                    </div>
                                )}

                                <button 
                                    onClick={feedback.correct ? handleNextModule : () => setActiveTab('code')}
                                    className={`w-full py-4 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all
                                        ${feedback.correct 
                                            ? 'bg-green-500 hover:bg-green-400 text-dark' 
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}
                                    `}
                                >
                                    {feedback.correct ? 'Continuar al Siguiente Nivel ➜' : 'Volver al Editor ↺'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
           </div>

           {/* MOBILE NAV BAR */}
           <div className="md:hidden h-16 bg-[#0f172a]/95 backdrop-blur border-t border-white/5 flex shrink-0 z-40 relative px-6 gap-4 items-center justify-center">
               <button 
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'}`}
               >
                   <span className="text-base">📝</span> CÓDIGO
               </button>
               <div className="w-px h-6 bg-white/10"></div>
               <button 
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'}`}
               >
                   <span className="text-base">👁️</span> VISTA
               </button>
           </div>

        </div>
      </main>
    </div>
  );
}