import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Política de cookies', path: '/cookies' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Cookies', path: '/cookies' }]} h1="Política de cookies" phase={7} />
  );
}
