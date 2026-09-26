import type { Faq } from '@/content/paginas/types';
import { JsonLd } from '@/lib/seo/JsonLd';
import { faqPageSchema } from '@/lib/seo/schema';

type FaqsProps = {
  faqs: Faq[];
  heading?: string;
};

/** Preguntas frecuentes en `<details>` (sin JavaScript) con su `FAQPage`. */
export function Faqs({ faqs, heading = 'Preguntas frecuentes' }: FaqsProps) {
  return (
    <section className="mt-14 max-w-[70ch]">
      <h2 className="font-serif text-h3-sm lg:text-h3">{heading}</h2>
      <div className="mt-4 border-t border-line">
        {faqs.map((faq) => (
          <details key={faq.q} className="group border-b border-line">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
              {faq.q}
              <span aria-hidden="true" className="shrink-0 text-muted transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none">
                +
              </span>
            </summary>
            <p className="pb-5 leading-[1.7] text-ink-soft">{faq.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqPageSchema(faqs)} />
    </section>
  );
}
