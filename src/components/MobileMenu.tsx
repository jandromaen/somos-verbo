'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { NavLink } from '@/config/navigation';
import { CloseIcon, MenuIcon } from './icons';
import { Logo } from './Logo';

type MobileMenuProps = {
  links: NavLink[];
  secondaryLinks: NavLink[];
};

/** Menú móvil a pantalla completa sobre `<dialog>`: foco atrapado y Escape nativos. */
export function MobileMenu({ links, secondaryLinks }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Al navegar, se cierra el menú.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center lg:hidden"
        aria-label="Abrir menú"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menú"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg text-ink backdrop:bg-ink/40 lg:hidden"
      >
        <div className="wrap flex h-full flex-col pb-10">
          <div className="-mr-2.5 flex h-16 items-center justify-between">
            <Logo />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-label="Cerrar menú"
              onClick={() => dialogRef.current?.close()}
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Principal (móvil)">
            <ul className="border-t border-line">
              {links.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className="flex min-h-16 items-center font-serif text-h3-sm aria-[current=page]:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-auto flex flex-wrap gap-x-6 pt-8 text-small-plus text-muted">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
