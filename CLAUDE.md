# CLAUDE.md — Somos Verbo

> Documento maestro del proyecto. Léelo entero antes de escribir una sola línea de código y vuelve a él en cada sesión. Si algo de lo que te pido en el chat contradice este documento, pregúntame antes de actuar.

---

## 0. Tu papel y cómo trabajamos

Eres el desarrollador principal de **Somos Verbo**, una tienda online de ropa cristiana. Yo (Jandro) soy el dueño del proyecto: no soy desarrollador, así que explícame las decisiones en lenguaje claro y en español de España.

**Reglas de trabajo, siempre:**

1. **Una fase por sesión.** Sigue el orden de la sección 15. Al empezar una fase, resume en 5–10 líneas qué vas a hacer y espera mi «adelante» si hay alguna decisión que no esté cerrada en este documento.
2. **Una rama y un pull request por fase** (`fase-1-base`, `fase-2-datos`…). Al terminar, despliega una vista previa en Cloudflare y dame el enlace para revisarla desde el móvil.
3. **Al cerrar cada fase**, entrégame: qué has hecho, cómo probarlo, qué queda pendiente y la checklist de «Hecho cuando» de esa fase marcada.
4. **Nunca inventes datos de negocio** (precios, plazos, gramajes, datos legales, reseñas, estadísticas). Todo dato que falte vive en `src/config/tienda.ts` como `null` y se muestra como `[PENDIENTE]` (ver sección 12).
5. **Nunca subas secretos al repositorio.** Claves solo en variables de entorno. `.env*` siempre en `.gitignore`.
6. **Coste cero.** No actives ningún servicio, plan o función de pago sin preguntarme antes. Si una solución requiere pagar, propón la alternativa gratuita.
7. **Nada destructivo sin confirmación:** borrar tablas, reescribir el historial de Git, cambiar dominios o pasar Stripe a modo real.
8. **Calidad antes que velocidad.** Si detectas que algo de este documento es técnicamente mejorable, dímelo con tu propuesta, pero no lo cambies por tu cuenta.
9. **Código y nombres técnicos en inglés; todo texto visible para el cliente, en español de España** (tuteo, «vosotros»).

---

## 1. El proyecto en una página

- **Qué es:** tienda online de sudaderas y camisetas con versículos de la Biblia. Diseño editorial y cuidado, más cerca de una marca de moda que de una tienda religiosa.
- **Nombre:** Somos Verbo. Inspirado en Juan 1:14: «Y el Verbo se hizo carne». Concepto de marca: *el Verbo, hecho prenda*.
- **Dominio:** `somosverbo.es` (se compra al final; mientras tanto usamos el subdominio gratuito de Cloudflare).
- **Mercado:** España. Idioma: español de España. Moneda: EUR, precios con IVA incluido.
- **Público:** jóvenes y adultos cristianos de 16 a 40 años, católicos y evangélicos por igual, y quien busca un regalo con sentido (confirmaciones, bautizos, catequistas, JMJ de Seúl 2027).
- **Canal de captación: SOLO SEO orgánico y Google Shopping gratuito.** No hay redes sociales ni anuncios. Por tanto:
  - la velocidad, la estructura y el contenido de cada página **son** el negocio;
  - cada decisión técnica se evalúa por su impacto en SEO y en conversión móvil.
- **Catálogo inicial:** 12 versículos × 2 prendas = 24 productos, cada uno con variantes de color y talla.
  - Sudadera: **50 €**.
  - Camiseta: precio `[PENDIENTE]`.
- **Estrategia SEO central:** **una landing por versículo** (p. ej. `/versiculos/filipenses-4-13`) con los productos de ese versículo, su significado real y preguntas frecuentes. Es el long-tail que la competencia no trabaja.

---

## 2. Principios no negociables

1. **Mobile-first.** Diseña y prueba primero a 390 px de ancho. La mayoría del tráfico será móvil.
2. **Core Web Vitals en verde en móvil:** LCP < 2,5 s, INP < 200 ms, CLS < 0,1. Lighthouse móvil ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO en todas las plantillas.
3. **HTML estático siempre que se pueda** (SSG/ISR). El catálogo cambia poco: se regenera al editar productos.
4. **Cero JavaScript innecesario.** Server Components por defecto; `"use client"` solo en lo interactivo (selectores, carrito, acordeones si no bastan `<details>`).
5. **Sin scripts de terceros en el front.** Ni píxeles, ni chats, ni widgets. El pago se hace en Stripe Checkout alojado (redirección), así que no hace falta Stripe.js.
6. **Accesible de verdad:** HTML semántico, foco visible, contraste AA, zonas táctiles ≥ 44 px, `prefers-reduced-motion` respetado.
7. **El servidor manda en precio y stock.** Nunca confíes en precios enviados desde el navegador.
8. **Contenido original en cada página indexable.** Nada de páginas vacías o duplicadas.

---

## 3. Stack técnico

| Pieza | Tecnología | Plan | Notas |
| --- | --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript estricto | — | Última versión estable compatible con el adaptador de Cloudflare |
| Estilos | Tailwind CSS | — | Tokens de la sección 8 en la configuración del tema |
| Hosting | Cloudflare Workers con `@opennextjs/cloudflare` | Gratis | El plan gratuito permite uso comercial. **No usar Vercel Hobby** (solo uso no comercial) |
| Base de datos | Supabase (Postgres + Storage) | Gratis | Región Europa |
| Pagos | Stripe Checkout (alojado) | Sin cuota | Tarjeta, Apple Pay y Google Pay |
| Emails | Resend + React Email | Gratis | Confirmación y envío de pedido |
| Analítica | Cloudflare Web Analytics | Gratis | Sin cookies → no requiere banner de consentimiento |
| Blog | MDX en el repositorio | — | Con frontmatter tipado |
| Tests | Vitest (lógica) + Playwright (flujo de compra) | — | |
| Validación | Zod | — | Entradas de API, variables de entorno y frontmatter |

