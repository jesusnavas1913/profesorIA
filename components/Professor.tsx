import React, { useEffect, useState } from 'react';

interface ProfessorProps {
  message: string;
  mood: 'neutral' | 'happy' | 'thinking' | 'waiting' | 'explaining';
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  extraInfo?: { history?: string; tip?: string };
}

const Professor: React.FC<ProfessorProps> = ({ message, mood, isSpeaking, onStopSpeaking, extraInfo }) => {
  const [displayedMessage, setDisplayedMessage] = useState<string[]>([]);
  
  const processText = (text: string) => {
    return text.split(' ').map(word => {
        if (word.match(/<[^>]+>/) || word.includes('`')) 
            return `<span class="text-indigo-400 font-mono font-bold bg-indigo-500/10 px-1 rounded">${word.replace(/`/g, '')}</span>`;
        if (['Google', 'SEO', 'Viewport', 'UTF-8', 'Arquitecto', 'Estructura', 'HTML'].some(k => word.includes(k))) 
            return `<span class="text-cyan-400 font-bold border-b border-cyan-500/30">${word}</span>`;
        return word;
    }).join(' ');
  };

  useEffect(() => {
    setDisplayedMessage([]);
    const words = message.split(" ");
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < words.length) {
        setDisplayedMessage(prev => [...prev, words[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30); 

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto font-sans">
      <div className="flex items-center gap-4 bg-[#0f172a]/90 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-xl shadow-2xl transition-all">
         <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <div className={`absolute w-14 h-14 rounded-full blur-md transition-all duration-700
                ${mood === 'happy' ? 'bg-cyan-500 opacity-40 animate-pulse' : ''}
                ${mood === 'thinking' ? 'bg-purple-500 opacity-40 animate-pulse' : ''}
                ${mood === 'neutral' || mood === 'explaining' ? 'bg-indigo-600 opacity-30' : ''}
                ${mood === 'waiting' ? 'bg-gray-600 opacity-20' : ''}
            `}></div>
            
            <div className={`absolute inset-0 border border-indigo-500/30 rounded-full animate-[spin_8s_linear_infinite]`}></div>
            <div className={`absolute inset-1 border border-cyan-500/20 rounded-full animate-[spin_12s_linear_infinite_reverse]`}></div>
            
            <span className="relative z-10 text-2xl drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                {mood === 'happy' ? '✨' : mood === 'thinking' ? '⚙️' : '👁️'}
            </span>
         </div>

         <div className="flex-grow">
             <div className="flex justify-between items-start">
                <h3 className="text-white font-black text-lg tracking-tighter uppercase italic">Cortex <span className="text-cyan-400">v2.0</span></h3>
                {isSpeaking && (
                    <div className="flex gap-1 items-end h-4">
                        {[...Array(4)].map((_,i) => (
                            <div key={i} className="w-1 bg-cyan-400 animate-music-bar rounded-full" style={{animationDelay: `${i*0.15}s`}}></div>
                        ))}
                    </div>
                )}
             </div>
             <p className="text-[9px] text-cyan-500 uppercase tracking-[0.2em] font-black mt-0.5 opacity-80">
                {mood === 'thinking' ? 'Procesando Arquitectura...' : 'Sincronización Mental'}
             </p>
         </div>
      </div>

      <div className={`
        bg-slate-900/80 p-6 rounded-3xl border border-white/5 shadow-2xl relative backdrop-blur-sm
        ${mood === 'happy' ? 'border-cyan-500/20' : ''}
      `}>
         <div className="absolute -top-2 left-10 w-4 h-4 bg-slate-900 border-t border-l border-white/5 transform rotate-45"></div>

         <p className="text-slate-100 text-lg leading-relaxed font-medium"
            dangerouslySetInnerHTML={{__html: processText(displayedMessage.join(" ")) + (displayedMessage.length < message.split(" ").length ? '<span class="animate-pulse inline-block w-1.5 h-4 bg-cyan-500 ml-1"></span>' : '')}} 
         />
      </div>

      {(extraInfo?.history || extraInfo?.tip) && !isSpeaking && mood !== 'thinking' && (
          <div className="grid grid-cols-1 gap-3 animate-slide-up">
              {extraInfo.tip && (
                  <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-2xl flex gap-3 items-center group hover:bg-cyan-500/10 transition-all">
                      <span className="text-xl group-hover:scale-125 transition-transform">💎</span>
                       <div>
                          <span className="text-[9px] text-cyan-400 font-black uppercase tracking-widest block mb-0.5">Insight de Arquitecto</span>
                          <p className="text-sm text-cyan-100/80 font-medium">{extraInfo.tip}</p>
                      </div>
                  </div>
              )}
          </div>
      )}

      <style>{`
        @keyframes music-bar {
            0%, 100% { height: 20%; }
            50% { height: 100%; }
        }
        .animate-music-bar { animation: music-bar 0.4s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Professor;