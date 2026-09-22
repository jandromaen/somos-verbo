import { describe, expect, it } from 'vitest';
import { parsePublicEnv } from '@/lib/env';
import { isIndexable } from '@/lib/seo/indexing';

describe('parsePublicEnv', () => {
  it('falla con un mensaje claro si falta la URL del sitio', () => {
    expect(() => parsePublicEnv({})).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });

  it('rechaza URLs que no son http(s)', () => {
    expect(() => parsePublicEnv({ NEXT_PUBLIC_SITE_URL: 'ftp://somosverbo.es' })).toThrow();
  });

  it('quita la barra final', () => {
    expect(parsePublicEnv({ NEXT_PUBLIC_SITE_URL: 'https://somosverbo.es/' }).NEXT_PUBLIC_SITE_URL).toBe(
      'https://somosverbo.es',
    );
  });
});

describe('isIndexable', () => {
  it('solo indexa el dominio definitivo', () => {
    expect(isIndexable('https://somosverbo.es')).toBe(true);
    expect(isIndexable('https://somos-verbo.jandro.workers.dev')).toBe(false);
    expect(isIndexable('https://abc123-somos-verbo.jandro.workers.dev')).toBe(false);
    expect(isIndexable('http://localhost:3000')).toBe(false);
    expect(isIndexable('https://www.somosverbo.es')).toBe(false);
    expect(isIndexable('no es una url')).toBe(false);
  });
});
