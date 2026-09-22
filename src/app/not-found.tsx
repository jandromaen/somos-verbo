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
      <div className="mt-4">
        <VerseChips verses={featuredVerses} />
      </div>
    </div>
  );
}
