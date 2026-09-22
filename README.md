# Somos Verbo

Tienda online de ropa cristiana. El documento maestro del proyecto es [`CLAUDE.md`](./CLAUDE.md).

Web provisional (rama `main`): https://somos-verbo.jandro-d31.workers.dev

## Desarrollo local

Requisitos: Node.js 22 o superior.

```bash
npm install
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local
npm run dev
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000` |
| `npm run build` | Build de Next.js |
| `npm run preview` | Build para Cloudflare y vista previa local con el motor de Workers (`http://localhost:8787`) |
| `npm run typecheck` | Comprobación de tipos |
| `npm run lint` | ESLint |
| `npm test` | Tests de Vitest |
| `npm run check:contenido` | Valida los textos de los 101 versículos en `contenido/versiculos/` |
| `npm run check:pendientes` | Lista los datos de negocio sin rellenar en `src/config/tienda.ts`. Falla si queda alguno. |

## Variables de entorno

Se validan con Zod al arrancar y al hacer el build (`src/lib/env.ts`). Nunca se suben al repositorio.

| Variable | Obligatoria desde |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Fase 1 |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fase 2 |

Solo `https://somosverbo.es` se indexa. Con cualquier otra URL (local, `workers.dev`, vistas previas) todas las páginas llevan `noindex` en la etiqueta `robots` y en la cabecera `X-Robots-Tag`.

## Despliegue en Cloudflare (Workers Builds, gratis)

Se hace una sola vez desde el panel de Cloudflare:

1. **Workers & Pages → Create → Import a repository** y elige `jandromaen/somos-verbo`.
2. Nombre del proyecto: `somos-verbo` (tiene que coincidir con `name` en `wrangler.jsonc`).
3. **Build command:** `npx opennextjs-cloudflare build`
4. **Deploy command:** `npx opennextjs-cloudflare deploy`
5. **Non-production branch deploy command:** `npx opennextjs-cloudflare upload`
6. **Builds for non-production branches:** activado.
7. **Build variables:** añade `NEXT_PUBLIC_SITE_URL` con la URL `https://somos-verbo.<tu-subdominio>.workers.dev` y `NODE_VERSION` = `22`.
8. Rama de producción: `main`.

Cada push a otra rama genera una URL de vista previa, que aparece en el propio pull request de GitHub y en el panel del Worker.
