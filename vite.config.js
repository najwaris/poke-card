import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // NOTE: change base if deploying to GitHub Pages under a subpath
  base: process.env.GH_PAGES_BASE || '/',
});