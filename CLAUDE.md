# Buenas Burgers — reglas del proyecto

Web de **Buenas Burgers**, hamburguesería de smash burgers en León (España).
Calle de la Misericordia, 10 · 24003 León.

@AGENTS.md

## Stack

- **Astro 7** (sitio estático, one-page) + **Tailwind CSS 4** vía `@tailwindcss/vite`.
- **GSAP 3 + ScrollTrigger** para animaciones ligadas al scroll y **Lenis** para
  scroll suave. No añadir otras librerías de animación.
- Gestor de paquetes: **bun** (`bun install`, `bun run build`). No usar npm/yarn.
- Servidor de desarrollo siempre en segundo plano: `astro dev --background`
  (`astro dev stop | status | logs`).
- Antes de dar algo por terminado: `bun run build` debe compilar sin errores.

## Estructura

```
src/
  data/        Datos del negocio y carta (única fuente de verdad)
    site.ts    Nombre, contacto, dirección, horario, redes
    menu.ts    Carta por categorías (menu[]), homePicks y featuredBurger
  lib/         Lógica sin UI
    hours.ts   "Abierto ahora" con la hora de Madrid
    motion.ts  GSAP + ScrollTrigger + Lenis (único punto de inicialización)
  components/  Un componente .astro por sección o pieza reutilizable
  layouts/     Layout.astro: <head>, SEO, fuentes, JSON-LD
  pages/       index.astro (portada) y carta.astro (/carta): solo componen
               secciones, sin lógica ni estilos
  styles/      global.css: tokens de diseño y utilidades de neón
```

- **Nunca escribir datos del negocio a mano en los componentes** (teléfono,
  dirección, horario, precios…): leerlos siempre de `src/data/`.
- Cada sección de la página es su propio componente y se añade en `index.astro`.
- Los `id` de las secciones de la portada (`#nosotros`, `#como-pedir`, `#visitanos`)
  deben coincidir con los enlaces de `Header.astro`. "Carta" enlaza a la página
  `/carta`; fuera de la portada las anclas se escriben `/#seccion`.

## Identidad visual (estética de rótulo de neón)

Todos los tokens viven en `@theme` de `src/styles/global.css`. No usar colores
hex ni fuentes sueltas en los componentes: usar siempre los tokens.

| Token            | Valor     | Uso                                  |
| ---------------- | --------- | ------------------------------------ |
| `night`          | `#0b0a10` | Fondo principal                      |
| `night-soft`     | `#15131c` | Tarjetas, superficies                |
| `line`           | `#2a2633` | Bordes y separadores                 |
| `cream`          | `#f7efe3` | Texto principal                      |
| `muted`          | `#a59fb0` | Texto secundario                     |
| `pink`           | `#ff3d9a` | Neón principal                       |
| `amber`          | `#ffb627` | Neón cálido / secundario             |
| `cyan`           | `#3df5ff` | Acento puntual (estado, pasos)       |

Tipografías (autoalojadas con la Fonts API de Astro en `astro.config.mjs`):

- `font-neon` → **Tilt Neon**: rótulos, antetítulos.
- `font-display` → **Anton**: titulares (h1–h3 en mayúsculas por defecto).
- `font-sans` → **DM Sans**: texto corrido.

Para añadir o cambiar una fuente: configurarla en `astro.config.mjs`, cargarla
con `<Font>` en `Layout.astro` y mapearla en `@theme`. No enlazar Google Fonts
directamente (rendimiento y RGPD).

### Utilidades de neón

- `neon-{color}` → texto con brillo (`neon-pink`, `neon-amber`, `neon-cyan`).
- `glow-{color}` → borde/caja con brillo (admite variantes: `hover:glow-pink`).
- `flicker` → parpadeo de neón viejo (aplicar a letras sueltas, no a bloques).
- `power-on` → encendido al cargar (se puede escalonar con `[animation-delay:…]`).
- Usar el neón con moderación: uno o dos elementos encendidos por sección.

