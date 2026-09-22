/**
 * Estructura del catálogo (CLAUDE.md, sección 10.2): 101 versículos.
 *
 * Sirve para la navegación y las rutas estáticas mientras no exista la base
 * de datos. En la fase 2 los textos completos se cargan en Supabase desde
 * `contenido/versiculos/*.md`.
 */

export type CollectionSlug =
  | 'fe-y-valor'
  | 'esperanza'
  | 'amor'
  | 'confianza'
  | 'sabiduria'
  | 'alabanza'
  | 'identidad'
  | 'gracia';

export type Collection = {
  slug: CollectionSlug;
  name: string;
  /** Para títulos como «Ropa cristiana de {tema}». */
  theme: string;
};

export type Verse = {
  slug: string;
  reference: string;
  collection: CollectionSlug;
  popularPhrase: string;
};

export type Occasion = {
  slug: string;
  name: string;
  h1: string;
};

export const collections: Collection[] = [
  { slug: 'fe-y-valor', name: 'Fe y valor', theme: 'fe y valor' },
  { slug: 'esperanza', name: 'Esperanza', theme: 'esperanza' },
  { slug: 'amor', name: 'Amor', theme: 'amor' },
  { slug: 'confianza', name: 'Confianza', theme: 'confianza' },
  { slug: 'sabiduria', name: 'Sabiduría', theme: 'sabiduría' },
  { slug: 'alabanza', name: 'Alabanza y gratitud', theme: 'alabanza y gratitud' },
  { slug: 'identidad', name: 'Identidad en Cristo', theme: 'identidad en Cristo' },
  { slug: 'gracia', name: 'Gracia y salvación', theme: 'gracia y salvación' },
];

type C = CollectionSlug;
const v = (slug: string, reference: string, collection: C, popularPhrase: string): Verse => ({
  slug,
  reference,
  collection,
  popularPhrase,
});