**Imágenes:** antes de elegir la solución de optimización, verifica qué es gratis en Cloudflare para este proyecto. Preferencia: generar variantes AVIF/WebP en varios anchos al subir cada imagen (script con `sharp`), guardarlas en Supabase Storage o como estáticos, y servirlas con un *loader* propio de `next/image` o `<picture>` con `srcset`. Nada de servicios de imágenes de pago sin preguntarme.

**Supabase gratuito se pausa tras 7 días sin actividad.** Añade un *Cron Trigger* diario de Cloudflare que haga una consulta ligera para mantenerlo activo.

---

## 4. Estructura del repositorio

```
/
├── CLAUDE.md                     ← este documento
├── contenido/
│   └── versiculos.md             ← textos de las 12 landings (fuente para el seed)
├── src/
│   ├── app/                      ← rutas (sección 6)
│   ├── components/               ← UI (sección 8)
│   ├── config/
│   │   └── tienda.ts             ← datos de negocio y [PENDIENTE] (sección 12)
│   ├── lib/
│   │   ├── supabase/             ← clientes (público y servidor)
│   │   ├── stripe/               ← sesión de checkout y webhook
│   │   ├── seo/                  ← metadata, JSON-LD, sitemap, feed
│   │   ├── cart/                 ← estado del carrito
│   │   └── email/                ← plantillas React Email
│   └── content/
│       ├── blog/                 ← artículos .mdx
│       └── legal/                ← textos legales .mdx
├── supabase/
│   ├── migrations/               ← SQL versionado
│   └── seed/                     ← datos iniciales
├── scripts/                      ← imágenes, comprobaciones, utilidades
├── tests/
└── public/
```

---

## 5. Variables de entorno

Valida todas con Zod al arrancar; si falta una, el build falla con un mensaje claro.

