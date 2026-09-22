# Cotejo de `text_rvr` (1.000 versículos) — informe

Fecha: 2026-09-22 · Ámbito: `contenido/versiculos/*.md`, campos `text_reference` y `text_rvr`.

## Resultado en una línea

No se ha encontrado ningún error grave (tipo b). **No se ha modificado ningún archivo.** `npx tsx scripts/check-contenido.ts` sigue dando «✔ 1000 versículos válidos». No hay commits.

## 1. Fuente usada

No hay ninguna RVR1960 pública descargable: tiene copyright, npm no devuelve ningún paquete útil y la búsqueda de GitHub está bloqueada en este entorno. Se ha usado la **Reina-Valera 1909**, que es de dominio público, a partir de dos fuentes independientes:

- **A**: `scrollmapper/bible_databases`, archivo `formats/json/SpaRV.json` («SpaRV: La Santa Biblia Reina-Valera (1909)»). En los Salmos incluye los títulos dentro del versículo 1.
- **B**: `thiagobodruk/bible`, archivo `json/es_rvr.json` (también RV1909, con ortografía antigua como «á» o «fué»). No incluye los títulos de los Salmos, pero en algunos libros añade marcas de versificación del tipo «(13-13)».

Ambas están en `scratchpad/biblia/`. Para cada archivo se ha tomado la mejor similitud de las dos fuentes.

## 2. Método

Script: `scratchpad/cotejo.py`. Resultados: `scratchpad/cotejo.json`, ordenados por similitud.

- Lee `text_reference` y admite rangos (`23:1-3`), listas (`13:4-7, 13`) y sufijos de medio versículo (`14:33a`).
- Normaliza el texto: minúsculas, sin tildes ni puntuación, sin marcas «(n-n)», y cuenta «Jehová» y «Señor» como la misma palabra.
- Métrica: `difflib.SequenceMatcher.ratio()` sobre listas de palabras.

Comprobaciones adicionales:

- `scratchpad/cotejo_extra.py`: busca si nuestro texto se parece más a otro versículo del capítulo anterior, del mismo o del siguiente (para detectar versículos equivocados). También marca las longitudes anómalas y los bloques de 4 o más palabras que faltan o sobran.
- `scratchpad/diffs.py` y `scratchpad/diffs2.py`: sacan los cambios de palabras poco frecuentes (que aparecen una sola vez) en los textos con similitud ≥ 0,8, con atención a las negaciones «no», «ni», «nunca» y «sin». Así se buscan cambios de sentido escondidos en textos con puntuación alta. Se han revisado a mano unas 740 diferencias.

## 3. Distribución de similitudes (frente a la RV1909)

| Rango | Archivos |
| --- | --- |
| ≥ 0,9 | 533 |
| 0,8–0,9 | 267 |
| 0,7–0,8 | 133 |
| 0,6–0,7 | 43 |
| 0,5–0,6 | 15 |
| < 0,5 | 9 |

Las puntuaciones bajas se deben casi siempre a la revisión de 1960, que modernizó mucho el texto: «caridad» pasó a «amor», «mas» a «pero», y se reordenaron frases (por ejemplo, «Danos hoy nuestro pan cotidiano» pasó a «El pan nuestro de cada día, dánoslo hoy»).

## 4. Revisión manual de los 75 más bajos y de los casos marcados

Se han revisado a mano los 75 más bajos (se pidieron 60), los 52 marcados por `cotejo_extra.py` y los cambios poco frecuentes de palabras. Cada texto se ha comparado con la RVR1960 que conozco.

**(a) Diferencia normal entre la 1909 y la 1960: todos salvo los de (c).** Los 60 más bajos son:
juan-3-30 (0,12), mateo-6-11 (0,15), salmo-32-1, efesios-4-31, mateo-5-11, job-11-18, juan-11-35, salmo-34-19, proverbios-31-25, deuteronomio-33-25, 1-pedro-3-4, salmo-33-12, proverbios-19-17, daniel-10-19, proverbios-17-17, romanos-12-18, proverbios-14-29, salmo-91-16, mateo-14-27, filipenses-4-11, rut-2-12, 1-corintios-3-6, colosenses-3-16, proverbios-20-27, romanos-8-18, salmo-139-17, salmo-16-11, salmo-37-3, lucas-1-37, miqueas-7-19, 2-corintios-10-5, genesis-8-22, 1-corintios-13, 1-timoteo-4-12, salmo-34-5, salmo-90-17, 1-pedro-1-22, eclesiastes-3-1, hebreos-11-1, 1-corintios-13-8, hechos-1-8, salmo-42-11, salmo-17-8, exodo-15-2, filemon-1-7, filipenses-1-3, juan-20-22, oseas-14-4, proverbios-4-7, salmo-18-1, salmo-30-11, salmo-40-2, eclesiastes-3-11, 2-timoteo-2-22, galatas-6-10, marcos-5-36, jeremias-32-27, colosenses-3-14 (0,69). En todos, nuestro texto coincide con la RVR1960.

**(c) Problema del script, de la fuente o de la referencia (nuestro texto está bien):**

- `1-corintios-14-33` (0,57): la referencia es «14:33a», medio versículo. El script compara con el versículo entero.
- `2-corintios-13-14` (0,62): la fuente 1909 numera este versículo como 13:13 y le añade la nota final de la carta («Epístola á los Corintios fué enviada de Filipos…»).
- `jonas-2-9`: la fuente A usa la versificación hebrea (desfase de 1 en Jonás 2). Con la fuente B la comparación es correcta.
- Salmos con título (18:1, 34:1, 51:1, 84:1, 90:1, etc.): la fuente A mete el título en el versículo 1. La fuente B no lo hace, así que la métrica final no se ve afectada.
- `habacuc-3-19`: la 1909 incluye al final la nota musical «Al jefe de los cantores…».

**(b) Errores reales: ninguno.** Tampoco se ha detectado ningún texto que corresponda a otro versículo, ni frases que falten o sobren, ni cambios de sentido por negaciones.

## 5. Archivos corregidos

Ninguno.

## 6. Dudosos sin corregir

Ninguno con dudas concretas.

Una advertencia: el cotejo se ha hecho contra la 1909, y la 1960 se ha comprobado de memoria. Los cambios de una sola palabra que dan una variante también posible en la 1960 no se pueden descartar del todo sin una RVR1960 autorizada. Antes del lanzamiento, conviene hacer un muestreo con un ejemplar impreso o con la edición de las Sociedades Bíblicas Unidas, sobre todo en los 533 textos con similitud ≥ 0,9, donde las erratas de una sola palabra son menos visibles.
