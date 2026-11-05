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
  styles/      global.css: tokens de diseño y utilidades de estilo
```

- **Nunca escribir datos del negocio a mano en los componentes** (teléfono,
  dirección, horario, precios…): leerlos siempre de `src/data/`.
- Cada sección de la página es su propio componente y se añade en `index.astro`.
- Los `id` de las secciones de la portada (`#nosotros`, `#como-pedir`, `#visitanos`)
  deben coincidir con los enlaces de `Header.astro`. "Carta" enlaza a la página
  `/carta`; fuera de la portada las anclas se escriben `/#seccion`.

## Identidad visual (sello y pegatina)

Sale del logo oficial: negro, blanco y mostaza, con letra gruesa. Estética de
pegatina / sello de tinta / ticket de barra: rellenos planos, contornos negros y
sombras duras desplazadas.

**Neón: permitido** para citar los carteles reales del local (ver abajo). La
base sigue siendo sello/pegatina; el neón es un acento puntual, no el estilo de
toda la página. El brillo va en CSS estático (`text-shadow` / `drop-shadow`) y
solo se anima su `opacity` (encendido, parpadeo), nunca la sombra.

Todos los tokens viven en `@theme` de `src/styles/global.css`. No usar colores
hex ni fuentes sueltas en los componentes: usar siempre los tokens. **Única
excepción**: `BurgerLayerArt.astro`, cuya paleta fotográfica de ingredientes va
en hex dentro del propio componente.

| Token      | Valor     | Uso                                          |
| ---------- | --------- | -------------------------------------------- |
| `ink`      | `#0d0c0b` | Fondo principal (el negro del logo)          |
| `ink-soft` | `#1a1816` | Tarjetas y superficies sobre negro           |
| `line`     | `#3a352f` | Bordes y separadores sobre negro             |
| `paper`    | `#f6efe2` | Texto sobre negro; fondo papel / ticket      |
| `muted`    | `#a39b90` | Texto secundario sobre negro                 |
| `faded`    | `#6b6359` | Texto secundario sobre papel o mostaza       |
| `mustard`  | `#f7ac37` | Color de marca (el naranja del logo)         |
| `ketchup`  | `#e5482d` | Acento cálido, con moderación                |
| `pickle`   | `#9cc14a` | Acento puntual: estado "abierto"             |
| `toast`    | `#d98a3d` | Pan tostado: solo en la ilustración          |

Ritmo de fondos en la portada: negro → cinta mostaza → despiece en negro →
negro → "Nosotros" en mostaza → negro → frase de la puerta en papel → pared de
ladrillo con los neones → negro.

Referencias reales del local (fotos de la entrada):
- **Vinilo de la puerta**: "Buenas en tu casa · Buenísimas en la nuestra", en
  letra condensada, con "BUENAS" en arco y una línea mostaza con la B en medio.
  Es el lema de la casa → `Slogan.astro`.
- **Rótulo de la fachada**: franja negra, "BUENAS" en mostaza y "BURGERS" en
  blanco (sans geométrica muy gruesa) + icono de burger → `StoreSign.astro`.
- **Neones del interior**: el cartel redondo "Buenas Burgers · Smash since 2021"
  con la B entre panes (mostaza) → `WallSign.astro`, y "Quiero salir en tus
  stories" en letra manuscrita (rojo), encima del sofá. Los dos van juntos,
  encendidos y en grande, en `NeonWall.astro` ("Hazte la foto"), sobre ladrillo
  oscuro: el neón solo luce sobre fondo oscuro, no lo pongas sobre mostaza o papel.

Tipografías (autoalojadas con la Fonts API de Astro en `astro.config.mjs`):

- `font-display` → **Lilita One**: titulares (h1–h3 en mayúsculas por defecto).
  Es la de Google Fonts más parecida a la letra del logo.
- `font-condensed` → **Anton**: solo la frase del vinilo (`Slogan.astro`).
- `font-hand` → **Gochi Hand**: solo el neón manuscrito "Quiero salir en tus
  stories" (`NeonWall.astro`).
- `font-mono` → **Space Mono**: carta tipo ticket, antetítulos, etiquetas.
- `font-sans` → **DM Sans** (400–900): texto corrido, botones y, en 900, el
  rótulo de la fachada.

Para añadir o cambiar una fuente: configurarla en `astro.config.mjs`, cargarla
con `<Font>` en `Layout.astro` y mapearla en `@theme`. No enlazar Google Fonts
directamente (rendimiento y RGPD).

### Utilidades de estilo

- `pop-{color}` → sombra dura desplazada en cajas (`pop-paper`, `pop-mustard`…).
- `pop-text-{color}` → sombra dura en texto (titular de la portada).
- `pop-drop` → sombra dura que sigue la silueta de un SVG (capas de la burger).
- `distressed` → textura de impresión gastada (motas), como la del logo. Solo
  en el nombre de la portada.