| Variable | Uso | Pública |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (primero la de Cloudflare, luego `https://somosverbo.es`) | Sí |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave secreta, **solo servidor** | No |
| `STRIPE_SECRET_KEY` | `sk_test_…` en desarrollo | No |
| `STRIPE_WEBHOOK_SECRET` | Firma del webhook | No |
| `RESEND_API_KEY` | Envío de emails | No |
| `EMAIL_FROM` | `Somos Verbo <pedidos@somosverbo.es>` | No |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` | Despliegue | No |

---

## 6. Rutas, plantillas y contenido de cada página

Reglas generales de URL: minúsculas, guiones, sin tildes, sin barra final, sin parámetros indexables. Cada página tiene **un único H1** con su keyword.

| Ruta | Plantilla | Keyword principal | Indexable |
| --- | --- | --- | --- |
| `/` | Home | ropa cristiana | Sí |
| `/sudaderas-cristianas` | Categoría | sudaderas cristianas | Sí |
| `/camisetas-cristianas` | Categoría | camisetas cristianas | Sí |
| `/versiculos` | Índice de versículos | ropa con versículos de la Biblia | Sí |
| `/versiculos/[slug]` | Landing de versículo | sudadera/camiseta + versículo | Sí |
| `/colecciones/[slug]` | Colección | ropa cristiana + tema | Sí |
| `/producto/[slug]` | Ficha de producto | nombre + versículo | Sí |
| `/regalos-cristianos` | Hub de regalos | regalos cristianos | Sí |
| `/regalos-cristianos/[ocasion]` | Regalo por ocasión | regalo de confirmación, etc. | Sí |
| `/blog`, `/blog/[slug]` | Blog | informativas | Sí (los borradores, no) |
| `/carrito` | Carrito | — | No |
| `/pedido/gracias` | Confirmación | — | No |
| `/envios`, `/devoluciones`, `/guia-de-tallas`, `/contacto` | Ayuda | — | Sí |
| `/aviso-legal`, `/privacidad`, `/cookies`, `/condiciones-de-venta` | Legal | — | Sí, sin prioridad en sitemap |

**Slugs:** colecciones `fe-y-valor`, `esperanza`, `amor`, `confianza`. Ocasiones `confirmacion`, `bautizo`, `catequistas`, `sacerdotes-y-pastores`. Producto: `{prenda}-{nombre}-{versiculo}`, p. ej. `sudadera-todo-lo-puedo-filipenses-4-13`.

**Variantes:** color y talla **no** generan URLs. El color seleccionado puede reflejarse como `?color=negro` para compartir, con canonical siempre a la URL limpia.

### 6.1 Elementos comunes (layout)

- **Barra de aviso** fija arriba: envío gratis a partir de `{tienda.envio.gratisDesde}` y plazo de devolución. Texto corto, una línea en móvil.
- **Header:** en móvil, hamburguesa · logo centrado · carrito con contador. En escritorio, logo a la izquierda, navegación (Sudaderas, Camisetas, Versículos, Regalos, Blog) y buscar/carrito a la derecha.
- **Logo tipográfico:** «Somos *Verbo*» en Instrument Serif, «Verbo» en cursiva.
- **Migas de pan** en todas las páginas salvo la home, con `BreadcrumbList`.
- **Footer** oscuro: marca, enlaces de Tienda, Ayuda y Legal, y la línea de crédito de la traducción bíblica (sección 10).
- **Carrito lateral** (drawer) que se abre al añadir un producto, además de la página `/carrito`.

### 6.2 Home `/`

En este orden:

1. **Hero:** a la izquierda (arriba en móvil), la frase grande en serif «Y el Verbo se hizo carne. Ahora, prenda.» con la referencia «Juan 1:14». Debajo, el **H1** en tamaño de texto normal: «Ropa cristiana con sentido: sudaderas y camisetas con versículos de la Biblia». Dos botones: «Ver sudaderas» y «Ver camisetas». A la derecha (debajo en móvil), foto principal. La foto es el LCP: con prioridad de carga.
2. **Colecciones:** 4 tarjetas (foto, nombre, versículos que incluye). Enlace «Ver toda la ropa cristiana».
3. **Los más buscados:** 4 productos destacados (campo `featured`).
4. **Busca por versículo:** chips con los 12 versículos → landings. Es enlazado interno clave: no lo quites.
5. **Regalos cristianos:** 4 bloques oscuros → páginas de ocasión.
6. **Calidad:** 3 columnas con gramaje, técnica de estampado y origen (datos de `tienda.ts`).
7. **Texto SEO + preguntas frecuentes:** un H2 «Ropa cristiana para llevar la fe al día a día», un párrafo de 80–120 palabras y 3–5 preguntas en `<details>` (con `FAQPage`).
8. **Del blog:** 3 últimos artículos publicados.

### 6.3 Categoría `/sudaderas-cristianas` y `/camisetas-cristianas`

- H1 («Sudaderas cristianas con versículos de la Biblia»), introducción de 2–3 líneas arriba.
- Rejilla de productos (2 columnas en móvil, 4 en escritorio). Filtros simples por colección y color **del lado del cliente, sin URLs nuevas indexables**.
- Bloque de enlaces a las 12 landings de versículo.
- Texto SEO de 150–250 palabras **debajo** de la rejilla y 3 preguntas frecuentes.
- Schema: `CollectionPage` + `ItemList` + `BreadcrumbList` + `FAQPage`.

### 6.4 Landing de versículo `/versiculos/[slug]` — la plantilla más importante

1. Migas: Inicio / Versículos / {Referencia}.
2. **El versículo como protagonista visual:** la frase popular en serif muy grande (84 px escritorio / 50 px móvil) con la referencia y la colección.
3. **H1:** «Sudaderas y camisetas de {Referencia}{: frase si procede}».
4. Introducción de 1–2 frases.
5. **Productos del versículo** (sudadera y camiseta) con foto, precio, detalle y botón «Elegir talla» → ficha.
6. **Qué significa {Referencia}:** texto del versículo (Reina-Valera 1960) y significado con contexto (del seed).
7. Nota de numeración cuando aplique (Salmo 23 = 22, Salmo 91 = 90 en la numeración litúrgica).
8. **Otros versículos de la colección:** chips.
9. **Preguntas frecuentes** (del seed) con `FAQPage`.
10. Crédito de la traducción al pie.
- Schema: `CollectionPage` + `ItemList` de sus productos + `BreadcrumbList` + `FAQPage`.

### 6.5 Colección `/colecciones/[slug]`

H1, introducción, versículos de la colección (cada uno con su frase y enlace a su landing), rejilla de productos, texto SEO de 150–250 palabras y preguntas frecuentes.

### 6.6 Ficha de producto `/producto/[slug]`

1. Migas: Inicio / {Categoría} / {Nombre}.
2. **Galería:** carrusel deslizable en móvil (scroll-snap nativo, sin librerías), miniaturas en escritorio. Cambia al elegir color. Proporción 4:5.
3. Referencia del versículo, **H1** («Sudadera cristiana «Todo lo puedo»»), precio y enlace a reseñas (solo si hay reseñas reales).
4. **Selector de color** (círculos de 44 px con nombre accesible) y **selector de talla** (botones XS–XXL; tallas agotadas deshabilitadas y tachadas).
5. **Botón principal:** muestra «Elige tu talla» (deshabilitado) hasta elegir talla; entonces «Añadir al carrito · 50 €». Al pulsar, abre el drawer.
6. Envío y devoluciones en dos líneas.
7. Acordeones: **El versículo** (resumen + enlace a su landing), **Tejido y cuidados**, **Medidas**, **Envíos y devoluciones**.
8. **Reseñas** (sección 7.4).
9. **De la misma colección:** 2–4 productos.
- En móvil, barra fija inferior con precio y botón cuando el botón principal sale de pantalla.
- Schema: `ProductGroup` con `hasVariant` (sección 9.3) + `BreadcrumbList`.

### 6.7 Regalos `/regalos-cristianos` y ocasiones

Hub con las 4 ocasiones. Cada página de ocasión: H1 («Regalos de confirmación: sudaderas y camisetas cristianas»), texto útil de 200–400 palabras (ideas, versículos recomendados para esa ocasión y por qué), selección de productos y preguntas frecuentes. **Deben estar publicadas antes de enero de 2027** (temporada de confirmaciones y comuniones de abril a junio).

### 6.8 Blog

- Artículos MDX en `src/content/blog/` con frontmatter: `title`, `description`, `slug`, `date`, `updated`, `author`, `cover`, `coverAlt`, `tags`, `relatedVerses` (slugs), `draft`.
- `draft: true` → no se lista, `noindex` y fuera del sitemap.
- Plantilla: H1, fecha, imagen, índice si pasa de 1.200 palabras, cuerpo, bloque de productos relacionados (de `relatedVerses`) y artículos relacionados. Schema `Article` + `BreadcrumbList`.
- Primeros artículos (crea el esqueleto con `draft: true`; los textos los aporto yo):
  1. Qué significa Filipenses 4:13 (y qué no)
  2. Versículos bíblicos para una confirmación
  3. Regalos originales de confirmación
  4. Frases bíblicas de ánimo
  5. Qué llevar a la JMJ de Seúl 2027

### 6.9 Ayuda y legal

Ver sección 11. Página de contacto con email y formulario simple (envío por Resend, con honeypot antispam, sin captcha de terceros).

### 6.10 Error 404

Útil y con marca: mensaje claro, buscador o enlaces a categorías y a los 12 versículos. Estado HTTP 404 real.

---

## 7. Carrito, pago, pedidos y reseñas

### 7.1 Carrito

- Estado en el cliente persistido en `localStorage` (lista de `{ sku, qty }`). Solo SKUs y cantidades: precios y nombres se leen siempre del catálogo.
- Drawer lateral + página `/carrito`. Contador en el header.
- Cantidad máxima por línea: 10. Aviso de cuánto falta para el envío gratis (si `tienda.envio.gratisDesde` está definido).
- Venta cruzada discreta: la otra prenda del mismo versículo.

### 7.2 Checkout con Stripe

```
Carrito → POST /api/checkout → Stripe Checkout (alojado) → /pedido/gracias
                                     ↓
                     webhook checkout.session.completed
                                     ↓
              crear pedido + descontar stock + email de confirmación
