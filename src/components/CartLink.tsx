import Link from 'next/link';
import { BagIcon } from './icons';

/**
 * Acceso al carrito. El contador real llega en la fase 4 (carrito en el
 * navegador); de momento se muestra vacío.
 */
export function CartLink({ count = 0 }: { count?: number }) {
  return (
    <Link
      href="/carrito"
      className="relative inline-flex size-11 items-center justify-center"
      aria-label={count === 1 ? 'Carrito, 1 producto' : `Carrito, ${count} productos`}
    >
      <BagIcon />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-1 right-0.5 flex min-w-4.5 items-center justify-center rounded-chip bg-accent px-1 text-[0.6875rem] leading-4.5 font-semibold text-bg"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
