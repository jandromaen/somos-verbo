export type NavLink = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: '/sudaderas-cristianas', label: 'Sudaderas' },
  { href: '/camisetas-cristianas', label: 'Camisetas' },
  { href: '/versiculos', label: 'Versículos' },
  { href: '/regalos-cristianos', label: 'Regalos' },
  { href: '/blog', label: 'Blog' },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Tienda',
    links: [
      { href: '/sudaderas-cristianas', label: 'Sudaderas cristianas' },
      { href: '/camisetas-cristianas', label: 'Camisetas cristianas' },
      { href: '/versiculos', label: 'Ropa con versículos' },
      { href: '/regalos-cristianos', label: 'Regalos cristianos' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { href: '/envios', label: 'Envíos' },
      { href: '/devoluciones', label: 'Devoluciones' },
      { href: '/guia-de-tallas', label: 'Guía de tallas' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/aviso-legal', label: 'Aviso legal' },
      { href: '/privacidad', label: 'Privacidad' },
      { href: '/cookies', label: 'Cookies' },
      { href: '/condiciones-de-venta', label: 'Condiciones de venta' },
    ],
  },
];
