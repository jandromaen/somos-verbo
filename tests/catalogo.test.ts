import { describe, expect, it } from 'vitest';
import { allVerses, collections, getSiblingVerses, getVerse, PUBLISHED_WAVE, publishedVerses, verses } from '@/config/catalogo';

describe('catálogo de versículos', () => {
  it('no repite slugs ni referencias', () => {
    expect(new Set(allVerses.map((v) => v.slug)).size).toBe(allVerses.length);
    expect(new Set(allVerses.map((v) => v.reference)).size).toBe(allVerses.length);
  });

  it('no repite frases de prenda (sin distinguir mayúsculas ni tildes)', () => {
    const normalize = (text: string) =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9ñ ]/g, '').trim();
    const phrases = allVerses.map((v) => normalize(v.popularPhrase));
    const repeated = phrases.filter((p, i) => phrases.indexOf(p) !== i);
    expect(repeated).toEqual([]);
  });

  it('usa slugs en minúsculas, sin tildes y con guiones', () => {
    for (const v of allVerses) expect(v.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('asigna cada versículo a una colección existente', () => {
    const known = new Set(collections.map((c) => c.slug));
    for (const v of allVerses) expect(known.has(v.collection)).toBe(true);
  });

  it('solo publica las oleadas activas', () => {
    expect(publishedVerses.every((v) => v.wave <= PUBLISHED_WAVE)).toBe(true);
  });

  it('en la web provisional (no indexable) muestra los 1.000 para revisarlos', () => {
    // Los tests usan NEXT_PUBLIC_SITE_URL=http://localhost:3000, que no se indexa.
    expect(verses).toHaveLength(allVerses.length);
    const hidden = allVerses.find((v) => v.wave > PUBLISHED_WAVE);
    if (hidden) expect(getVerse(hidden.slug)).toBeDefined();
  });

  it('enlaza como mucho 12 versículos hermanos de la misma colección, sin repetir el propio', () => {
    for (const verse of verses) {
      const siblings = getSiblingVerses(verse);
      expect(siblings.length).toBeLessThanOrEqual(12);
      expect(siblings.every((s) => s.collection === verse.collection && s.slug !== verse.slug)).toBe(true);
      expect(new Set(siblings.map((s) => s.slug)).size).toBe(siblings.length);
    }
  });
});
