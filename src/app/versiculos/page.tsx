import { PagePlaceholder } from '@/components/PagePlaceholder';
import { VerseChips } from '@/components/VerseChips';
import { verses } from '@/config/catalogo';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Ropa con versículos de la Biblia',
  path: '/versiculos',
});

export default function Page() {
  return (
    <PagePlaceholder
      breadcrumbs={[{ name: 'Versículos', path: '/versiculos' }]}
      h1="Ropa con versículos de la Biblia"
      phase={3}
    >
      <div className="mt-8">
        <VerseChips verses={verses} />
      </div>
    </PagePlaceholder>
  );
}
