import React from 'react';

interface PreviewerProps {
  code: string;
}

const Previewer: React.FC<PreviewerProps> = ({ code }) => {
  // srcDoc ahora contiene únicamente el código del estudiante, sin estilos CSS personalizados.
  // Esto permite ver la estructura "real" (User Agent Styles) que es el núcleo del curso.
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <style>
          /* Estilos mínimos para que no se pegue a los bordes del iframe */
          body { 
            padding: 20px; 
            margin: 0; 
            background: #fff; 
            color: #000;
          }
          /* No hay estilos de diseño aquí, solo el renderizado base del navegador */
        </style>
      </head>
      <body>
        ${code || '<div style="color: #999; text-align: center; margin-top: 100px; font-family: sans-serif;">La arquitectura aparecerá aquí...</div>'}
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