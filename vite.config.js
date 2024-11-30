import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) =>{
  return {
    plugins: [react()],
    build: {
      sourcemap: mode === 'development',
      rollupOptions: {
        input: {
          content: 'src/content/index.jsx',
          background: 'src/background/background.js'
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  };
});