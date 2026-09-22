import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Gracias por tu pedido',
  path: '/pedido/gracias',
  noindex: true,
});

export default function Page() {
  return (
    <PagePlaceholder
      breadcrumbs={[{ name: 'Pedido confirmado', path: '/pedido/gracias' }]}
      h1="Gracias por tu pedido"
      phase={5}
    />
  );
}