- `ticket-edge` → bordes perforados de ticket arriba y abajo.
- `dot-leader` → puntos entre nombre y precio en la carta.
- `neon-{color}` → neón encendido (tubo casi blanco + halo del color) para texto
  o SVG con `currentColor`. El halo va en `em`: en SVG, dar `font-size` en
  proporción al ancho (ver `WallSign`, `@container` + `text-[8cqw]`).
- `brick-mortar` → juntas de pared de ladrillo (máscara) para `NeonWall`.
- Antetítulos: en las secciones de la portada, `font-mono` mostaza entre
  paréntesis, "( Te esperamos )", con titular grande alineado a la izquierda.
  En `/carta` y en el despiece, etiqueta torcida (`-rotate-2`, ver `SectionHeading`).
- Superficies modernas: tarjetas `rounded-3xl` con `border-line` (bento en
  Visítanos), filas editoriales con líneas finas (`MenuRow`) y números grandes
  perfilados (`-webkit-text-stroke`) en Cómo pedir.
- `body::after` aplica un grano fotográfico sutil a toda la página.
- Botones: componente `Button.astro`, en píldora con `font-sans` (`primary`:
  mostaza con flecha en un círculo; `ghost`: cristal translúcido). No usar
  sombras duras ni bordes gruesos en los botones. Los enlaces de reparto
  (`DeliveryLinks`) siguen la misma forma de píldora.
- Sello de marca: `BrandStamp.astro` (emblema del favicon + texto circular con
  el lema del cartel del local, "Smash since {site.since}").
- Cartel del local: `WallSign.astro` dibuja el neón de la pared como trazo
  (`currentColor`); con `lit` se enciende (`neon-mustard` + `data-neon`).

## Animación y scroll

- Importar siempre `gsap`, `ScrollTrigger` y `MOTION_OK` desde `src/lib/motion.ts`;
  nunca registrar plugins ni crear otra instancia de Lenis en un componente.
- Toda animación va dentro de `gsap.matchMedia().add(MOTION_OK, …)`: con
  "reducir movimiento" no se ejecuta nada (ni Lenis).
- **Mejora progresiva**: el HTML se escribe en su estado FINAL (visible, legible).
  JS solo pone el estado inicial y anima hacia él. Sin JS no se pierde contenido.
- Aparición al hacer scroll: añadir `data-reveal` al elemento; `motion.ts` lo
  anima en lote. No usar `data-reveal` dentro de secciones con `pin`.
- Neones: `data-neon` hace que se enciendan con un parpadeo al entrar en
  pantalla (solo `opacity`, en `motion.ts`). No ponerlo en el mismo elemento
  que `data-reveal`: las dos animan la opacidad.
- Cortocircuito: `data-neon-fault` en una pieza DENTRO de un neón (una letra
  envuelta en `<span>`, un `<text>` del SVG) hace que falle de vez en cuando con
  ráfagas de parpadeo al azar. Solo mientras se ve. Usarlo en 1–2 piezas por
  cartel: si falla todo, deja de parecer una avería.
- Animar solo `transform` y `opacity` (`x`, `y`, `scale`, `rotation`, `autoAlpha`).
  Para sombras en SVG usar `pop-drop` (drop-shadow CSS), no filtros SVG.
- Secciones con `pin`: `invalidateOnRefresh: true` si los valores dependen del
  tamaño, `refreshPriority: 1` si van por encima de otras animaciones, y alturas en
  `svh` para que quepan en móvil.
- Despiece de la burger: `BurgerAnatomy.astro` + `BurgerLayerArt.astro`; las capas
  salen de `featuredBurger.layers` en `menu.ts`. Cada capa usa su foto real si
  existe `src/assets/burger/<photo>.webp` y, si no, la ilustración realista
  (SVG con texturas). Las fotos se preparan con `bun run fotos` desde
  `fotos-despiece/` (ignorada en git). Instrucciones y prompts: `docs/fotos-despiece.md`.
- Comprobar siempre en 375×667, 390×760 y escritorio, y con reduced motion.

## Convenciones de código

- **Comentarios en español**: un bloque `/** … */` al inicio de cada componente
  explicando qué hace, y comentarios breves solo donde algo no sea obvio.
- TypeScript estricto: tipar las `Props` de cada componente con `interface Props`.
- Tailwind solo detecta clases escritas completas: para variantes por color usar
  un mapa de clases completas (ver `MenuRow.astro`), nunca `` `pop-${color}` ``.
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
- [ ] Fotos del local y del producto. `public/og-image.jpg` (1200×630) sale de
      una captura de Instagram: pedir la foto original en alta.
- [ ] Fotos de las 8 capas del despiece (ver `docs/fotos-despiece.md`). Las de
      `src/assets/burger/` son **provisionales, generadas por IA** (noviembre
      2026): sustituirlas por fotos reales de la Rosa antes de publicar.
- [ ] Instagram oficial en `site.social.instagram`.
- [ ] Dominio definitivo en `site` de `astro.config.mjs`.
- [ ] Pedir el nombre de la fuente del logo (Lilita One es una aproximación).
- [ ] Confirmar el orden real de capas de la Rosa La Maravillosa (`layers`).
