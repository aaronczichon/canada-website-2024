import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import preact from "@astrojs/preact";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx(), preact({ include: ['**/components/dynamic/*'] }), react({
    include: ['**/components/react/*']
  })],
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