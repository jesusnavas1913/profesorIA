import React, { useState } from 'react';
import { UserState } from '../types';

interface AuthFlowProps {
  onLogin: (user: UserState) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 3 || password.length < 4) {
      setError('Nombre (min 3) y Contraseña (min 4) requeridos.');
      return;
    }

    const storageKey = `cortex_profile_${name.toLowerCase()}`;
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      const profile = JSON.parse(savedData);
      if (profile.password === password) {
        onLogin(profile.state);
      } else {
        setError('Contraseña incorrecta para este Arquitecto.');
      }
    } else {
      // Crear nuevo perfil
      const initialState: UserState = {
        username: name,
        currentModuleId: null,
        currentStepIndex: 0,
        xp: 0,
        completedModules: [],
        streak: 1
      };
      
      const newProfile = {
        password: password,
        state: initialState
      };
      
      localStorage.setItem(storageKey, JSON.stringify(newProfile));
      onLogin(initialState);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-md bg-slate-900/80 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.4)] rotate-3">
              <span className="text-4xl">👁️</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Cortex <span className="text-cyan-400">Auth</span></h1>
            <p className="text-slate-400 text-sm mt-2 font-medium tracking-tight">Sincroniza tu ADN de Arquitecto Digital</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2 ml-1">Nombre del Arquitecto</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                placeholder="Ej: Jesus_Master"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2 ml-1">Clave de Acceso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-xl tracking-[0.3em]"
                placeholder="••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                <p className="text-red-400 text-[10px] font-bold text-center uppercase tracking-wider">{error}</p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-[0.98] uppercase tracking-tighter text-lg"
            >
              Iniciar Sincronización ⚡
            </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Tus misiones y XP se guardan en este dispositivo.
        </p>
      </div>
    </div>
  );
};

export default AuthFlow;