import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { getOccasion, occasions } from '@/config/catalogo';
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
    path: `/regalos-cristianos/${occasion.slug}`,
  });
}

export default async function Page({ params }: PageProps<'/regalos-cristianos/[ocasion]'>) {
  const occasion = getOccasion((await params).ocasion);
  if (!occasion) notFound();

  return (
    <PagePlaceholder
      breadcrumbs={[
        { name: 'Regalos cristianos', path: '/regalos-cristianos' },
        { name: occasion.name, path: `/regalos-cristianos/${occasion.slug}` },
      ]}
      h1={occasion.h1}
      phase={3}
    />
  );
}
