// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: poner el dominio definitivo para que se generen bien las URLs canónicas y OG.
  // site: 'https://www.buenasburgers.es',

  vite: {
    plugins: [tailwindcss()],
  },

  // Fuentes autoalojadas con la Fonts API de Astro: se descargan en el build y se
  // sirven desde nuestro dominio (más rápido y sin enviar IPs a Google → RGPD).
  // Cada fuente expone una variable CSS que luego mapeamos en src/styles/global.css.
  fonts: [
    {
      // Tipografía diseñada imitando tubos de neón: logo y rótulos.
      provider: fontProviders.google(),
      name: 'Tilt Neon',
      cssVariable: '--font-tilt-neon',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      // Display condensada y contundente para titulares.
      provider: fontProviders.google(),
      name: 'Anton',
      cssVariable: '--font-anton',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['Impact', 'sans-serif'],
    },
    {
      // Texto corrido: legible en pantallas pequeñas.
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
