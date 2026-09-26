import { readdirSync, readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { allVerses, collections, occasions, publishedVerses } from '@/config/catalogo';
import { categoryCopy } from '@/content/paginas/categorias';
import { collectionCopy } from '@/content/paginas/colecciones';
import { homeCopy } from '@/content/paginas/home';
import { giftsHubCopy, occasionCopy } from '@/content/paginas/regalos';
import type { Faq, PageCopy } from '@/content/paginas/types';
import { countWords } from '@/lib/content/verse-schema';
import { extractLinks, plainText } from '@/lib/content/markdown';

const pages: [string, PageCopy, [number, number]][] = [
  ['sudaderas', categoryCopy.sudaderas, [150, 250]],
  ['camisetas', categoryCopy.camisetas, [150, 250]],
  ...collections.map((c): [string, PageCopy, [number, number]] => [c.slug, collectionCopy[c.slug], [150, 250]]),
  ['regalos', giftsHubCopy, [150, 250]],
  ...occasions.map((o): [string, PageCopy, [number, number]] => [o.slug, occasionCopy[o.slug], [200, 400]]),
];
const allFaqs: Faq[] = [...homeCopy.faqs, ...pages.flatMap(([, copy]) => copy.faqs)];
const allTexts = [homeCopy.body, ...pages.flatMap(([, c]) => [c.intro, c.body, ...c.faqs.flatMap((f) => [f.q, f.a])]), ...homeCopy.faqs.flatMap((f) => [f.q, f.a])];

const published = new Set(publishedVerses.map((v) => v.slug));
const staticRoutes = new Set(['/', '/sudaderas-cristianas', '/camisetas-cristianas', '/versiculos', '/regalos-cristianos', '/buscar', '/blog', '/envios', '/devoluciones', '/guia-de-tallas', '/contacto']);
const isValidLink = (href: string) => {
  if (staticRoutes.has(href)) return true;
  const [, section, slug] = href.split('/');
  if (section === 'versiculos') return published.has(slug);
  if (section === 'colecciones') return collections.some((c) => c.slug === slug);
  if (section === 'regalos-cristianos') return occasions.some((o) => o.slug === slug);
  return false;
};

describe('textos de página (CLAUDE.md, 10.3)', () => {
  it.each(pages)('%s: longitudes y metadatos', (_, copy, [min, max]) => {
    const words = countWords(plainText(copy.body));
    expect(words).toBeGreaterThanOrEqual(min);
    expect(words).toBeLessThanOrEqual(max);
    expect(countWords(copy.intro)).toBeLessThanOrEqual(60);
    expect(copy.metaDescription.length).toBeGreaterThanOrEqual(80);
    expect(copy.metaDescription.length).toBeLessThanOrEqual(155);
    expect(copy.faqs.length).toBeGreaterThanOrEqual(3);
    expect(copy.faqs.length).toBeLessThanOrEqual(5);
    expect(extractLinks(copy.body).length).toBeGreaterThanOrEqual(3);
  });

  it('home: 80–120 palabras y 3–5 preguntas', () => {
    const words = countWords(plainText(homeCopy.body));
    expect(words).toBeGreaterThanOrEqual(80);
    expect(words).toBeLessThanOrEqual(120);
    expect(homeCopy.faqs.length).toBeGreaterThanOrEqual(3);
    expect(homeCopy.faqs.length).toBeLessThanOrEqual(5);
  });

  it('todos los enlaces apuntan a páginas que existen en producción', () => {
    const links = [homeCopy.body, ...pages.map(([, c]) => c.body)].flatMap(extractLinks);
    expect(links.filter((href) => !isValidLink(href))).toEqual([]);
  });

  it('no se citan versículos de oleadas sin publicar', () => {
    const text = allTexts.join('\n');
    const unpublished = allVerses
      // Juan 1:14 es el origen del nombre de la marca: se cita sin enlazar.
      .filter((v) => !published.has(v.slug) && v.slug !== 'juan-1-14')
      .filter((v) => new RegExp(`${v.reference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\d:-])`).test(text));
    expect(unpublished.map((v) => v.reference)).toEqual([]);
  });

  it('los versículos recomendados de cada ocasión están publicados', () => {
    for (const o of occasions) {
      expect(occasionCopy[o.slug].verses.length).toBeGreaterThanOrEqual(5);
      expect(occasionCopy[o.slug].verses.filter((slug) => !published.has(slug))).toEqual([]);
    }
  });

  it('preguntas y meta descriptions únicas en toda la web (también frente a las de versículos)', () => {
    const verseQuestions = readdirSync('contenido/versiculos').flatMap(
      (f) => (matter(readFileSync(`contenido/versiculos/${f}`, 'utf8')).data.faqs as Faq[]).map((faq) => faq.q),
    );
    const own = allFaqs.map((f) => f.q.toLowerCase());
    const fromVerses = new Set(verseQuestions.map((q) => q.toLowerCase()));
    expect(own.filter((q, i) => own.indexOf(q) !== i || fromVerses.has(q))).toEqual([]);
    const metas = pages.map(([, c]) => c.metaDescription);
    expect(new Set(metas).size).toBe(metas.length);
    for (const faq of allFaqs) {
      expect(faq.q.startsWith('¿') && faq.q.endsWith('?')).toBe(true);
      expect(faq.a.length).toBeGreaterThanOrEqual(80);
    }
  });
});
