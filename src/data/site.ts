/**
 * Datos del negocio: única fuente de verdad.
 * Cabecera, pie, sección "Visítanos" y datos estructurados (SEO) leen de aquí,
 * así que si cambia el teléfono o el horario solo hay que tocar este archivo.
 */

export const site = {
  name: 'Buenas Burgers',
  tagline: 'Smash burgers en el corazón de León',
  // Año de apertura: sale en el cartel del local ("Smash since 2021")
  since: 2021,
  description:
    'Buenas Burgers: smash burgers de vaca madurada en León. Pan de patata, salsas caseras y opción sin gluten. Calle Misericordia 10.',

  contact: {
    phone: '641 07 94 90',
    // Formato E.164 para enlaces tel: y datos estructurados
    phoneHref: '+34641079490',
    email: 'buenasmash@gmail.com',
  },

  address: {
    street: 'Calle de la Misericordia, 10',
    postalCode: '24003',
    city: 'León',
    region: 'Castilla y León',
    country: 'ES',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Buenas+Burgers+Calle+Misericordia+10+León',
  },

  // TODO: completar cuando tengamos las cuentas oficiales.
  social: {
    instagram: '',
  },

  // Plataformas de pedido a domicilio. El logo de cada una se elige por `id`
  // en DeliveryLinks.astro (src/assets/delivery/).
  delivery: [
    { id: 'glovo', name: 'Glovo', url: 'https://glovoapp.com/es/es/leon/stores/buenas-burgers-leon' },
    { id: 'justeat', name: 'Just Eat', url: 'https://www.just-eat.es/restaurants-buenas-burgers-leon-24003/menu' },
  ],
} as const;

/**
 * Horario. Fuente: Diario de León (enero 2026) → CONFIRMAR CON EL LOCAL.
 * Los días siguen la convención de JS: 0 = domingo … 6 = sábado.
 * Cada franja es [apertura, cierre] en formato "HH:MM" (hora de Madrid).
 */
export type Shift = readonly [open: string, close: string];

export const openingHours: { days: readonly number[]; label: string; shifts: readonly Shift[] }[] = [
  {
    days: [0, 1, 2, 3, 4, 5, 6],
    label: 'Lunes a domingo',
    shifts: [
      ['13:00', '16:00'],
      ['20:00', '23:00'],
    ],
  },
];

/** Zona horaria del local, para calcular "abierto ahora" sea cual sea la del visitante. */
export const TIMEZONE = 'Europe/Madrid';
