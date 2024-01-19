import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@_icon', replacement: resolve(__dirname, 'src/components') },
      { find: '@_assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@_styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@_lib', replacement: resolve(__dirname, 'src/lib') },
    ],
  },
  plugins: [react()],
});
