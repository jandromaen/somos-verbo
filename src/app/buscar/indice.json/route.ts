import { collections, verses } from '@/config/catalogo';
import type { SearchEntry } from '@/lib/search/verse-search';

// Se genera en el build: el buscador lo descarga solo al abrirse.
export const dynamic = 'force-static';

export function GET() {
  const names = new Map(collections.map((c) => [c.slug, c.name]));
  const index: SearchEntry[] = verses.map((v) => [v.slug, v.reference, v.popularPhrase, names.get(v.collection) ?? '']);
  return Response.json(index);
}
