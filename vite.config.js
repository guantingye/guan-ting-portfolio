import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/guan-ting-portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