```

- `/api/checkout` recibe `{ sku, qty }[]`, valida con Zod, lee precios y stock de Supabase, rechaza lo agotado con un mensaje claro y crea la sesión con `price_data` en línea (no hace falta crear productos en Stripe).
- Configuración de la sesión: `mode: payment`, `locale: 'es'`, `currency: 'eur'`, precios con impuestos incluidos, `shipping_address_collection` solo `ES`, `shipping_options` desde `tienda.ts` (tarifa fija y gratis a partir de X), `phone_number_collection` activado, `invoice_creation` activado y `metadata` con los SKUs.
- Envíos al principio: **España peninsular y Baleares.** Canarias, Ceuta y Melilla quedan fuera (IGIC y aduanas) salvo que yo diga lo contrario. Muéstralo claramente en `/envios` y en el checkout.
- **Webhook** `/api/stripe/webhook`: verifica la firma, es **idempotente** (tabla `stripe_events`), descuenta stock con la función atómica `decrement_stock` y, si alguna línea no tuviera stock en ese momento, marca el pedido como `revisar` y me avisa por email.
- Numeración de pedidos: `SV-2026-0001` (secuencia en Postgres).

### 7.3 Emails (React Email + Resend)

Diseño sobrio con la estética de la marca, texto plano alternativo y enlaces absolutos:

1. **Confirmación de pedido:** número, productos, dirección, total, plazo de entrega y política de devoluciones.
2. **Pedido enviado:** con enlace de seguimiento (lo disparo yo al marcar el pedido como enviado).
3. **Aviso interno** a mi email por cada pedido nuevo.
4. **Petición de reseña** 10 días después del envío (Cron Trigger diario de Cloudflare).

### 7.4 Reseñas

- Solo de compras reales: el email de petición lleva un enlace firmado al formulario.
- Se guardan con `approved = false` y las apruebo yo.
- `AggregateRating` en el schema **solo cuando haya reseñas aprobadas.** Jamás reseñas inventadas ni de ejemplo en producción.

### 7.5 Gestión (fase final)

Página `/admin` protegida con Supabase Auth (solo mi email) para: ver y actualizar pedidos (estado, seguimiento), editar stock, aprobar reseñas y activar o desactivar productos. Cada cambio de catálogo revalida las páginas afectadas.

---

## 8. Diseño

### 8.1 Idea

Editorial y sobrio: una marca de moda con alma, no una tienda religiosa. **El elemento memorable es el versículo escrito en grande en serif**: funciona como imagen en el hero de cada landing. Todo lo demás, silencioso y disciplinado. Invierte la audacia en un solo sitio.

### 8.2 Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| `bg` | `#F3EEE6` | Fondo general (hueso) |
| `bg-alt` | `#EAE3D8` | Secciones alternas |
| `placeholder` | `#E4DCCF` | Huecos de imagen mientras carga |
| `ink` | `#16130F` | Texto, barra de aviso, footer, botón secundario |
| `ink-soft` | `#3E3831` | Texto largo sobre `bg-alt` |
| `muted` | `#5C554C` | Texto secundario (contraste ≈ 6:1 sobre `bg`) |
| `line` | `#D9D0C3` | Separadores y bordes |
| `on-dark` | `#CFC6B8` | Texto secundario sobre `ink` |
| `accent` | `#7A2E22` | Botón principal, referencias de versículo, enlaces activos |

Radios: botones 2 px; chips 999 px; imágenes 0. Sin sombras decorativas ni degradados.

### 8.3 Tipografía

- **Instrument Serif** (400, normal y cursiva): logo, titulares y versículos.
- **Archivo** (400, 500, 600, 700): texto, navegación, botones, precios.
- Cargar ambas con `next/font/google` (autoalojadas, subconjunto `latin` y `latin-ext`, `display: swap`).
- Escala: hero 88 px / 54 px móvil (interlineado 0,95); H2 52 / 38 px; H3 30 / 24 px; texto 17 / 15 px (interlineado 1,65–1,75); texto pequeño 13–14 px.
- Líneas de texto largo ≤ 70 caracteres.
- **Moderación con las mayúsculas espaciadas:** úsalas solo para la referencia del versículo, no como etiqueta decorativa sobre cada sección.

