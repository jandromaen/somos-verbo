import { describe, expect, it } from 'vitest';
import { formatEuros } from '@/lib/format';

// Intl separa número y símbolo con un espacio duro (U+00A0).
const nbsp = ' ';

describe('formatEuros', () => {
  it('sin decimales cuando el precio es redondo', () => {
    expect(formatEuros(5000)).toBe(`50${nbsp}€`);
  });

  it('con dos decimales cuando hay céntimos', () => {
    expect(formatEuros(2990)).toBe(`29,90${nbsp}€`);
  });
});
