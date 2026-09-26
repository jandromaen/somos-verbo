import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { verseFrontmatterSchema, type VerseFrontmatter } from './verse-schema';

export type VerseContent = VerseFrontmatter & { meaningMd: string };

/**
 * Textos de la landing de un versículo desde contenido/versiculos/{slug}.md.
 * Se lee al generar las páginas estáticas en el build, nunca en el Worker.
 */
export function getVerseContent(slug: string): VerseContent {
  const file = matter(readFileSync(join(process.cwd(), 'contenido/versiculos', `${slug}.md`), 'utf8'));
  return { ...verseFrontmatterSchema.parse(file.data), meaningMd: file.content.trim() };
}
