import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: '../assets',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html')
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
  },
  plugins: [
    {
      name: 'copy-favicon',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'assets/favicon.ico'),
          resolve(__dirname, 'dist/favicon.ico')
        );
      }
    }
  ]
});