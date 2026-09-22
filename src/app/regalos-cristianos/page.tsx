import Link from 'next/link';
import { PagePlaceholder } from '@/components/PagePlaceholder';
import { occasions } from '@/config/catalogo';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Regalos cristianos', path: '/regalos-cristianos' });

export default function Page() {
  return (
    <PagePlaceholder
      breadcrumbs={[{ name: 'Regalos cristianos', path: '/regalos-cristianos' }]}
      h1="Regalos cristianos con sentido"
      phase={3}
    >
      <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {occasions.map((occasion) => (
          <li key={occasion.slug}>
            <Link
              href={`/regalos-cristianos/${occasion.slug}`}
              className="flex min-h-32 items-end bg-ink p-5 font-serif text-h3-sm text-bg lg:min-h-48 lg:text-h3"
            >
              {occasion.name}
            </Link>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  );
}
