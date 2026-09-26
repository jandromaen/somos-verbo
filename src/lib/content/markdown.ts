/**
 * Markdown mínimo para los textos de página (src/content/paginas): párrafos,
 * `## ` y `### `, listas con `- `, **negrita**, *cursiva* y [enlaces](/ruta).
 * Se procesa en el servidor, sin dependencias ni JavaScript en el navegador.
 */

export type Inline =
  | { type: 'text'; text: string }
  | { type: 'strong'; text: string }
  | { type: 'em'; text: string }
  | { type: 'link'; text: string; href: string };

export type Block =
  | { type: 'h2' | 'h3' | 'p'; content: Inline[] }
  | { type: 'ul'; items: Inline[][] };

const inlinePattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const match of text.matchAll(inlinePattern)) {
    if (match.index > last) out.push({ type: 'text', text: text.slice(last, match.index) });
    if (match[1]) out.push({ type: 'link', text: match[1], href: match[2] });
    else if (match[3]) out.push({ type: 'strong', text: match[3] });
    else out.push({ type: 'em', text: match[4] });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ type: 'text', text: text.slice(last) });
  return out;
}

export function parseMarkdown(source: string): Block[] {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .map((chunk): Block => {
      if (chunk.startsWith('### ')) return { type: 'h3', content: parseInline(chunk.slice(4)) };
      if (chunk.startsWith('## ')) return { type: 'h2', content: parseInline(chunk.slice(3)) };
      if (chunk.startsWith('- ')) {
        return { type: 'ul', items: chunk.split(/\n(?=- )/).map((item) => parseInline(item.slice(2).replace(/\s*\n\s*/g, ' '))) };
      }
      return { type: 'p', content: parseInline(chunk.replace(/\s*\n\s*/g, ' ')) };
    });
}

/** Todas las rutas enlazadas en un texto (para comprobar que existen). */
export function extractLinks(source: string): string[] {
  return [...source.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g)].map((m) => m[1]);
}

/** Palabras del texto visible, sin la sintaxis de Markdown. */
export function plainText(source: string): string {
  return source
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*#]|^- /gm, '')
    .trim();
}
