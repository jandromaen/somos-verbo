/**
 * Slugs y SKU del catálogo (CLAUDE.md, secciones 6 y 9.3).
 *
 * Producto: `{prenda}-{nombre}-{versiculo}` → sudadera-todo-lo-puedo-filipenses-4-13
 * SKU: `SV-{LIBRO}{capítulo}-{versículo}-{PRENDA}-{COLOR}-{TALLA}` → SV-FIL4-13-SUD-NEG-M
 * El guion entre capítulo y versículo evita choques como Juan 1:14 / Juan 11:4.
 */

export type Garment = 'sudadera' | 'camiseta';

export const garmentCode: Record<Garment, string> = { sudadera: 'SUD', camiseta: 'CAM' };

/** Abreviatura de tres letras por libro (sin tildes). */
const bookCodes: Record<string, string> = {
  genesis: 'GEN', exodo: 'EXO', levitico: 'LEV', numeros: 'NUM', deuteronomio: 'DEU',
  josue: 'JOS', jueces: 'JUE', rut: 'RUT', '1-samuel': '1SA', '2-samuel': '2SA',
  '1-reyes': '1RE', '2-reyes': '2RE', '1-cronicas': '1CR', '2-cronicas': '2CR',
  esdras: 'ESD', nehemias: 'NEH', ester: 'EST', job: 'JOB', salmo: 'SAL',
  proverbios: 'PRO', eclesiastes: 'ECL', cantares: 'CAN', isaias: 'ISA', jeremias: 'JER',
  lamentaciones: 'LAM', ezequiel: 'EZE', daniel: 'DAN', oseas: 'OSE', joel: 'JOE',
  amos: 'AMO', abdias: 'ABD', jonas: 'JON', miqueas: 'MIQ', nahum: 'NAH', habacuc: 'HAB',
  sofonias: 'SOF', hageo: 'HAG', zacarias: 'ZAC', malaquias: 'MAL', mateo: 'MAT',
  marcos: 'MAR', lucas: 'LUC', juan: 'JUA', hechos: 'HCH', romanos: 'ROM',
  '1-corintios': '1CO', '2-corintios': '2CO', galatas: 'GAL', efesios: 'EFE',
  filipenses: 'FIL', colosenses: 'COL', '1-tesalonicenses': '1TE', '2-tesalonicenses': '2TE',
  '1-timoteo': '1TI', '2-timoteo': '2TI', tito: 'TIT', filemon: 'FLM', hebreos: 'HEB',
  santiago: 'SAN', '1-pedro': '1PE', '2-pedro': '2PE', '1-juan': '1JN', '2-juan': '2JN',
  '3-juan': '3JN', judas: 'JUD', apocalipsis: 'APO',
};

/** Minúsculas, sin tildes, «ñ» → «n», palabras separadas por guiones. */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** «filipenses-4-13» → { book: 'filipenses', numbers: ['4', '13'] } */
export function splitVerseSlug(verseSlug: string): { book: string; numbers: string[] } {
  const match = verseSlug.match(/^((?:[123]-)?[a-z]+)((?:-\d+)+)$/);
  if (!match) throw new Error(`Slug de versículo no reconocido: ${verseSlug}`);
  return { book: match[1], numbers: match[2].slice(1).split('-') };
}

/** Código del versículo dentro del SKU: filipenses-4-13 → FIL4-13; salmo-23 → SAL23. */
export function verseCode(verseSlug: string): string {
  const { book, numbers } = splitVerseSlug(verseSlug);
  const code = bookCodes[book];
  if (!code) throw new Error(`Libro sin abreviatura: ${book}`);
  return `${code}${numbers.join('-')}`;
}

export function productSlug(garment: Garment, productName: string, verseSlug: string): string {
  return `${garment}-${slugify(productName)}-${verseSlug}`;
}

export function productName(garment: Garment, name: string): string {
  return `${garment === 'sudadera' ? 'Sudadera' : 'Camiseta'} «${name}»`;
}

/** Código de color: tres primeras letras sin tildes (negro → NEG). */
export function colorCode(colorSlug: string): string {
  return slugify(colorSlug).replace(/-/g, '').slice(0, 3).toUpperCase();
}

export function sku(verseSlug: string, garment: Garment, colorSlug: string, size: string): string {
  return ['SV', verseCode(verseSlug), garmentCode[garment], colorCode(colorSlug), size].join('-');
}
