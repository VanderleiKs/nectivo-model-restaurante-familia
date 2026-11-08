// @ts-check
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { site } from './src/config/site.ts';

// O @astrojs/sitemap gera sitemap-index.xml + sitemap-0.xml.
// Este hook publica também /sitemap.xml (cópia de sitemap-0.xml), o caminho mais comum para crawlers.
/** @type {import('astro').AstroIntegration} */
const sitemapXmlAlias = {
  name: 'nectivo-sitemap-xml-alias',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await copyFile(
        fileURLToPath(new URL('sitemap-0.xml', dir)),
        fileURLToPath(new URL('sitemap.xml', dir)),
      );
    },
  },
};

export default defineConfig({
  site: site.url,
  output: 'static',
  compressHTML: true,
  integrations: [
    sitemap({
      // Páginas listadas em site.seo.noindexPaths ficam fora do sitemap.
      filter: (page) => !site.seo.noindexPaths.some((p) => new URL(page).pathname.startsWith(p)),
    }),
    sitemapXmlAlias,
  ],
  vite: { plugins: [tailwindcss()] },
});
