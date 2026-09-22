import Link from 'next/link';
import { footerNav } from '@/config/navigation';
import { tienda } from '@/config/tienda';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="wrap section-y">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-small-plus text-on-dark">
              Y el Verbo se hizo carne. Ahora, prenda.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:contents">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-small-plus font-semibold">{group.title}</h2>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-small-plus text-on-dark hover:text-bg hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-on-dark/25 pt-6 text-small text-on-dark">
          <p>{tienda.creditoBiblia}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {tienda.nombre}
          </p>
        </div>
      </div>
    </footer>
  );
}
