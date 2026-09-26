import { CategoryPage } from '@/components/CategoryPage';
import { categoryCopy } from '@/content/paginas/categorias';
import { pageMetadata } from '@/lib/seo/metadata';

const copy = categoryCopy.camisetas;

export const metadata = pageMetadata({
  title: 'Camisetas cristianas con versículos',
  description: copy.metaDescription,
  path: '/camisetas-cristianas',
});

export default function Page() {
  return (
    <CategoryPage
      name="Camisetas cristianas"
      path="/camisetas-cristianas"
      h1="Camisetas cristianas con versículos de la Biblia"
      copy={copy}
    />
  );
}
