import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Blog', path: '/blog' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Blog', path: '/blog' }]} h1="Blog de Somos Verbo" phase={7} />
  );
}
