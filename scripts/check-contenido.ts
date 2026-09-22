/**
 * Comprueba que cada versículo del catálogo tiene su archivo de contenido
 * completo y válido en contenido/versiculos/{slug}.md.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { verses } from '../src/config/catalogo';
import { countWords, verseFrontmatterSchema } from '../src/lib/content/verse-schema';

const dir = 'contenido/versiculos';
const only = process.argv[2]?.split(',');
const errors: string[] = [];
let ok = 0;

verses.forEach((verse, index) => {
  if (only && !only.includes(verse.slug)) return;
  const file = `${dir}/${verse.slug}.md`;
  if (!existsSync(file)) {
    errors.push(`${verse.slug}: falta el archivo`);
    return;
  }
  const { data, content } = matter(readFileSync(file, 'utf8'));
  const result = verseFrontmatterSchema.safeParse(data);
  if (!result.success) {
    for (const issue of result.error.issues) errors.push(`${verse.slug}: ${issue.path.join('.')} ${issue.message}`);
    return;
  }
  const fm = result.data;
  if (fm.slug !== verse.slug) errors.push(`${verse.slug}: slug distinto (${fm.slug})`);
  if (fm.reference !== verse.reference) errors.push(`${verse.slug}: reference distinta (${fm.reference})`);
  if (fm.collection !== verse.collection) errors.push(`${verse.slug}: collection distinta (${fm.collection})`);
  if (fm.popular_phrase !== verse.popularPhrase) errors.push(`${verse.slug}: popular_phrase distinta`);
  if (fm.sort !== index + 1) errors.push(`${verse.slug}: sort debería ser ${index + 1}`);
  if (!content.includes(`## Qué significa ${verse.reference}`))
    errors.push(`${verse.slug}: falta el encabezado «## Qué significa ${verse.reference}»`);
  const words = countWords(content);
  if (words < 200 || words > 450) errors.push(`${verse.slug}: el significado tiene ${words} palabras (200–450)`);
  ok++;
});

if (!only) {
  const known = new Set(verses.map((v) => `${v.slug}.md`));
  for (const f of existsSync(dir) ? readdirSync(dir) : []) if (!known.has(f)) errors.push(`${f}: no está en el catálogo`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n✖ ${errors.length} problemas`);
  process.exit(1);
}
console.log(`✔ ${ok} versículos válidos`);
