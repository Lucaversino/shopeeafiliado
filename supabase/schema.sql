create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  image_url text default '',
  affiliate_url text not null,
  source_url text default '',
  price numeric(12,2),
  old_price numeric(12,2),
  currency text default 'BRL',
  category text default '',
  badge text default '',
  featured boolean default false,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists products_created_at_idx on products(created_at desc);
create index if not exists products_active_idx on products(active);
create index if not exists products_featured_idx on products(featured);
