import { notFound } from 'next/navigation';

// Las fichas se generan en la fase 4 a partir de los productos de Supabase.
// Hasta entonces no existe ningún producto y toda URL devuelve 404.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return [];
}

export default function Page() {
  notFound();
}
