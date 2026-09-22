import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Aviso legal', path: '/aviso-legal' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Aviso legal', path: '/aviso-legal' }]} h1="Aviso legal" phase={7} />
  );
}
