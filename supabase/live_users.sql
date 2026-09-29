-- ============================================================================
-- Speakout B1 — قائمة المتصلين حالياً (لوحة الأدمن)
--
-- ليه الملف ده: جدول active_visits كان بيخزّن المفتاح المجهول بس
-- (visitor_key)، فالأدمن كان يقدر يعدّ "لايف" رقم لكنه مش هيعرف مين.
-- هنا بنضيف مين المستخدم، ونعمل دالة ترجّع القائمة نفسها.
--
-- ملاحظة: الملف بيعيد إنشاء record_visit / visit_ping / admin_visits
-- بنفس الأسماء، فلو نسخة قديمة منهم كانت متطبّقة على السيرفر
-- إعادة تشغيل الملف ده يحدّثها كمان.
--
-- شغّل ده في Supabase Dashboard ← SQL Editor بعد schema.sql و admin.sql و visits.sql.
-- ============================================================================

-- 1) مين ده المستخدم اللي فاتح الموقع دلوقتي
alter table public.active_visits add column if not exists user_id uuid references auth.users (id) on delete set null;
alter table public.active_visits add column if not exists username text;

-- 2) نعيد كتابة دوال الكتابة عشان تسجّل الهوية مع كل نبضة
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
    nullif(auth.jwt() -> 'user_metadata' ->> 'username', ''),
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
        -- متسجّلش بيانات فاضية فوق بيانات موجودة
        user_id  = coalesce(excluded.user_id,  public.active_visits.user_id),
        username = coalesce(excluded.username, public.active_visits.username);
end;
$$;

create or replace function public.visit_ping(p_key text)
returns void
language sql
security definer
as $$
  update public.active_visits
     set last_seen = now(),
         user_id  = coalesce(auth.uid(), user_id),
         username = coalesce(
           nullif(auth.jwt() -> 'user_metadata' ->> 'username', ''),
           nullif(auth.jwt() ->> 'email', ''),
           username
         )
   where visitor_key = p_key
     and p_key is not null
     and length(p_key) <= 128;
$$;

-- 3) العدادات (نفسها، بس بتتحدّث لو النسخة القديمة كانت مختلفة)
create or replace function public.admin_visits()
returns json
language sql
security definer
stable
as $$
  select case when public.is_admin() then json_build_object(
    'today', (select count(*) from public.active_visits where last_seen >= date_trunc('day', now())),
    'live',  (select count(*) from public.active_visits where last_seen >= now() - interval '5 minutes'),
    'total', (select coalesce(sum(opens), 0) from public.active_visits)
  ) else '{}'::json end;
$$;

-- 4) القائمة نفسها: مين متصل دلوقتي
create or replace function public.admin_live_users(p_minutes int default 5)
returns json
language sql
security definer
stable
as $$
  select case when public.is_admin()
    then coalesce(json_agg(row_to_json(t) order by t.seconds_ago), '[]'::json)
    else '[]'::json
  end
  from (
    select
      coalesce(v.username, 'زائر (' || left(v.visitor_key, 12) || ')') as username,
      (v.user_id is not null)                        as signed_in,
      v.opens,
      extract(epoch from (now() - v.last_seen))::int as seconds_ago
    from public.active_visits v
    where v.last_seen >= now() - (interval '1 minute' * greatest(coalesce(p_minutes, 5), 1))
  ) t;
$$;

-- 5) الصلاحيات
revoke all on function public.record_visit(text) from public;
revoke all on function public.visit_ping(text) from public;
revoke all on function public.admin_visits() from public, anon;
revoke all on function public.admin_live_users(int) from public, anon;

grant execute on function public.record_visit(text)      to anon, authenticated;
grant execute on function public.visit_ping(text)         to anon, authenticated;
grant execute on function public.admin_visits()           to authenticated;
grant execute on function public.admin_live_users(int)    to authenticated;
