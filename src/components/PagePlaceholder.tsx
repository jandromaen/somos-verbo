import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import type { Crumb } from '@/lib/seo/schema';

type PagePlaceholderProps = {
  breadcrumbs: Crumb[];
  h1: string;
  /** Fase del plan (CLAUDE.md, sección 15) en la que se completa la página. */
  phase: number;
  children?: ReactNode;
};

/** Esqueleto de página: migas, H1 y aviso de contenido en preparación. */
export function PagePlaceholder({ breadcrumbs, h1, phase, children }: PagePlaceholderProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="wrap section-y pt-6! lg:pt-8!">
        <h1 className="max-w-4xl font-serif text-h2-sm text-balance lg:text-h2">{h1}</h1>
        <p className="mt-4 max-w-prose text-muted">
          Contenido en preparación (fase {phase} del plan).
        </p>
        {children}
      </div>
    </>
  );
}
