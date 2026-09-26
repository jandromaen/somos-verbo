import Link from 'next/link';
import type { Verse } from '@/config/catalogo';

/** Versículos con su frase, cada uno enlazado a su landing (colecciones y ocasiones). */
export function VerseList({ verses }: { verses: Verse[] }) {
  return (
    <ul className="grid gap-x-8 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
      {verses.map((verse) => (
        <li key={verse.slug} className="border-b border-line">
          <Link href={`/versiculos/${verse.slug}`} className="group flex min-h-11 flex-col gap-1 py-4">
            <span className="text-small font-semibold tracking-[0.14em] text-accent uppercase">{verse.reference}</span>
            <span className="font-serif text-h3-sm group-hover:underline">{verse.popularPhrase}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
