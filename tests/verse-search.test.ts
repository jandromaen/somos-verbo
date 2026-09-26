import { describe, expect, it } from 'vitest';
import { allVerses, collections } from '@/config/catalogo';
import { normalize, searchVerses, type SearchEntry } from '@/lib/search/verse-search';

const names = new Map(collections.map((c) => [c.slug, c.name]));
const index: SearchEntry[] = allVerses.map((v) => [v.slug, v.reference, v.popularPhrase, names.get(v.collection)!]);
const first = (query: string) => searchVerses(index, query)[0]?.slug;

describe('normalize', () => {
  it('quita tildes, mayúsculas y signos', () => {
    expect(normalize('Isaías 41:10')).toBe('isaias 41 10');
    expect(normalize('  El Señor es mi pastor ')).toBe('el senor es mi pastor');
  });
});

describe('searchVerses', () => {
  it('encuentra por referencia escrita de muchas formas', () => {
    for (const q of ['Juan 3:16', 'juan 3 16', 'JUAN 3.16', 'juan3:16', 'jn 3 16']) expect(first(q)).toBe('juan-3-16');
    expect(first('isaias 41 10')).toBe('isaias-41-10');
    expect(first('salmos 23')).toBe('salmo-23');
    expect(first('1 corintios 13')).toBe('1-corintios-13');
  });

  it('encuentra por frase sin tildes', () => {
    expect(first('todo lo puedo')).toBe('filipenses-4-13');
    expect(first('el senor es mi pastor')).toBe('salmo-23');
  });

  it('con solo el libro devuelve sus versículos por orden de prioridad', () => {
    const results = searchVerses(index, 'filipenses');
    expect(results[0].slug).toBe('filipenses-4-13');
    expect(results.every((r) => r.reference.startsWith('Filipenses'))).toBe(true);
  });

  it('no devuelve nada con una consulta vacía o sin coincidencias', () => {
    expect(searchVerses(index, '  ')).toEqual([]);
    expect(searchVerses(index, 'xyzxyz')).toEqual([]);
  });

  it('limita el número de resultados', () => {
    expect(searchVerses(index, 'salmo', 5)).toHaveLength(5);
  });
});
