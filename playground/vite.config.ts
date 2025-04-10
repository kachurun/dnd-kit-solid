import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  root: resolve(__dirname),
  build: {
    outDir: resolve(__dirname, '../dist/playground'),
    emptyOutDir: true,
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
}); 