import Link from 'next/link';
import { footerNav, mainNav } from '@/config/navigation';
import { CartLink } from './CartLink';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

const helpLinks = footerNav.find((group) => group.title === 'Ayuda')?.links ?? [];

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="wrap grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:flex lg:h-20 lg:gap-10">
        {/* Móvil: hamburguesa · logo centrado · carrito */}
        <div className="-ml-2.5 lg:hidden">
          <MobileMenu links={mainNav} secondaryLinks={helpLinks} />
        </div>

        <Logo className="justify-self-center lg:justify-self-auto" />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-8 text-small-plus font-medium">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center underline-offset-8 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2.5 justify-self-end lg:ml-auto">
          <CartLink />
        </div>
      </div>
    </header>
  );
}
