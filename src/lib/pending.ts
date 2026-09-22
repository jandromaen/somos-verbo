export const PENDING_LABEL = '[PENDIENTE]';

/** Devuelve el valor formateado o `[PENDIENTE]` si todavía no existe. */
export function orPending<T>(
  value: T | null | undefined,
  format: (value: T) => string = String,
): string {
  return value === null || value === undefined ? PENDING_LABEL : format(value);
}

/**
 * Recorre un objeto de configuración y devuelve la ruta de cada campo
 * sin rellenar: valores `null` y listas vacías.
 */
export function findPendingFields(value: unknown, path = ''): string[] {
  if (value === null || value === undefined) return [path];
  if (Array.isArray(value)) return value.length === 0 ? [path] : [];
  if (typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      findPendingFields(child, path ? `${path}.${key}` : key),
    );
  }
  return [];
}
