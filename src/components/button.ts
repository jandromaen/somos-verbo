const base =
  'inline-flex min-h-12 items-center justify-center rounded-btn px-6 text-small-plus font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50';

/** Estilos de botón (CLAUDE.md, 8.5): principal en `accent`, secundario con borde `ink`. */
export const buttonClass = {
  primary: `${base} bg-accent text-bg hover:bg-ink`,
  secondary: `${base} border border-ink text-ink hover:bg-ink hover:text-bg`,
} as const;
