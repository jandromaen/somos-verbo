/**
 * Comprueba que cada versículo del catálogo tiene su archivo de contenido
 * completo y válido en contenido/versiculos/{slug}.md.
 *
 * Uso:
 *   npm run check:contenido                      valida los 1.000 (fallan los que falten)
 *   npx tsx scripts/check-contenido.ts --existing   valida solo los archivos ya escritos
 *   npx tsx scripts/check-contenido.ts a,b,c        valida esos slugs
 * En todos los casos comprueba que no se repiten campos clave frente a los demás archivos.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { allVerses } from '../src/config/catalogo';
import { countWords, verseFrontmatterSchema, type VerseFrontmatter } from '../src/lib/content/verse-schema';

const dir = 'contenido/versiculos';
const arg = process.argv[2];
const existingOnly = arg === '--existing';
const only = arg && !existingOnly ? new Set(arg.split(',')) : undefined;

// Campos que no pueden repetirse entre versículos (evita canibalización en Google).
const uniqueFields = ['product_name', 'meta_title', 'h1', 'meta_description'] as const;

const errors: string[] = [];
const seen = new Map<string, string>();
const register = (slug: string, fm: VerseFrontmatter) => {
  for (const field of uniqueFields) {
    const key = `${field}:${fm[field].toLowerCase()}`;
    const other = seen.get(key);
    if (other && other !== slug) errors.push(`${slug}: ${field} repetido con ${other}`);
    else seen.set(key, slug);
  }
};

const read = (slug: string) => {
  const file = `${dir}/${slug}.md`;
  return existsSync(file) ? matter(readFileSync(file, 'utf8')) : null;
};

// 1. Registra los campos únicos de los archivos que no se validan en esta pasada.
if (only) {
  for (const verse of allVerses) {
    if (only.has(verse.slug)) continue;
    const parsed = read(verse.slug);
    const fm = parsed && verseFrontmatterSchema.safeParse(parsed.data);
    if (fm?.success) for (const field of uniqueFields) seen.set(`${field}:${fm.data[field].toLowerCase()}`, verse.slug);
  }
}

// 2. Valida los seleccionados.
let ok = 0;
allVerses.forEach((verse, index) => {
  if (only && !only.has(verse.slug)) return;
  const parsed = read(verse.slug);
  if (!parsed) {
    if (!existingOnly) errors.push(`${verse.slug}: falta el archivo`);
    return;
  }
  const result = verseFrontmatterSchema.safeParse(parsed.data);
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
  if (!parsed.content.includes(`## Qué significa ${verse.reference}`))
    errors.push(`${verse.slug}: falta el encabezado «## Qué significa ${verse.reference}»`);
  const words = countWords(parsed.content);
  if (words < 200 || words > 450) errors.push(`${verse.slug}: el significado tiene ${words} palabras (200–450)`);
  register(verse.slug, fm);
  ok++;
});

// 3. Archivos que sobran.
if (!only) {
  const known = new Set(allVerses.map((v) => `${v.slug}.md`));
  for (const f of existsSync(dir) ? readdirSync(dir) : []) if (!known.has(f)) errors.push(`${f}: no está en el catálogo`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n✖ ${errors.length} problemas`);
  process.exit(1);
}
console.log(`✔ ${ok} versículos válidos`);
