import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      allowedHosts: ['profesoria.onrender.com', '.onrender.com', 'localhost'],
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      // CRÍTICO: Permitir explícitamente el dominio de Render y cualquier subdominio
      allowedHosts: ['profesoria.onrender.com', '.onrender.com', 'localhost'],
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});