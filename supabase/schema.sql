create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null default 0,
  category text not null,
  description text not null default '',
  badge text,
  image_url text,
  is_featured boolean not null default false,
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shop_settings (
  id integer primary key default 1,
  instagram_url text not null default 'https://www.instagram.com/thebrinc.c/',
  tiktok_url text not null default 'https://www.tiktok.com/@thebrinc.c?is_from_webapp=1&sender_device=pc',
  shopee_url text not null default 'https://shopee.co.th/thebrinc.c?categoryId=100639&entryPoint=ShopByPDP&itemId=27774579058',
  line_url text not null default '#',
  announcement text not null default 'Custom order เปิดรับตามคิวค่ะ',
  updated_at timestamptz not null default now(),
  constraint single_settings_row check (id = 1)
);

alter table public.products enable row level security;
alter table public.shop_settings enable row level security;

create policy "Public can read visible products"
on public.products for select
using (is_visible = true);

create policy "Authenticated admins can manage products"
on public.products for all
to authenticated
using (true)
with check (true);

create policy "Public can read shop settings"
on public.shop_settings for select
using (true);

create policy "Authenticated admins can update shop settings"
on public.shop_settings for all
to authenticated
using (true)
with check (true);

insert into public.shop_settings (id)
values (1)
on conflict (id) do nothing;
