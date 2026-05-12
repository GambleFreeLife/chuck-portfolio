create table if not exists public.video_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  business_name text not null,
  brand_offer text not null,
  target_audience text not null,
  style_preference text not null,
  product_type text not null check (product_type in ('single', 'retainer')),
  stripe_session_id text,
  stripe_subscription_id text,
  stripe_payment_status text default 'pending',
  paid_at timestamptz
);

alter table public.video_orders enable row level security;

revoke all on table public.video_orders from anon, authenticated;
grant select, insert, update on table public.video_orders to service_role;

drop policy if exists "Service role can insert video orders" on public.video_orders;
create policy "Service role can insert video orders"
  on public.video_orders
  for insert
  to service_role
  with check (true);

drop policy if exists "Service role can read video orders" on public.video_orders;
create policy "Service role can read video orders"
  on public.video_orders
  for select
  to service_role
  using (true);

drop policy if exists "Service role can update video orders" on public.video_orders;
create policy "Service role can update video orders"
  on public.video_orders
  for update
  to service_role
  using (true)
  with check (true);

notify pgrst, 'reload schema';
