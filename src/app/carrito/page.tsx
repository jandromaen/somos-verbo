import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Carrito', path: '/carrito', noindex: true });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Carrito', path: '/carrito' }]} h1="Tu carrito" phase={4} />
  );
}
