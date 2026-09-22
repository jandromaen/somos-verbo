import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Guía de tallas', path: '/guia-de-tallas' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Guía de tallas', path: '/guia-de-tallas' }]} h1="Guía de tallas" phase={7} />
  );
}
