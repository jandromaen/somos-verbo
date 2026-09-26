// BORRADOR: revisar Jandro (CLAUDE.md, 6.5 y 10.3)
import type { CollectionSlug } from '@/config/catalogo';
import type { PageCopy } from './types';

export const collectionCopy: Record<CollectionSlug, PageCopy> = {
  'fe-y-valor': {
    metaDescription:
      'Ropa cristiana de fe y valor: sudaderas y camisetas con Filipenses 4:13, Josué 1:9 o Isaías 41:10. Versículos para los días en que hace falta fuerza.',
    intro:
      'Ropa cristiana de fe y valor: versículos para los exámenes, las operaciones, los cambios de ciudad y todos los días en los que hace falta coraje.',
    body: `## Versículos de fe y valor

La Biblia está llena de personas que tenían miedo. Josué tenía que ocupar el lugar de Moisés; Pablo escribía desde la cárcel; los discípulos vieron a su maestro detenido. Los versículos de esta colección no niegan ese miedo: le responden. Por eso son los que más se buscan para una época exigente.

El más conocido es [Filipenses 4:13](/versiculos/filipenses-4-13), «Todo lo puedo en Cristo», que habla de aguantar tanto en la abundancia como en la escasez, no de ganar siempre. [Josué 1:9](/versiculos/josue-1-9), «Sé fuerte y valiente», es una orden acompañada de una promesa: Dios va contigo a donde vayas. [Isaías 41:10](/versiculos/isaias-41-10) repite «No temas» a un pueblo en el exilio, e [Isaías 40:31](/versiculos/isaias-40-31) promete fuerzas nuevas a quien espera en el Señor.

Si la ropa es para alguien que pasa por un momento difícil, [2 Timoteo 1:7](/versiculos/2-timoteo-1-7) recuerda que no hemos recibido un espíritu de cobardía, y [Juan 16:33](/versiculos/juan-16-33) es la palabra de Jesús la noche antes de su pasión: «Tened valor, yo he vencido al mundo». Son versículos que se llevan bien a diario, y funcionan como regalo para una confirmación o una despedida.`,
    faqs: [
      {
        q: '¿Qué versículo de valor regalo a alguien que está pasando un mal momento?',
        a: 'Isaías 41:10 y Josué 1:9 hablan directamente al miedo y prometen compañía, no que todo vaya a salir bien. Para alguien enfermo o en duelo suelen tener más sentido que una frase de victoria.',
      },
      {
        q: '¿Filipenses 4:13 significa que puedo conseguir todo lo que me proponga?',
        a: 'No exactamente. Pablo lo escribe desde la cárcel y habla de saber vivir con poco y con mucho gracias a la fuerza de Cristo. Es una frase sobre perseverar en cualquier situación, no una promesa de éxito.',
      },
      {
        q: '¿Qué diferencia hay entre Josué 1:9 y Deuteronomio 31:6?',
        a: 'Los dos animan a ser fuertes y valientes, pero en Deuteronomio 31:6 Moisés habla a todo el pueblo antes de despedirse, y en Josué 1:9 es Dios quien se lo dice a Josué cuando le toca guiarlo. El primero mira a la comunidad; el segundo, a quien asume una responsabilidad.',
      },
    ],
  },
  esperanza: {
    metaDescription:
      'Ropa cristiana de esperanza: sudaderas y camisetas con Jeremías 29:11, Romanos 8:28 o el Salmo 91. Versículos para mirar adelante con confianza.',
    intro:
      'Ropa cristiana de esperanza: versículos para quien empieza algo nuevo, espera una noticia o necesita recordar que la última palabra no la tiene el problema.',
    body: `## Versículos de esperanza

La esperanza cristiana no es optimismo. Es la confianza en que Dios sigue actuando aunque no se vea nada. Esta colección reúne versículos escritos, muchas veces, en momentos oscuros: el exilio en Babilonia, la persecución, la enfermedad.

[Jeremías 29:11](/versiculos/jeremias-29-11), «Yo sé los planes que tengo para ti», fue una carta a gente desterrada a la que se le pedía paciencia durante setenta años. [Romanos 8:28](/versiculos/romanos-8-28), «Todo ayuda a bien», no dice que todo sea bueno, sino que Dios puede sacar bien de todo. El [Salmo 91](/versiculos/salmo-91), «Al abrigo del Altísimo», es la oración de protección más rezada, y el [Salmo 121:2](/versiculos/salmo-121-2) se cantaba de camino a Jerusalén para recordar de dónde viene la ayuda.

Para quien espera algo concreto, [Hebreos 11:1](/versiculos/hebreos-11-1) define la fe como «la certeza de lo que se espera». Y para un duelo, [Juan 11:25](/versiculos/juan-11-25), «Yo soy la resurrección y la vida», y [Apocalipsis 21:4](/versiculos/apocalipsis-21-4), «Enjugará toda lágrima», son de los versículos que más consuelo han dado. Una prenda con uno de ellos es un recordatorio diario de que la historia no ha terminado.`,
    faqs: [
      {
        q: '¿A quién escribió Jeremías «Yo sé los planes que tengo para ti»?',
        a: 'A los judíos deportados a Babilonia. El profeta les pide que construyan casas y planten huertos porque el destierro será largo, y les asegura que Dios tiene para ellos un futuro de paz. Es una promesa hecha a un pueblo en espera, no una garantía de éxito inmediato.',
      },
      {
        q: '¿Qué versículo de esperanza es adecuado para alguien en duelo?',
        a: 'Juan 11:25 y Apocalipsis 21:4 hablan de la resurrección y del final del llanto, y el Salmo 121 de la compañía de Dios en el camino. Son textos que consuelan sin quitar importancia al dolor.',
      },
      {
        q: '¿Por qué el Salmo 91 tiene otra numeración en algunas Biblias?',
        a: 'Las Biblias católicas que siguen la numeración de la Vulgata lo cuentan como Salmo 90, porque agrupan los salmos de forma un poco distinta. Es el mismo texto; en la página del versículo lo indicamos.',
      },
    ],
  },
  amor: {
    metaDescription:
      'Ropa cristiana de amor: sudaderas y camisetas con Juan 3:16, 1 Corintios 13 o 1 Juan 4:8. Versículos sobre el amor de Dios y el amor al prójimo.',
    intro:
      'Ropa cristiana de amor: los versículos que resumen el Evangelio, del amor de Dios al mundo al amor que se demuestra con paciencia y perdón.',
    body: `## Versículos sobre el amor

Si hubiera que resumir la Biblia en una palabra, muchos elegirían esta. La colección de amor reúne los versículos que explican cómo ama Dios y cómo pide que nos amemos entre nosotros.

[Juan 3:16](/versiculos/juan-3-16), «De tal manera amó Dios al mundo», es seguramente el versículo más citado del Nuevo Testamento. [1 Juan 4:8](/versiculos/1-juan-4-8) va aún más lejos: «Dios es amor». Y [Romanos 5:8](/versiculos/romanos-5-8) recuerda que ese amor no esperó a que lo mereciéramos. [Romanos 8:39](/versiculos/romanos-8-39) cierra la lista con una certeza: nada nos podrá separar del amor de Dios.

La otra cara es el amor que se practica. [1 Corintios 13](/versiculos/1-corintios-13), «El amor es paciente», se lee en muchas bodas, pero Pablo lo escribió para una comunidad dividida. [Mateo 22:39](/versiculos/mateo-22-39) y [Efesios 4:32](/versiculos/efesios-4-32) hablan del prójimo y del perdón, y [1 Corintios 16:14](/versiculos/1-corintios-16-14), «Todo con amor», es un buen lema para llevar puesto. Son versículos que funcionan bien como regalo de pareja, de aniversario o para alguien que sirve a los demás.`,
    faqs: [
      {
        q: '¿Por qué Juan 3:16 es el versículo más conocido?',
        a: 'Porque resume en una frase el centro del Evangelio: Dios ama al mundo, entrega a su Hijo y ofrece vida eterna a quien cree. Muchos lo llaman «el Evangelio en miniatura».',
      },
      {
        q: '¿1 Corintios 13 es solo para bodas?',
        a: 'No. Pablo lo escribió a una comunidad cristiana llena de rivalidades para explicar que los dones no sirven de nada sin amor. Se lee en bodas porque describe muy bien el amor que dura, pero vale para cualquier relación.',
      },
      {
        q: '¿Qué versículo de amor regalo a una pareja cristiana?',
        a: '1 Corintios 13 y 1 Corintios 16:14 son los más elegidos. Si queréis algo que os recuerde a los dos a Dios, 1 Juan 4:8, «Dios es amor», es breve y reconocible.',
      },
    ],
  },
  confianza: {
    metaDescription:
      'Ropa cristiana de confianza: sudaderas y camisetas con el Salmo 23, Proverbios 3:5 o Mateo 11:28. Versículos para soltar el control y descansar en Dios.',
    intro:
      'Ropa cristiana de confianza: versículos para los días de ansiedad, las decisiones difíciles y los momentos en que toca soltar el control.',
    body: `## Versículos de confianza

Confiar no es fácil cuando todo depende de nosotros. Esta colección reúne los versículos que invitan a lo contrario: a descansar en Dios y a dejar en sus manos lo que no podemos controlar.

El [Salmo 23](/versiculos/salmo-23), «El Señor es mi pastor», es probablemente la oración de confianza más querida de la Biblia, y su versículo más recordado, [Salmo 23:4](/versiculos/salmo-23-4), habla de no temer mal alguno «aunque ande en valle de sombra de muerte». [Proverbios 3:5](/versiculos/proverbios-3-5) pide confiar en el Señor de todo corazón y no apoyarse en la propia prudencia.

Para la ansiedad del día a día, [Filipenses 4:6](/versiculos/filipenses-4-6), «Por nada estéis afanosos», y [1 Pedro 5:7](/versiculos/1-pedro-5-7), «Él tiene cuidado de vosotros», son de los versículos que más se repiten. [Mateo 11:28](/versiculos/mateo-11-28), «Venid a mí», es la invitación de Jesús a los cansados. Y si hay una decisión por delante, [Proverbios 16:3](/versiculos/proverbios-16-3) y el [Salmo 37:5](/versiculos/salmo-37-5) coinciden: encomienda al Señor tu camino. Llevar uno de estos versículos puesto es una forma de recordártelo cuando más falta hace.`,
    faqs: [
      {
        q: '¿Qué versículo ayuda con la ansiedad?',
        a: 'Filipenses 4:6-7 y 1 Pedro 5:7 hablan directamente de la preocupación y proponen llevarla a Dios en oración. Mateo 11:28 añade la invitación de Jesús a descansar. No sustituyen la ayuda profesional cuando hace falta, pero acompañan.',
      },
      {
        q: '¿El Salmo 23 es el Salmo 22?',
        a: 'Sí, en la numeración litúrgica que siguen muchas Biblias católicas el Salmo 23 aparece como Salmo 22. El texto es el mismo, que en la Reina-Valera 1960 empieza «Jehová es mi pastor; nada me faltará».',
      },
      {
        q: '¿Qué versículo de confianza elijo para una etapa de incertidumbre?',
        a: 'Si hay una decisión por delante, Proverbios 3:5 y el Salmo 37:5 invitan a poner el camino en manos de Dios sin apoyarse solo en el propio juicio. Si lo que pesa es la preocupación, Filipenses 4:6 y 1 Pedro 5:7 hablan de llevarla a Dios en oración.',
      },
    ],
  },
  sabiduria: {
    metaDescription:
      'Ropa cristiana de sabiduría: sudaderas y camisetas con Mateo 6:33, Romanos 12:2 o el Salmo 119:105. Versículos para decidir bien y vivir la fe.',
    intro:
      'Ropa cristiana de sabiduría: versículos de Proverbios, Salmos y las cartas del Nuevo Testamento para decidir bien y vivir con coherencia.',
    body: `## Versículos de sabiduría

La sabiduría bíblica no es saber muchas cosas, es saber vivir. Esta colección reúne versículos prácticos, pensados para quien estudia, trabaja o tiene que tomar decisiones importantes.

[Mateo 6:33](/versiculos/mateo-6-33), «Buscad primero el reino de Dios», pone el orden de prioridades. [Romanos 12:2](/versiculos/romanos-12-2), «Transformaos», pide no amoldarse sin más a lo que hace todo el mundo. El [Salmo 119:105](/versiculos/salmo-119-105), «Lámpara es a mis pies tu palabra», compara la Escritura con una luz que alumbra el siguiente paso, no todo el camino.

Para estudiantes y opositores, [Colosenses 3:23](/versiculos/colosenses-3-23), «Hacedlo de corazón», da sentido al trabajo de cada día, y [Santiago 1:5](/versiculos/santiago-1-5) invita a pedir sabiduría a Dios sin miedo. [Proverbios 4:23](/versiculos/proverbios-4-23), «Guarda tu corazón», y [Santiago 1:22](/versiculos/santiago-1-22), «Hacedores de la palabra», recuerdan que la fe se nota en lo que hacemos. Son buenos versículos para un regalo de graduación, de inicio de curso, de fin de carrera o para un catequista que acompaña a otros.`,
    faqs: [
      {
        q: '¿Qué versículo regalo a un estudiante o a alguien que oposita?',
        a: 'Colosenses 3:23 da sentido al esfuerzo diario, Santiago 1:5 anima a pedir sabiduría y el Salmo 119:105 habla de avanzar paso a paso. Los tres encajan con una etapa de estudio larga.',
      },
      {
        q: '¿Qué significa «buscad primero el reino de Dios»?',
        a: 'En Mateo 6:33 Jesús responde a la preocupación por la comida y el vestido. No dice que esas cosas no importen, sino que al poner a Dios en el centro lo demás encuentra su sitio.',
      },
      {
        q: '¿Por qué hay tantos versículos de Proverbios en esta colección?',
        a: 'Proverbios es el libro sapiencial por excelencia: consejos breves sobre el trabajo, las palabras, la amistad y la relación con Dios. Sus frases cortas, además, se leen muy bien en una prenda.',
      },
    ],
  },
  alabanza: {
    metaDescription:
      'Ropa cristiana de alabanza y gratitud: sudaderas y camisetas con Salmos y versículos para dar gracias en todo, como 1 Tesalonicenses 5:16-18.',
    intro:
      'Ropa cristiana de alabanza y gratitud: versículos para dar gracias, empezar el día con alegría y bendecir a quien quieres.',
    body: `## Versículos de alabanza y gratitud

Buena parte de los Salmos son cantos: se escribieron para rezarse en voz alta, a veces con instrumentos y en comunidad. Esta colección reúne versículos de alabanza y de gratitud, perfectos para quien canta en un coro o un grupo de alabanza, o para quien quiere recordar cada mañana todo lo que tiene.

[1 Tesalonicenses 5:16-18](/versiculos/1-tesalonicenses-5-16-18), «Dad gracias en todo», es un resumen de la vida cristiana en tres frases. El [Salmo 118:24](/versiculos/salmo-118-24), «Este es el día que hizo el Señor», es una forma de empezar la jornada, y el [Salmo 100:1](/versiculos/salmo-100-1) invita a cantar alegres a Dios. El [Salmo 139:14](/versiculos/salmo-139-14), «Formidables, maravillosas son tus obras», da gracias por la propia vida.

Si buscas una bendición para otra persona, [Números 6:24](/versiculos/numeros-6-24), «El Señor te bendiga y te guarde», es la bendición que los sacerdotes de Israel daban al pueblo y un regalo precioso para un bautizo o una despedida. Y el [Salmo 103:2](/versiculos/salmo-103-2), «Bendice, alma mía, al Señor», pide no olvidar ninguno de sus beneficios.`,
    faqs: [
      {
        q: '¿Qué es la bendición de Números 6:24?',
        a: 'Es la bendición que Dios enseñó a Aarón y a sus hijos para bendecir al pueblo de Israel. En la Reina-Valera 1960 empieza «Jehová te bendiga, y te guarde», y se sigue usando hoy en celebraciones católicas y evangélicas.',
      },
      {
        q: '¿Qué versículo de alabanza regalo a alguien que canta en un coro?',
        a: 'El Salmo 100:1 y el Salmo 118:24 hablan directamente de cantar y alegrarse en Dios. Para alguien que dirige la alabanza, 1 Tesalonicenses 5:16-18 recuerda que la gratitud va más allá de la música.',
      },
      {
        q: '¿Dar gracias en todo significa dar gracias por todo lo que pasa?',
        a: 'Pablo dice dar gracias «en todo», no «por todo». Es posible dar gracias a Dios en medio de una situación dura sin dar gracias por lo malo en sí: por su presencia, por las personas cercanas o por lo que sí tenemos.',
      },
    ],
  },
  identidad: {
    metaDescription:
      'Ropa cristiana de identidad en Cristo: sudaderas y camisetas con Juan 14:6, Gálatas 2:20 o 2 Corintios 5:17. Versículos sobre quién eres en Cristo.',
    intro:
      'Ropa cristiana de identidad en Cristo: versículos sobre quién es Jesús y sobre quién eres tú a la luz de Él.',
    body: `## Versículos de identidad en Cristo

Muchas de las frases más fuertes de Jesús empiezan por «Yo soy»: el camino, la vid, la luz del mundo. Y muchas de las más fuertes de Pablo hablan de lo que eso cambia en nosotros. Esta colección reúne ambas: la identidad de Cristo y la nuestra en Él.

[Juan 14:6](/versiculos/juan-14-6), «El camino, la verdad y la vida», y [Juan 8:12](/versiculos/juan-8-12), «Yo soy la luz del mundo», son dos de las declaraciones más directas de Jesús. [Juan 15:5](/versiculos/juan-15-5), «Yo soy la vid», explica que sin Él no podemos dar fruto. Y [Juan 1:1](/versiculos/juan-1-1), «En el principio era el Verbo», es el versículo que da nombre a esta tienda.

Del lado de quien cree, [2 Corintios 5:17](/versiculos/2-corintios-5-17), «Nueva criatura es», y [Gálatas 2:20](/versiculos/galatas-2-20), «Ya no vivo yo, vive Cristo en mí», son ideales para quien acaba de bautizarse o de confirmar su fe. [Mateo 5:14](/versiculos/mateo-5-14), «Sois la luz del mundo», y [Mateo 28:19](/versiculos/mateo-28-19), «Id y haced discípulos», hablan de misión: de lo que se espera de un cristiano ahí fuera.`,
    faqs: [
      {
        q: '¿Qué significa ser una nueva criatura en Cristo?',
        a: 'En 2 Corintios 5:17 Pablo explica que quien está unido a Cristo empieza una vida nueva: lo viejo no define ya quién es. Por eso es un versículo muy elegido para bautismos de adultos y confirmaciones.',
      },
      {
        q: '¿Por qué la tienda se llama Somos Verbo?',
        a: 'Por el prólogo del Evangelio de Juan: «En el principio era el Verbo» y «el Verbo se hizo carne». El Verbo es la Palabra de Dios hecha persona en Jesús; nuestra idea es que la Palabra también se haga vida en lo que llevamos.',
      },
      {
        q: '¿Cuáles son los «Yo soy» de Jesús en el Evangelio de Juan?',
        a: 'Hay siete con imagen: el pan de vida, la luz del mundo, la puerta, el buen pastor, la resurrección y la vida, el camino, la verdad y la vida, y la vid verdadera. Varios de ellos tienen su prenda en esta colección o en la de esperanza.',
      },
    ],
  },
  gracia: {
    metaDescription:
      'Ropa cristiana de gracia y salvación: sudaderas y camisetas con Efesios 2:8, Romanos 10:9 o el Salmo 51:10. Versículos sobre el perdón de Dios.',
    intro:
      'Ropa cristiana de gracia y salvación: versículos sobre el perdón, la fe y el regalo que no se gana con méritos propios.',
    body: `## Versículos de gracia y salvación

Gracia significa regalo. Los versículos de esta colección cuentan lo que el cristianismo entiende como la mejor noticia posible: que Dios perdona y salva, y que no hace falta ganárselo.

[Efesios 2:8](/versiculos/efesios-2-8), «Por gracia sois salvos», es el resumen más claro: la salvación viene por la fe y no por obras, para que nadie presuma. [Romanos 10:9](/versiculos/romanos-10-9) recoge una de las confesiones de fe más antiguas: «Jesús es el Señor». Y [Hechos 16:31](/versiculos/hechos-16-31), «Cree en el Señor Jesucristo», fue la respuesta de Pablo a un carcelero que le preguntó qué tenía que hacer.

El perdón tiene también su oración. El [Salmo 51:10](/versiculos/salmo-51-10), «Crea en mí un corazón limpio», es la súplica de David después de su pecado, y [1 Juan 1:9](/versiculos/1-juan-1-9) promete que Dios es fiel y justo para perdonar. [Isaías 53:5](/versiculos/isaias-53-5), «Por su llaga fuimos nosotros curados», anuncia siglos antes la pasión de Cristo. Son versículos para Cuaresma, para una conversión o para cualquiera que necesite empezar de nuevo.`,
    faqs: [
      {
        q: '¿Qué diferencia hay entre gracia y misericordia?',
        a: 'Se suele explicar así: la misericordia es que Dios no nos trata según nuestras faltas, y la gracia es que nos da lo que no hemos merecido, empezando por la salvación. Los versículos de esta colección hablan de las dos.',
      },
      {
        q: '¿El Salmo 51 tiene otro número en las Biblias católicas?',
        a: 'Sí: en la numeración litúrgica aparece como Salmo 50, y se conoce también por su primera palabra en latín, Miserere. Es el salmo penitencial más rezado, especialmente en Cuaresma.',
      },
      {
        q: '¿Qué versículo regalo a alguien que acaba de convertirse?',
        a: 'Romanos 10:9 y Hechos 16:31 hablan de creer y confesar a Jesús, y 2 Corintios 5:17, de la colección de identidad, de la vida nueva que empieza. Cualquiera de los tres recuerda ese momento.',
      },
    ],
  },
};
