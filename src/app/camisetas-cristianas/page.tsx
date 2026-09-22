import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Camisetas cristianas con versículos', path: '/camisetas-cristianas' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Camisetas cristianas', path: '/camisetas-cristianas' }]} h1="Camisetas cristianas con versículos de la Biblia" phase={3} />
  );
}
