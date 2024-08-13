import fs from 'fs';
import svgr from 'vite-plugin-svgr';

const cert = fs.readFileSync('localhost.pem');
const key = fs.readFileSync('localhost-key.pem');

export default {
  plugins: [svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@views', replacement: '/src/views' },
      { find: '@public', replacement: '/public' },
    ],
  },
  esbuild: {
    define: {
      this: 'window',
    },
  },
  server: {
    host: true,
    https: {
      key,
      cert,
    },
  },
};
