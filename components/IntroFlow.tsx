import React, { useState } from 'react';

interface IntroFlowProps {
  onComplete: () => void;
}

const IntroFlow: React.FC<IntroFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [demoCssActive, setDemoCssActive] = useState(false);

  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  // Render content based on step
  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              <span className="text-5xl">🚀</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">El Poder de Crear</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Bienvenido. Estás a punto de aprender el lenguaje que construye Internet. 
              <br/><br/>
              Cada página web, cada red social y cada aplicación que usas está hecha de lo que verás hoy. No eres solo un usuario; a partir de ahora, eres un <strong>creador</strong>.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <div className="flex justify-center gap-4 mb-6 text-6xl">
              <span>👨‍💻</span>
              <span className="text-gray-500">➜</span>
              <span>📄</span>
              <span className="text-gray-500">➜</span>
              <span>🌍</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">El Motor de Renderizado</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tú escribes texto plano (código). El navegador (Chrome, Firefox, Edge) tiene un motor que lee ese texto y lo <strong>"Renderiza"</strong> (lo dibuja) en la pantalla.
              <br/><br/>
              Tu misión no es dibujar píxeles, es escribir las reglas para que el navegador sepa dónde poner esos píxeles.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in w-full">
            <h2 className="text-2xl font-black text-white mb-2">HTML vs CSS: La Diferencia Real</h2>
            <p className="text-gray-400 text-sm mb-6">Prueba el interruptor de abajo para entender la separación de responsabilidades.</p>
            
            <div className="bg-dark p-6 rounded-xl border border-gray-700 shadow-inner mb-6 flex flex-col items-center justify-center min-h-[160px] transition-all duration-500">
              {/* Demo Element */}
              <button className={`
                transition-all duration-500 font-sans
                ${demoCssActive 
                  ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.4)] transform scale-110 border-2 border-white/20' 
                  : 'bg-gray-200 text-black border border-black p-1 text-sm rounded-none'
                }
              `}>
                Botón de Ejemplo
              </button>

              <div className="mt-8 flex items-center gap-3">
                 <span className={`text-xs font-bold ${!demoCssActive ? 'text-white' : 'text-gray-500'}`}>SOLO HTML (Estructura)</span>
                 <button 
                    onClick={() => setDemoCssActive(!demoCssActive)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${demoCssActive ? 'bg-green-500' : 'bg-gray-600'}`}
                 >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${demoCssActive ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
                 <span className={`text-xs font-bold ${demoCssActive ? 'text-white' : 'text-gray-500'}`}>CON CSS (Estilo)</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-left">
              * HTML define <strong>QUÉ</strong> es (un botón).<br/>
              * CSS define <strong>CÓMO</strong> se ve (redondo, rosa, con sombra).
            </p>
          </div>
        );
       case 3:
        return (
          <div className="text-center animate-fade-in">
             <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-indigo-500">
              <span className="text-4xl">🏷️</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Todo son "Etiquetas"</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              HTML significa <em>HyperText Markup Language</em>. "Markup" significa marcar. 
              <br/><br/>
              Imagina que envuelves el contenido en etiquetas para decirle al navegador qué es.
              <br/>
              <code className="bg-gray-800 px-2 py-1 rounded text-green-400 text-sm font-mono mt-2 inline-block">{'<h1>Esto es un título</h1>'}</code>
            </p>
          </div>
        );
      case 4:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
              Tu Objetivo Hoy
            </h2>
            <div className="space-y-4 text-left px-4">
                <div className="flex items-start gap-3">
                    <span className="bg-indigo-900 text-indigo-300 rounded p-1 text-xl">1</span>
                    <p className="text-gray-300">Entender la sintaxis estricta: abrir y cerrar etiquetas.</p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-indigo-900 text-indigo-300 rounded p-1 text-xl">2</span>
                    <p className="text-gray-300">Crear la estructura semántica de una página real.</p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-indigo-900 text-indigo-300 rounded p-1 text-xl">3</span>
                    <p className="text-gray-300">Acostumbrarte a fallar y corregir (Debugging).</p>
                </div>
            </div>
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-200 text-sm font-bold">⚠️ Advertencia: Seré exigente con la sintaxis.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050b14] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className={`
        relative w-full max-w-lg bg-[#1e293b] border border-gray-700 rounded-2xl p-8 
        flex flex-col items-center shadow-[0_0_60px_rgba(79,70,229,0.15)]
        transition-all duration-500
      `}>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
                className="bg-indigo-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            ></div>
        </div>

        {/* Content Area */}
        <div className="w-full min-h-[300px] flex flex-col justify-center">
            {renderContent()}
        </div>

        {/* Navigation */}
        <div className="w-full mt-8 flex justify-between items-center border-t border-gray-700 pt-6">
            <button 
                onClick={() => step > 0 && setStep(step - 1)}
                className={`text-gray-400 hover:text-white text-sm font-medium px-4 py-2 ${step === 0 ? 'invisible' : ''}`}
            >
                Atrás
            </button>
            <button
                onClick={nextStep}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
                {step === totalSteps - 1 ? "Iniciar Desafío" : "Continuar"}
            </button>
        </div>

      </div>
    </div>
  );
};

export default IntroFlow;