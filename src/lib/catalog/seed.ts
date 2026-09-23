/**
 * Construye el seed SQL de Supabase a partir de las fuentes del repositorio:
 * src/config/catalogo.ts, src/config/versiculos.ts, src/config/tienda.ts y
 * contenido/versiculos/*.md. El resultado es idempotente: se puede ejecutar
 * tantas veces como haga falta sin duplicar datos ni pisar el stock real o
 * los productos que Jandro haya activado.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { allVerses, collections, PUBLISHED_WAVE } from '@/config/catalogo';
import type { Color, Tienda } from '@/config/tienda';
import { verseFrontmatterSchema } from '@/lib/content/verse-schema';
import { type Garment, productName, productSlug, sku } from './codes';

/** Mientras el proveedor no confirme colores, se usa uno de ejemplo, marcado como tal. */
export const EXAMPLE_COLOR: Color = { slug: 'ejemplo', nombre: 'Color de ejemplo', hex: '#16130F' };
/** Stock de prueba para las variantes de ejemplo (fase 2). */
export const TEST_STOCK = 10;
/** Productos destacados en la home: las sudaderas de los 4 primeros versículos. */
export const FEATURED_COUNT = 4;

const garments: Garment[] = ['sudadera', 'camiseta'];

const lit = (value: string | number | boolean | null | undefined): string => {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return `'${value.replace(/'/g, "''")}'`;
};
const json = (value: unknown) => `${lit(JSON.stringify(value))}::jsonb`;

export type SeedStats = { collections: number; verses: number; products: number; variants: number };

export function buildSeed(tienda: Tienda, contentDir = 'contenido/versiculos'): { sql: string; stats: SeedStats } {
  const colors = tienda.producto.colores.length > 0 ? tienda.producto.colores : [EXAMPLE_COLOR];
  const usingExample = tienda.producto.colores.length === 0;
  const price: Record<Garment, number | null> = {
    sudadera: tienda.precios.sudaderaCentimos,
    camiseta: tienda.precios.camisetaCentimos,
  };

  const out: string[] = [
    '-- GENERADO por `npm run db:seed:generate`. No lo edites a mano.',
    '-- Fuentes: src/config/{catalogo,versiculos,tienda}.ts y contenido/versiculos/*.md',
    'begin;',
    '',
    '-- Colecciones',
  ];

  collections.forEach((c, i) => {
    out.push(
      `insert into public.collections (slug, name, sort, meta_title) values (${lit(c.slug)}, ${lit(c.name)}, ${i + 1}, ${lit(`Ropa cristiana de ${c.theme}`)})`,
      `  on conflict (slug) do update set name = excluded.name, sort = excluded.sort, meta_title = excluded.meta_title;`,
    );
  });

  out.push('', '-- Versículos (activos solo los de oleadas publicadas)');
  const productRows: string[] = [];
  const variantRows: string[] = [];

  allVerses.forEach((verse, index) => {
    const file = matter(readFileSync(join(contentDir, `${verse.slug}.md`), 'utf8'));
    const fm = verseFrontmatterSchema.parse(file.data);
    const meaning = file.content.replace(/^\s*## .*\n/, '').trim();
    const active = verse.wave <= PUBLISHED_WAVE;

    out.push(
      `insert into public.verses (slug, reference, text_reference, text_rvr, popular_phrase, h1, intro, meaning_md, numbering_note, faqs, meta_title, meta_description, wave, sort, active) values (` +
        [
          lit(verse.slug), lit(verse.reference), lit(fm.text_reference), lit(fm.text_rvr),
          lit(verse.popularPhrase), lit(fm.h1), lit(fm.intro), lit(meaning), lit(fm.numbering_note),
          json(fm.faqs), lit(fm.meta_title), lit(fm.meta_description), verse.wave, index + 1, active,
        ].join(', ') +
        ')',
      '  on conflict (slug) do update set reference = excluded.reference, text_reference = excluded.text_reference, text_rvr = excluded.text_rvr, popular_phrase = excluded.popular_phrase, h1 = excluded.h1, intro = excluded.intro, meaning_md = excluded.meaning_md, numbering_note = excluded.numbering_note, faqs = excluded.faqs, meta_title = excluded.meta_title, meta_description = excluded.meta_description, wave = excluded.wave, sort = excluded.sort, active = excluded.active;',
    );

    for (const garment of garments) {
      const featured = garment === 'sudadera' && index < FEATURED_COUNT;
      productRows.push(
        `(${lit(verse.slug)}, ${lit(garment)}, ${lit(productSlug(garment, fm.product_name, verse.slug))}, ${lit(productName(garment, fm.product_name))}, ${lit(price[garment])}, ${featured})`,
      );
      for (const color of colors) {
        for (const size of tienda.producto.tallas) {
          variantRows.push(
            `(${lit(verse.slug)}, ${lit(garment)}, ${lit(sku(verse.slug, garment, color.slug, size))}, ${lit(color.slug)}, ${lit(color.nombre)}, ${lit(color.hex)}, ${lit(size)})`,
          );
        }
      }
    }
  });

  out.push(
    '',
    '-- Cada versículo, en su colección',
    'delete from public.verse_collections vc using public.verses v where vc.verse_id = v.id;',
    'insert into public.verse_collections (verse_id, collection_id) select v.id, c.id from (values',
    allVerses.map((v) => `  (${lit(v.slug)}, ${lit(v.collection)})`).join(',\n'),
    ') as x(verse_slug, collection_slug) join public.verses v on v.slug = x.verse_slug join public.collections c on c.slug = x.collection_slug;',
    '',
    '-- Productos: se crean inactivos; al volver a ejecutar el seed no se toca `active`.',
    'insert into public.products (verse_id, garment, slug, name, price_cents, featured) select v.id, x.garment::public.garment_type, x.slug, x.name, x.price_cents, x.featured from (values',
    productRows.map((r) => `  ${r}`).join(',\n'),
    ') as x(verse_slug, garment, slug, name, price_cents, featured) join public.verses v on v.slug = x.verse_slug',
    'on conflict (verse_id, garment) do update set slug = excluded.slug, name = excluded.name, price_cents = excluded.price_cents, featured = excluded.featured;',
    '',
    usingExample
      ? `-- Variantes de EJEMPLO: color «${EXAMPLE_COLOR.nombre}» y stock de prueba (${TEST_STOCK}) hasta que el proveedor confirme colores.`
      : '-- Variantes con los colores de tienda.ts; las de ejemplo quedan desactivadas.',
    `insert into public.variants (product_id, sku, color_slug, color_name, color_hex, size, stock) select p.id, x.sku, x.color_slug, x.color_name, x.color_hex, x.size, ${usingExample ? TEST_STOCK : 0} from (values`,
    variantRows.map((r) => `  ${r}`).join(',\n'),
    ') as x(verse_slug, garment, sku, color_slug, color_name, color_hex, size) join public.verses v on v.slug = x.verse_slug join public.products p on p.verse_id = v.id and p.garment = x.garment::public.garment_type',
    '-- El stock real no se sobrescribe al volver a ejecutar el seed.',
    'on conflict (sku) do update set color_name = excluded.color_name, color_hex = excluded.color_hex;',
  );

  if (!usingExample) {
    out.push(`update public.variants set active = false where color_slug = ${lit(EXAMPLE_COLOR.slug)};`);
  }

  out.push('', 'commit;', '');

  return {
    sql: out.join('\n'),
    stats: {
      collections: collections.length,
      verses: allVerses.length,
      products: productRows.length,
      variants: variantRows.length,
    },
  };
}
