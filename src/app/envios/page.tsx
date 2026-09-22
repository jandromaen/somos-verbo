import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Envíos', path: '/envios' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Envíos', path: '/envios' }]} h1="Envíos" phase={7} />
  );
}
