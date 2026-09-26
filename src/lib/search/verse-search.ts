/**
 * Buscador de versículos: sin servicios externos, se ejecuta en el navegador
 * sobre un índice pequeño generado en el build (`/buscar/indice.json`).
 */

/** Entrada del índice: [slug, referencia, frase del diseño, colección]. */
export type SearchEntry = [slug: string, reference: string, phrase: string, collection: string];

export type SearchResult = { slug: string; reference: string; phrase: string; collection: string };

/** Abreviaturas y variantes habituales → nombre del libro tal como aparece en el catálogo. */
const aliases: Record<string, string> = {
  salmos: 'salmo',
  sl: 'salmo',
  jn: 'juan',
  mt: 'mateo',
  mc: 'marcos',
  lc: 'lucas',
  rm: 'romanos',
  flp: 'filipenses',
  prov: 'proverbios',
  pr: 'proverbios',
  is: 'isaias',
  jer: 'jeremias',
};

/** Minúsculas, sin tildes y sin signos: «Salmo 23:1» → «salmo 23 1». */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Separa letras y números pegados («juan3» → «juan 3») y aplica los alias. */
function queryTokens(query: string): string[] {
  return normalize(query)
    .replace(/([a-z])(\d)|(\d)([a-z])/g, (_, a, b, c, d) => (a ? `${a} ${b}` : `${c} ${d}`))
    .split(' ')
    .filter(Boolean)
    .map((token) => aliases[token] ?? token);
}

const matchesAll = (tokens: string[], words: string[]) =>
  tokens.every((token) => words.some((word) => word.startsWith(token)));

/**
 * Devuelve los versículos cuyo texto contiene todas las palabras buscadas
 * (como inicio de palabra), primero los que coinciden por referencia y, a
 * igualdad, en el orden de prioridad del catálogo.
 */
export function searchVerses(index: SearchEntry[], query: string, limit = 20): SearchResult[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];
  const joined = tokens.join(' ');

  const scored: { entry: SearchEntry; score: number; order: number }[] = [];
  index.forEach((entry, order) => {
    const [, reference, phrase, collection] = entry;
    const ref = normalize(reference);
    const refWords = ref.split(' ');
    let score: number;
    if (ref === joined) score = 0;
    else if (matchesAll(tokens, refWords)) score = ref.startsWith(joined) ? 1 : 2;
    else if (normalize(phrase).includes(joined)) score = 3;
    else if (matchesAll(tokens, [...refWords, ...normalize(`${phrase} ${collection}`).split(' ')])) score = 4;
    else return;
    scored.push({ entry, score, order });
  });

  return scored
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .slice(0, limit)
    .map(({ entry: [slug, reference, phrase, collection] }) => ({ slug, reference, phrase, collection }));
}
