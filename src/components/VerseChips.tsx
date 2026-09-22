import Link from 'next/link';
import type { Verse } from '@/config/catalogo';

type VerseChipsProps = {
  verses: Verse[];
};

/** Chips de versículo → landings. Enlazado interno clave (CLAUDE.md, 9.4). */
export function VerseChips({ verses }: VerseChipsProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {verses.map((verse) => (
        <li key={verse.slug}>
          <Link
            href={`/versiculos/${verse.slug}`}
            className="inline-flex min-h-11 items-center rounded-chip border border-line px-4 text-small-plus transition-colors duration-150 hover:border-ink"
          >
            {verse.reference}
          </Link>
        </li>
      ))}
    </ul>
  );
}
