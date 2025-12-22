import React, { useState, useEffect, useRef } from 'react';
import { ModuleData, ModuleStatus, UserState, GeminiFeedback, LessonStep } from './types';
import { INITIAL_MODULES } from './data/curriculum';
import { validateCodeWithGemini } from './services/geminiService';
import Dashboard from './components/Dashboard';
import Professor from './components/Professor';
import IntroFlow from './components/IntroFlow';
import AuthFlow from './components/AuthFlow';
import Previewer from './components/Previewer';

// --- COMPONENTS ---
const Header = ({ onBack, onLogout, title, xp, progress }: { onBack: () => void, onLogout: () => void, title?: string, xp?: number, progress?: number }) => (
  <div className="bg-dark/95 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between fixed top-0 w-full z-50 shadow-2xl">
    <div className="flex items-center gap-3">
        <button onClick={onBack} className="bg-white/5 hover:bg-white/10 text-gray-300 w-9 h-9 rounded-xl flex items-center justify-center border border-white/5 transition-all active:scale-95 group">
          <span className="text-sm">←</span>
        </button>
        <div className="flex flex-col">
            <span className="font-black text-white text-xs md:text-base tracking-tight leading-none italic uppercase">Cortex<span className="text-cyan-400">Master</span></span>
            {title && <span className="text-[9px] text-cyan-500/70 font-mono mt-1 uppercase tracking-widest truncate max-w-[100px] md:max-w-[150px]">{title}</span>}
        </div>
    </div>
    
    {progress !== undefined && (
      <div className="hidden lg:flex flex-col items-center w-1/4">
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-[8px] text-gray-500 font-black uppercase mt-1 tracking-tighter">Sincronización: {Math.round(progress)}%</span>
      </div>
    )}

    <div className="flex items-center gap-2 md:gap-3">
        {xp !== undefined && (
            <div className="flex items-center gap-1.5 md:gap-2 bg-cyan-500/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <span className="text-cyan-400 text-xs animate-pulse">⚡</span>
                <span className="text-[10px] md:text-xs font-mono font-black text-cyan-100 uppercase">{xp} XP</span>
            </div>
        )}
        <button onClick={onLogout} title="Cerrar Sincronización" className="bg-red-500/10 hover:bg-red-500/20 text-red-400 w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 transition-all active:scale-95">
           <span className="text-sm">🚪</span>
        </button>
    </div>
  </div>
);

