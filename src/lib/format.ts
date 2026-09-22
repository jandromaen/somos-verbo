const wholeEuros = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const eurosWithCents = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

/** 5000 → «50 €»; 2990 → «29,90 €». */
export function formatEuros(cents: number): string {
  const value = cents / 100;
  return (Number.isInteger(value) ? wholeEuros : eurosWithCents).format(value);
}
