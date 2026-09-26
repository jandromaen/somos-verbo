import { CategoryPage } from '@/components/CategoryPage';
import { categoryCopy } from '@/content/paginas/categorias';
import { pageMetadata } from '@/lib/seo/metadata';

const copy = categoryCopy.sudaderas;

export const metadata = pageMetadata({
  title: 'Sudaderas cristianas con versículos',
  description: copy.metaDescription,
  path: '/sudaderas-cristianas',
});

export default function Page() {
  return (
    <CategoryPage
      name="Sudaderas cristianas"
      path="/sudaderas-cristianas"
      h1="Sudaderas cristianas con versículos de la Biblia"
      copy={copy}
    />
  );
}
