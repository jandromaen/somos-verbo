import { notFound } from 'next/navigation';

// Los artículos MDX llegan en la fase 7. Hasta entonces toda URL devuelve 404.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return [];
}

export default function Page() {
  notFound();
}
