import { defineConfig } from 'astro/config';
import robotsTxt from "astro-robots-txt";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-blog-56t.pages.dev/',
  integrations: [robotsTxt(), mdx(), sitemap()],
});
