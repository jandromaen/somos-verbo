import Link from 'next/link';
import { parseMarkdown, type Inline } from '@/lib/content/markdown';

function Inlines({ content }: { content: Inline[] }) {
  return content.map((node, i) => {
    switch (node.type) {
      case 'strong':
        return <strong key={i} className="font-semibold">{node.text}</strong>;
      case 'em':
        return <em key={i}>{node.text}</em>;
      case 'link':
        return (
          <Link key={i} href={node.href} className="underline underline-offset-4 hover:text-accent">
            {node.text}
          </Link>
        );
      default:
        return node.text;
    }
  });
}

/** Texto largo de página (textos SEO, introducciones). */
export function Markdown({ source, className = '' }: { source: string; className?: string }) {
  return (
    <div className={`max-w-[70ch] space-y-4 leading-[1.7] ${className}`}>
      {parseMarkdown(source).map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="pt-4 font-serif text-h3-sm lg:text-h3">
                <Inlines content={block.content} />
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="pt-2 text-body font-semibold">
                <Inlines content={block.content} />
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className="list-disc space-y-2 pl-5">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inlines content={item} />
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i}>
                <Inlines content={block.content} />
              </p>
            );
        }
      })}
    </div>
  );
}
