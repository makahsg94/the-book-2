import { getSupabase } from './supabase'

const VISITOR_KEY = 'speakout-b1.visitor.v1'
const pingTimers: Record<string, number> = {}

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

/** يُستدعى مرة واحدة مع تحميل الصفحة: تعدّ فتحة جديدة ويعمل update لآخر ظهور */
export function recordOpen() {
  const sb = getSupabase()
  if (!sb) {
    console.warn('[visits] no Supabase client — visit tracking is OFF')
    return
  }
  const key = visitorKey()
  queuePing('open', () => {
    void sb.rpc('record_visit', { p_key: key }).then(({ error }) => {
      if (error) console.warn('[visits] record_visit failed:', error.code, error.message, error.hint ?? '')
      else console.info('[visits] record_visit ok for', key)
    })
  })
  scheduleHeartbeat()
}

/** نبضة حياة كل 60 ثانية: بتحدّث آخر ظهور بس عشان عدّاد "لايف" يفضل دقيق */
function scheduleHeartbeat() {
  if (pingTimers['hb']) return
  pingTimers['hb'] = window.setInterval(() => {
    const sb = getSupabase()
    if (!sb) return
    void sb.rpc('visit_ping', { p_key: visitorKey() }).then(({ error }) => {
      if (error) console.warn('[visits] visit_ping failed:', error.code, error.message, error.hint ?? '')
    })
  }, 60_000)
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
  }, 800)
}