import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { parsePublicEnv } from './src/lib/env';
import { isIndexable } from './src/lib/seo/indexing';

// Si falta una variable obligatoria, el build se detiene aquí con un mensaje claro.
const env = parsePublicEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    if (isIndexable(env.NEXT_PUBLIC_SITE_URL)) return [];
    // Refuerzo del `noindex` en vistas previas: también para archivos que no son HTML.
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
