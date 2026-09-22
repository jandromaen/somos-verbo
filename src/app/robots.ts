import type { MetadataRoute } from 'next';
import { indexable } from '@/lib/seo/site';

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    // Vistas previas: se permite rastrear para que Google vea el `noindex`.
    return { rules: { userAgent: '*', allow: '/' } };
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/carrito', '/pedido', '/api', '/admin'],
    },
    // El sitemap se añade en la fase 6.
  };
}
