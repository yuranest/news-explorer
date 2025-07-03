import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/signup': 'http://localhost:3001',
      '/signin': 'http://localhost:3001',
      '/users': 'http://localhost:3001',
      '/articles': 'http://localhost:3001',
    },
  },
});
