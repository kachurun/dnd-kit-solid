import { resolve } from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

import pkg from './package.json';

type ExportEntry = {
  types: string;
  import: string;
  require: string;
};

function getLibEntriesFromExports(exportsMap: Record<string, ExportEntry>) {
  const entries: Record<string, string> = {};

  for (const key in exportsMap) {
    if (key === '.') {
      entries['index'] = resolve(__dirname, 'src/index.ts');
    } else {
      const entryPath = key.replace(/^\.\//, '');
      entries[entryPath] = resolve(__dirname, `src/${entryPath}/index.ts`);
    }
  }

  return entries;
}

const entries = getLibEntriesFromExports(pkg.exports);

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