import Link from 'next/link';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbListSchema, type Crumb } from '@/lib/seo/schema';

type BreadcrumbsProps = {
  /** Sin «Inicio»: se añade siempre al principio. El último es la página actual. */
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const crumbs: Crumb[] = [{ name: 'Inicio', path: '/' }, ...items];

  return (
    <>
      <nav aria-label="Migas de pan" className="wrap pt-4 lg:pt-6">
        <ol className="flex flex-wrap items-center text-small text-muted">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center">
                {isLast ? (
                  <span aria-current="page" className="py-3 text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="py-3 hover:text-ink hover:underline">
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true" className="px-2">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbListSchema(crumbs)} />
    </>
  );
}
