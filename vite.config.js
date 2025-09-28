import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Vite root auf src setzen
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html') // index.html direkt in src
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    strictPort: true
  }
});