const HierarchyMap = ({ steps, currentIdx }: { steps: LessonStep[], currentIdx: number }) => (
  <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 mt-4">
    <h5 className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-3">Mapa de Jerarquía</h5>
    <div className="space-y-1">
      {steps.map((s, idx) => (
        <div key={s.id} className={`flex items-center gap-2 text-[10px] transition-all duration-500 ${idx <= currentIdx ? 'opacity-100 translate-x-1' : 'opacity-20 translate-x-0'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${idx < currentIdx ? 'bg-cyan-500 shadow-[0_0_5px_cyan]' : idx === currentIdx ? 'bg-indigo-500 animate-pulse' : 'bg-slate-700'}`}></div>
          <span className={`font-mono ${idx === currentIdx ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>{s.tag}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [userState, setUserState] = useState<UserState | null>(null);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [modules, setModules] = useState<ModuleData[]>(INITIAL_MODULES);

  const [learningStep, setLearningStep] = useState<'intro' | 'practice' | 'verifying' | 'success'>('intro');
  const [currentCode, setCurrentCode] = useState('');
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'class'>('editor');
  const [profMessage, setProfMessage] = useState('');
  const [profMood, setProfMood] = useState<'neutral' | 'happy' | 'thinking' | 'waiting' | 'explaining'>('neutral');
  const [feedback, setFeedback] = useState<GeminiFeedback | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') synth.current = window.speechSynthesis;
    
    const activeSession = localStorage.getItem('cortex_active_session');
    if (activeSession) {
        const username = activeSession;
        const profile = localStorage.getItem(`cortex_profile_${username.toLowerCase()}`);
        if (profile) {
            const savedState = JSON.parse(profile).state;
            handleLogin(savedState);
            const savedCode = localStorage.getItem(`cortex_code_${username.toLowerCase()}`);
            if (savedCode) setCurrentCode(savedCode);
        }
    }

    return () => { if (synth.current) synth.current.cancel(); };
  }, []);

  useEffect(() => {
    if (userState && userState.username) {
        const username = userState.username.toLowerCase();
        const profileStr = localStorage.getItem(`cortex_profile_${username}`);
        if (profileStr) {
            const profile = JSON.parse(profileStr);
            profile.state = userState;
            localStorage.setItem(`cortex_profile_${username}`, JSON.stringify(profile));
        }
        localStorage.setItem(`cortex_code_${username}`, currentCode);
        setModules(prev => prev.map(m => ({ ...m, status: userState.completedModules.includes(m.id) ? ModuleStatus.COMPLETED : ModuleStatus.ACTIVE })));
    }
  }, [userState, currentCode]);

  const speakDynamic = (text: string) => {
    if (!synth.current) return;
    synth.current.cancel();
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, "").replace(/`/g, ""));
    const voices = synth.current.getVoices();
    const bestVoice = voices.find(v => v.lang.includes('es'));
    if (bestVoice) utterance.voice = bestVoice;
    utterance.onend = () => setIsSpeaking(false);
    synth.current.speak(utterance);
  };

  const handleLogin = (state: UserState) => {
    setUserState(state);
    localStorage.setItem('cortex_active_session', state.username!);
  };

  const handleLogout = () => {
    if (synth.current) synth.current.cancel();
    localStorage.removeItem('cortex_active_session');
    setUserState(null);
    setHasSeenIntro(false);
    setLearningStep('intro');
  };

  const activeModule = userState?.currentModuleId ? modules.find(m => m.id === userState.currentModuleId) : null;
  const currentStep = activeModule?.steps[userState?.currentStepIndex || 0];

  const startModule = (moduleId: number) => {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod || !userState) return;
    setUserState(prev => ({ ...prev!, currentModuleId: moduleId, currentStepIndex: 0 }));
    setLearningStep('intro');
    setViewMode('class');
    setProfMood('explaining');
    setProfMessage(mod.theory.text);
    speakDynamic(mod.theory.text);
  };

  const startPractice = () => {
    if (!activeModule) return;
    const step = activeModule.steps[0];
    setLearningStep('practice');
    setViewMode('editor');
    setProfMood('explaining');
    const introMsg = `Iniciamos construcción real. ${step.title}: ${step.explanation}`;
    setProfMessage(introMsg);
    speakDynamic(introMsg);
  };

  const handleCheckCode = async () => {
    if (!activeModule || !currentStep || !userState) return;
    setLearningStep('verifying');
    setProfMood('thinking');
    const result = await validateCodeWithGemini(
      `PASO: ${currentStep.title}. INSTRUCCIÓN: ${currentStep.instruction}. TAG REQUERIDO: ${currentStep.tag}.`,
      currentCode,
      { moduleTitle: activeModule.title, theoryText: currentStep.explanation }
    );
    setFeedback(result);
    if (result.correct) {
      setLearningStep('success');
      setProfMood('happy');
      setProfMessage(result.message);
      speakDynamic(result.message);
      setUserState(prev => ({ ...prev!, xp: prev!.xp + currentStep.xpReward }));
    } else {
      setLearningStep('practice');
      setProfMood('neutral');
      setProfMessage(result.message);
      speakDynamic(result.message);
    }
  };

  if (!userState) return <AuthFlow onLogin={handleLogin} />;
  if (!hasSeenIntro && !userState.completedModules.length && !userState.currentModuleId) return <IntroFlow onComplete={() => setHasSeenIntro(true)} />;

  if (!userState.currentModuleId || !activeModule) {
    return (
        <div className="min-h-screen bg-dark">
             <Header onBack={() => {}} onLogout={handleLogout} xp={userState.xp} />
             <div className="pt-20"></div>
             <Dashboard modules={modules} onSelectModule={startModule} userXp={userState.xp} />
        </div>
    );
  }

  const progress = (userState.currentStepIndex / activeModule.steps.length) * 100;

  return (
    <div className="flex flex-col h-screen w-full bg-[#020617] text-white overflow-hidden fixed inset-0">
      <Header 
        onBack={() => setUserState(prev => ({...prev!, currentModuleId: null}))} 
        onLogout={handleLogout}
        title={currentStep?.title || activeModule.title} 
        xp={userState.xp}
        progress={progress}
      />
      
      <main className="flex-grow pt-16 flex flex-col md:flex-row h-full overflow-hidden">
        {/* SIDEBAR */}
        <div className={`
          md:flex w-full md:w-[440px] bg-slate-900/60 border-r border-white/5 flex-col p-6 overflow-y-auto custom-scrollbar shadow-2xl z-20 backdrop-blur-xl transition-all duration-300
          ${viewMode === 'class' ? 'flex h-full' : 'hidden'}
        `}>
             <Professor 
                message={learningStep === 'intro' ? activeModule.theory.text : profMessage} 
                mood={profMood} 
                isSpeaking={isSpeaking} 
                onStopSpeaking={() => setIsSpeaking(false)} 
                extraInfo={learningStep === 'intro' ? { tip: activeModule.theory.proTip } : undefined}
             />
             
             {learningStep !== 'intro' && currentStep && (
               <div className="mt-6 flex flex-col gap-6 animate-slide-up">
                  <HierarchyMap steps={activeModule.steps} currentIdx={userState.currentStepIndex} />
                  <div className="bg-editor border border-indigo-500/20 rounded-2xl overflow-hidden shadow-inner">
                      <div className="bg-indigo-500/10 px-4 py-2 border-b border-indigo-500/10 flex justify-between items-center">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Ejemplo</span>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200/80 overflow-x-auto bg-[#0b1121]">{currentStep.exampleSnippet}</pre>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl">
                      <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2">Instrucción</h4>
                      <p className="text-white text-sm font-bold leading-relaxed">{currentStep.instruction}</p>
                  </div>
                  <button 
                    onClick={() => setViewMode('editor')}
                    className="md:hidden bg-indigo-600 text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest mt-4"
                  >
                    Volver al Editor →
                  </button>
               </div>
             )}

             {learningStep === 'intro' && (
               <button onClick={startPractice} className="mt-8 bg-indigo-600 text-white font-black p-5 rounded-2xl hover:bg-indigo-500 transition-all shadow-xl uppercase tracking-tighter hover:scale-105 active:scale-95 group">
                 Iniciar Construcción <span className="group-hover:translate-x-1 inline-block transition-transform">🚀</span>
               </button>
             )}
        </div>
        
        {/* EDITOR AREA */}
        <div className={`flex-grow flex flex-col h-full bg-[#080d1a] ${viewMode === 'class' ? 'hidden md:flex' : 'flex'}`}>
           <div className="bg-[#0f172a] px-3 md:px-5 py-3 border-b border-white/5 flex justify-between items-center shadow-md">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 shrink-0">
                    <button 
                      onClick={() => setViewMode('class')}
                      className={`md:hidden px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${viewMode === 'class' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                    >Clase</button>
                    <button 
                      onClick={() => setViewMode('editor')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase transition-all ${viewMode === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >Editor</button>
                    <button 
                      onClick={() => setViewMode('preview')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase transition-all ${viewMode === 'preview' ? 'bg-cyan-500 text-dark' : 'text-slate-500 hover:text-slate-300'}`}
                    >Vista Previa (Real)</button>
                </div>
                <div className="text-[10px] text-slate-500 font-mono hidden sm:block">index.html</div>
            </div>

            <div className="relative flex-grow overflow-hidden">
                {viewMode === 'editor' ? (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-10 md:w-12 bg-slate-900/30 border-r border-white/5 flex flex-col items-center pt-6 text-slate-700 font-mono text-[10px] md:text-[11px]">
                        {[...Array(50)].map((_, i) => <div key={i} className="h-6 leading-6">{i + 1}</div>)}
                    </div>
                    <textarea
                        value={currentCode}
                        onChange={(e) => setCurrentCode(e.target.value)}
                        className="w-full h-full bg-transparent text-indigo-50 font-mono text-xs md:text-sm p-4 md:p-6 pl-12 md:pl-16 resize-none focus:outline-none leading-relaxed"
                        spellCheck={false}
                        autoFocus
                        placeholder="Escribe aquí tu arquitectura real..."
                    />
                  </>
                ) : (
                  <Previewer code={currentCode} />
                )}
                
                {feedback && (
                  <div className={`absolute bottom-6 left-12 md:left-16 right-4 md:right-6 p-4 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-2xl shadow-2xl animate-shake border z-50 ${feedback.correct ? 'bg-cyan-950/90 border-cyan-500/50' : 'bg-red-950/90 border-red-500/50'}`}>
                     <button onClick={() => setFeedback(null)} className="absolute top-3 right-3 text-white/40 hover:text-white">✕</button>
                     <div className="flex items-start gap-3 md:gap-4">
                        <span className="text-2xl md:text-3xl">{feedback.correct ? '✅' : '🏗️'}</span>
                        <div className="flex-grow">
                            <p className="text-xs md:text-sm font-black mb-2">{feedback.message}</p>
                            <div className="space-y-1">
                                {feedback.tips.map((t, idx) => (
                                    <p key={idx} className="text-[10px] md:text-[11px] font-medium flex items-center gap-2">
                                        <span className={`w-1 h-1 rounded-full ${feedback.correct ? 'bg-cyan-500' : 'bg-red-500'}`}></span> {t}
                                    </p>
                                ))}
                            </div>
                        </div>
                     </div>
                  </div>
                )}
            </div>

            <div className="p-4 md:p-8 bg-slate-900/80 border-t border-white/5 flex gap-4">
                {learningStep === 'success' ? (
                   <button onClick={() => {
                     const nextIdx = userState.currentStepIndex + 1;
                     if (nextIdx < activeModule.steps.length) {
                       setUserState(prev => ({ ...prev!, currentStepIndex: nextIdx }));
                       setLearningStep('practice');
                       setFeedback(null);
                       setViewMode('class');
                     } else {
                       const completedId = activeModule.id;
                       setUserState(prev => ({
                         ...prev!,
                         currentModuleId: null,
                         completedModules: prev!.completedModules.includes(completedId) ? prev!.completedModules : [...prev!.completedModules, completedId]
                       }));
                     }
                   }} className="flex-grow bg-cyan-500 text-dark font-black py-4 md:py-5 rounded-xl md:rounded-2xl shadow-2xl transition-all uppercase tracking-widest text-sm md:text-lg hover:bg-cyan-400">
                      Arquitectura Sincronizada →
                   </button>
                ) : (
                   <button 
                    onClick={handleCheckCode} 
                    disabled={learningStep === 'verifying' || currentCode.trim() === ''}
                    className="flex-grow bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl transition-all uppercase tracking-widest text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98]"
                   >
                      {learningStep === 'verifying' ? 'Analizando...' : 'Validar Estructura Real ⚡'}
                   </button>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
