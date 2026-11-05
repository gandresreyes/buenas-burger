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
      // Display gruesa y redondeada, la más parecida a la letra del logo: titulares.
      provider: fontProviders.google(),
      name: 'Lilita One',
      cssVariable: '--font-lilita-one',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['Arial Black', 'sans-serif'],
    },
    {
      // Condensada y gruesa, como la del vinilo de la puerta ("Buenas en tu casa…").
      provider: fontProviders.google(),
      name: 'Anton',
      cssVariable: '--font-anton',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['Impact', 'sans-serif'],
    },
    {
      // Manuscrita de rotulador, como el neón "Quiero salir en tus stories" del local.
      provider: fontProviders.google(),
      name: 'Gochi Hand',
      cssVariable: '--font-gochi-hand',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
    {
      // Monoespaciada de impresora de tickets: carta, antetítulos y etiquetas.
      provider: fontProviders.google(),
      name: 'Space Mono',
      cssVariable: '--font-space-mono',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      // Texto corrido: legible en pantallas pequeñas.
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      // Hasta 900: el rótulo de la fachada usa la versión más gruesa
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
