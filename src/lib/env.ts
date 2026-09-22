import { z } from 'zod';

/**
 * Variables de entorno públicas (CLAUDE.md, sección 5).
 *
 * Cada variable se vuelve obligatoria en la fase que la usa; hasta entonces
 * es opcional para que las vistas previas puedan desplegarse.
 * Las claves secretas vivirán en un módulo aparte, solo de servidor.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url({ protocol: /^https?$/, error: 'debe ser una URL completa, p. ej. https://somosverbo.es' })
    .transform((url) => url.replace(/\/+$/, '')),
  // Fase 2
  NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export function parsePublicEnv(source: Record<string, string | undefined>): PublicEnv {
  const result = publicEnvSchema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(raíz)'}: ${issue.message}`)
      .join('\n');
    throw new Error(
      `Faltan variables de entorno o no son válidas:\n${problems}\n` +
        'Revísalas en .env.local (desarrollo) o en la configuración del Worker en Cloudflare.',
    );
  }
  return result.data;
}

// Las NEXT_PUBLIC_* se escriben una a una para que Next.js las incruste en el build.
export const publicEnv = parsePublicEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || undefined,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || undefined,
});
