import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { VerseChips } from '@/components/VerseChips';
import { collections, getCollection, verses } from '@/config/catalogo';
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
    path: `/colecciones/${collection.slug}`,
  });
}

export default async function Page({ params }: PageProps<'/colecciones/[slug]'>) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();

  return (
    <PagePlaceholder
      breadcrumbs={[{ name: collection.name, path: `/colecciones/${collection.slug}` }]}
      h1={`Ropa cristiana de ${collection.theme}`}
      phase={3}
    >
      <div className="mt-8">
        <VerseChips verses={verses.filter((v) => v.collection === collection.slug)} />
      </div>
    </PagePlaceholder>
  );
}
