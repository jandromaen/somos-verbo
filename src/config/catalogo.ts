/**
 * Estructura del catálogo tal y como la fija CLAUDE.md (sección 10.2).
 *
 * Sirve para la navegación y las rutas estáticas mientras no exista la base
 * de datos. En la fase 2 los textos completos se cargan en Supabase desde
 * `contenido/versiculos.md`.
 */

export type CollectionSlug = 'fe-y-valor' | 'esperanza' | 'amor' | 'confianza';

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
];

export const verses: Verse[] = [
  { slug: 'filipenses-4-13', reference: 'Filipenses 4:13', collection: 'fe-y-valor', popularPhrase: 'Todo lo puedo en Cristo' },
  { slug: 'josue-1-9', reference: 'Josué 1:9', collection: 'fe-y-valor', popularPhrase: 'Sé fuerte y valiente' },
  { slug: 'isaias-41-10', reference: 'Isaías 41:10', collection: 'fe-y-valor', popularPhrase: 'No temas, yo estoy contigo' },
  { slug: 'juan-16-33', reference: 'Juan 16:33', collection: 'fe-y-valor', popularPhrase: 'Tened valor, yo he vencido al mundo' },
  { slug: 'jeremias-29-11', reference: 'Jeremías 29:11', collection: 'esperanza', popularPhrase: 'Yo sé los planes que tengo para ti' },
  { slug: 'romanos-8-28', reference: 'Romanos 8:28', collection: 'esperanza', popularPhrase: 'Todo ayuda a bien' },
  { slug: 'salmo-91', reference: 'Salmo 91', collection: 'esperanza', popularPhrase: 'Al abrigo del Altísimo' },
  { slug: 'juan-3-16', reference: 'Juan 3:16', collection: 'amor', popularPhrase: 'De tal manera amó Dios al mundo' },
  { slug: '1-corintios-13', reference: '1 Corintios 13', collection: 'amor', popularPhrase: 'El amor es paciente' },
  { slug: 'salmo-23', reference: 'Salmo 23', collection: 'confianza', popularPhrase: 'El Señor es mi pastor' },
  { slug: 'proverbios-3-5', reference: 'Proverbios 3:5', collection: 'confianza', popularPhrase: 'Confía en el Señor de todo corazón' },
  { slug: 'mateo-11-28', reference: 'Mateo 11:28', collection: 'confianza', popularPhrase: 'Venid a mí' },
];

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
