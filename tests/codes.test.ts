import { describe, expect, it } from 'vitest';
import { allVerses } from '@/config/catalogo';
import { productName, productSlug, sku, slugify, verseCode } from '@/lib/catalog/codes';

describe('slugify', () => {
  it('quita tildes, eñes y signos', () => {
    expect(slugify('Sé fuerte y valiente')).toBe('se-fuerte-y-valiente');
    expect(slugify('¿De quién temeré?')).toBe('de-quien-temere');
    expect(slugify('Año de gracia')).toBe('ano-de-gracia');
  });
});

describe('productSlug y productName', () => {
  it('sigue el patrón {prenda}-{nombre}-{versiculo}', () => {
    expect(productSlug('sudadera', 'Todo lo puedo', 'filipenses-4-13')).toBe(
      'sudadera-todo-lo-puedo-filipenses-4-13',
    );
    expect(productName('camiseta', 'Todo lo puedo')).toBe('Camiseta «Todo lo puedo»');
  });
});

describe('sku', () => {
  it('genera el formato SV-LIBRO-PRENDA-COLOR-TALLA', () => {
    expect(sku('filipenses-4-13', 'sudadera', 'negro', 'M')).toBe('SV-FIL4-13-SUD-NEG-M');
    expect(sku('1-corintios-13', 'camiseta', 'blanco', 'XL')).toBe('SV-1CO13-CAM-BLA-XL');
  });

  it('distingue Juan 1:14 de Juan 11:4', () => {
    expect(verseCode('juan-1-14')).not.toBe(verseCode('juan-11-4'));
  });

  it('da un código distinto a cada uno de los 1.000 versículos', () => {
    const codes = allVerses.map((v) => verseCode(v.slug));
    expect(new Set(codes).size).toBe(allVerses.length);
  });
});
