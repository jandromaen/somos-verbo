import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Faqs } from '@/components/Faqs';
import { Markdown } from '@/components/Markdown';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import { VerseChips } from '@/components/VerseChips';
import { getCollection, getSiblingVerses, getVerse, verses } from '@/config/catalogo';
import { tienda } from '@/config/tienda';
import { type Garment, productName } from '@/lib/catalog/codes';
import { getVerseContent } from '@/lib/content/verses';
import { formatEuros } from '@/lib/format';
import { orPending } from '@/lib/pending';
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
  const content = getVerseContent(verse.slug);
  return pageMetadata({
    title: content.meta_title,
    description: content.meta_description,
    path: `/versiculos/${verse.slug}`,
  });
}

const garments: { garment: Garment; price: number | null }[] = [
  { garment: 'sudadera', price: tienda.precios.sudaderaCentimos },
  { garment: 'camiseta', price: tienda.precios.camisetaCentimos },
];

/** Landing de versículo (CLAUDE.md, 6.4): la plantilla más importante para el SEO. */
export default async function Page({ params }: PageProps<'/versiculos/[slug]'>) {
  const verse = getVerse((await params).slug);
  if (!verse) notFound();
  const collection = getCollection(verse.collection);
  const siblings = getSiblingVerses(verse);
  const content = getVerseContent(verse.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Versículos', path: '/versiculos' },
          { name: verse.reference, path: `/versiculos/${verse.slug}` },
        ]}
      />
      <div className="wrap section-y pt-6! lg:pt-8!">
        <p className="font-serif text-verse-sm text-balance lg:text-verse">{content.popular_phrase}</p>
        <p className="mt-4 text-small font-semibold tracking-[0.14em] text-accent uppercase">
          {verse.reference}
          {collection && (
            <>
              {' · '}
              <Link href={`/colecciones/${collection.slug}`} className="hover:underline">
                {collection.name}
              </Link>
            </>
          )}
        </p>

        <h1 className="mt-10 max-w-3xl font-serif text-h3-sm text-balance lg:text-h3">{content.h1}</h1>
        <p className="mt-4 max-w-[70ch] leading-[1.7] text-ink-soft">{content.intro}</p>

        <section aria-label={`Prendas de ${verse.reference}`} className="mt-10">
          <ul className="grid grid-cols-2 gap-3 lg:max-w-3xl lg:gap-6">
            {garments.map(({ garment, price }) => (
              <li key={garment}>
                <PhotoPlaceholder />
                <p className="mt-3 font-medium">{productName(garment, content.product_name)}</p>
                <p className="text-small text-muted">{verse.reference}</p>
                <p className="mt-1 font-semibold">{orPending(price, formatEuros)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <blockquote className="max-w-[70ch] border-l-2 border-accent pl-5">
            <p className="font-serif text-h3-sm leading-snug lg:text-h3">«{content.text_rvr}»</p>
            <footer className="mt-3 text-small text-muted">
              {content.text_reference} (Reina-Valera 1960)
            </footer>
          </blockquote>
          <Markdown source={content.meaningMd} className="mt-6" />
          {content.numbering_note && (
            <p className="mt-6 max-w-[70ch] bg-bg-alt p-4 text-small text-ink-soft">{content.numbering_note}</p>
          )}
        </section>

        {siblings.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-h3-sm lg:text-h3">Otros versículos de la colección</h2>
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
          </section>
        )}

        <Faqs faqs={content.faqs} />
      </div>
    </>
  );
}