/** Ordenados por prioridad de búsqueda (lista de Jandro, septiembre de 2026). */
export const verses: Verse[] = [
  v('juan-3-16', 'Juan 3:16', 'amor', 'De tal manera amó Dios al mundo'),
  v('filipenses-4-13', 'Filipenses 4:13', 'fe-y-valor', 'Todo lo puedo en Cristo'),
  v('salmo-23', 'Salmo 23', 'confianza', 'El Señor es mi pastor'),
  v('jeremias-29-11', 'Jeremías 29:11', 'esperanza', 'Yo sé los planes que tengo para ti'),
  v('josue-1-9', 'Josué 1:9', 'fe-y-valor', 'Sé fuerte y valiente'),
  v('isaias-41-10', 'Isaías 41:10', 'fe-y-valor', 'No temas, yo estoy contigo'),
  v('proverbios-3-5', 'Proverbios 3:5', 'confianza', 'Confía en el Señor de todo corazón'),
  v('salmo-91', 'Salmo 91', 'esperanza', 'Al abrigo del Altísimo'),
  v('romanos-8-28', 'Romanos 8:28', 'esperanza', 'Todo ayuda a bien'),
  v('genesis-1-1', 'Génesis 1:1', 'identidad', 'En el principio creó Dios'),
  v('salmo-23-4', 'Salmo 23:4', 'confianza', 'No temeré mal alguno'),
  v('mateo-6-33', 'Mateo 6:33', 'sabiduria', 'Buscad primero el reino de Dios'),
  v('isaias-40-31', 'Isaías 40:31', 'fe-y-valor', 'Levantarán alas como las águilas'),
  v('filipenses-4-6', 'Filipenses 4:6', 'confianza', 'Por nada estéis afanosos'),
  v('1-corintios-13', '1 Corintios 13', 'amor', 'El amor es paciente'),
  v('salmo-121-2', 'Salmo 121:2', 'esperanza', 'Mi socorro viene del Señor'),
  v('romanos-12-2', 'Romanos 12:2', 'sabiduria', 'Transformaos'),
  v('juan-14-6', 'Juan 14:6', 'identidad', 'El camino, la verdad y la vida'),
  v('salmo-46-1', 'Salmo 46:1', 'esperanza', 'Dios es nuestro amparo y fortaleza'),
  v('mateo-11-28', 'Mateo 11:28', 'confianza', 'Venid a mí'),
  v('2-timoteo-1-7', '2 Timoteo 1:7', 'fe-y-valor', 'Poder, amor y dominio propio'),
  v('salmo-119-105', 'Salmo 119:105', 'sabiduria', 'Lámpara es a mis pies tu palabra'),
  v('galatas-5-22', 'Gálatas 5:22', 'amor', 'Amor, gozo, paz'),
  v('1-tesalonicenses-5-16-18', '1 Tesalonicenses 5:16-18', 'alabanza', 'Dad gracias en todo'),
  v('salmo-27-1', 'Salmo 27:1', 'fe-y-valor', '¿De quién temeré?'),
  v('hebreos-11-1', 'Hebreos 11:1', 'esperanza', 'La certeza de lo que se espera'),
  v('efesios-2-8', 'Efesios 2:8', 'gracia', 'Por gracia sois salvos'),
  v('1-juan-4-8', '1 Juan 4:8', 'amor', 'Dios es amor'),
  v('proverbios-16-3', 'Proverbios 16:3', 'confianza', 'Encomienda al Señor tus obras'),
  v('juan-10-10', 'Juan 10:10', 'identidad', 'Vida en abundancia'),
  v('apocalipsis-3-20', 'Apocalipsis 3:20', 'identidad', 'Estoy a la puerta y llamo'),
  v('marcos-11-24', 'Marcos 11:24', 'fe-y-valor', 'Creed que lo recibiréis'),
  v('romanos-8-31', 'Romanos 8:31', 'fe-y-valor', 'Si Dios es por nosotros'),
  v('santiago-1-5', 'Santiago 1:5', 'sabiduria', 'Pídala a Dios'),
  v('jeremias-33-3', 'Jeremías 33:3', 'confianza', 'Clama a mí, y yo te responderé'),
  v('salmo-37-4', 'Salmo 37:4', 'alabanza', 'Deléitate en el Señor'),
  v('mateo-28-19', 'Mateo 28:19', 'identidad', 'Id y haced discípulos'),
  v('colosenses-3-23', 'Colosenses 3:23', 'sabiduria', 'Hacedlo de corazón'),
  v('2-corintios-5-17', '2 Corintios 5:17', 'identidad', 'Nueva criatura es'),
  v('deuteronomio-31-6', 'Deuteronomio 31:6', 'fe-y-valor', 'Esforzaos y cobrad ánimo'),
  v('salmo-100-1', 'Salmo 100:1', 'alabanza', 'Cantad alegres a Dios'),
  v('salmo-34-8', 'Salmo 34:8', 'confianza', 'Gustad, y ved que es bueno'),
  v('salmo-139-14', 'Salmo 139:14', 'alabanza', 'Formidables, maravillosas son tus obras'),
  v('romanos-5-8', 'Romanos 5:8', 'amor', 'Cristo murió por nosotros'),
  v('mateo-7-7', 'Mateo 7:7', 'confianza', 'Pedid, y se os dará'),
  v('numeros-6-24', 'Números 6:24', 'alabanza', 'El Señor te bendiga y te guarde'),
  v('proverbios-4-23', 'Proverbios 4:23', 'sabiduria', 'Guarda tu corazón'),
  v('salmo-118-24', 'Salmo 118:24', 'alabanza', 'Este es el día que hizo el Señor'),
  v('galatas-2-20', 'Gálatas 2:20', 'identidad', 'Ya no vivo yo, vive Cristo en mí'),
  v('juan-8-32', 'Juan 8:32', 'identidad', 'La verdad os hará libres'),
  v('salmo-1-1', 'Salmo 1:1', 'sabiduria', 'Bienaventurado el varón'),
  v('romanos-10-9', 'Romanos 10:9', 'gracia', 'Jesús es el Señor'),
  v('juan-15-5', 'Juan 15:5', 'identidad', 'Yo soy la vid'),
  v('efesios-6-10', 'Efesios 6:10', 'fe-y-valor', 'Fortaleceos en el Señor'),
  v('salmo-51-10', 'Salmo 51:10', 'gracia', 'Crea en mí un corazón limpio'),
  v('mateo-5-14', 'Mateo 5:14', 'identidad', 'Sois la luz del mundo'),
  v('lucas-1-37', 'Lucas 1:37', 'fe-y-valor', 'Nada hay imposible para Dios'),
  v('salmo-103-2', 'Salmo 103:2', 'alabanza', 'Bendice, alma mía, al Señor'),
  v('juan-1-1', 'Juan 1:1', 'identidad', 'En el principio era el Verbo'),
  v('1-pedro-5-7', '1 Pedro 5:7', 'confianza', 'Él tiene cuidado de vosotros'),
  v('proverbios-18-10', 'Proverbios 18:10', 'esperanza', 'Torre fuerte es el nombre del Señor'),
  v('efesios-3-20', 'Efesios 3:20', 'fe-y-valor', 'Mucho más abundantemente'),
  v('salmo-121-7', 'Salmo 121:7', 'esperanza', 'El Señor te guardará de todo mal'),
  v('juan-11-25', 'Juan 11:25', 'esperanza', 'Yo soy la resurrección y la vida'),
  v('santiago-1-22', 'Santiago 1:22', 'sabiduria', 'Hacedores de la palabra'),
  v('2-corintios-5-7', '2 Corintios 5:7', 'fe-y-valor', 'Por fe andamos, no por vista'),
  v('hechos-1-8', 'Hechos 1:8', 'fe-y-valor', 'Recibiréis poder'),
  v('salmo-119-11', 'Salmo 119:11', 'sabiduria', 'En mi corazón he guardado tus dichos'),
  v('proverbios-3-7', 'Proverbios 3:7', 'sabiduria', 'Teme al Señor y apártate del mal'),
  v('mateo-18-20', 'Mateo 18:20', 'identidad', 'Allí estoy yo en medio de ellos'),
  v('hebreos-12-1', 'Hebreos 12:1', 'fe-y-valor', 'Corramos con paciencia la carrera'),
  v('salmo-37-5', 'Salmo 37:5', 'confianza', 'Encomienda al Señor tu camino'),
  v('efesios-4-32', 'Efesios 4:32', 'amor', 'Perdonándoos unos a otros'),
  v('salmo-139-1', 'Salmo 139:1', 'identidad', 'Tú me has examinado y conocido'),
  v('jeremias-17-7', 'Jeremías 17:7', 'confianza', 'Bendito el que confía en el Señor'),
  v('deuteronomio-6-5', 'Deuteronomio 6:5', 'amor', 'Amarás al Señor tu Dios'),
  v('1-corintios-10-13', '1 Corintios 10:13', 'fe-y-valor', 'Fiel es Dios'),
  v('mateo-6-14', 'Mateo 6:14', 'amor', 'Si perdonáis a los hombres sus ofensas'),
  v('salmo-23-6', 'Salmo 23:6', 'confianza', 'El bien y la misericordia me seguirán'),
  v('hechos-16-31', 'Hechos 16:31', 'gracia', 'Cree en el Señor Jesucristo'),
  v('juan-15-13', 'Juan 15:13', 'amor', 'Nadie tiene mayor amor que este'),
  v('romanos-8-39', 'Romanos 8:39', 'amor', 'Nada nos podrá separar del amor de Dios'),
  v('proverbios-22-6', 'Proverbios 22:6', 'sabiduria', 'Instruye al niño en su camino'),
  v('salmo-143-8', 'Salmo 143:8', 'alabanza', 'Hazme oír por la mañana tu misericordia'),
  v('romanos-15-13', 'Romanos 15:13', 'esperanza', 'El Dios de esperanza'),
  v('isaias-53-5', 'Isaías 53:5', 'gracia', 'Por su llaga fuimos nosotros curados'),
  v('salmo-91-11', 'Salmo 91:11', 'esperanza', 'A sus ángeles mandará cerca de ti'),
  v('mateo-22-39', 'Mateo 22:39', 'amor', 'Amarás a tu prójimo como a ti mismo'),
  v('1-juan-1-9', '1 Juan 1:9', 'gracia', 'Fiel y justo para perdonar'),
  v('salmo-19-14', 'Salmo 19:14', 'sabiduria', 'Sean gratos los dichos de mi boca'),
  v('1-corintios-16-14', '1 Corintios 16:14', 'amor', 'Todo con amor'),
  v('salmo-42-1', 'Salmo 42:1', 'confianza', 'Como el ciervo brama por las aguas'),
  v('proverbios-31-30', 'Proverbios 31:30', 'sabiduria', 'La mujer que teme al Señor'),
  v('deuteronomio-31-8', 'Deuteronomio 31:8', 'fe-y-valor', 'El Señor va delante de ti'),
  v('1-juan-5-14', '1 Juan 5:14', 'confianza', 'Él nos oye'),
  v('salmo-62-1', 'Salmo 62:1', 'esperanza', 'En Dios solamente está acallada mi alma'),
  v('mateo-5-3', 'Mateo 5:3', 'gracia', 'Bienaventurados los pobres en espíritu'),
  v('juan-8-12', 'Juan 8:12', 'identidad', 'Yo soy la luz del mundo'),
  v('salmo-118-1', 'Salmo 118:1', 'alabanza', 'Para siempre es su misericordia'),
  v('apocalipsis-21-4', 'Apocalipsis 21:4', 'esperanza', 'Enjugará toda lágrima'),
  v('juan-16-33', 'Juan 16:33', 'fe-y-valor', 'Tened valor, yo he vencido al mundo'),
];

export const occasions: Occasion[] = [
  { slug: 'confirmacion', name: 'Confirmación', h1: 'Regalos de confirmación: sudaderas y camisetas cristianas' },
  { slug: 'bautizo', name: 'Bautizo', h1: 'Regalos de bautizo: sudaderas y camisetas cristianas' },
  { slug: 'catequistas', name: 'Catequistas', h1: 'Regalos para catequistas: sudaderas y camisetas cristianas' },
  { slug: 'sacerdotes-y-pastores', name: 'Sacerdotes y pastores', h1: 'Regalos para sacerdotes y pastores: sudaderas y camisetas cristianas' },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getVerse(slug: string) {
  return verses.find((v) => v.slug === slug);
}

export function getOccasion(slug: string) {
  return occasions.find((o) => o.slug === slug);
}

/** Los más buscados: los que se destacan en la home, categorías y 404. */
export const featuredVerses = verses.slice(0, 12);
