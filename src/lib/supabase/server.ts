import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { publicEnv } from '@/lib/env';

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'falta la clave de servicio de Supabase'),
});

/**
 * Cliente con la clave de servicio: se salta RLS. Solo para el servidor
 * (webhook de Stripe, pedidos, administración). `server-only` impide que este
 * archivo acabe en el navegador.
 */
export function createServiceClient() {
  const url = publicEnv.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('Falta NEXT_PUBLIC_SUPABASE_URL.');
  const { SUPABASE_SERVICE_ROLE_KEY } = serverEnvSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
  return createClient(url, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
}
