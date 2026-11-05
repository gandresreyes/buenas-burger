/**
 * Prepara las fotos del despiece de la burger: `bun run fotos`.
 *
 * Lee las fotos originales de `fotos-despiece/` (con fondo ya quitado, PNG con
 * transparencia), y por cada una:
 *   1. recorta el aire transparente de arriba y abajo (los laterales se dejan:
 *      con el mismo encuadre para todas las tomas, así se conservan los anchos
 *      reales de cada ingrediente y quedan centrados al apilarlos),
 *   2. la reduce a 1280 px de ancho como máximo,
 *   3. la guarda como WebP en `src/assets/burger/`, que es donde la busca
 *      BurgerAnatomy.astro.
 *
 * Opciones:
 *   --recortar-lados  recorta también los laterales (para fotos sueltas o
 *                     generadas por IA, cada una con su encuadre; luego se
 *                     ajusta el ancho con `photoScale` en src/data/menu.ts).
 *
 * Los nombres de archivo deben coincidir con `photo` de cada capa en
 * src/data/menu.ts (p. ej. `01-pan-arriba.png`). Ver docs/fotos-despiece.md.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { extname, basename, join } from 'node:path';
import sharp from 'sharp';
import { featuredBurger } from '../src/data/menu';

const INPUT = 'fotos-despiece';
const OUTPUT = 'src/assets/burger';
const MAX_WIDTH = 1280;
/** Opacidad mínima (0-255) para considerar que un píxel es parte del ingrediente */
const ALPHA_THRESHOLD = 12;

const trimSides = process.argv.includes('--recortar-lados');
const expected = [...new Set((featuredBurger.layers ?? []).map((layer) => layer.photo))];

const files = await readdir(INPUT).catch(() => {
  console.error(`No existe la carpeta "${INPUT}/". Créala y mete ahí las fotos (ver docs/fotos-despiece.md).`);
  process.exit(1);
});

await mkdir(OUTPUT, { recursive: true });

/** Caja que contiene los píxeles visibles, a partir del canal alfa */
function visibleBox(alpha: Buffer, width: number, height: number) {
  let top = height, bottom = -1, left = width, right = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] > ALPHA_THRESHOLD) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  return bottom < 0 ? undefined : { top, bottom, left, right };
}

const done = new Set<string>();

for (const file of files) {
  const name = basename(file, extname(file));
  if (!['.png', '.webp', '.avif', '.tif', '.tiff'].includes(extname(file).toLowerCase())) continue;

  if (!expected.includes(name)) {
    console.warn(`· ${file}: no corresponde a ninguna capa (esperados: ${expected.join(', ')}). Se ignora.`);
    continue;
  }

  const image = sharp(join(INPUT, file)).ensureAlpha();
  const { width, height, hasAlpha } = await sharp(join(INPUT, file)).metadata();
  if (!hasAlpha) {
    console.warn(`· ${file}: no tiene transparencia. Quita el fondo antes (ver docs/fotos-despiece.md). Se ignora.`);
    continue;
  }

  const alpha = await image.clone().extractChannel('alpha').raw().toBuffer();
  const box = visibleBox(alpha, width!, height!);
  if (!box) {
    console.warn(`· ${file}: es totalmente transparente. Se ignora.`);
    continue;
  }

  const region = trimSides
    ? { left: box.left, top: box.top, width: box.right - box.left + 1, height: box.bottom - box.top + 1 }
    : { left: 0, top: box.top, width: width!, height: box.bottom - box.top + 1 };

  const out = join(OUTPUT, `${name}.webp`);
  await image
    .extract(region)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 95, effort: 6 })
    .toFile(out);

  done.add(name);
  console.log(`✓ ${file} → ${out} (${region.width}×${region.height})`);
}

const missing = expected.filter((name) => !done.has(name));
console.log(
  missing.length
    ? `\nFaltan ${missing.length} foto(s); esas capas seguirán usando la ilustración: ${missing.join(', ')}`
    : '\nTodas las capas tienen foto.',
);
