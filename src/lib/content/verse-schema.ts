import { z } from 'zod';

const collectionSlugs = [
  'fe-y-valor',
  'esperanza',
  'amor',
  'confianza',
  'sabiduria',
  'alabanza',
  'identidad',
  'gracia',
] as const;

const faq = z.object({
  q: z.string().min(10).endsWith('?'),
  a: z.string().min(80),
});

/** Frontmatter de `contenido/versiculos/{slug}.md` (fuente del seed de la fase 2). */
export const verseFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  reference: z.string().min(3),
  collection: z.enum(collectionSlugs),
  sort: z.number().int().positive(),
  popular_phrase: z.string().min(3),
  /** Versículos citados en `text_rvr`, p. ej. «Salmo 23:1-3». */
  text_reference: z.string().min(3),
  /** Texto literal de la Reina-Valera 1960. */
  text_rvr: z.string().min(10),
  h1: z.string().min(10),
  intro: z.string().min(40).max(320),
  numbering_note: z.string().nullable(),
  /** Sin « | Somos Verbo»: la plantilla lo añade (máx. 60 caracteres en total). */
  meta_title: z.string().min(10).max(46),
  meta_description: z.string().min(80).max(155),
  /** Nombre corto del diseño: «Todo lo puedo» → Sudadera «Todo lo puedo». */
  product_name: z.string().min(2).max(40),
  faqs: z.array(faq).min(3).max(5),
});

export type VerseFrontmatter = z.infer<typeof verseFrontmatterSchema>;

/** El cuerpo (significado) debe tener entre 200 y 450 palabras. */
export function countWords(markdown: string): number {
  return markdown
    .replace(/[#>*_`[\]()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}
