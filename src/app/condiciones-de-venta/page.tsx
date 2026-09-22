import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Condiciones de venta', path: '/condiciones-de-venta' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Condiciones de venta', path: '/condiciones-de-venta' }]} h1="Condiciones de venta" phase={7} />
  );
}
