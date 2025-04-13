import { resolve } from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  'draggable/index': resolve(__dirname, 'src/draggable/index.ts'),
  'droppable/index': resolve(__dirname, 'src/droppable/index.ts'),
  'sortable/index': resolve(__dirname, 'src/sortable/index.ts'),
  'hooks/index': resolve(__dirname, 'src/hooks/index.ts'),
  'utils/index': resolve(__dirname, 'src/utils/index.ts'),
  'context/index': resolve(__dirname, 'src/context/index.ts'),
};

export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: entries,
      name: 'dnd-kit-solid',
    },
    rollupOptions: {
      external: [
        /^solid-js(\/.*)?$/,
        /^@dnd-kit\/.*/,
      ],
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      ],
    },
  },
}); 