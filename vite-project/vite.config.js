import { defineConfig } from 'vite';

export default defineConfig({
  root: './',  // If your index.html is inside a folder like public/, change this
  build: {
    outDir: 'dist',
  },
});
