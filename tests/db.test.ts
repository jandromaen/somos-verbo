/**
 * Base de datos (fase 2): aplica las migraciones y el seed en un Postgres
 * embebido (PGlite) y comprueba conteos, RLS e idempotencia del seed.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { allVerses, PUBLISHED_WAVE } from '@/config/catalogo';

const read = (path: string) => readFileSync(path, 'utf8');
const migrations = readdirSync('supabase/migrations')
  .sort()
  .map((f) => read(`supabase/migrations/${f}`));
const seed = read('supabase/seed/seed.sql');

let db: PGlite;

async function count(sql: string): Promise<number> {
  const { rows } = await db.query<{ n: number }>(`select count(*)::int as n from (${sql}) t`);
  return rows[0].n;
}

async function asRole<T>(role: string, fn: () => Promise<T>): Promise<T> {
  await db.exec(`set role ${role}`);
  try {
    return await fn();
  } finally {
    await db.exec('reset role');
  }
}

beforeAll(async () => {
  db = new PGlite({ extensions: { pgcrypto } });
  await db.exec(read('supabase/tests/supabase-stub.sql'));
  for (const sql of migrations) await db.exec(sql);
  await db.exec(seed);
}, 120_000);

afterAll(async () => {
  await db?.close();
});

describe('seed', () => {
  it('carga 1.000 versículos, 8 colecciones y 2 productos por versículo', async () => {
    expect(await count('select * from public.verses')).toBe(allVerses.length);
    expect(await count('select * from public.collections')).toBe(8);
    expect(await count('select * from public.products')).toBe(allVerses.length * 2);
    expect(await count('select * from public.verse_collections')).toBe(allVerses.length);
  });

  it('solo activa los versículos de oleadas publicadas', async () => {
    const published = allVerses.filter((v) => v.wave <= PUBLISHED_WAVE).length;
    expect(await count('select * from public.verses where active')).toBe(published);
  });

  it('crea los productos inactivos (se activan al tener fotos)', async () => {
    expect(await count('select * from public.products where active')).toBe(0);
  });

  it('los textos coinciden con la fuente', async () => {
    const { rows } = await db.query<{ text_rvr: string; popular_phrase: string }>(
      "select text_rvr, popular_phrase from public.verses where slug = 'filipenses-4-13'",
    );
    expect(rows[0]).toEqual({
      text_rvr: 'Todo lo puedo en Cristo que me fortalece.',
      popular_phrase: 'Todo lo puedo en Cristo',
    });
  });

  it('es idempotente y no pisa el stock ni los productos activados', async () => {
    await db.exec("update public.products set active = true where slug = 'sudadera-todo-lo-puedo-filipenses-4-13'");
    await db.exec("update public.variants set stock = 3 where sku = 'SV-FIL4-13-SUD-EJE-M'");
    await db.exec(seed);
    expect(await count('select * from public.variants')).toBe(allVerses.length * 2 * 6);
    const { rows } = await db.query<{ stock: number; active: boolean }>(
      "select v.stock, p.active from public.variants v join public.products p on p.id = v.product_id where v.sku = 'SV-FIL4-13-SUD-EJE-M'",
    );
    expect(rows[0]).toEqual({ stock: 3, active: true });
  });
});

describe('RLS (visitante anónimo)', () => {
  beforeAll(async () => {
    await db.exec(`insert into public.orders (number, stripe_session_id, email, name, shipping_address, lines, subtotal_cents, shipping_cents, total_cents)
      values ('SV-2026-9999', 'cs_test_rls', 'cliente@example.com', 'Cliente', '{}', '[]', 5000, 0, 5000)`);
    await db.exec("insert into public.stripe_events (id) values ('evt_test_rls')");
  });

  it('no puede leer pedidos ni eventos de Stripe', async () => {
    await asRole('anon', async () => {
      expect(await count('select * from public.orders')).toBe(0);
      expect(await count('select * from public.stripe_events')).toBe(0);
    });
  });

  it('no puede crear pedidos', async () => {
    await expect(
      asRole('anon', () =>
        db.exec(`insert into public.orders (number, stripe_session_id, email, name, shipping_address, lines, subtotal_cents, shipping_cents, total_cents)
          values ('X', 'Y', 'e', 'n', '{}', '[]', 0, 0, 0)`),
      ),
    ).rejects.toThrow(/row-level security/);
  });

  it('solo ve versículos publicados y productos activos', async () => {
    await asRole('anon', async () => {
      expect(await count('select * from public.verses')).toBe(
        allVerses.filter((v) => v.wave <= PUBLISHED_WAVE).length,
      );
      expect(await count('select * from public.products')).toBe(1);
    });
  });

  it('no puede modificar el catálogo', async () => {
    await asRole('anon', async () => {
      await db.exec("update public.verses set h1 = 'x'");
    });
    expect(await count("select * from public.verses where h1 = 'x'")).toBe(0);
  });

  it('no puede descontar stock', async () => {
    await expect(asRole('anon', () => db.query("select public.decrement_stock('SV-FIL4-13-SUD-EJE-M', 1)"))).rejects.toThrow(
      /permission denied/,
    );
  });
});

describe('decrement_stock', () => {
  it('descuenta de forma atómica y nunca deja stock negativo', async () => {
    await db.exec("update public.variants set stock = 5 where sku = 'SV-JUA3-16-SUD-EJE-L'");
    const { rows } = await db.query<{ a: boolean; b: boolean }>(
      "select public.decrement_stock('SV-JUA3-16-SUD-EJE-L', 4) a, public.decrement_stock('SV-JUA3-16-SUD-EJE-L', 4) b",
    );
    expect(rows[0]).toEqual({ a: true, b: false });
    const stock = await db.query<{ stock: number }>("select stock from public.variants where sku = 'SV-JUA3-16-SUD-EJE-L'");
    expect(stock.rows[0].stock).toBe(1);
  });
});
