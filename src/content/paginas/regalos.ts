// BORRADOR: revisar Jandro (CLAUDE.md, 6.7 y 10.3)
import type { PageCopy } from './types';

export type OccasionCopy = PageCopy & {
  /** Versículos recomendados para la ocasión (slugs), en el orden en que se muestran. */
  verses: string[];
};

export const giftsHubCopy: PageCopy = {
  metaDescription:
    'Regalos cristianos con sentido: sudaderas y camisetas con versículos para confirmaciones, bautizos, catequistas, sacerdotes y pastores.',
  intro:
    'Regalos cristianos que se usan y se recuerdan: una sudadera o una camiseta con el versículo adecuado para esa persona y ese momento.',
  body: `## Cómo acertar con un regalo cristiano

Un buen regalo cristiano no tiene por qué ser un objeto de vitrina. Una prenda con un versículo se lleva puesta, se ve y, sobre todo, recuerda un momento concreto: el día de la confirmación, el bautizo de un ahijado o el final de un curso de catequesis.

La clave está en el versículo. Antes de elegir, piensa en tres cosas: qué está viviendo esa persona, qué te gustaría decirle y qué frase podría llevar sin sentirse incómoda. Para un comienzo, [Jeremías 29:11](/versiculos/jeremias-29-11) o [2 Corintios 5:17](/versiculos/2-corintios-5-17); para dar ánimo, [Josué 1:9](/versiculos/josue-1-9); para bendecir, [Números 6:24](/versiculos/numeros-6-24). En cada página de versículo tienes su significado, así que puedes explicar por qué lo has elegido, que es muchas veces la mejor parte del regalo.

Abajo tienes ideas por ocasión, con los versículos que mejor encajan y por qué. Si buscas uno concreto, usa el [buscador de versículos](/buscar). Todas nuestras prendas sirven a católicos y evangélicos por igual.`,
  faqs: [
    {
      q: '¿Y si no acierto con la talla del regalo?',
      a: 'Consulta antes la guía de tallas y, si puedes, compárala con una prenda que la persona ya use. Si aun así no acierta, tiene el derecho de desistimiento de 14 días naturales desde la entrega que marca la ley; en la página de devoluciones te explicamos cómo hacerlo.',
    },
    {
      q: '¿Qué regalo cristiano hago a alguien que no conozco mucho?',
      a: 'Elige un versículo muy reconocible y amable, como Juan 3:16, el Salmo 23 o Números 6:24. Son frases que casi cualquier cristiano aprecia, sin mensajes demasiado personales.',
    },
    {
      q: '¿Puedo regalar ropa cristiana a alguien de otra confesión?',
      a: 'Sí. Nuestras prendas solo llevan el texto bíblico y su referencia, sin símbolos propios de una iglesia, así que valen igual para católicos, evangélicos u ortodoxos.',
    },
  ],
};

