import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
  },
  server: {
    mimeType: {
      '.js': 'application/javascript',
      '.mjs': 'application/javascript',
      '.jsx': 'application/javascript',
      '.tsx': 'application/javascript',
    },
  },
});