### 8.4 Layout

- Contenedor máximo 1440 px; márgenes laterales 64 px escritorio / 20 px móvil.
- Secciones separadas por espacio (72 px escritorio / 48 px móvil) y, cuando haga falta, una línea `line` o fondo `bg-alt`. Nada de tarjetas con sombra.
- Rejillas: productos 2 columnas en móvil y 4 en escritorio; colecciones y regalos, 2 y 4.
- Fotografías de producto en 4:5.

### 8.5 Componentes

Barra de aviso · Header · Menú móvil (panel a pantalla completa) · Migas · Tarjeta de producto · Tarjeta de colección · Chip de versículo · Selector de color · Selector de talla · Botón (principal `accent`, secundario con borde `ink`) · Acordeón (`<details>`) · Bloque de reseñas · Drawer de carrito · Stepper de cantidad · Footer. Documenta cada componente con sus estados (hover, foco, deshabilitado, agotado).

### 8.6 Movimiento

Mínimo. Solo el deslizamiento del drawer, la apertura de acordeones y el cambio de imagen al elegir color, todos ≤ 200 ms y desactivados con `prefers-reduced-motion`. **Nada de animaciones de entrada por sección** ni efectos al hacer scroll.

### 8.7 Dirección de fotografía

Modelos reales, luz natural, fondos neutros en la gama hueso y arena, 4:5, mismo encuadre en toda la colección: frontal, espalda, detalle del estampado y *lifestyle*. `alt` descriptivo con prenda, color y versículo: «Sudadera negra con Filipenses 4:13 bordado en el pecho».

### 8.8 Voz y textos de interfaz

Cercana, sobria y respetuosa, sin tono de sermón. Frases cortas, verbos claros, tuteo. Sin emojis. Los botones dicen exactamente lo que hacen («Añadir al carrito», «Finalizar compra»). Los errores explican qué pasa y cómo arreglarlo. Lenguaje que sirva a católicos y evangélicos por igual.

---

## 9. SEO técnico

### 9.1 Metadatos (`generateMetadata`)

| Plantilla | `title` (≤ 60 caracteres) | `description` (≤ 155) |
| --- | --- | --- |
| Home | Ropa cristiana con versículos de la Biblia \| Somos Verbo | Sudaderas y camisetas cristianas con versículos. Diseño cuidado, envío en toda España. |
| Categoría | Sudaderas cristianas con versículos \| Somos Verbo | Texto propio por categoría |
| Versículo | Del seed (`meta_title`) | Del seed (`meta_description`) |
| Colección | Ropa cristiana de {tema} \| Somos Verbo | Del seed |
| Producto | {Nombre} – {Referencia} \| Somos Verbo | Generada: frase + prenda + detalle |
| Ocasión | Regalos de {ocasión} cristianos \| Somos Verbo | Propia |
| Blog | {title} \| Somos Verbo | `description` del frontmatter |

Además, en todas las páginas: canonical absoluto, Open Graph y Twitter Card con imagen 1200×630 (generada con `next/og` para versículos y productos), `lang="es-ES"` y `robots` según la tabla de rutas.

### 9.2 Datos estructurados (JSON-LD)

- **Home:** `Organization` (nombre, logo, email) y `WebSite`.
- **Todas con migas:** `BreadcrumbList`.
- **Home, categorías, versículos, colecciones y ocasiones:** `FAQPage` con las preguntas visibles en la página (nunca preguntas ocultas).
- **Categorías, versículos y colecciones:** `CollectionPage` + `ItemList`.
- **Blog:** `Article` con `datePublished`, `dateModified`, `author` e `image`.
- **Producto:** ver 9.3.

Valida cada plantilla con el Rich Results Test de Google y el validador de Schema.org antes de cerrar la fase 6.

### 9.3 Producto: `ProductGroup` con variantes

```json
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "name": "Sudadera cristiana «Todo lo puedo» – Filipenses 4:13",
  "productGroupID": "sudadera-todo-lo-puedo-filipenses-4-13",
  "variesBy": ["https://schema.org/color", "https://schema.org/size"],
  "brand": { "@type": "Brand", "name": "Somos Verbo" },
  "hasVariant": [
    {
      "@type": "Product",
      "sku": "SV-FIL413-SUD-NEG-M",
      "name": "Sudadera «Todo lo puedo» – Negro – M",
      "color": "Negro",
      "size": "M",
      "image": "https://…",
      "offers": {
        "@type": "Offer",
        "url": "https://somosverbo.es/producto/sudadera-todo-lo-puedo-filipenses-4-13?color=negro",
        "price": "50.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "shippingDetails": { "@type": "OfferShippingDetails", "…": "desde tienda.ts" },
        "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "…": "desde tienda.ts" }
      }
    }
  ]
}
```

Genera `shippingDetails` y `hasMerchantReturnPolicy` a partir de `tienda.ts`. Si esos datos son `null`, omite esos bloques en lugar de inventarlos.

### 9.4 Enlazado interno (reglas)

