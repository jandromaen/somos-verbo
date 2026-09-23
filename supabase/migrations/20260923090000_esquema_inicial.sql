-- Esquema inicial de Somos Verbo (CLAUDE.md, sección 13).
-- Precios en céntimos. Todas las tablas con created_at y updated_at.

create extension if not exists pgcrypto;

-- updated_at automático ---------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Catálogo ----------------------------------------------------------------

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  intro_md text,
  seo_md text,
  faqs jsonb not null default '[]',
  meta_title text,
  meta_description text,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.verses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  reference text not null,             -- 'Filipenses 4:13'
  text_reference text not null,        -- versículos citados en text_rvr: 'Salmo 23:1-3'
  text_rvr text not null,              -- Reina-Valera 1960
  popular_phrase text not null,        -- frase del diseño
  h1 text not null,
  intro text,
  meaning_md text not null,
  numbering_note text,                 -- 'En la numeración litúrgica (griega y latina) es el Salmo 22.'
  faqs jsonb not null default '[]',    -- [{ q, a }]
  meta_title text not null,
  meta_description text not null,
  wave int not null default 1 check (wave >= 1),  -- oleada de publicación (sección 10.5)
  sort int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index verses_active_sort_idx on public.verses (active, sort);

create table public.verse_collections (
  verse_id uuid references public.verses(id) on delete cascade,
  collection_id uuid references public.collections(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (verse_id, collection_id)
);

create index verse_collections_collection_idx on public.verse_collections (collection_id);

create type public.garment_type as enum ('sudadera', 'camiseta');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  verse_id uuid not null references public.verses(id),
  garment public.garment_type not null,
  name text not null,                  -- 'Sudadera «Todo lo puedo»'
  description_md text,
  -- Puede faltar mientras el precio esté [PENDIENTE] en tienda.ts, pero un
  -- producto sin precio nunca puede estar activo (ver check de abajo).
  price_cents int check (price_cents > 0),
  featured boolean not null default false,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_active_needs_price check (not active or price_cents is not null),
  unique (verse_id, garment)
);

create table public.variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text unique not null,            -- 'SV-FIL4-13-SUD-NEG-M'
  color_slug text not null,
  color_name text not null,
  color_hex text not null check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  size text not null check (size in ('XS','S','M','L','XL','XXL')),
  stock int not null default 0 check (stock >= 0),
  gtin text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, color_slug, size)
);

create index variants_product_idx on public.variants (product_id);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  color_slug text,                     -- null = válida para todos los colores
  path text not null,
  alt text not null,
  width int not null check (width > 0),
  height int not null check (height > 0),
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index product_images_product_idx on public.product_images (product_id, sort);

-- Pedidos -----------------------------------------------------------------

create type public.order_status as enum
  ('pagado', 'revisar', 'preparando', 'enviado', 'entregado', 'devuelto', 'cancelado');

create sequence public.order_number_seq;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  number text unique not null,         -- 'SV-2026-0001'
  stripe_session_id text unique not null,
  stripe_payment_intent text,
  email text not null,
  name text not null,
  phone text,
  shipping_address jsonb not null,
  lines jsonb not null,                -- [{ sku, name, color, size, qty, unit_cents }]
  subtotal_cents int not null check (subtotal_cents >= 0),
  shipping_cents int not null check (shipping_cents >= 0),
  total_cents int not null check (total_cents >= 0),
  status public.order_status not null default 'pagado',
  tracking_url text,
  shipped_at timestamptz,
  review_requested_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  order_id uuid references public.orders(id),
  display_name text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reviews_product_idx on public.reviews (product_id) where approved;

create table public.stripe_events (
  id text primary key,                 -- id del evento de Stripe (idempotencia)
  received_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Triggers updated_at ------------------------------------------------------

do $$
declare t text;
begin
  foreach t in array array[
    'collections', 'verses', 'verse_collections', 'products', 'variants',
    'product_images', 'orders', 'reviews', 'stripe_events'
  ] loop
    execute format(
      'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
      t || '_set_updated_at', t
    );
  end loop;
end $$;

-- Funciones de servidor ----------------------------------------------------

-- Descuento atómico de stock: devuelve false si no hay suficiente.
create or replace function public.decrement_stock(p_sku text, p_qty int)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_qty is null or p_qty <= 0 then
    raise exception 'La cantidad debe ser positiva';
  end if;
  update public.variants set stock = stock - p_qty
  where sku = p_sku and stock >= p_qty;
  return found;
end $$;

-- Siguiente número de pedido: 'SV-2026-0001'.
create or replace function public.next_order_number()
returns text
language sql
security definer
set search_path = ''
as $$
  select 'SV-' || to_char(now() at time zone 'Europe/Madrid', 'YYYY') || '-'
    || lpad(nextval('public.order_number_seq')::text, 4, '0');
$$;

-- Solo el servidor (clave de servicio) puede ejecutarlas.
revoke all on function public.decrement_stock(text, int) from public;
revoke all on function public.next_order_number() from public;
