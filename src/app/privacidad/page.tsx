import { PagePlaceholder } from '@/components/PagePlaceholder';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ title: 'Política de privacidad', path: '/privacidad' });

export default function Page() {
  return (
    <PagePlaceholder breadcrumbs={[{ name: 'Privacidad', path: '/privacidad' }]} h1="Política de privacidad" phase={7} />
  );
}
