-- ============================================================================
-- Speakout B1 — سكربت تشخيص لوحة الأدمن (نسخة بـ pg_proc مباشرة، بدون to_regtypeid)
-- شغّله في Supabase Dashboard ← SQL Editor ← Run.
-- بيعرض لك REAL-TIME من القاعدة نفسها:
--   1) أي الجداول موجودة وأي ناقصة
--   2) أي دوال (RPC) موجودة وأي ناقصة
--   3) عدد الطلاب الفعليين + عدد الزيارات والفتحات
-- متوافق مع كل إصدارات PostgreSQL — مش محتاج to_regtypeid اللي قاعدة قديمة بتنقصها.
-- ============================================================================

do $$
declare
  tbl text[] := array[
    'public.admins',
    'public.user_data',
    'public.active_visits',
    'public.messages',
    'public.message_reads'
  ];
  fn  text[] := array[
    'public.is_admin',
    'public.admin_status',
    'public.admin_data',
    'public.admin_delete_user',
    'public.admin_visits',
    'public.record_visit',
    'public.visit_ping',
    'public.admin_messages',
    'public.admin_send_message',
    'public.admin_send_to_all',
    'public.my_inbox',
    'public.mark_messages_read'
  ];
  missing_t text[] := '{}';
  missing_f text[] := '{}';
  i int;
  j int;
  nn int;
  n_users int;
  n_auth int;
  n_visits bigint;
  n_opens bigint;
  has_f boolean;
  has_t boolean;
begin

  -- 1) الجداول عبر pg_class مباشرة
  for j in 1..array_length(tbl, 1) loop
    select exists (
      select 1
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = split_part(tbl[j], '.', 1)
        and c.relname = split_part(tbl[j], '.', 2)
    ) into has_t;
    if not has_t then
      missing_t := missing_t || tbl[j];
    end if;
  end loop;

  -- 2) الدوال عبر pg_proc مباشرة (لا to_regtypeid إطلاقاً)
  for i in 1..array_length(fn, 1) loop
    select exists (
      select 1
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname = split_part(fn[i], '.', 1)
        and p.proname = split_part(fn[i], '.', 2)
    ) into has_f;
    if not has_f then
      missing_f := missing_f || fn[i];
    end if;
  end loop;

  -- 3) الأرقام الفعلية من القاعدة
  select count(*) into n_auth from auth.users;
  select count(distinct u.user_id) into n_users
  from (
    select user_id from public.user_data
    union
    select user_id from public.admins
  ) u;

  if to_regclass('public.active_visits') is not null then
    select count(*), coalesce(sum(opens), 0) into n_visits, n_opens
    from public.active_visits;
  else
    n_visits := 0;
    n_opens  := 0;
  end if;

  raise notice '================================================';
  raise notice 'الأرقام من القاعدة مباشرة:';
  raise notice '  الطلاب في auth.users : %', n_auth;
  raise notice '  طلاب لها سجلات/أدمن : %', n_users;
  raise notice '  صفوف active_visits  : %', n_visits;
  raise notice '  إجمالي الفتحات       : %', n_opens;

  -- النقطة المهمة: admin_data بترجّع كل صف في auth.users، فأي فرق بين
  -- n_auth و n_users معناه إن فيه حسابات اتعملت من غير ما تاخد أي بيانات.
  if n_auth > n_users then
    raise notice '  ملاحظة: فيه % حساب في auth.users من غير أي صف في user_data/admins',
      n_auth - n_users;
    raise notice '          (حساب جديد لسه مافتحش أول حصة، أو التسجيل مالوشوش sync)';
  end if;

  -- الجزء الأهم: اللي ناقص فعلاً
  raise notice '================================================';
  if array_length(missing_t, 1) is null then
    raise notice 'كل الجداول موجودة ✔';
  else
    raise notice 'جداول ناقصة (لازم تشغّل ملفات SQL بتاعتها): %',
      array_to_string(missing_t, ', ');
  end if;

  if array_length(missing_f, 1) is null then
    raise notice 'كل الدوال موجودة ✔';
  else
    raise notice 'دوال ناقصة (لازم تشغّل schema.sql / admin.sql / visits.sql / messages.sql): %',
      array_to_string(missing_f, ', ');
  end if;
  raise notice '================================================';
end $$;