export const occasionCopy: Record<string, OccasionCopy> = {
  confirmacion: {
    metaDescription:
      'Regalos de confirmación con sentido: sudaderas y camisetas con versículos sobre el Espíritu Santo y la fe adulta. Ideas para padrinos y familia.',
    intro:
      'Ideas de regalos de confirmación para padrinos, madrinas y familia: una prenda con un versículo sobre el Espíritu Santo, el valor o la vocación.',
    verses: [
      'hechos-1-8',
      '2-timoteo-1-7',
      'galatas-5-22',
      'josue-1-9',
      'jeremias-29-11',
      'mateo-5-14',
      'filipenses-4-13',
      'romanos-12-2',
    ],
    body: `## Un regalo de confirmación que se use

La confirmación suele llegar en la adolescencia, aunque la edad depende de cada diócesis, y en muchos lugares se celebra en primavera. Es el momento en que alguien confirma por sí mismo la fe que recibió en el bautismo. Por eso un regalo de confirmación funciona mejor cuando habla de esa fe adulta y no es solo un recuerdo del día.

Una sudadera o una camiseta con un versículo tiene una ventaja sobre las medallas o los marcos: se usa. Va al instituto, a la universidad o al grupo de jóvenes, y cada vez que alguien pregunte por la frase será una ocasión para explicarla.

### Versículos para una confirmación

- **Sobre el Espíritu Santo.** [Hechos 1:8](/versiculos/hechos-1-8), «Recibiréis poder», es la promesa de Jesús antes de la Ascensión y el versículo más ligado a este sacramento. [Gálatas 5:22](/versiculos/galatas-5-22) enumera los frutos del Espíritu: amor, gozo, paz.
- **Sobre el valor.** [2 Timoteo 1:7](/versiculos/2-timoteo-1-7) habla de un espíritu de poder, amor y dominio propio, y [Josué 1:9](/versiculos/josue-1-9) anima a ser fuerte y valiente en una etapa nueva.
- **Sobre el futuro.** [Jeremías 29:11](/versiculos/jeremias-29-11), «Yo sé los planes que tengo para ti», es de los más regalados a quien empieza a decidir su camino.
- **Sobre la misión.** [Mateo 5:14](/versiculos/mateo-5-14), «Sois la luz del mundo», recuerda que la fe confirmada es para compartirla.

### Un consejo para padrinos y madrinas

Acompaña la prenda con una nota breve que explique por qué has elegido ese versículo. En la página de cada uno tienes su significado para inspirarte. Es un detalle sencillo que convierte la ropa en un recuerdo de tu papel como padrino o madrina.`,
    faqs: [
      {
        q: '¿Qué versículo es el más adecuado para una confirmación?',
        a: 'Hechos 1:8 es el más directamente relacionado, porque habla de recibir la fuerza del Espíritu Santo. Si prefieres algo más personal, 2 Timoteo 1:7 o Jeremías 29:11 encajan muy bien con la adolescencia.',
      },
      {
        q: '¿Qué suele regalar el padrino o la madrina de confirmación?',
        a: 'Tradicionalmente, algo que recuerde el sacramento y acompañe la vida de fe. Una prenda con un versículo elegido con intención cumple ese papel, y puede complementarse con una Biblia o una carta personal.',
      },
      {
        q: '¿Cuándo conviene comprar el regalo de confirmación?',
        a: 'Con algo de margen antes de la celebración, sobre todo en primavera, cuando se concentran muchas confirmaciones. Así hay tiempo para revisar la talla con calma antes del día.',
      },
    ],
  },
  bautizo: {
    metaDescription:
      'Regalos de bautizo cristianos para padres, padrinos y bautizados adultos: sudaderas y camisetas con versículos de bendición y vida nueva.',
    intro:
      'Regalos de bautizo con sentido: prendas con versículos de bendición para los padres y los padrinos, o de vida nueva para quien se bautiza de joven o de adulto.',
    verses: [
      'numeros-6-24',
      'proverbios-22-6',
      'salmo-139-14',
      '2-corintios-5-17',
      'galatas-2-20',
      'mateo-28-19',
      'juan-15-5',
    ],
    body: `## Regalos de bautizo más allá del bebé

Nuestras prendas van en tallas de adulto, así que no son para vestir al bebé el día del bautizo. Pero un bautizo es una celebración de toda la familia, y hay personas a las que un versículo puede acompañar mucho tiempo: los padres, que empiezan a educar en la fe; los padrinos, que prometen ayudarles; y, cada vez más, jóvenes y adultos que piden el bautismo por sí mismos, algo habitual también en las iglesias evangélicas.

### Para los padres y los padrinos

- [Números 6:24](/versiculos/numeros-6-24), «El Señor te bendiga y te guarde», es una de las bendiciones más antiguas de la Biblia y una forma preciosa de celebrar una vida nueva.
- [Proverbios 22:6](/versiculos/proverbios-22-6), «Instruye al niño en su camino», habla precisamente de la tarea que padres y padrinos asumen en el bautismo.
- El [Salmo 139:14](/versiculos/salmo-139-14), «Formidables, maravillosas son tus obras», da gracias por cada vida, formada por Dios desde el principio.

### Para quien se bautiza de joven o de adulto

- [2 Corintios 5:17](/versiculos/2-corintios-5-17), «Nueva criatura es», resume lo que significa el bautismo: lo viejo pasó.
- [Gálatas 2:20](/versiculos/galatas-2-20), «Ya no vivo yo, vive Cristo en mí», es la confesión de alguien que ha puesto a Cristo en el centro.
- [Mateo 28:19](/versiculos/mateo-28-19) recoge el mandato de Jesús de bautizar en el nombre del Padre, del Hijo y del Espíritu Santo.

Un regalo así no se queda guardado en un cajón. Y cuando el bautizado sea mayor, los padrinos que llevaban su versículo tendrán una historia que contarle.`,
    faqs: [
      {
        q: '¿Tenéis ropa de bebé para el bautizo?',
        a: 'No. Nuestras sudaderas y camisetas van en tallas de adulto, pensadas para padres, padrinos, familiares o para quien se bautiza de joven o de adulto.',
      },
      {
        q: '¿Qué versículo regalo a los padrinos de un bautizo?',
        a: 'Proverbios 22:6 habla de acompañar al niño en su camino, que es justo el compromiso de un padrino. Números 6:24 es una bendición preciosa para compartir entre padres y padrinos.',
      },
      {
        q: '¿Qué versículo es adecuado para un bautismo de adulto?',
        a: '2 Corintios 5:17 y Gálatas 2:20 hablan de la vida nueva en Cristo, que es lo que celebra el bautismo. Para quien llega a la fe después de una etapa difícil, Juan 8:32, «La verdad os hará libres», también tiene mucho sentido.',
      },
    ],
  },
  catequistas: {
    metaDescription:
      'Regalos para catequistas: sudaderas y camisetas con versículos sobre enseñar, servir y acompañar en la fe. Ideas para el final del curso.',
    intro:
      'Regalos para catequistas y monitores de grupos de fe: un versículo que agradezca su tiempo y les acompañe en las reuniones, campamentos y convivencias.',
    verses: [
      'proverbios-22-6',
      'mateo-28-19',
      'colosenses-3-23',
      'salmo-119-105',
      'santiago-1-22',
      '1-corintios-16-14',
      'mateo-18-20',
    ],
    body: `## Un detalle para quien enseña la fe

Los catequistas dedican tardes enteras, año tras año, a acompañar a niños y jóvenes en la fe. Casi siempre lo hacen como voluntarios. El final del curso, la última sesión antes de la comunión o la confirmación, o una convivencia de grupo son buenos momentos para agradecérselo.

Una prenda es un regalo práctico para alguien que pasa horas en salones parroquiales, excursiones y campamentos. Y si toda la familia o el grupo se pone de acuerdo, el mismo versículo puede convertirse en el «uniforme» de un equipo de catequistas.

### Versículos para catequistas

- **Sobre enseñar.** [Proverbios 22:6](/versiculos/proverbios-22-6), «Instruye al niño en su camino», es el versículo del educador. [Mateo 28:19](/versiculos/mateo-28-19), «Id y haced discípulos», es el encargo del que nace toda catequesis.
- **Sobre servir.** [Colosenses 3:23](/versiculos/colosenses-3-23), «Hacedlo de corazón», y [1 Corintios 16:14](/versiculos/1-corintios-16-14), «Todo con amor», valoran el trabajo callado de cada semana.
- **Sobre la Palabra.** El [Salmo 119:105](/versiculos/salmo-119-105), «Lámpara es a mis pies tu palabra», y [Santiago 1:22](/versiculos/santiago-1-22), «Hacedores de la palabra», hablan de lo que el catequista transmite.
- **Sobre la comunidad.** [Mateo 18:20](/versiculos/mateo-18-20), «Allí estoy yo en medio de ellos», es la promesa que se cumple en cada reunión de grupo.

### Regalo de grupo

Si el regalo lo hacen varias familias juntas, elegir un versículo sencillo y reconocible ayuda. Acompañado de una tarjeta firmada por los niños, se convierte en un recuerdo del curso.`,
    faqs: [
      {
        q: '¿Qué se le regala a una catequista al final del curso?',
        a: 'Algo práctico y con significado. Una sudadera o camiseta con un versículo sobre enseñar o servir, como Proverbios 22:6 o Colosenses 3:23, se usa en las propias actividades del grupo y recuerda a esos niños.',
      },
      {
        q: '¿Puede todo un equipo de catequistas llevar el mismo versículo?',
        a: 'Sí. Cada persona elige su talla y su color. Mateo 28:19 o Mateo 18:20 funcionan muy bien como versículo de equipo en campamentos y convivencias.',
      },
      {
        q: '¿Hay versículos pensados para monitores de grupos de jóvenes?',
        a: 'Además de los de esta página, Mateo 5:14, «Sois la luz del mundo», anima a dar ejemplo, y Romanos 12:2 invita a no conformarse con lo que hace todo el mundo. Los encuentras por su cita en el buscador de versículos.',
      },
    ],
  },
  'sacerdotes-y-pastores': {
    metaDescription:
      'Regalos para sacerdotes y pastores: sudaderas y camisetas con versículos para ordenaciones, aniversarios y despedidas de parroquia o iglesia.',
    intro:
      'Regalos para sacerdotes y pastores en una ordenación, un aniversario o una despedida: un versículo que agradezca su servicio y les acompañe fuera del templo.',
    verses: ['salmo-23', 'numeros-6-24', 'isaias-40-31', 'mateo-11-28', 'juan-15-5', 'mateo-28-19', '1-corintios-16-14'],
    body: `## Un regalo para quien cuida de la comunidad

Sacerdotes y pastores pasan buena parte de su vida cuidando de otros. Una ordenación, un aniversario de ministerio, un cambio de destino o una despedida de la parroquia o de la iglesia son momentos en los que la comunidad quiere darles las gracias.

Una prenda con un versículo es un regalo para su vida fuera del altar o del púlpito: para los días de descanso, los retiros, los campamentos con jóvenes o las peregrinaciones. Y, a diferencia de muchos regalos institucionales, se usa de verdad.

### Versículos para un sacerdote o un pastor

- **El pastor.** El [Salmo 23](/versiculos/salmo-23), «El Señor es mi pastor», recuerda que quien pastorea también es pastoreado. Es probablemente el regalo más acertado.
- **Una bendición.** [Números 6:24](/versiculos/numeros-6-24), «El Señor te bendiga y te guarde», devuelve al pastor la bendición que tantas veces ha dado.
- **Para el cansancio.** [Isaías 40:31](/versiculos/isaias-40-31), «Levantarán alas como las águilas», y [Mateo 11:28](/versiculos/mateo-11-28), «Venid a mí», hablan de las fuerzas nuevas y del descanso que el ministerio necesita.
- **Para la misión.** [Juan 15:5](/versiculos/juan-15-5), «Yo soy la vid», y [Mateo 28:19](/versiculos/mateo-28-19), «Id y haced discípulos», resumen el sentido de su trabajo.

### Un regalo de toda la comunidad

Si la prenda es un regalo de la parroquia o de la iglesia, puedes acompañarla con una tarjeta firmada por los grupos o con unas palabras en la celebración. El versículo elegido será la manera de decir en pocas palabras lo que la comunidad le agradece.`,
    faqs: [
      {
        q: '¿Qué regalo se hace a un sacerdote en su ordenación o aniversario?',
        a: 'Algo que acompañe su vida de servicio. Una prenda con el Salmo 23 o Números 6:24 es un regalo personal y práctico, que puede sumarse al regalo litúrgico que prepare la comunidad.',
      },
      {
        q: '¿Es apropiado regalar una sudadera a un pastor evangélico?',
        a: 'Sí. Muchos pastores la usarán en retiros, campamentos o en su día a día. Elige un versículo que conecte con su ministerio, como Juan 15:5 o Isaías 40:31.',
      },
      {
        q: '¿Qué versículo regalo en la despedida de un sacerdote o pastor?',
        a: 'Números 6:24 es una bendición perfecta para un adiós, y el Salmo 121:7, «El Señor te guardará de todo mal», acompaña a quien se pone en camino hacia un nuevo destino.',
      },
    ],
  },
};
