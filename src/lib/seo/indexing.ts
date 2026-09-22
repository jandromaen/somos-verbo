export const PRODUCTION_ORIGIN = 'https://somosverbo.es';

/**
 * Solo el dominio definitivo se indexa. Cualquier otra URL (localhost,
 * workers.dev, vistas previas) lleva `noindex` automáticamente.
 */
export function isIndexable(siteUrl: string): boolean {
  try {
    return new URL(siteUrl).origin === PRODUCTION_ORIGIN;
  } catch {
    return false;
  }
}
