import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true
  }
});