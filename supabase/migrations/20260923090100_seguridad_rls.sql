-- Seguridad (CLAUDE.md, sección 13): RLS en todas las tablas.
--
-- · Lectura pública (anon): catálogo activo y reseñas aprobadas.
-- · orders y stripe_events: sin acceso público; solo el servidor con la clave
--   de servicio (service_role se salta RLS).
-- · Escritura: solo el servidor y los administradores (tabla admin_users).

-- Administradores -----------------------------------------------------------
-- Se añaden a mano desde el panel de Supabase (Authentication → Users → copiar
-- el id del usuario de Jandro e insertarlo aquí). Así no hay ningún email en el
-- repositorio.
create table public.admin_users (
  user_id uuid primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger admin_users_set_updated_at before update on public.admin_users
  for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- RLS en todas las tablas ----------------------------------------------------

alter table public.collections enable row level security;
alter table public.verses enable row level security;
alter table public.verse_collections enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;
alter table public.product_images enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;
alter table public.stripe_events enable row level security;
alter table public.admin_users enable row level security;

-- Lectura pública del catálogo ------------------------------------------------

create policy "Colecciones visibles" on public.collections
  for select to anon, authenticated using (true);

create policy "Versículos activos visibles" on public.verses
  for select to anon, authenticated using (active);

create policy "Relaciones de versículos activos visibles" on public.verse_collections
  for select to anon, authenticated
  using (exists (select 1 from public.verses v where v.id = verse_id and v.active));

create policy "Productos activos visibles" on public.products
  for select to anon, authenticated using (active);

create policy "Variantes activas de productos activos visibles" on public.variants
  for select to anon, authenticated
  using (active and exists (select 1 from public.products p where p.id = product_id and p.active));

create policy "Imágenes de productos activos visibles" on public.product_images
  for select to anon, authenticated
  using (exists (select 1 from public.products p where p.id = product_id and p.active));

create policy "Reseñas aprobadas visibles" on public.reviews
  for select to anon, authenticated using (approved);

-- Administradores: acceso completo -------------------------------------------

do $$
declare t text;
begin
  foreach t in array array[
    'collections', 'verses', 'verse_collections', 'products', 'variants',
    'product_images', 'orders', 'reviews', 'stripe_events'
  ] loop
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      'Administradores gestionan ' || t, t
    );
  end loop;
end $$;

create policy "Administradores se ven a sí mismos" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

-- Funciones solo para el servidor ---------------------------------------------

revoke all on function public.decrement_stock(text, int) from anon, authenticated;
revoke all on function public.next_order_number() from anon, authenticated;
grant execute on function public.decrement_stock(text, int) to service_role;
grant execute on function public.next_order_number() to service_role;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;

-- Storage: bucket público «products», de solo lectura --------------------------
-- La lectura pública la da la propia opción «public» del bucket; no se crea
-- ninguna política de escritura, así que solo el servidor (service_role) sube.
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;
