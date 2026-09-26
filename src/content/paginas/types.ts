export type Faq = { q: string; a: string };

/** Textos de una página de catálogo (CLAUDE.md, 10.3). Markdown mínimo: ver src/lib/content/markdown.ts. */
export type PageCopy = {
  /** `description` de la página (≤ 155 caracteres). */
  metaDescription: string;
  /** 1–3 frases bajo el H1. */
  intro: string;
  /** Texto SEO (debajo de la rejilla) o cuerpo de la página de ocasión. */
  body: string;
  faqs: Faq[];
};
