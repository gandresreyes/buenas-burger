/**
 * Carta de Buenas Burgers.
 *
 * Fuente: carta de Just Eat (noviembre 2026). Los precios son los de Just Eat:
 * CONFIRMAR con el local que coinciden con los de barra.
 *
 * "Rosa La Maravillosa 2.0" (featuredBurger) es la versión que presentaron al
 * VI Campeonato de España de Hamburguesas (2026); solo se usa en la sección de
 * despiece. La "Rosa la Maravillosa" de la carta es la receta habitual.
 */

/** Color de acento de cada plato: la sombra de su pegatina en la portada */
export type Accent = 'mustard' | 'ketchup' | 'pickle';

/**
 * Una capa de la burger para la animación de despiece.
 * - `kind` decide qué ilustración se usa (ver BurgerLayerArt.astro).
 * - `photo` es el nombre de su foto en src/assets/burger/ (sin extensión). Si
 *   la foto existe, sustituye a la ilustración; si no, se ve la ilustración.
 *   Las fotos se preparan con `bun run fotos` (ver docs/fotos-despiece.md).
 * - `photoScale` ajusta el ancho de la foto respecto a la burger (1 = entero),
 *   por si alguna se ha hecho con otro encuadre.
 */
export interface BurgerLayer {
  kind: 'bun-top' | 'sauce-garlic' | 'sauce-bbq' | 'onion-ring' | 'cheese' | 'patty' | 'bun-bottom';
  label: string;
  photo: string;
  photoScale?: number;
}

export interface MenuItem {
  /** Identificador estable, útil como key y para anclas */
  id: string;
  name: string;
  /** Frase de presentación, con el tono de la carta */
  description?: string;
  /** Ingredientes en orden de montaje, de arriba abajo */
  ingredients?: string[];
  /** Precio en euros. Si se omite, la tarjeta invita a preguntar en barra */
  price?: number;
  /** Etiquetas cortas: "Picante", "Campeonato de España 2026"… */
  tags?: string[];
  /** Color de acento de la tarjeta */
  accent: Accent;
  /** Capas de arriba abajo para la animación de despiece (solo la destacada) */
  layers?: BurgerLayer[];
}

export interface MenuCategory {
  /** Se usa como id de la sección en /carta: #hamburguesas, #entrantes… */
  id: string;
  title: string;
  /** Antetítulo (etiqueta tipo pegatina) */
  eyebrow: string;
  /** Aviso que aplica a toda la categoría */
  note?: string;
  /** Lista sencilla nombre-precio en lugar de tarjetas (bebidas) */
  compact?: boolean;
  items: MenuItem[];
}

/** Burger bandera, destacada en su propia sección */
export const featuredBurger: MenuItem = {
  id: 'rosa-la-maravillosa-2',
  name: 'Rosa La Maravillosa 2.0',
  ingredients: [
    'Pan de patata',
    'Salsa de ajo y parmesano deluxe',
    'Salsa BBQ bourbon',
    'Queso Monterrey Jack',
    'Aro de cebolla rebozado en cerveza',
    '2 carnes smash de vaca madurada',
  ],
  tags: ['La más vendida', 'Campeonato de España 2026'],
  accent: 'ketchup',
  // Orden de montaje visual, de arriba abajo. TODO: confirmar con el local.
  layers: [
    { kind: 'bun-top', label: 'Pan de patata', photo: '01-pan-arriba' },
    { kind: 'sauce-garlic', label: 'Salsa de ajo y parmesano deluxe', photo: '02-salsa-ajo-parmesano' },
    { kind: 'onion-ring', label: 'Aro de cebolla rebozado en cerveza', photo: '03-aro-cebolla', photoScale: 0.93 },
    { kind: 'sauce-bbq', label: 'Salsa BBQ bourbon', photo: '04-salsa-bbq' },
    { kind: 'cheese', label: 'Queso Monterrey Jack', photo: '05-queso' },
    { kind: 'patty', label: 'Smash de vaca madurada', photo: '06-carne' },
    { kind: 'patty', label: 'Y otra smash: siempre doble', photo: '07-carne' },
    { kind: 'bun-bottom', label: 'Base de pan de patata', photo: '08-pan-base' },
  ],
};

