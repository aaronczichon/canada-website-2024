import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), preact()],
  site: 'https://canada.aaronczichon.de',
  image: {
    domains: ['api.mapbox.com', 'directus.aaronczichon.de']
  },
  i18n: {
    defaultLocale: "de",
    locales: ["en", "de"],
  },
  routing: {
    prefixDefaultLocale: false
}
});