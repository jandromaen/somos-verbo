import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { VerseChips } from '@/components/VerseChips';
import { getCollection, getSiblingVerses, getVerse, verses } from '@/config/catalogo';
import { pageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return verses.map((verse) => ({ slug: verse.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/versiculos/[slug]'>): Promise<Metadata> {
  const verse = getVerse((await params).slug);
  if (!verse) return {};
  return pageMetadata({
    title: `Sudaderas y camisetas de ${verse.reference}`,
    path: `/versiculos/${verse.slug}`,
  });
}

export default async function Page({ params }: PageProps<'/versiculos/[slug]'>) {
  const verse = getVerse((await params).slug);
  if (!verse) notFound();
  const collection = getCollection(verse.collection);
  const siblings = getSiblingVerses(verse);

  return (
    <PagePlaceholder
      breadcrumbs={[
        { name: 'Versículos', path: '/versiculos' },
        { name: verse.reference, path: `/versiculos/${verse.slug}` },
      ]}
      h1={`Sudaderas y camisetas de ${verse.reference}`}
      phase={3}
    >
      <p className="mt-10 font-serif text-verse-sm text-balance lg:text-verse">
        {verse.popularPhrase}
      </p>
      <p className="mt-4 text-small font-semibold tracking-[0.14em] text-accent uppercase">
        {verse.reference} · {collection?.name}
      </p>
      <h2 className="mt-12 font-serif text-h3-sm lg:text-h3">Otros versículos de la colección</h2>
      <div className="mt-4">
        <VerseChips verses={siblings} />
      </div>
      {collection && (
        <Link
          href={`/colecciones/${collection.slug}`}
          className="mt-6 inline-flex min-h-11 items-center font-medium underline underline-offset-4"
        >
          Ver toda la colección {collection.name}
        </Link>
      )}
    </PagePlaceholder>
  );
}