- Cada producto enlaza a su landing de versículo, a su colección y a su categoría.
- Cada landing de versículo enlaza a sus 2 productos y a los demás versículos de su colección.
- Categorías y home enlazan a las 12 landings (chips).
- Cada artículo del blog enlaza al menos a 2 landings o productos (`relatedVerses`).
- Anclas descriptivas («sudadera de Filipenses 4:13»), nunca «haz clic aquí».

### 9.5 Rastreo e indexación

- `app/sitemap.ts`: todas las URLs indexables con `lastModified` real (de `updated_at` o del frontmatter). Divide en varios sitemaps si superas 1.000 URLs.
- `app/robots.ts`: permite todo salvo `/carrito`, `/pedido`, `/api` y `/admin`; enlaza el sitemap.
- Redirecciones 301 declaradas en un único archivo si algún slug cambia. Sin cadenas de redirección.
- Sin contenido duplicado: canonical en variantes, sin páginas de filtro indexables, sin paginación innecesaria.
- En las vistas previas de Cloudflare, `noindex` global. En producción, indexable.

### 9.6 Feed de Google Merchant Center

`/feeds/google-merchant.xml` (RSS 2.0 con espacio de nombres `g:`), generado desde Supabase y cacheado. **Una entrada por variante activa:**

`g:id` (SKU) · `g:item_group_id` (slug del producto) · `g:title` («Sudadera cristiana Todo lo puedo – Filipenses 4:13 – Negro – M») · `g:description` · `g:link` (con `?color=`) · `g:image_link` y `g:additional_image_link` · `g:availability` · `g:price` («50.00 EUR») · `g:brand` («Somos Verbo») · `g:condition` (new) · `g:google_product_category` (**verifica el ID correcto** en la taxonomía oficial de Google para sudaderas y para camisetas) · `g:product_type` («Ropa cristiana > Sudaderas > Fe y valor») · `g:color` · `g:size` · `g:gender` (unisex) · `g:age_group` (adult) · `g:identifier_exists` (no, mientras no haya GTIN) · `g:mpn` (SKU) · `g:shipping` (ES, desde `tienda.ts`).

### 9.7 Rendimiento

- Presupuesto: JavaScript inicial < 100 KB comprimido en la ficha de producto.
- LCP: la imagen principal con prioridad y dimensiones explícitas; el resto, diferido.
- Sin fuentes externas en tiempo de ejecución, sin librerías de carrusel, sin iconos en fuente (SVG en línea).
- Caché larga para estáticos; ISR para catálogo con revalidación al editar.

---

## 10. Contenido y datos iniciales

### 10.1 Fuente

`contenido/versiculos.md` contiene, para cada uno de los 12 versículos: URL, H1, meta title, meta description, texto Reina-Valera 1960, frase popular para el diseño, nombres de producto, significado y preguntas frecuentes. **Úsalo tal cual para el seed; no reescribas los textos.** Si detectas un error, avísame.

### 10.2 Catálogo

| Orden | Versículo | Slug | Colección | Frase del diseño |
| --- | --- | --- | --- | --- |
| 1 | Filipenses 4:13 | `filipenses-4-13` | fe-y-valor | Todo lo puedo en Cristo |
| 2 | Josué 1:9 | `josue-1-9` | fe-y-valor | Sé fuerte y valiente |
| 3 | Isaías 41:10 | `isaias-41-10` | fe-y-valor | No temas, yo estoy contigo |
| 4 | Juan 16:33 | `juan-16-33` | fe-y-valor | Tened valor, yo he vencido al mundo |
| 5 | Jeremías 29:11 | `jeremias-29-11` | esperanza | Yo sé los planes que tengo para ti |
| 6 | Romanos 8:28 | `romanos-8-28` | esperanza | Todo ayuda a bien |
| 7 | Salmo 91 | `salmo-91` | esperanza | Al abrigo del Altísimo |
| 8 | Juan 3:16 | `juan-3-16` | amor | De tal manera amó Dios al mundo |
| 9 | 1 Corintios 13 | `1-corintios-13` | amor | El amor es paciente |
| 10 | Salmo 23 | `salmo-23` | confianza | El Señor es mi pastor |
| 11 | Proverbios 3:5 | `proverbios-3-5` | confianza | Confía en el Señor de todo corazón |
| 12 | Mateo 11:28 | `mateo-11-28` | confianza | Venid a mí |

Cada versículo tiene una sudadera y una camiseta. Colores y tallas desde `tienda.ts`. Mientras no haya fotos, usa bloques de color `placeholder` con proporción 4:5 y el texto «Foto pendiente»; **nunca imágenes de stock ni generadas**. Los productos se crean con `active = false` hasta que yo los active.

### 10.3 Textos que debes redactar tú (como borrador)

Introducciones y textos SEO de categorías, colecciones, hub de regalos y las 4 ocasiones. Requisitos: español de España, voz de la sección 8.8, útiles de verdad (ideas, versículos recomendados y por qué), sin relleno ni superlativos vacíos, con la keyword en el primer párrafo y enlazando a landings de versículo. Márcalos con un comentario `{/* BORRADOR: revisar Jandro */}` y dame la lista al terminar.

### 10.4 Crédito de la traducción

Al pie de cada página que cite textos bíblicos: «Textos bíblicos: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988.» Déjalo en `tienda.ts` para poder ajustarlo; yo confirmaré las condiciones exactas de cita antes del lanzamiento.

---

## 11. Legal (España)

Genera borradores en MDX con los datos de `tienda.ts` y márcalos como **pendientes de revisión legal** (yo los revisaré con un profesional antes de lanzar):

