/**
 * Genera supabase/seed/seed.sql a partir de las fuentes del repositorio.
 *   npm run db:seed:generate          escribe el archivo
 *   npm run db:seed:generate -- --check  falla si el archivo no está al día (CI)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tienda } from '../src/config/tienda';
import { buildSeed } from '../src/lib/catalog/seed';

const target = 'supabase/seed/seed.sql';
const { sql, stats } = buildSeed(tienda);

if (process.argv.includes('--check')) {
  const current = existsSync(target) ? readFileSync(target, 'utf8') : '';
  if (current !== sql) {
    console.error(`✖ ${target} no está al día. Ejecuta: npm run db:seed:generate`);
    process.exit(1);
  }
  console.log(`✔ ${target} al día`);
} else {
  mkdirSync('supabase/seed', { recursive: true });
  writeFileSync(target, sql);
  console.log(
    `✔ ${target}: ${stats.collections} colecciones, ${stats.verses} versículos, ${stats.products} productos, ${stats.variants} variantes`,
  );
}
