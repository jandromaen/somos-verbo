import Link from 'next/link';
import { featuredVerses, verses } from '@/config/catalogo';
import type { PageCopy } from '@/content/paginas/types';
import { Faqs } from './Faqs';
import { Markdown } from './Markdown';
import { PagePlaceholder } from './PagePlaceholder';
import { VerseChips } from './VerseChips';

type CategoryPageProps = {
  name: string;
  path: string;
  h1: string;
  copy: PageCopy;
};

/** Plantilla de categoría (CLAUDE.md, 6.3). La rejilla de productos llega con las fotos. */
export function CategoryPage({ name, path, h1, copy }: CategoryPageProps) {
  return (
    <PagePlaceholder breadcrumbs={[{ name, path }]} h1={h1} phase={3} intro={copy.intro}>
      <section className="mt-12">
        <h2 className="font-serif text-h3-sm lg:text-h3">Los versículos más buscados</h2>
        <div className="mt-4">
          <VerseChips verses={featuredVerses} />
        </div>
        <Link href="/versiculos" className="mt-6 inline-flex min-h-11 items-center font-medium underline underline-offset-4">
          Ver los {verses.length} versículos
        </Link>
      </section>
      <div className="mt-12">
        <Markdown source={copy.body} />
      </div>
      <Faqs faqs={copy.faqs} />
    </PagePlaceholder>
  );
}
