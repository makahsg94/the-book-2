-- ============================================================================
-- Speakout B1 — مين فتح صفحة المدرب (صفحة السبيسر)
--
-- قبل: كنا بنعرف مين متصل دلوقتي بس.
-- دلوقتي: بنسجّل المسار مع كل زيارة، فالأدمن يقدر يشوف
-- كل من فتح صفحة المدرب (سابقاً مش لايف) + إمتى.
--
-- شغّل ده في Supabase Dashboard ← SQL Editor. آمن يعيد التشغيل.
-- ============================================================================

-- 1) عمود المسار
alter table public.active_visits add column if not exists last_path text;

-- 2) سجل الزيارة + المسار
create or replace function public.record_page(p_key text, p_path text)
returns void
language plpgsql
security definer
as $$
declare
  v_name text;
  v_path text;
begin
  if p_key is null or length(p_key) > 128 then
    return;
  end if;

  v_path := nullif(left(coalesce(p_path, ''), 120), '');
  v_name := coalesce(
    nullif(auth.jwt() -> 'user_metadata' ->> 'username', ''),
    nullif(auth.jwt() -> 'user_metadata' ->> 'user_name', ''),
    nullif(auth.jwt() ->> 'email', '')
  );

  insert into public.active_visits (visitor_key, last_seen, opens, user_id, username, last_path)
  values (p_key, now(), 1, auth.uid(), v_name, v_path)
  on conflict (visitor_key) do update
    set opens = case
          when public.active_visits.last_seen < now() - interval '10 seconds'
            then public.active_visits.opens + 1
          else public.active_visits.opens
        end,
        last_seen = now(),
        user_id  = coalesce(excluded.user_id,  public.active_visits.user_id),
        username = coalesce(excluded.username, public.active_visits.username),
        last_path = coalesce(excluded.last_path, public.active_visits.last_path);
end;
$$;

-- 3) مين فتح صفحة المدرب — الأحدث فوق
create or replace function public.admin_trainer_hits(p_limit int default 50)
returns json
language sql
security definer
stable
as $$
  select case when public.is_admin()
    then coalesce(json_agg(row_to_json(t)), '[]'::json)
    else '[]'::json end
  from (
    select
      coalesce(v.username, 'زائر') as username,
      (v.user_id is not null)       as signed_in,
      v.last_path,
      v.last_seen
    from public.active_visits v
    where v.last_path is not null
      and v.last_path like '%/trainer%'
    order by v.last_seen desc
    limit greatest(coalesce(p_limit, 50), 1)
  ) t;
$$;

-- 4) الصلاحيات
revoke all on function public.record_page(text, text) from public;
revoke all on function public.admin_trainer_hits(int) from public, anon;

grant execute on function public.record_page(text, text)      to anon, authenticated;
grant execute on function public.admin_trainer_hits(int)      to authenticated;
