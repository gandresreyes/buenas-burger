/**
 * Motor de animación del sitio.
 *
 * - GSAP + ScrollTrigger: animaciones ligadas al scroll (scrub, pin).
 * - Lenis: scroll suave, sincronizado con el reloj de GSAP para que ambos
 *   vayan al mismo ritmo y no haya tirones.
 *
 * Este módulo se importa desde varios <script> de componentes; Vite lo agrupa
 * y lo evalúa una sola vez, así que Lenis y los plugins se inicializan una vez.
 *
 * Accesibilidad: con `prefers-reduced-motion: reduce` no se activa Lenis ni
 * ninguna animación; la página queda en su estado final, estático y legible.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

// En móvil la barra del navegador cambia la altura al hacer scroll: ignorarlo
// evita recalcular (y que "salten") las secciones fijadas con pin.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Media query que usamos para activar cualquier movimiento */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** Altura de la cabecera fija: los saltos a anclas la descuentan */
const HEADER_OFFSET = -72;

let lenis: Lenis | undefined;

if (window.matchMedia(MOTION_OK).matches) {
  lenis = new Lenis({
    // Lenis gestiona los enlaces #ancla con su propio scroll suave
    anchors: { offset: HEADER_OFFSET },
    // Lo mueve el ticker de GSAP (abajo), no su propio requestAnimationFrame
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  // Sin "lag smoothing": evita saltos de scroll tras un frame lento
  gsap.ticker.lagSmoothing(0);
}

/**
 * Aparición suave de elementos con el atributo `data-reveal` al entrar en
 * pantalla. Se agrupan con ScrollTrigger.batch para que los que entran a la
 * vez (p. ej. las tarjetas de la carta) aparezcan escalonados.
 */
function initReveals() {
  const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  // Se ocultan solo cuando hay JS y movimiento permitido: sin JS todo es visible
  gsap.set(targets, { autoAlpha: 0, y: 32 });

  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }),
  });
}

gsap.matchMedia().add(MOTION_OK, initReveals);

export { gsap, ScrollTrigger, lenis };
