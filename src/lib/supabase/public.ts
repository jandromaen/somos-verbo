import { createClient } from '@supabase/supabase-js';
import { publicEnv } from '@/lib/env';

/**
 * Cliente con la clave pública (anon). Solo ve lo que permiten las políticas
 * RLS: catálogo activo y reseñas aprobadas. Se puede usar en build y en servidor.
 */
export function createPublicClient() {
  const url = publicEnv.NEXT_PUBLIC_SUPABASE_URL;
  const key = publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY. Añádelas en .env.local o en Cloudflare.',
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
