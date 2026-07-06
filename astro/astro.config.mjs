// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://codetango.vercel.app',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Dual-theme build-time highlighting; CSS in global.css switches
      // between the emitted --shiki-light/--shiki-dark custom properties.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
