import { openingHours, TIMEZONE } from '../data/site';

/** Convierte "HH:MM" a minutos desde medianoche */
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/**
 * Devuelve el día de la semana y los minutos actuales en la zona horaria del local,
 * independientemente de dónde esté el visitante.
 */
const nowInLocalTime = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));

  return { weekday, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

/** ¿Está abierto el local en este momento? */
export function isOpen(date = new Date()): boolean {
  const { weekday, minutes } = nowInLocalTime(date);

  return openingHours.some(
    ({ days, shifts }) =>
      days.includes(weekday) &&
      shifts.some(([open, close]) => minutes >= toMinutes(open) && minutes < toMinutes(close)),
  );
}

/** Texto legible de una franja: "13:00 – 16:00" */
export const formatShift = ([open, close]: readonly [string, string]) => `${open} – ${close}`;
