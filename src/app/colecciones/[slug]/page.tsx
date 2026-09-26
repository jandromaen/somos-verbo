import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Faqs } from '@/components/Faqs';
import { Markdown } from '@/components/Markdown';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { VerseList } from '@/components/VerseList';
import { collections, getCollection, verses } from '@/config/catalogo';
import { collectionCopy } from '@/content/paginas/colecciones';
import { pageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/colecciones/[slug]'>): Promise<Metadata> {
  const collection = getCollection((await params).slug);
  if (!collection) return {};
  return pageMetadata({
    title: `Ropa cristiana de ${collection.theme}`,
    description: collectionCopy[collection.slug].metaDescription,
    path: `/colecciones/${collection.slug}`,
  });
}

export default async function Page({ params }: PageProps<'/colecciones/[slug]'>) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  const copy = collectionCopy[collection.slug];

  return (
    <PagePlaceholder
      breadcrumbs={[{ name: collection.name, path: `/colecciones/${collection.slug}` }]}
      h1={`Ropa cristiana de ${collection.theme}`}
      phase={3}
      intro={copy.intro}
    >
      <section className="mt-12">
        <h2 className="mb-4 font-serif text-h3-sm lg:text-h3">Versículos de la colección {collection.name}</h2>
        <VerseList verses={verses.filter((v) => v.collection === collection.slug)} />
      </section>
      <div className="mt-12">
        <Markdown source={copy.body} />
      </div>
      <Faqs faqs={copy.faqs} />
    </PagePlaceholder>
  );
}
