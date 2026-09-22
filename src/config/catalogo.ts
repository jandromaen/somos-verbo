/**
 * Estructura del catálogo (CLAUDE.md, sección 10.2).
 *
 * Sirve para la navegación y las rutas estáticas mientras no exista la base
 * de datos. En la fase 2 los textos completos se cargan en Supabase desde
 * `contenido/versiculos/*.md`.
 */

import { allVerses } from './versiculos';

export { allVerses };

export type CollectionSlug =
  | 'fe-y-valor'
  | 'esperanza'
  | 'amor'
  | 'confianza'
  | 'sabiduria'
  | 'alabanza'
  | 'identidad'
  | 'gracia';

export type Collection = {
  slug: CollectionSlug;
  name: string;
  /** Para títulos como «Ropa cristiana de {tema}». */
  theme: string;
};

export type Verse = {
  slug: string;
  reference: string;
  collection: CollectionSlug;
  popularPhrase: string;
  /** Oleada de publicación: 1 = lanzamiento. */
  wave: number;
};

export type Occasion = {
  slug: string;
  name: string;
  h1: string;
};

export const collections: Collection[] = [
  { slug: 'fe-y-valor', name: 'Fe y valor', theme: 'fe y valor' },
  { slug: 'esperanza', name: 'Esperanza', theme: 'esperanza' },
  { slug: 'amor', name: 'Amor', theme: 'amor' },
  { slug: 'confianza', name: 'Confianza', theme: 'confianza' },
  { slug: 'sabiduria', name: 'Sabiduría', theme: 'sabiduría' },
  { slug: 'alabanza', name: 'Alabanza y gratitud', theme: 'alabanza y gratitud' },
  { slug: 'identidad', name: 'Identidad en Cristo', theme: 'identidad en Cristo' },
  { slug: 'gracia', name: 'Gracia y salvación', theme: 'gracia y salvación' },
];

/**
 * Oleada publicada. Solo los versículos con `wave <= PUBLISHED_WAVE` generan
 * landing, aparecen en listados y en el sitemap; el resto no existe para Google.
 * Para publicar la siguiente oleada basta con subir este número.
 */
export const PUBLISHED_WAVE = 1;

/** Versículos publicados, en orden de prioridad. */
export const verses: Verse[] = allVerses.filter((verse) => verse.wave <= PUBLISHED_WAVE);

export const occasions: Occasion[] = [
  { slug: 'confirmacion', name: 'Confirmación', h1: 'Regalos de confirmación: sudaderas y camisetas cristianas' },
  { slug: 'bautizo', name: 'Bautizo', h1: 'Regalos de bautizo: sudaderas y camisetas cristianas' },
  { slug: 'catequistas', name: 'Catequistas', h1: 'Regalos para catequistas: sudaderas y camisetas cristianas' },
  { slug: 'sacerdotes-y-pastores', name: 'Sacerdotes y pastores', h1: 'Regalos para sacerdotes y pastores: sudaderas y camisetas cristianas' },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getVerse(slug: string) {
  return verses.find((v) => v.slug === slug);
}

export function getOccasion(slug: string) {
  return occasions.find((o) => o.slug === slug);
}

/** Los más buscados: los que se destacan en la home, categorías y 404. */
export const featuredVerses = verses.slice(0, 12);
