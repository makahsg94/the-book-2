import { getSupabase } from './supabase'
import { USERS_KEY } from './auth'
import type { StoredUser } from './auth'

export interface AdminRow {
  user_id: string
  username: string | null
  age: string | null
  created_at: string
  data: Record<string, unknown> | null
}

/** اسم الأدمن من متغير البيئة VITE_ADMIN_USERNAME (فاضي لحد ما يكتبه صاحب الكتاب) */
export function envAdminUsername(): string {
  return (import.meta.env.VITE_ADMIN_USERNAME as string | undefined ?? '').trim()
}

/**
 * فولباك محلي: لو Supabase مش متظبط، نقرا المستخدمين المسجلين من
 * localStorage (USERS_KEY) ونضم لكل واحد لقطة تقدّمه.
 */
function readLocalUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}

function localProgressFor(username: string): Record<string, unknown> | null {
  try {
    const key = `speakout-b1.u.${username}.speakout-b1.progress.v1`
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
  } catch {
    return null
  }
}

function removeLocalUser(username: string) {
  try {
    const users = readLocalUsers().filter((u) => u.username.toLowerCase() !== username.toLowerCase())
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const prefix = `speakout-b1.u.${username.toLowerCase()}.`
    const toDrop: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.toLowerCase().startsWith(prefix)) toDrop.push(k)
    }
    for (const k of toDrop) window.localStorage.removeItem(k)
  } catch {
    /* ignore */
  }
}

/**
 * هل الاسم الحالي هو الأدمن؟
 * الأولوية دايمًا لـ RPC من السيرفر (admin_status بيبني على الـ user id الثابت).
 * الفحص المحلي بالاسم بيبقى فولباك بس لما مفيش Supabase جوه (وضع الأوفلاين).
 */
export async function adminStatus(currentUsername: string | null): Promise<boolean> {
  const sb = getSupabase()
  if (sb) {
    try {
      const { data, error } = await sb.rpc('admin_status')
      if (!error && data === true) return true
      if (!error && data === false) return false
    } catch {
      /* fall back to local */
    }
  }
  const envName = envAdminUsername()
  if (envName && currentUsername && envName.toLowerCase() === currentUsername.toLowerCase()) {
    return true
  }
  return false
}

/** قائمة الطلاب — RPC admin_data لو موجود، وإلا فولباك محلي */
/** Is the main admin RPC reachable (meaning the SQL has been applied)? */
export async function adminRpcReady(): Promise<boolean | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data, error } = await sb.rpc('admin_data')
    return !error && Array.isArray(data)
  } catch {
    return false
  }
}

export async function adminStudents(): Promise<AdminRow[]> {
  const sb = getSupabase()
  if (sb) {
    try {
      const { data, error } = await sb.rpc('admin_data')
      if (!error && Array.isArray(data)) return data as AdminRow[]
    } catch {
      /* fallthrough to local */
    }
  }
  return readLocalUsers().map((u) => ({
    user_id: `local:${u.username.toLowerCase()}`,
    username: u.username,
    age: u.age != null ? String(u.age) : null,
    created_at: new Date(u.createdAt).toISOString(),
    data: localProgressFor(u.username),
  }))
}

/** مسح طالب — RPC admin_delete_user لو موجود، وإلا إزالة محلية */
export async function adminDeleteUser(username: string): Promise<boolean> {
  const target = username.trim()
  if (!target) return false
  const sb = getSupabase()
  if (sb) {
    try {
      const { error } = await sb.rpc('admin_delete_user', { p_username: target })
      return !error
    } catch {
      return false
    }
  }
  removeLocalUser(target)
  return true
}

export interface AdminVisits {
  today: number
  live: number
  total: number
}

/** إحصائيات الزيارات للأدمن — null لو Supabase أو RPC مش متوفر */
export async function adminVisits(): Promise<AdminVisits | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data, error } = await sb.rpc('admin_visits')
    if (error || !data || typeof data !== 'object') return null
    const d = data as Record<string, unknown>
    const num = (v: unknown) => (typeof v === 'number' ? v : 0)
    return { today: num(d.today), live: num(d.live), total: num(d.total) }
  } catch {
    return null
  }
}

export interface AdminLiveUser {
  username: string
  signed_in: boolean
  opens: number
  seconds_ago: number
}

/** مين متصل دلوقتي — الرجوع من RPC لازم يكون [] مش null عشان نفرّق */
export async function adminLiveUsers(minutes = 5): Promise<AdminLiveUser[] | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data, error } = await sb.rpc('admin_live_users', { p_minutes: minutes })
    if (error) {
      console.warn('[admin] admin_live_users RPC failed:', error.message)
      return null
    }
    if (!Array.isArray(data)) {
      console.warn('[admin] admin_live_users returned a non-array payload:', data)
      return null
    }
    return data as AdminLiveUser[]
  } catch (err) {
    console.warn('[admin] admin_live_users threw:', err)
    return null
  }
}