- **Aviso legal (LSSI-CE):** titular, NIF, domicilio, email, datos registrales si es sociedad.
- **Privacidad (RGPD y LOPDGDD):** responsable, finalidades (pedidos, atención, emails transaccionales), base legal, conservación, encargados (Supabase, Stripe, Resend, Cloudflare), derechos y reclamación ante la AEPD.
- **Cookies:** la web solo usa almacenamiento técnico (carrito) y analítica sin cookies, así que no hay banner. Explícalo en la página. **Si en algún momento algo añade cookies no técnicas, avísame antes: exigiría banner.**
- **Condiciones de venta:** proceso de compra, precios con IVA, envíos y plazos, **derecho de desistimiento de 14 días naturales** desde la entrega con formulario modelo descargable, devoluciones, reembolso en un máximo de 14 días, **garantía legal de 3 años** y contacto.
- Casilla de aceptación de condiciones en Stripe Checkout (`consent_collection.terms_of_service`) enlazando a `/condiciones-de-venta`.

---

## 12. Datos de negocio: `src/config/tienda.ts`

Todo dato de negocio vive aquí, tipado. Los que falten van como `null`, se muestran como `[PENDIENTE]` en desarrollo y **bloquean el despliegue a producción** mediante `npm run check:pendientes`, que lista cada campo sin rellenar.

```ts
export const tienda = {
  nombre: 'Somos Verbo',
  dominio: 'somosverbo.es',
  emailContacto: null,            // p. ej. hola@somosverbo.es
  titular: {                      // datos legales
    nombre: null, nif: null, domicilio: null, registro: null,
  },
  precios: {
    sudaderaCentimos: 5000,
    camisetaCentimos: null,
  },
  producto: {
    gramajeSudadera: null, gramajeCamiseta: null,
    composicion: null, tecnica: null, origen: null,
    colores: [ /* { slug, nombre, hex } — pendiente del proveedor */ ],
    tallas: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    medidas: null,                // tabla por talla
    cuidados: null,
  },
  envio: {
    zonas: ['ES-peninsula', 'ES-baleares'],
    tarifaCentimos: null,
    gratisDesdeCentimos: null,
    plazoDiasLaborables: null,
  },
  devoluciones: { dias: null },   // mínimo legal: 14 días naturales
  creditoBiblia: 'Textos bíblicos: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988.',
} as const;
```

---

## 13. Modelo de datos (Supabase)

Precios en céntimos (`5000` = 50 €). Todas las tablas con `created_at` y `updated_at` (trigger). Migraciones versionadas en `supabase/migrations/`.

```sql
create extension if not exists pgcrypto;

create table collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  intro_md text,
  seo_md text,
  faqs jsonb not null default '[]',
  meta_title text,
  meta_description text,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table verses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  reference text not null,            -- 'Filipenses 4:13'
  text_rvr text not null,             -- Reina-Valera 1960
  popular_phrase text not null,       -- frase del diseño
  h1 text not null,
  intro text,
  meaning_md text not null,
  numbering_note text,                -- 'Salmo 22 en la numeración litúrgica'
  faqs jsonb not null default '[]',   -- [{ q, a }]
  meta_title text not null,
  meta_description text not null,
  sort int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table verse_collections (
  verse_id uuid references verses(id) on delete cascade,
  collection_id uuid references collections(id) on delete cascade,
  primary key (verse_id, collection_id)
);

create type garment_type as enum ('sudadera', 'camiseta');

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  verse_id uuid not null references verses(id),
  garment garment_type not null,
  name text not null,                 -- 'Sudadera «Todo lo puedo»'
  description_md text,
  price_cents int not null check (price_cents > 0),
  featured boolean not null default false,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text unique not null,           -- 'SV-FIL413-SUD-NEG-M'
  color_slug text not null,
  color_name text not null,
  color_hex text not null,
  size text not null check (size in ('XS','S','M','L','XL','XXL')),
  stock int not null default 0 check (stock >= 0),
  gtin text,
  active boolean not null default true,
  unique (product_id, color_slug, size)
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  color_slug text,                    -- null = válida para todos los colores
  path text not null,
  alt text not null,
  width int not null,
  height int not null,
  sort int not null default 0
);

create type order_status as enum ('pagado','revisar','preparando','enviado','entregado','devuelto','cancelado');
create sequence order_number_seq;

create table orders (
  id uuid primary key default gen_random_uuid(),
  number text unique not null,        -- 'SV-2026-0001'
  stripe_session_id text unique not null,
  stripe_payment_intent text,
  email text not null,
  name text not null,
  phone text,
  shipping_address jsonb not null,
  lines jsonb not null,               -- [{ sku, name, color, size, qty, unit_cents }]
  subtotal_cents int not null,
  shipping_cents int not null,
  total_cents int not null,
  status order_status not null default 'pagado',
  tracking_url text,
  shipped_at timestamptz,
  review_requested_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  order_id uuid references orders(id),
  display_name text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table stripe_events (
  id text primary key,                -- id del evento de Stripe (idempotencia)
  received_at timestamptz not null default now()
);

-- Descuento atómico de stock: devuelve false si no hay suficiente
create or replace function decrement_stock(p_sku text, p_qty int)
returns boolean language plpgsql security definer as $$
begin
  update variants set stock = stock - p_qty
  where sku = p_sku and stock >= p_qty;
  return found;
end $$;
```

**Seguridad (RLS activado en todas las tablas):**

