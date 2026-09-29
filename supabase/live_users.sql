-- ============================================================================
-- Speakout B1 — قائمة المتصلين حالياً (لوحة الأدمن)
-- شغّل ده في Supabase Dashboard ← SQL Editor. آمن يعيد التشغيل.
--
-- 1) أعمدة الهوية على جدول الزيارات
-- 2) دوال الكتابة تسجّل اسم المستخدم مع كل نبضة
-- 3) دالة القراءة ترجّع القائمة للأدمن
-- 4) الصلاحيات
-- ============================================================================

-- ملاحظة مهمة: لازم السطرين دول يتنفذوا قبل الـ functions،
-- وإلا Postgres هيدي error: column "user_id" does not exist
alter table public.active_visits add column if not exists user_id uuid;
alter table public.active_visits add column if not exists username text;

-- 2) كل نبضة تسجّل مين ده
create or replace function public.record_visit(p_key text)
returns void
language plpgsql
security definer
as $$
declare
  v_name text;
begin
  if p_key is null or length(p_key) > 128 then
    return;
  end if;

  v_name := coalesce(
    coalesce(nullif(auth.jwt() -> 'user_metadata' ->> 'username', ''), nullif(auth.jwt() -> 'user_metadata' ->> 'user_name', '')),
    nullif(auth.jwt() ->> 'email', '')
  );

  insert into public.active_visits (visitor_key, last_seen, opens, user_id, username)
  values (p_key, now(), 1, auth.uid(), v_name)
  on conflict (visitor_key) do update
    set opens = case
          when public.active_visits.last_seen < now() - interval '10 seconds'
            then public.active_visits.opens + 1
          else public.active_visits.opens
        end,
        last_seen = now(),
        user_id  = coalesce(excluded.user_id,  public.active_visits.user_id),
        username = coalesce(excluded.username, public.active_visits.username);
end;
$$;

-- ملاحظة: visit_ping بيعمل upsert مش update، عشان لو المفتاح ده جديد
-- (أول مرة بعد الموبايل الجديد) ينشئ الصف ويكتب الاسم فوراً
-- بدل ما يستنى record_visit تتفادى.
create or replace function public.visit_ping(p_key text)
returns void
language sql
security definer
as $$
  insert into public.active_visits (visitor_key, last_seen, opens, user_id, username)
  values (
    p_key,
    now(),
    0,
    auth.uid(),
    coalesce(
      coalesce(nullif(auth.jwt() -> 'user_metadata' ->> 'username', ''), nullif(auth.jwt() -> 'user_metadata' ->> 'user_name', '')),
      nullif(auth.jwt() ->> 'email', '')
    )
  )
  on conflict (visitor_key) do update
    set last_seen = now(),
        user_id  = coalesce(excluded.user_id,  public.active_visits.user_id),
        username = coalesce(excluded.username, public.active_visits.username);
$$;

-- 3) القائمة: مين متصل دلوقتي
create or replace function public.admin_live_users(p_minutes int default 5)
returns json
language sql
security definer
stable
as $$
  select case when public.is_admin()
    then coalesce(json_agg(row_to_json(t) order by t.seconds_ago), '[]'::json)
    else '[]'::json end
  from (
    select
      coalesce(v.username, 'زائر') as username,
      (v.user_id is not null)                        as signed_in,
      v.opens,
      extract(epoch from (now() - v.last_seen))::int as seconds_ago
    from public.active_visits v
    where v.last_seen >= now() - (interval '1 minute' * greatest(coalesce(p_minutes, 5), 1))
  ) t;
$$;

-- 4) الصلاحيات
revoke all on function public.record_visit(text) from public;
revoke all on function public.visit_ping(text) from public;
revoke all on function public.admin_live_users(int) from public, anon;

grant execute on function public.record_visit(text)   to anon, authenticated;
grant execute on function public.visit_ping(text)      to anon, authenticated;
grant execute on function public.admin_live_users(int) to authenticated;
