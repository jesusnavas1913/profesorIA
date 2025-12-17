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
  
  // Highlight keywords logic
  const processText = (text: string) => {
    return text.split(' ').map(word => {
        // Highlight HTML tags
        if (word.match(/<[^>]+>/) || word.includes('`')) 
            return `<span class="text-yellow-400 font-mono font-bold bg-yellow-900/30 px-1 rounded">${word.replace(/`/g, '')}</span>`;
        // Highlight Tech Terms
        if (['HTML', 'Google', 'SEO', 'DOM', 'Browser', 'Renderizado', 'Tim', 'Berners-Lee'].some(k => word.includes(k))) 
            return `<span class="text-indigo-300 font-bold border-b border-indigo-500/50">${word}</span>`;
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
    }, 40); // Slightly faster for a "smart" feel

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto font-sans">
      
      {/* THE AVATAR: Neural Core Animation */}
      <div className="flex items-center gap-4 bg-[#1e293b]/80 p-4 rounded-2xl border border-gray-700/50 backdrop-blur-md shadow-xl transition-all hover:border-indigo-500/30">
         <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            {/* Core */}
            <div className={`absolute w-12 h-12 rounded-full blur-sm transition-all duration-500
                ${mood === 'happy' ? 'bg-green-500 animate-pulse' : ''}
                ${mood === 'thinking' ? 'bg-yellow-500 animate-pulse' : ''}
                ${mood === 'neutral' || mood === 'explaining' ? 'bg-indigo-600' : ''}
                ${mood === 'waiting' ? 'bg-gray-600' : ''}
            `}></div>
            
            {/* Orbitals */}
            <div className={`absolute inset-0 border-2 border-indigo-400/30 rounded-full animate-[spin_3s_linear_infinite]`}></div>
            <div className={`absolute inset-0 border-2 border-purple-400/30 rounded-full w-full h-full rotate-45 animate-[spin_4s_linear_infinite_reverse]`}></div>
            
            {/* Center Icon */}
            <span className="relative z-10 text-2xl drop-shadow-lg">
                {mood === 'happy' ? '⚡' : mood === 'thinking' ? '🧠' : '👁️'}
            </span>
         </div>

         <div className="flex-grow">
             <div className="flex justify-between items-start">
                <h3 className="text-white font-bold text-lg tracking-tight">Cortex <span className="text-indigo-400">AI</span></h3>
                {isSpeaking && (
                    <div className="flex gap-0.5 items-end h-4">
                        {[...Array(5)].map((_,i) => (
                            <div key={i} className="w-1 bg-indigo-400 animate-music-bar rounded-t" style={{animationDelay: `${i*0.1}s`}}></div>
                        ))}
                    </div>
                )}
             </div>
             <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold mt-1">
                {mood === 'thinking' ? 'Compilando análisis...' : 'Mentoría Activa'}
             </p>
         </div>
         
         {isSpeaking && (
            <button onClick={onStopSpeaking} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                🔇
            </button>
         )}
      </div>

      {/* THE BUBBLE: Main Dialogue */}
      <div className={`
        bg-[#0f172a] p-6 rounded-2xl border border-gray-800 shadow-2xl relative
        ${mood === 'happy' ? 'border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : ''}
      `}>
         {/* Little tail for the bubble */}
         <div className="absolute -top-2 left-10 w-4 h-4 bg-[#0f172a] border-t border-l border-gray-800 transform rotate-45"></div>

         <p className="text-gray-100 text-lg leading-loose font-medium"
            dangerouslySetInnerHTML={{__html: processText(displayedMessage.join(" ")) + (displayedMessage.length < message.split(" ").length ? '<span class="animate-pulse inline-block w-2 h-4 bg-indigo-500 ml-1"></span>' : '')}} 
         />
      </div>

      {/* EXTRA KNOWLEDGE CARDS (If available) */}
      {(extraInfo?.history || extraInfo?.tip) && !isSpeaking && mood !== 'thinking' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
              {extraInfo.history && (
                  <div className="bg-blue-950/30 border border-blue-500/30 p-4 rounded-xl flex gap-3 items-start hover:bg-blue-900/20 transition-colors">
                      <span className="text-xl mt-1">📜</span>
                      <div>
                          <span className="text-[10px] text-blue-400 font-bold uppercase block mb-1">Contexto Histórico</span>
                          <p className="text-xs text-blue-100 leading-relaxed italic">"{extraInfo.history}"</p>
                      </div>
                  </div>
              )}
              {extraInfo.tip && (
                  <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl flex gap-3 items-start hover:bg-amber-900/20 transition-colors">
                      <span className="text-xl mt-1">💎</span>
                       <div>
                          <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">Consejo Pro</span>
                          <p className="text-xs text-amber-100 leading-relaxed">{extraInfo.tip}</p>
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
        .animate-music-bar {
            animation: music-bar 0.5s ease-in-out infinite;
        }
        .animate-slide-up {
            animation: slideUp 0.5s ease-out forwards;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Professor;