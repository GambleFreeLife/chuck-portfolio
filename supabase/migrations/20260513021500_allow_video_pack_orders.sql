alter table public.video_orders
  drop constraint if exists video_orders_product_type_check;

alter table public.video_orders
  add constraint video_orders_product_type_check
  check (product_type in ('single', 'pack', 'retainer'));

notify pgrst, 'reload schema';
