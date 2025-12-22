import React from 'react';

interface PreviewerProps {
  code: string;
}

const Previewer: React.FC<PreviewerProps> = ({ code }) => {
  // srcDoc ahora es el estándar más puro posible. 
  // Sin estilos CSS, el navegador usará sus estilos por defecto (Times New Roman, márgenes base, etc.)
  // Esto es lo que un desarrollador ve antes de aplicar diseño.
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="padding: 15px; background: white; color: black;">
        ${code || '<div style="color: #666; text-align: center; margin-top: 50px; font-family: sans-serif;">La arquitectura real aparecerá aquí cuando escribas código...</div>'}
      </body>
    </html>
  `;

  return (
    <div className="w-full h-full bg-white rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none overflow-hidden">
      <iframe
        title="preview"
        srcDoc={srcDoc}
        className="w-full h-full border-none"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Previewer;