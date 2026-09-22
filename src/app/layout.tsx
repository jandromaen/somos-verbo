import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif } from 'next/font/google';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { tienda } from '@/config/tienda';
import { indexable, siteUrl } from '@/lib/seo/site';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const archivo = Archivo({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ropa cristiana con versículos de la Biblia | Somos Verbo',
    template: '%s | Somos Verbo',
  },
  description:
    'Sudaderas y camisetas cristianas con versículos. Diseño cuidado, envío en toda España.',
  applicationName: tienda.nombre,
  openGraph: {
    siteName: tienda.nombre,
    locale: 'es_ES',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  // Fuera de https://somosverbo.es (vistas previas, workers.dev, local), nada se indexa.
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#f3eee6',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-ES" className={`${instrumentSerif.variable} ${archivo.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 bg-ink px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Saltar al contenido
        </a>
        <AnnouncementBar />
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
