import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Sudaderas cristianas con versículos', path: '/sudaderas-cristianas' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Sudaderas cristianas', path: '/sudaderas-cristianas' }]} h1="Sudaderas cristianas con versículos de la Biblia" phase={3} />
  );
}