- Lectura pública (`anon`): `collections`, `verses` y `verse_collections` activos; `products` y `variants` con `active = true`; `product_images`; `reviews` con `approved = true`.
- `orders` y `stripe_events`: sin acceso público. Solo el servidor con la clave de servicio.
- Escritura: solo servidor y el usuario administrador (Supabase Auth, mi email).
- Storage: bucket público `products` de solo lectura.

---

## 14. Calidad y tests

- **Vitest:** cálculo de totales y envío, generación de SKU y slugs, validaciones Zod, JSON-LD y feed de Merchant (snapshot).
- **Playwright** (modo prueba de Stripe): home → landing → ficha → elegir talla → carrito → checkout con tarjeta de prueba → página de gracias → pedido creado y stock descontado.
- **Lint y tipos** sin errores; `npm run check:pendientes` en verde antes de producción.
- **Accesibilidad:** axe sin errores graves en todas las plantillas; navegación completa con teclado.
- **Lighthouse móvil** ≥ 90 en las 4 categorías para home, categoría, landing, ficha y artículo.

---

## 15. Plan de construcción por fases

Cada fase termina con PR, vista previa y la checklist «Hecho cuando».

**Fase 1 — Base del proyecto**
Next.js + TypeScript + Tailwind, tokens y fuentes, validación de entorno, `tienda.ts`, layout completo (aviso, header con menú móvil, migas, footer), páginas vacías de todas las rutas y despliegue en Cloudflare con OpenNext.
*Hecho cuando:* la vista previa carga en el móvil, el layout coincide con la sección 8, Lighthouse ≥ 90 en la home vacía y hay `noindex` en las vistas previas.

**Fase 2 — Base de datos y seed**
Migraciones de la sección 13, políticas RLS, bucket de imágenes, seed desde `contenido/versiculos.md` (12 versículos, 4 colecciones, 24 productos con variantes de ejemplo y stock de prueba) y Cron Trigger de mantenimiento.
*Hecho cuando:* el seed es reproducible con un comando, RLS comprobado (un cliente anónimo no puede leer `orders`) y los textos coinciden con la fuente.

**Fase 3 — Páginas de catálogo**
Home, categorías, índice y landings de versículo, colecciones y regalos, con generación estática, enlazado interno (9.4) y textos borrador (10.3).
*Hecho cuando:* las 12 landings se ven completas en móvil y escritorio, cada página tiene su H1 único y la lista de borradores está entregada.

**Fase 4 — Ficha de producto y carrito**
Galería, selectores, estados de agotado, barra fija móvil, drawer, página de carrito y persistencia.
*Hecho cuando:* se puede añadir, cambiar cantidad y eliminar desde el móvil, y el carrito sobrevive a una recarga.

**Fase 5 — Pagos, pedidos y emails**
`/api/checkout`, Stripe Checkout en modo prueba, webhook idempotente con descuento atómico, página de gracias y emails de confirmación y aviso interno.
*Hecho cuando:* el test de Playwright del flujo completo pasa y un webhook repetido no duplica el pedido.

**Fase 6 — SEO técnico**
Metadatos, imágenes Open Graph, JSON-LD de todas las plantillas, sitemap, robots, redirecciones y feed de Merchant Center.
*Hecho cuando:* todas las plantillas pasan el Rich Results Test sin errores y el feed valida.

**Fase 7 — Contenido, ayuda y legal**
Blog MDX con los 5 esqueletos, páginas de ayuda, formulario de contacto y borradores legales.
*Hecho cuando:* los borradores no se indexan y los textos legales usan los datos de `tienda.ts`.

**Fase 8 — Reseñas y administración**
Petición de reseña programada, formulario firmado, moderación y panel `/admin`.
*Hecho cuando:* puedo gestionar un pedido de prueba de principio a fin desde el móvil.

**Fase 9 — Pulido y lanzamiento**
Auditoría Lighthouse y axe, corrección de lo que baje de 90, revisión de textos y checklist de lanzamiento (sección 16).

---

## 16. Checklist de lanzamiento (la hago contigo)

- [ ] `npm run check:pendientes` sin campos pendientes
- [ ] Marca «Somos Verbo» comprobada en la OEPM (clase 25)
- [ ] Dominio `somosverbo.es` comprado y conectado a Cloudflare; `NEXT_PUBLIC_SITE_URL` actualizado; `noindex` retirado en producción
- [ ] Stripe verificado (identidad y banco) y claves `live` configuradas; compra real de prueba y reembolso
- [ ] Dominio verificado en Resend (SPF, DKIM) y emails probados
- [ ] Textos legales revisados por un profesional
- [ ] Condiciones de cita de la Reina-Valera 1960 confirmadas
- [ ] Search Console: propiedad verificada y sitemap enviado
- [ ] Merchant Center: web verificada, feed enviado, listados gratuitos activos, envíos y devoluciones configurados
- [ ] Fotos reales en los 24 productos y productos activados

---

## 17. Lo que NO debes hacer nunca

- Inventar precios, plazos, reseñas, valoraciones, estadísticas o datos legales.
- Usar imágenes de stock o generadas como fotos de producto.
- Añadir píxeles, analítica con cookies, chats o cualquier script de terceros en el front.
- Crear páginas indexables sin contenido propio o duplicadas (filtros, parámetros, etiquetas vacías).
- Poner textos bíblicos modificados o sin referencia.
- Usar el logotipo o la marca oficial de la JMJ: solo el texto del versículo.
- Activar servicios de pago, pasar Stripe a modo real o tocar el dominio sin mi confirmación.
- Subir claves al repositorio o exponer la clave de servicio de Supabase al navegador.
- Sacrificar rendimiento móvil por un efecto visual.
