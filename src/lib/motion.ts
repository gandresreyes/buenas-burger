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

/**
 * Neones con `data-neon`: empiezan apagados (se intuye el tubo) y, al entrar en
 * pantalla, parpadean un momento y se quedan encendidos. Solo se anima la
 * opacidad; el brillo es CSS estático (utilidad `neon-*`).
 */
function initNeons() {
  gsap.utils.toArray<HTMLElement>('[data-neon]').forEach((sign) => {
    gsap.set(sign, { opacity: 0.2 });
    gsap.to(sign, {
      keyframes: { opacity: [0.2, 1, 0.3, 1, 0.55, 1], easeEach: 'none' },
      duration: 0.9,
      delay: 0.3,
      scrollTrigger: { trigger: sign, start: 'top 80%', once: true },
    });
  });
}

gsap.matchMedia().add(MOTION_OK, initNeons);

/**
 * Cortocircuito: las piezas con `data-neon-fault` (una letra, un texto del
 * cartel) fallan de vez en cuando como un tubo de neón tocado: una ráfaga de
 * parpadeos rápidos y, a veces, un apagón corto. Los intervalos son al azar
 * para que no parezca un bucle, y solo fallan mientras se ven en pantalla.
 */
function initShortCircuits() {
  const { random } = gsap.utils;
  const timers: gsap.core.Tween[] = [];

  gsap.utils.toArray<Element>('[data-neon-fault]').forEach((part, i) => {
    // Sin start/end: activo mientras cualquier trozo de la pieza esté en pantalla
    const onScreen = ScrollTrigger.create({ trigger: part });
    const schedule = (min = 1.5, max = 5) => (timers[i] = gsap.delayedCall(random(min, max), burst));

    function burst() {
      if (!onScreen.isActive) return schedule();

      const tl = gsap.timeline({ onComplete: () => schedule() });
      for (let n = random(2, 5, 1); n > 0; n--) {
        tl.to(part, { opacity: random(0.05, 0.4), duration: random(0.02, 0.06), ease: 'none' }).to(part, {
          opacity: 1,
          duration: random(0.03, 0.12),
          ease: 'none',
        });
      }
      // De vez en cuando salta la chispa y se queda a oscuras un instante
      if (Math.random() < 0.3) {
        tl.to(part, { opacity: 0.08, duration: 0.03, ease: 'none' }).to(
          part,
          { opacity: 1, duration: 0.05, ease: 'none' },
          `+=${random(0.25, 0.7)}`,
        );
      }
    }

    // El primer fallo, después del parpadeo de encendido (data-neon)
    schedule(2, 3.5);
  });

  return () => timers.forEach((timer) => timer.kill());
}

gsap.matchMedia().add(MOTION_OK, initShortCircuits);

export { gsap, ScrollTrigger, lenis };
