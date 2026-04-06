import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hendrikschneemann.tech',
  base: '/',
  build: {
    format: 'file'
  }
});
