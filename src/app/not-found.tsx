import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonClass } from '@/components/button';
import { VerseChips } from '@/components/VerseChips';
import { featuredVerses } from '@/config/catalogo';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="wrap section-y">
      <p className="text-small font-semibold tracking-[0.14em] text-accent uppercase">Error 404</p>
      <h1 className="mt-4 max-w-3xl font-serif text-h2-sm text-balance lg:text-h2">
        Esta página no existe o ha cambiado de sitio
      </h1>
      <p className="mt-4 max-w-prose text-muted">
        Revisa la dirección o empieza por aquí: nuestras sudaderas, camisetas o los versículos.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/sudaderas-cristianas" className={buttonClass.primary}>
          Ver sudaderas
        </Link>
        <Link href="/camisetas-cristianas" className={buttonClass.secondary}>
          Ver camisetas
        </Link>
      </div>
      <h2 className="mt-14 font-serif text-h3-sm lg:text-h3">Busca por versículo</h2>
      <form action="/buscar" role="search" className="mt-4 flex max-w-xl gap-2">
        <label htmlFor="buscar-404" className="sr-only">
          Busca por referencia o por frase
        </label>
        <input
          id="buscar-404"
          type="search"
          name="q"
          placeholder="Juan 3:16, Salmo 23…"
          className="min-h-12 w-full rounded-btn border border-ink bg-bg px-4 placeholder:text-muted"
        />
        <button type="submit" className={buttonClass.secondary}>
          Buscar
        </button>
      </form>
      <div className="mt-6">
        <VerseChips verses={featuredVerses} />
      </div>
    </div>
  );
}
