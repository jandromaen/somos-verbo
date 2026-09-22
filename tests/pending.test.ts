import { describe, expect, it } from 'vitest';
import { findPendingFields, orPending, PENDING_LABEL } from '@/lib/pending';

describe('orPending', () => {
  it('muestra [PENDIENTE] si falta el dato', () => {
    expect(orPending(null)).toBe(PENDING_LABEL);
    expect(orPending(undefined)).toBe(PENDING_LABEL);
  });

  it('formatea el dato si existe', () => {
    expect(orPending(14)).toBe('14');
    expect(orPending(5000, (c) => `${c / 100} €`)).toBe('50 €');
  });
});

describe('findPendingFields', () => {
  it('lista nulls y listas vacías con su ruta', () => {
    expect(
      findPendingFields({ a: null, b: { c: 1, d: null, e: [] }, f: ['x'], g: 'ok' }),
    ).toEqual(['a', 'b.d', 'b.e']);
  });

  it('no marca ceros ni cadenas como pendientes', () => {
    expect(findPendingFields({ a: 0, b: '', c: false })).toEqual([]);
  });
});
