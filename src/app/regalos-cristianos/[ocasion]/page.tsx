import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Faqs } from '@/components/Faqs';
import { Markdown } from '@/components/Markdown';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { VerseList } from '@/components/VerseList';
import { getOccasion, getVerse, occasions, type Verse } from '@/config/catalogo';
import { occasionCopy } from '@/content/paginas/regalos';
import { pageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return occasions.map((occasion) => ({ ocasion: occasion.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/regalos-cristianos/[ocasion]'>): Promise<Metadata> {
  const occasion = getOccasion((await params).ocasion);
  if (!occasion) return {};
  return pageMetadata({
    title: occasion.h1.split(':')[0],
    description: occasionCopy[occasion.slug].metaDescription,
    path: `/regalos-cristianos/${occasion.slug}`,
  });
}

export default async function Page({ params }: PageProps<'/regalos-cristianos/[ocasion]'>) {
  const occasion = getOccasion((await params).ocasion);
  if (!occasion) notFound();
  const copy = occasionCopy[occasion.slug];
  const recommended = copy.verses.map(getVerse).filter((v): v is Verse => v !== undefined);

  return (
    <PagePlaceholder
      breadcrumbs={[
        { name: 'Regalos cristianos', path: '/regalos-cristianos' },
        { name: occasion.name, path: `/regalos-cristianos/${occasion.slug}` },
      ]}
      h1={occasion.h1}
      phase={3}
      intro={copy.intro}
    >
      <div className="mt-10">
        <Markdown source={copy.body} />
      </div>
      <section className="mt-14">
        <h2 className="mb-4 font-serif text-h3-sm lg:text-h3">Versículos recomendados</h2>
        <VerseList verses={recommended} />
      </section>
      <Faqs faqs={copy.faqs} />
    </PagePlaceholder>
  );
}
