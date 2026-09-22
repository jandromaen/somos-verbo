import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonClass } from '@/components/button';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { VerseChips } from '@/components/VerseChips';
import { verses } from '@/config/catalogo';

export const metadata: Metadata = {
  title: { absolute: 'Ropa cristiana con versículos de la Biblia | Somos Verbo' },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <section className="wrap section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-serif text-hero-sm text-balance lg:text-hero">
            Y el Verbo se hizo carne. <em>Ahora, prenda.</em>
          </p>
          <p className="mt-5 text-small font-semibold tracking-[0.14em] text-accent uppercase">
            Juan 1:14
          </p>
          <h1 className="mt-8 max-w-prose text-body-sm lg:text-body">
            Ropa cristiana con sentido: sudaderas y camisetas con versículos de la Biblia
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/sudaderas-cristianas" className={buttonClass.primary}>
              Ver sudaderas
            </Link>
            <Link href="/camisetas-cristianas" className={buttonClass.secondary}>
              Ver camisetas
            </Link>
          </div>
        </div>
        <PhotoPlaceholder />
      </section>

      <section className="border-t border-line bg-bg-alt">
        <div className="wrap section-y">
          <h2 className="font-serif text-h2-sm lg:text-h2">Busca por versículo</h2>
          <div className="mt-6">
            <VerseChips verses={verses} />
          </div>
        </div>
      </section>
    </>
  );
}
