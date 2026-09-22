import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Contacto', path: '/contacto' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Contacto', path: '/contacto' }]} h1="Contacto" phase={7} />
  );
}
