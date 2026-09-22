import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// De momento todas las páginas son estáticas y se sirven desde los assets del Worker
// (gratis, sin R2 ni KV). Cuando el catálogo necesite revalidación (fase 3/8) se
// cambiará a una caché con escritura, previa consulta si tuviera coste.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
