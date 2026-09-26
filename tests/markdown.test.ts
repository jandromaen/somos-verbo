import { describe, expect, it } from 'vitest';
import { extractLinks, parseMarkdown, plainText } from '@/lib/content/markdown';

describe('markdown mínimo', () => {
  it('reconoce títulos, listas, párrafos y formato en línea', () => {
    const blocks = parseMarkdown('## Título\n\nUn **texto** con *cursiva* y [enlace](/versiculos/juan-3-16).\n\n- uno\n- dos');
    expect(blocks.map((b) => b.type)).toEqual(['h2', 'p', 'ul']);
    expect(blocks[1]).toEqual({
      type: 'p',
      content: [
        { type: 'text', text: 'Un ' },
        { type: 'strong', text: 'texto' },
        { type: 'text', text: ' con ' },
        { type: 'em', text: 'cursiva' },
        { type: 'text', text: ' y ' },
        { type: 'link', text: 'enlace', href: '/versiculos/juan-3-16' },
        { type: 'text', text: '.' },
      ],
    });
    expect(blocks[2]).toMatchObject({ type: 'ul', items: [[{ text: 'uno' }], [{ text: 'dos' }]] });
  });

  it('extrae enlaces y texto plano', () => {
    const md = '## Hola\n\nVer [Salmo 23](/versiculos/salmo-23) y **más**.';
    expect(extractLinks(md)).toEqual(['/versiculos/salmo-23']);
    expect(plainText(md)).toBe('Hola\n\nVer Salmo 23 y más.');
  });
});
