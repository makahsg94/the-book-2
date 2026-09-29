import { getSupabase } from './supabase'

const VISITOR_KEY = 'speakout-b1.visitor.v1'
const pingTimers: Record<string, number> = {}
let hashBound = false

export function visitorKey(): string {
  try {
    let key = window.localStorage.getItem(VISITOR_KEY)
    if (!key) {
      key = `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      window.localStorage.setItem(VISITOR_KEY, key)
    }
    return key
  } catch {
    return `v-${Date.now()}`
  }
}

/** المسار الحالي (من الـ hash router) عشان نعرف مين فتح صفحة المدرب */
function currentPath(): string {
  const raw = window.location.hash.replace(/^#/, '')
  return (raw.split('?')[0] || '/').slice(0, 120)
}

function fire() {
  const sb = getSupabase()
  if (!sb) {
    console.warn('[visits] no Supabase client — visit tracking is OFF')
    return
  }
  const key = visitorKey()
  const p_path = currentPath()
  void sb.rpc('record_page', { p_key: key, p_path }).then(({ error }) => {
    if (error) console.warn('[visits] record_page failed:', error.code, error.message, error.hint ?? '')
    else console.info('[visits] recorded', p_path, 'as', key)
  })
}

/** يُستدعى مرة واحدة مع تحميل الصفحة، وكل مرة يتغيّر فيها المسار */
export function recordOpen() {
  const sb = getSupabase()
  if (!sb) {
    console.warn('[visits] no Supabase client — visit tracking is OFF')
    return
  }
  queuePing('open', fire)
  if (!hashBound) {
    hashBound = true
    window.addEventListener('hashchange', () => queuePing('nav', fire))
  }
  scheduleHeartbeat()
}

/** نبضة حياة كل 60 ثانية: بتحدّث آخر ظهور بس عشان عدّاد "لايف" يفضل دقيق */
function scheduleHeartbeat() {
  if (pingTimers['hb']) return
  pingTimers['hb'] = window.setInterval(fire, 60_000)
}

function queuePing(id: string, fn: () => void) {
  window.clearTimeout(pingTimers[id])
  pingTimers[id] = window.setTimeout(() => {
    delete pingTimers[id]
    try {
      fn()
    } catch {
      /* ignore */
    }
  }, 400)
}
