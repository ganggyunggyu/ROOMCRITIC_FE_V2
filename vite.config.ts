import svgr from 'vite-plugin-svgr';

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
};
