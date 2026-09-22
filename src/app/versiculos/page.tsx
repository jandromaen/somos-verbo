import Link from 'next/link';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { VerseChips } from '@/components/VerseChips';
import { collections, verses } from '@/config/catalogo';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Ropa con versículos de la Biblia',
  path: '/versiculos',
});

export default function Page() {
  return (
    <PagePlaceholder
      breadcrumbs={[{ name: 'Versículos', path: '/versiculos' }]}
      h1="Ropa con versículos de la Biblia"
      phase={3}
    >
      {collections.map((collection) => (
        <section key={collection.slug} className="mt-12">
          <h2 className="font-serif text-h3-sm lg:text-h3">
            <Link href={`/colecciones/${collection.slug}`} className="hover:underline">
              {collection.name}
            </Link>
          </h2>
          <div className="mt-4">
            <VerseChips verses={verses.filter((v) => v.collection === collection.slug)} />
          </div>
        </section>
      ))}
    </PagePlaceholder>
  );
}
