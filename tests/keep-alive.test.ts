import { describe, expect, it, vi } from 'vitest';
import { keepSupabaseAlive } from '@/lib/supabase/keep-alive';

describe('keepSupabaseAlive', () => {
  it('no llama a nada si faltan las variables', async () => {
    const fetchMock = vi.fn();
    const result = await keepSupabaseAlive({}, fetchMock);
    expect(result.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('hace una lectura mínima con la clave pública', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('[]', { status: 200 }));
    const result = await keepSupabaseAlive(
      { NEXT_PUBLIC_SUPABASE_URL: 'https://abc.supabase.co/', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon' },
      fetchMock,
    );
    expect(result).toEqual({ ok: true, status: 200 });
    expect(fetchMock).toHaveBeenCalledWith('https://abc.supabase.co/rest/v1/collections?select=id&limit=1', {
      headers: { apikey: 'anon', Authorization: 'Bearer anon' },
    });
  });
});
