import React from 'react';
import { ModuleData, ModuleStatus } from '../types';

interface DashboardProps {
  modules: ModuleData[];
  onSelectModule: (id: number) => void;
  userXp: number;
}

const Dashboard: React.FC<DashboardProps> = ({ modules, onSelectModule, userXp }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 md:p-12 max-w-6xl mx-auto w-full pb-24">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-700/30 pb-8">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 uppercase italic tracking-tighter">
            Hoja de Ruta: Arquitecto HTML
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Domina la web desde sus cimientos hasta el SEO de élite.</p>
        </div>
        <div className="mt-6 md:mt-0 bg-slate-900/60 backdrop-blur-xl px-8 py-4 rounded-3xl border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] flex items-center gap-4 transition-transform hover:scale-105">
          <span className="text-3xl animate-pulse">⚡</span>
          <div>
            <span className="block text-[10px] text-cyan-500 uppercase font-black tracking-widest">ADN Evolutivo</span>
            <span className="text-2xl font-black text-white">{userXp} <span className="text-cyan-400 text-sm">XP</span></span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((mod) => {
          const isLocked = mod.status === ModuleStatus.LOCKED;
          const isCompleted = mod.status === ModuleStatus.COMPLETED;
          const isActive = mod.status === ModuleStatus.ACTIVE;

          return (
            <button
              key={mod.id}
              onClick={() => !isLocked && onSelectModule(mod.id)}
              disabled={isLocked}
              className={`
                relative group text-left p-8 rounded-[2.5rem] border-2 transition-all duration-500 h-72 flex flex-col overflow-hidden
                ${isLocked 
                  ? 'bg-slate-900/20 border-white/5 opacity-40 cursor-not-allowed grayscale' 
                  : 'bg-slate-900/40 border-indigo-500/10 hover:border-indigo-500/40 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] hover:-translate-y-2'
                }
                ${isCompleted ? 'border-cyan-500/30 bg-cyan-500/[0.03]' : ''}
              `}
            >
              {/* Background Glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-all duration-700 group-hover:scale-150 ${isCompleted ? 'bg-cyan-500' : 'bg-indigo-500'}`}></div>

              <div className="flex justify-between items-start relative z-10 mb-4">
                 <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {mod.theory.visualIcon}
                 </div>
                 <div className="flex items-center gap-2">
                    {isLocked && <span className="bg-slate-800 text-white/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Bloqueado</span>}
                    {isCompleted && <span className="bg-cyan-500 text-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">✓ Completado</span>}
                    {isActive && !isCompleted && <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">En Curso</span>}
                 </div>
              </div>
              
              <h3 className={`text-xl font-black mb-3 relative z-10 tracking-tight leading-tight ${isCompleted ? 'text-cyan-400' : 'text-white'}`}>
                {mod.title}
              </h3>
              
              <p className="text-slate-400 text-sm font-medium leading-relaxed relative z-10 flex-grow">
                {mod.description}
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center w-full relative z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-0.5">Recompensa</span>
                    <span className="text-sm font-mono text-indigo-400 font-bold">
                      +{mod.xpReward} XP
                    </span>
                </div>
                {!isLocked && (
                  <div className={`flex items-center gap-2 text-sm font-black uppercase tracking-tighter ${isCompleted ? 'text-cyan-400' : 'text-indigo-400'}`}>
                    <span>{isCompleted ? 'Repasar Misión' : 'Iniciar'}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;