## Animación y scroll

- Importar siempre `gsap`, `ScrollTrigger` y `MOTION_OK` desde `src/lib/motion.ts`;
  nunca registrar plugins ni crear otra instancia de Lenis en un componente.
- Toda animación va dentro de `gsap.matchMedia().add(MOTION_OK, …)`: con
  "reducir movimiento" no se ejecuta nada (ni Lenis).
- **Mejora progresiva**: el HTML se escribe en su estado FINAL (visible, legible).
  JS solo pone el estado inicial y anima hacia él. Sin JS no se pierde contenido.
- Aparición al hacer scroll: añadir `data-reveal` al elemento; `motion.ts` lo
  anima en lote. No usar `data-reveal` dentro de secciones con `pin`.
- Animar solo `transform` y `opacity` (`x`, `y`, `scale`, `rotation`, `autoAlpha`).
  Para brillos en SVG animados usar `glow-stroke` (drop-shadow CSS), no filtros SVG.
- Secciones con `pin`: `invalidateOnRefresh: true` si los valores dependen del
  tamaño, `refreshPriority: 1` si van por encima de otras animaciones, y alturas en
  `svh` para que quepan en móvil.
- Despiece de la burger: `BurgerAnatomy.astro` + `BurgerLayerArt.astro`; las capas
  salen de `featuredBurger.layers` en `menu.ts`.
- Comprobar siempre en 375×667, 390×760 y escritorio, y con reduced motion.

## Convenciones de código

- **Comentarios en español**: un bloque `/** … */` al inicio de cada componente
  explicando qué hace, y comentarios breves solo donde algo no sea obvio.
- TypeScript estricto: tipar las `Props` de cada componente con `interface Props`.
- Tailwind solo detecta clases escritas completas: para variantes por color usar
  un mapa de clases completas (ver `MenuCard.astro`), nunca `` `neon-${color}` ``.
- Scripts de cliente: solo los imprescindibles, dentro del componente que los usa
  (`<script>` procesado por Astro), sin frameworks.

## Accesibilidad y SEO

- `lang="es"`, un solo `<h1>` (en el Hero), jerarquía de títulos correcta y
  cada `<section>` con `aria-labelledby`.
- Decoración (SVG, números grandes) con `aria-hidden="true"`.
- Toda animación debe respetar `prefers-reduced-motion` (ya cubierto en global.css).
- Foco visible en todos los elementos interactivos.
- Mantener el JSON-LD `Restaurant` de `Layout.astro` sincronizado con `site.ts`.
- No incrustar mapas ni widgets de terceros con cookies: enlazar en su lugar.

## Contenido y tono

- Español de España, tono cercano (tuteo/vosotros): "pídela", "la que más pedís".
- Funcionamiento del local: se pide y se paga en barra, te dan un avisador;
  no hay servicio en mesa ni reservas.
- Todas las burgers se pueden adaptar sin gluten (avisar de alergias en barra).

## Pendiente (no publicar sin resolver)

- [x] Carta real (copiada de Just Eat, noviembre 2026).
- [ ] Precios: son los de Just Eat; confirmar que coinciden con los de barra.
      Faltan los de "Beicon Cheddar" y "Tequeños" (no disponibles en Just Eat).
- [ ] Confirmar el nombre "SweetRenata" (en Just Eat pone "SweerRenata").
- [x] Logo oficial (cabecera y pie) y favicon. Pedir versión vectorial (SVG/PDF): los PNG actuales son de ~110 px.
- [ ] Confirmar horario (dato de Diario de León, enero 2026).
- [ ] Fotos del local y del producto + `og:image` (1200×630).
- [ ] Instagram oficial en `site.social.instagram`.
- [ ] Dominio definitivo en `site` de `astro.config.mjs`.
- [ ] Ajustar paleta y tipografías con las referencias reales del neón del local.
- [ ] Confirmar el orden real de capas de la Rosa La Maravillosa (`layers`).
