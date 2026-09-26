// BORRADOR: revisar Jandro (CLAUDE.md, 6.2 y 10.3)
import type { Faq } from './types';

export const homeCopy: { heading: string; body: string; faqs: Faq[] } = {
  heading: 'Ropa cristiana para llevar la fe al día a día',
  body: `Somos Verbo nace de Juan 1:14, «Y el Verbo se hizo carne»: la Palabra no se quedó en los libros, se hizo vida. Nuestra ropa cristiana quiere algo parecido, que un versículo salga de la Biblia y te acompañe a clase, al trabajo o al grupo de oración. Cada [sudadera](/sudaderas-cristianas) y cada [camiseta](/camisetas-cristianas) lleva un solo versículo, con un diseño sobrio, y tiene detrás una página que explica qué significa y en qué contexto se escribió. Sirve para católicos y evangélicos por igual, y es un [regalo cristiano](/regalos-cristianos) con sentido para una confirmación, un bautizo o alguien que lo está pasando mal.`,
  faqs: [
    {
      q: '¿Qué es Somos Verbo?',
      a: 'Una tienda online de ropa cristiana: sudaderas y camisetas con versículos de la Biblia en la traducción Reina-Valera 1960. Cada versículo tiene su propia página con el texto completo, su significado y su contexto.',
    },
    {
      q: '¿Cómo encuentro la prenda de un versículo concreto?',
      a: 'Escribe la cita o unas palabras de la frase en el buscador de versículos, o recorre el índice de versículos, ordenado por colecciones como fe y valor, esperanza o confianza.',
    },
    {
      q: '¿Es buena idea regalar ropa cristiana?',
      a: 'Es un regalo que se usa y se ve, y que recuerda un momento concreto, como una confirmación o un bautizo. Para acertar, elige un versículo que tenga que ver con la persona o con esa etapa de su vida; en la sección de regalos cristianos tienes ideas por ocasión.',
    },
    {
      q: '¿Hacéis envíos a toda España?',
      a: 'De momento enviamos a la España peninsular y a Baleares. Canarias, Ceuta y Melilla quedan fuera por ahora, porque los envíos allí llevan impuestos y trámites de aduana distintos.',
    },
  ],
};
