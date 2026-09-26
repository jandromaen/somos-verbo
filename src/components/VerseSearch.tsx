'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useMemo, useState } from 'react';
import { searchVerses, type SearchEntry } from '@/lib/search/verse-search';
import { SearchIcon } from './icons';

let indexPromise: Promise<SearchEntry[]> | undefined;
const loadIndex = () =>
  (indexPromise ??= fetch('/buscar/indice.json').then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<SearchEntry[]>;
  }));

/** Buscador de versículos por referencia («Juan 3:16») o por frase. */
export function VerseSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get('q') ?? '');
  const [index, setIndex] = useState<SearchEntry[]>();
  const [failed, setFailed] = useState(false);
  const inputId = useId();
  const statusId = useId();

  useEffect(() => {
    loadIndex().then(setIndex, () => {
      indexPromise = undefined;
      setFailed(true);
    });
  }, []);

  const results = useMemo(() => (index ? searchVerses(index, query) : []), [index, query]);
  const trimmed = query.trim();

  // Mantiene ?q= en la dirección para poder compartir o volver atrás.
  useEffect(() => {
    const url = trimmed ? `/buscar?q=${encodeURIComponent(trimmed)}` : '/buscar';
    window.history.replaceState(null, '', url);
  }, [trimmed]);

  let status = '';
  if (failed) status = 'No hemos podido cargar el buscador. Recarga la página para intentarlo de nuevo.';
  else if (!trimmed) status = '';
  else if (!index) status = 'Cargando…';
  else if (results.length === 0) status = `No hay ningún versículo que coincida con «${trimmed}». Prueba con el libro y el capítulo, como «Salmo 23», o con una palabra de la frase.`;
  else status = results.length === 1 ? '1 versículo encontrado' : `${results.length === 20 ? 'Los 20 primeros' : results.length} versículos encontrados`;

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (results[0]) router.push(`/versiculos/${results[0].slug}`);
        }}
      >
        <label htmlFor={inputId} className="block font-medium">
          Busca por referencia o por frase
        </label>
        <div className="mt-2 flex max-w-2xl items-center gap-3 rounded-btn border border-ink bg-bg px-4 focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-accent">
          <SearchIcon className="shrink-0 text-muted" />
          <input
            id={inputId}
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Juan 3:16, Salmo 23, todo lo puedo…"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby={statusId}
            autoFocus
            className="min-h-12 w-full bg-transparent py-3 outline-none placeholder:text-muted"
          />
        </div>
      </form>

      <p id={statusId} role="status" className="mt-4 max-w-prose text-small text-muted">
        {status}
      </p>

      {results.length > 0 && (
        <ul className="mt-4 max-w-2xl divide-y divide-line border-y border-line">
          {results.map((result) => (
            <li key={result.slug}>
              <Link
                href={`/versiculos/${result.slug}`}
                className="flex min-h-11 flex-col gap-1 py-4 hover:bg-bg-alt focus-visible:bg-bg-alt"
              >
                <span className="text-small font-semibold tracking-[0.14em] text-accent uppercase">
                  {result.reference}
                </span>
                <span className="font-serif text-h3-sm">{result.phrase}</span>
                <span className="text-small text-muted">Colección {result.collection}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