const burgers: MenuItem[] = [
  {
    id: 'big-renata',
    name: 'BigRenata',
    description: '¿Ya conoces a Renata? Esta versión te va a encantar.',
    ingredients: [
      'Doble carne de ternera smash',
      'Doble beicon',
      'Doble queso americano',
      'Mix de salsas (ajo y parmesano + salsa smash)',
      'Pepinillos',
      'Cebolla caramelizada',
    ],
    price: 14.5,
    accent: 'ketchup',
  },
  {
    id: 'soul-burger',
    name: 'SoulBurger',
    ingredients: [
      'Pan brioche',
      'Salsa smokesmash',
      'Doble carne de ternera',
      'Queso americano',
      'Caramelizado de cebolla',
      'Tocineta al whisky',
    ],
    price: 14.5,
    accent: 'mustard',
  },
  {
    id: 'rosa-la-maravillosa',
    name: 'Rosa la Maravillosa',
    description: '¡Una opción que te enamora!',
    ingredients: [
      'Salsa BBQ',
      'Doble carne de ternera smash',
      'Doble queso cheddar',
      'Cebolla crujiente',
      'Pepinillos',
      'Doble beicon',
      'Nuestra salsa de ajo y parmesano',
    ],
    price: 14.5,
    accent: 'ketchup',
  },
  {
    id: 'doble-beiconeitor',
    name: 'Doble Beiconeitor',
    ingredients: [
      'Doble carne de ternera',
      'Doble queso cheddar',
      'Doble beicon',
      'Pepinillos',
      'Cebolla',
      'Nuestra salsa smash',
    ],
    price: 14.5,
    accent: 'pickle',
  },
  {
    id: 'cheesy-james',
    name: 'Cheesy James',
    description: 'Esta chica te robará el aliento. ¡Fliparás!',
    ingredients: [
      'Doble queso americano',
      'Cheddar',
      'Doble beicon',
      'Doble carne de ternera smash',
      'Cebolla',
      'Pepinillo',
    ],
    price: 14.5,
    accent: 'mustard',
  },
  {
    id: 'original-smash',
    name: 'Original Smash',
    ingredients: ['Salsa de la casa', 'Carne de ternera smash', 'Cebolla', 'Pepinillos', 'Queso cheddar'],
    price: 8.9,
    accent: 'pickle',
  },
  {
    // En Just Eat aparece como "SweerRenata": lo damos por errata de "Sweet". TODO: confirmar.
    id: 'sweet-renata',
    name: 'SweetRenata',
    description: '¡Te enamorarás de Renata!',
    ingredients: ['Salsa de la casa', 'Carne de ternera', 'Queso cheddar', 'Pepinillos', 'Cebolla caramelizada'],
    price: 9.9,
    accent: 'ketchup',
  },
  {
    id: 'beiconeitor',
    name: 'Beiconeitor',
    description: '¿Te gusta el beicon? ¡Esta es tu opción!',
    ingredients: ['Salsa de la casa', 'Carne de ternera smash', 'Cebolla', 'Queso cheddar', 'Doble beicon'],
    price: 9.9,
    accent: 'mustard',
  },
  {
    id: 'triple-smash',
    name: 'Triple Smash',
    description: 'No hace falta que os la describamos: triple sabor.',
    ingredients: [
      'Salsa de la casa',
      'Triple carne de ternera',
      'Beicon',
      'Cebolla',
      'Pepinillos',
      'Queso cheddar',
    ],
    price: 14.5,
    accent: 'pickle',
  },
  {
    id: 'ardiente-elisa',
    name: 'Ardiente Elisa',
    description: '¿Algo rico y picante? ¡Elisa te va a encantar!',
    ingredients: ['Salsa hotmayo', 'Lechuga', 'Tomate', 'Pollo crispy', 'Beicon'],
    price: 11.5,
    tags: ['Picante'],
    accent: 'ketchup',
  },
  {
    id: 'beicon-crispy',
    name: 'Beicon Crispy',
    description: 'Soy Elisa sin picante, pero con mucho sabor.',
    ingredients: ['Salsa de la casa', 'Lechuga', 'Pollo crispy', 'Beicon'],
    price: 11.5,
    accent: 'mustard',
  },
  {
    id: 'classic-smash',
    name: 'ClassicSmash',
    description: 'Lo clásico nunca muere. ¿Brutal, no?',
    ingredients: [
      'Pan brioche',
      'Salsa smash',
      'Salsa de ajo y parmesano',
      'Lechuga',
      'Tomate',
      'Cebolla',
      'Queso americano',
      'Nuestra carne smash',
    ],
    price: 9.9,
    accent: 'pickle',
  },
];

export const menu: MenuCategory[] = [
  {
    id: 'hamburguesas',
    title: 'Hamburguesas',
    eyebrow: 'Recién aplastadas',
    note: 'Todas vienen con patatas fritas.',
    items: burgers,
  },
  {
    id: 'entrantes',
    title: 'Entrantes',
    eyebrow: 'Para abrir boca',
    items: [
      {
        id: 'tenders',
        name: 'Tenders para 1',
        ingredients: ['5 tiras de pollo crujiente', 'Patatas fritas', 'Salsa BBQ', 'Nuestra salsa de ajo y parmesano'],
        price: 10.5,
        accent: 'mustard',
      },
      {
        // Sin precio: en Just Eat sale como "No disponible"
        id: 'beicon-cheddar',
        name: 'Beicon Cheddar',
        description: '¡Fliparás!',
        ingredients: ['Patatas fritas', 'Baño de queso cheddar', 'Lluvia de beicon'],
        accent: 'ketchup',
      },
      {
        // Sin precio: en Just Eat sale como "No disponible"
        id: 'tequenos',
        name: 'Tequeños',
        ingredients: ['6 barritas de queso envueltas en masa de trigo', 'Ketchup', 'Nuestra salsa de ajo y parmesano'],
        accent: 'pickle',
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    eyebrow: 'Para acompañar',
    compact: true,
    items: [
      { id: 'pepsi', name: 'Pepsi Original', price: 2.5, accent: 'pickle' },
      { id: 'pepsi-max', name: 'Pepsi Max', price: 2.5, accent: 'pickle' },
      { id: 'agua', name: 'Agua mineral', price: 2, accent: 'pickle' },
    ],
  },
];

/** Selección de burgers que se adelanta en la portada (sección #carta) */
const homePickIds = ['rosa-la-maravillosa', 'big-renata', 'cheesy-james', 'ardiente-elisa'];
export const homePicks = homePickIds.map((id) => burgers.find((b) => b.id === id)!);

/** Formatea precios a la española: 12,50 € */
export const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
