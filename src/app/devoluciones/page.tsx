import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Devoluciones', path: '/devoluciones' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Devoluciones', path: '/devoluciones' }]} h1="Devoluciones" phase={7} />
  );
}
