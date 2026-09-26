import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { VerseChips } from '@/components/VerseChips';
import { VerseSearch } from '@/components/VerseSearch';
import { featuredVerses, verses } from '@/config/catalogo';
import { pageMetadata } from '@/lib/seo/metadata';

// Página de utilidad: no se indexa (evita páginas de resultados duplicadas).
export const metadata = pageMetadata({
  title: 'Buscar versículo',
  path: '/buscar',
  noindex: true,
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Buscar versículo', path: '/buscar' }]} />
      <div className="wrap section-y pt-6! lg:pt-8!">
        <h1 className="max-w-4xl font-serif text-h2-sm text-balance lg:text-h2">Buscar versículo</h1>
        <p className="mt-4 mb-8 max-w-prose text-muted">
          Encuentra tu versículo entre los {verses.length} de la tienda y ve directo a su sudadera y su camiseta.
        </p>
        <Suspense>
          <VerseSearch />
        </Suspense>
        <h2 className="mt-14 font-serif text-h3-sm lg:text-h3">Los más buscados</h2>
        <div className="mt-4">
          <VerseChips verses={featuredVerses} />
        </div>
      </div>
    </>
  );
}
