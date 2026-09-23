/**
 * Punto de entrada del Worker de Cloudflare: la web de Next.js (generada por
 * OpenNext en .open-next/worker.js) más la tarea diaria que mantiene Supabase
 * activo (Cron Trigger definido en wrangler.jsonc).
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — .open-next/worker.js solo existe tras `opennextjs-cloudflare build`
import { default as nextHandler } from './.open-next/worker.js';
import { keepSupabaseAlive, type KeepAliveEnv } from './src/lib/supabase/keep-alive';

type WaitUntil = { waitUntil(promise: Promise<unknown>): void };

const worker = {
  fetch: nextHandler.fetch,

  async scheduled(_event: unknown, env: KeepAliveEnv, ctx: WaitUntil) {
    ctx.waitUntil(
      keepSupabaseAlive(env).then((result) => {
        if (!result.ok) console.warn('Supabase keep-alive falló', result);
      }),
    );
  },
};

export default worker;
