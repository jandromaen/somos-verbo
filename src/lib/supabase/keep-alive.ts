/**
 * Supabase gratuito se pausa tras 7 días sin actividad (CLAUDE.md, sección 3).
 * Un Cron Trigger diario de Cloudflare llama a esta función, que hace una
 * lectura mínima y pública del catálogo.
 */

export type KeepAliveEnv = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
};

export type KeepAliveResult = { ok: boolean; status?: number; reason?: string };

export async function keepSupabaseAlive(
  env: KeepAliveEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<KeepAliveResult> {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: false, reason: 'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY' };

  const response = await fetchImpl(`${url.replace(/\/+$/, '')}/rest/v1/collections?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  return { ok: response.ok, status: response.status };
}
