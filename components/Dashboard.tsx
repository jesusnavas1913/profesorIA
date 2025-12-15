import React from 'react';
import { ModuleData, ModuleStatus } from '../types';

interface DashboardProps {
  modules: ModuleData[];
  onSelectModule: (id: number) => void;
  userXp: number;
}

const Dashboard: React.FC<DashboardProps> = ({ modules, onSelectModule, userXp }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 md:p-12 max-w-6xl mx-auto w-full">
      <header className="mb-10 flex justify-between items-end border-b border-gray-700 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Ruta de Aprendizaje HTML
          </h1>
          <p className="text-gray-400 mt-2">Domina la web, etiqueta por etiqueta.</p>
        </div>
        <div className="bg-surface px-6 py-3 rounded-full border border-yellow-500/20 shadow-lg flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Tu Experiencia</span>
            <span className="text-xl font-bold text-yellow-400">{userXp} XP</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                relative group text-left p-6 rounded-2xl border-2 transition-all duration-300 h-64 flex flex-col
                ${isLocked 
                  ? 'bg-surface/50 border-gray-700 opacity-60 cursor-not-allowed grayscale' 
                  : 'bg-surface border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:-translate-y-1'
                }
                ${isCompleted ? 'border-green-500/50 bg-green-900/10' : ''}
              `}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                 {isLocked && <span className="text-2xl">🔒</span>}
                 {isCompleted && <span className="text-2xl bg-green-500 rounded-full p-1 text-dark">✓</span>}
                 {isActive && <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>}
              </div>

              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {mod.theory.visualIcon}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                {mod.id}. {mod.title}
              </h3>
              
              <p className="text-gray-400 text-sm flex-grow">
                {mod.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center w-full">
                <span className="text-xs font-mono text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded">
                  +{mod.xpReward} XP
                </span>
                {!isLocked && (
                  <span className="text-sm font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                    {isCompleted ? 'Repasar' : 'Comenzar'} →
                  </span>
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