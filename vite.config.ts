import { defineConfig } from 'vite';

import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  resolve: {},
  define: {
    'process.env': {},
  },
  esbuild: {
    define: {
      this: 'window',
    },
  },
});
