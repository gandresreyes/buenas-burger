# Fotos para el despiece de la Rosa La Maravillosa 2.0

La web muestra la Rosa desmontándose capa a capa al hacer scroll. Ahora cada capa
es una ilustración; con **una foto real por ingrediente** el despiece queda
hiperrealista. La web cambia el dibujo por la foto en cuanto esta existe, así que
se pueden ir añadiendo poco a poco.

## Las 8 fotos

Una foto por capa, **de perfil** (cámara a la altura del ingrediente, como si
miraras la burger de lado) y con el ingrediente **centrado**.

| Archivo                       | Qué sale                                                              |
| ----------------------------- | --------------------------------------------------------------------- |
| `01-pan-arriba.png`           | Tapa del pan de patata, con algo del corte (la miga) asomando abajo   |
| `02-salsa-ajo-parmesano.png`  | La capa de salsa de ajo y parmesano, con algún goterón                |
| `03-aro-cebolla.png`          | Aro de cebolla rebozado en cerveza, un poco desde arriba para ver el agujero |
| `04-salsa-bbq.png`            | La capa de salsa BBQ bourbon, brillante                               |
| `05-queso.png`                | Loncha de Monterey Jack fundiéndose, con goterones colgando           |
| `06-carne.png`                | Carne smash recién hecha, con los bordes crujientes                   |
| `07-carne.png`                | La segunda carne (puede ser otra toma de la misma o una copia de la 06) |
| `08-pan-base.png`             | Base del pan, con la miga hacia arriba                                |

Las salsas son lo más difícil de fotografiar solas. Un truco es extenderlas sobre
una lámina de acetato transparente o sobre el propio pan y recortarlas después.

## Cómo hacerlas (sesión real, recomendado)

- **Trípode fijo** y el **mismo encuadre y la misma distancia** en todas las
  tomas. Es lo más importante: así cada ingrediente sale a su tamaño real y
  encajan al apilarlos.
- **Misma luz en todas**: una luz principal suave **arriba a la izquierda**
  (ventana o softbox) y un rebote blanco a la derecha. La web ilumina el
  despiece desde arriba a la izquierda, y la luz de las fotos debe coincidir.
- **Fondo liso** que contraste con el ingrediente (gris medio o blanco), para
  quitarlo después con facilidad.
- Resolución alta: al menos **2000 px de ancho**.
- Comida recién hecha: queso fundiéndose, salsa brillante, carne humeante.
  Hay que hacer cada toma en el momento.

## Quitar el fondo

Cada foto tiene que quedar en **PNG con fondo transparente**. Sirve cualquiera de
estas opciones: Photoshop ("Quitar fondo"), Photoroom, remove.bg o "Copiar
sujeto" en un iPhone o Mac. Repasa bien los bordes de la salsa y del queso.

## Meterlas en la web

1. Copia los PNG en la carpeta `fotos-despiece/` del proyecto, con los nombres
   de la tabla.
2. Ejecuta `bun run fotos`. El script recorta el aire de arriba y abajo,
   reduce las fotos a 1280 px y las guarda en WebP en `src/assets/burger/`.
   También avisa si falta alguna o si alguna no tiene transparencia.
3. `bun run build`. Las capas con foto la usan y las demás siguen con su dibujo.

Si alguna foto se hizo con otro encuadre, procesa con
`bun run fotos -- --recortar-lados` y ajusta su ancho con `photoScale` en la
capa correspondiente de `src/data/menu.ts` (por ejemplo, `photoScale: 0.9`).

## Alternativa provisional: generarlas con IA

Mientras no haya sesión de fotos, se pueden generar con una herramienta de
imagen (ChatGPT, Gemini, Midjourney, Firefly…). **Ojo**: no serán la Rosa real.
Úsalas solo como provisionales y sustitúyelas por fotos del local antes de dar la
web por definitiva, porque los clientes esperan que la burger sea como la foto.

Pide cada capa por separado con el mismo bloque de estilo, quita el fondo si la
herramienta no lo hace y procesa con `--recortar-lados`.

Bloque de estilo común (añadir al final de cada prompt):

> Hyperrealistic food photography, isolated single ingredient, perfect side
> view at eye level, centered, soft key light from the upper left, subtle rim
> light, shallow depth of field, high detail, appetizing, plain light grey
> background, no plate, no hands, no text, 4k.

Prompts por capa:

1. `01-pan-arriba`: *Top half of a glossy golden-brown potato bun, no sesame
   seeds, the pale soft crumb of the cut side slightly visible at the bottom.*
2. `02-salsa-ajo-parmesano`: *A thin wavy layer of creamy white garlic and
   parmesan sauce with small parmesan flecks, a few glossy drips hanging down.*
3. `03-aro-cebolla`: *One large beer-battered onion ring, crunchy golden
   batter, seen slightly from above so the hole is visible.*
4. `04-salsa-bbq`: *A thin glossy layer of dark red bourbon BBQ sauce with
   a few drips hanging down.*
5. `05-queso`: *A slice of melted Monterey Jack cheese draped flat, pale
   ivory-yellow, glossy, with rounded drips hanging from the edges.*
6. `06-carne` / `07-carne`: *A thin smashed beef burger patty, deeply
   caramelized crust with lacy crispy edges, juicy, glistening.*
7. `08-pan-base`: *Bottom half of a golden potato bun, cut side facing up
   showing the soft pale crumb, toasted edge.*

## Más fotos que mejorarían la web

- **Foto de portada**: la Rosa entera, en vertical y horizontal.
- **Producto**: una foto de cada burger de la carta, con la misma luz.
- **Local**: barra, avisador, plancha en marcha, rótulo de la fachada.
- **`og:image`** para compartir en redes: 1200×630 px.
