create extension if not exists pgcrypto;

create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  email text not null,
  business_name text not null,
  business_description text not null,
  target_customer text not null,
  primary_goal text not null,
  offer_description text not null,
  benefits text not null,
  domain_status text not null,
  brand_notes text,
  additional_notes text,
  deadline_preference text not null,
  stripe_session_id text,
  stripe_payment_status text default 'pending',
  paid_at timestamptz
);

alter table public.intake_submissions enable row level security;

revoke all on table public.intake_submissions from anon, authenticated;
grant select, insert, update on table public.intake_submissions to service_role;

drop policy if exists "Service role can insert intake submissions" on public.intake_submissions;
create policy "Service role can insert intake submissions"
  on public.intake_submissions
  for insert
  to service_role
  with check (true);

drop policy if exists "Service role can read intake submissions" on public.intake_submissions;
create policy "Service role can read intake submissions"
  on public.intake_submissions
  for select
  to service_role
  using (true);

drop policy if exists "Service role can update intake submissions" on public.intake_submissions;
create policy "Service role can update intake submissions"
  on public.intake_submissions
  for update
  to service_role
  using (true)
  with check (true);

notify pgrst, 'reload schema';
