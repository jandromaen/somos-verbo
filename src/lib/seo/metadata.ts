import type { Metadata } from 'next';

type PageMetadataInput = {
  /** Sin « | Somos Verbo»: la plantilla del layout lo añade. */
  title: string;
  description?: string;
  path: string;
  /** Páginas como el carrito o la confirmación de pedido no se indexan nunca. */
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, noindex }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
