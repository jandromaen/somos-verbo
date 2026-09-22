import Link from 'next/link';

type LogoProps = {
  className?: string;
};

/** Logo tipográfico: «Somos Verbo» en Instrument Serif, «Verbo» en cursiva. */
export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center font-serif text-[1.75rem] leading-none tracking-[-0.01em] ${className}`}
    >
      Somos <em className="ml-[0.25em] italic">Verbo</em>
      <span className="sr-only">, ir al inicio</span>
    </Link>
  );
}
