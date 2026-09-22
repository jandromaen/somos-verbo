import { publicEnv } from '@/lib/env';
import { isIndexable } from './indexing';

export const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL;
export const indexable = isIndexable(siteUrl);

export function absoluteUrl(path: string): string {
  return path === '/' ? siteUrl : `${siteUrl}${path}`;
}
