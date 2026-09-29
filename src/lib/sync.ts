import { getSupabase, currentUser as sbUser } from './supabase'
import { storageKey } from './auth'

const timers: Record<string, number> = {}

let lastError: string | null = null

/**
 * آخر خطأ حصل أثناء مزامنة التقدّم. الكتابة كانت بتفشل بصمت تمامًا
 * (الـ await بي igno تج الـ error)، فمفيش أي دليل على إن الحفظ بيفشل أصلاً.
 * الدالة دي بتخلي الغلط يبان في الكونسول بدل ما يضيع.
 */
export function lastSyncError(): string | null {
  return lastError
}

function report(where: string, error: { message: string; code?: string } | null) {
  if (!error) {
    lastError = null
    return
  }
  lastError = `${where}: ${error.code ?? ''} ${error.message}`.trim()
  console.error('[sync] فشل الحفظ على Supabase —', where, error)
}

export async function pullAll() {
  const sb = getSupabase()
  if (!sb) return
  const user = sbUser()
  if (!user) return
  const { data, error } = await sb.from('user_data').select('key, value').eq('user_id', user.id)
  if (error || !data) {
    report('pull', error)
    return
  }
  for (const row of data) {
    try {
      window.localStorage.setItem(storageKey(row.key), JSON.stringify(row.value))
    } catch {
      /* storage unavailable – ignore */
    }
  }
  window.dispatchEvent(new CustomEvent('sb:synced'))
}

export function queueSync(key: string) {
  window.clearTimeout(timers[key])
  timers[key] = window.setTimeout(() => void flushSync(key), 500)
}

export async function persistProfile(data: { age?: number }): Promise<void> {
  const sb = getSupabase()
  if (!sb) return
  const user = sbUser()
  if (!user || data.age === undefined) return
  try {
    const { error } = await sb.from('user_data').upsert(
      {
        user_id: user.id,
        key: 'speakout-b1.profile.v1',
        value: { age: data.age },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,key' },
    )
    report('profile', error)
  } catch (e) {
    report('profile', { message: e instanceof Error ? e.message : String(e) })
  }
}

async function flushSync(key: string) {
  delete timers[key]
  const sb = getSupabase()
  if (!sb) return
  const user = sbUser()
  if (!user) return
  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(storageKey(key))
  } catch {
    return
  }
  if (raw === null) {
    await sb.from('user_data').delete().eq('user_id', user.id).eq('key', key)
    return
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return
  }
  const { error } = await sb.from('user_data').upsert(
    { user_id: user.id, key, value: parsed, updated_at: new Date().toISOString() },
    { onConflict: 'user_id,key' },
  )
  report(key, error)
}