import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/authContext'
import {
  adminStatus,
  adminStudents,
  adminDeleteUser,
  adminRpcReady,
  adminVisits,
  envAdminUsername,
  type AdminRow,
  type AdminVisits,
} from '../lib/admin'
import { getSupabase } from '../lib/supabase'
import { adminSendMessage, adminSendToAll } from '../lib/messages'
import { IconShield, IconHome, IconTrash, IconRefresh, IconEye, IconFlame, IconClock, IconChat } from '../components/Icons'

/** عنصر عربي RTL مختصر */
function Ar({ children }: { children: React.ReactNode }) {
  return <span dir="rtl" lang="ar">{children}</span>
}

function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return '—'
    return `${d.getFullYear()}/${pad2(d.getMonth() + 1)}/${pad2(d.getDate())} — ${pad2(d.getHours())}:${pad2(d.getMinutes())}`
  } catch {
    return '—'
  }
}

const PROGRESS_KEY = 'speakout-b1.progress.v1'

/**
 * الـ RPC `admin_data` بيرجّع النتيجة كـ jsonb_object_agg(key, value)، فالتقدم
 * جواه تحت المفتاح المسمّى `speakout-b1.progress.v1` — مش في أول الـ object.
 * أما الـ fallback من localStorage (`localProgressFor`) فرجّع الـ ProgressState
 * نفسه على طول. поэтому بندوّر على المفتاح المسمّى الأول، ونرجع للسطح لو مش موجود.
 */
function progressOf(row: AdminRow): Record<string, unknown> | null {
  const d = row.data
  if (!d || typeof d !== 'object' || Array.isArray(d)) return null
  const rec = d as Record<string, unknown>
  const p = rec[PROGRESS_KEY]
  if (p && typeof p === 'object' && !Array.isArray(p)) return p as Record<string, unknown>
  return rec
}

function summaryOf(row: AdminRow): { xp: number; lessons: number; quizzes: number } {
  let xp = 0
  let lessons = 0
  let quizzes = 0
  const d = progressOf(row)
  if (d) {
    if (typeof d.xp === 'number') xp = Math.round(d.xp)
    const ls = d.lessons
    if (ls && typeof ls === 'object' && !Array.isArray(ls)) {
      lessons = Object.values(ls).filter(
        (v) => v && typeof v === 'object' && (v as { completed?: boolean }).completed === true,
      ).length
    }
    const qz = d.quizzes
    if (qz && typeof qz === 'object' && !Array.isArray(qz)) {
      quizzes = Object.values(qz).filter(
        (v) => Array.isArray(v) && (v as unknown[]).length > 0,
      ).length
    }
  }
  return { xp, lessons, quizzes }
}

function ageOf(row: AdminRow): string | null {
  if (row.age) return row.age
  const d = row.data
  if (d && typeof d === 'object') {
    const p = (d as Record<string, unknown>)['speakout-b1.profile.v1']
    if (p && typeof p === 'object' && !Array.isArray(p)) {
      const a = (p as { age?: unknown }).age
      if (typeof a === 'number') return String(a)
      if (typeof a === 'string' && a.trim()) return a.trim()
    }
  }
  return null
}

export default function AdminPage() {
  const { user } = useAuth()
  const [ok, setOk] = useState<boolean | null>(null)
  const [rows, setRows] = useState<AdminRow[]>([])
  const [visits, setVisits] = useState<AdminVisits | null>(null)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState('')
  const [rpcReady, setRpcReady] = useState<boolean | null>(null)
  const [recipient, setRecipient] = useState('') // '' = الكل، أو اسم طالب
  const [body, setBody] = useState('')
  const composeRef = useRef<HTMLDivElement>(null)

  const envName = envAdminUsername()
  const isEnvAdmin =
    !!envName && !!user && envName.toLowerCase() === user.toLowerCase()

  const refresh = async () => {
    setLoading(true)
    const [students, v] = await Promise.all([adminStudents(), adminVisits()])
    setRows(students)
    setVisits(v)
    setLoading(false)
  }

  useEffect(() => {
    let on = true
    void adminStatus(user).then((v) => {
      if (!on) return
      setOk(v)
      if (v) void refresh()
    })
    void adminRpcReady().then((v) => {
      if (on) setRpcReady(v)
    })
    const poll = window.setInterval(() => {
      void adminVisits().then((v) => {
        if (on && v !== null) setVisits(v)
      })
    }, 10_000)
    return () => {
      on = false
      window.clearInterval(poll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const remove = async (username: string) => {
    if (busy || !username) return
    setBusy(true)
    setNotice('')
    const done = await adminDeleteUser(username)
    setBusy(false)
    if (done) {
      setNotice(`تم مسح الطالب «${username}»`)
      void refresh()
    } else {
      setNotice('حصلت مشكلة في مسح الطالب — جرّب تاني')
    }
  }

  const sendComposed = async () => {
    const bodyText = body.trim()
    if (!bodyText || busy) return
    setBusy(true)
    setNotice('')
    let ok = false
    if (recipient === '') {
      ok = await adminSendToAll(bodyText)
    } else {
      ok = await adminSendMessage(recipient, bodyText)
    }
    setBusy(false)
    if (ok) {
      setBody('')
      setNotice(
        recipient === ''
          ? 'اتبعتت الرسالة لكل الطلاب بنجاح'
          : `اتبعتت الرسالة لـ «${recipient}» بنجاح`,
      )
    } else {
      setNotice('مفيش طالب بالاسم ده أو حصلت مشكلة — جرّب تاني')
    }
  }

  const focusCompose = (username: string) => {
    setRecipient(username)
    setNotice('')
    composeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  /* فحص الأدمن لسه شغال */
  if (ok === null) {
    return (
      <div className="fade-up mx-auto flex max-w-md flex-col items-center gap-5 py-24 text-center">
        <span className="grid size-14 animate-pulse place-items-center rounded-2xl bg-[var(--line)] text-[var(--ink-faint)]">
          <IconShield size={26} />
        </span>
        <p className="text-sm font-semibold text-[var(--ink-soft)]">
          <Ar>بنتأكد من صلاحية الأدمن...</Ar>
        </p>
      </div>
    )
  }

  /* مش أدمن → برة */
  if (!ok) {
    return (
      <div className="fade-up mx-auto max-w-md py-24 text-center">
        <p className="text-5xl font-bold text-brand-300">403</p>
        <h1 className="mt-2 text-xl font-semibold">
          <Ar>مفيش صلاحية</Ar>
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          <Ar>الصفحة دي للأدمن بس. لو انت صاحب الكتاب، تأكد إن اسمك مكتوب
          في متغير VITE_ADMIN_USERNAME في ملف .env، وإنك داخل بالحساب ده.</Ar>
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <IconHome size={16} />
          <Ar>الرئيسية</Ar>
        </Link>
      </div>
    )
  }

  return (
    <div className="fade-up mx-auto max-w-3xl space-y-6">
      <header>
        <nav className="mb-3 flex items-center gap-1 text-sm text-[var(--ink-faint)]">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-[var(--ink)]">
            <IconHome size={14} />
            <Ar>الرئيسية</Ar>
          </Link>
          <span className="mx-1 opacity-50">/</span>
          <span className="text-[var(--ink)]">
            <Ar>الأدمن</Ar>
          </span>
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
              Speakout B1 · Admin
            </p>
            <h1 className="mt-1 text-2xl font-extrabold">
              <Ar>لوحة الأدمن</Ar>
            </h1>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              <Ar>كل الطلاب المسجلين في الكتاب — تقدّمهم وتقدّر تمسح أي حد.</Ar>
            </p>
          </div>
          {isEnvAdmin && envName && (
            <span className="rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
              <Ar>أدمن: {envName}</Ar>
            </span>
          )}
        </div>
      </header>

      {notice && (
        <p
          dir="rtl"
          lang="ar"
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
        >
          {notice}
        </p>
      )}

      {getSupabase() === null && (
        <p
          dir="rtl"
          lang="ar"
          className="rounded-lg border border-red-400 bg-red-50 px-3 py-2.5 text-[13px] leading-relaxed text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
        >
          <Ar>
            <strong className="block font-bold">Supabase مش متظبطة — البيانات دي محلية على هذا الجهاز فقط.</strong>
            الملف <code className="font-mono text-[12px]">.env</code> مش موجود، فالموقع بيشتغل أوفلاين وما
            بيسجّلش أي طالب في السيرفر. اعمل ملف <code className="font-mono text-[12px]">.env</code> في
            جذر المشروع وضيف فيه <code className="font-mono text-[12px]">VITE_SUPABASE_URL</code> و
            <code className="font-mono text-[12px]">VITE_SUPABASE_ANON_KEY</code> و
            <code className="font-mono text-[12px]">VITE_ADMIN_USERNAME</code> (نسخة جاهزة في
            <code className="font-mono text-[12px]">.env.production</code>)، وبعدين اعمل refresh.
            لازم تشغّل <code className="font-mono text-[12px]">npm run dev</code> تاني.
          </Ar>
        </p>
      )}

      {getSupabase() !== null && rpcReady === false && (
        <p
          dir="rtl"
          lang="ar"
          className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[13px] leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
        >
          <Ar>سيرفر Supabase متصل بس اسكربتات الجداول لسه متشغّلتش.
          افتح Supabase Dashboard ← SQL Editor، وشغّل «schema.sql» وبعدها «admin.sql»
          من مجلد supabase في المشروع. كمان من Authentication ألغِ تفعيل
          «Confirm email» عشان تسجيل الطلاب يشتغل فورًا من غير رسائل تأكيد.</Ar>
        </p>
      )}

      {getSupabase() !== null && visits === null && rpcReady === true && (
        <p
          dir="rtl"
          lang="ar"
          className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[13px] leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
        >
          <Ar>عدادات الزيارات (النهارده / لايف / إجمالي الفتح) لسه متشغّلتش.
          افتح Supabase Dashboard ← SQL Editor وشغّل ملف «visits.sql» الجديد
          من مجلد supabase في المشروع.</Ar>
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 shadow-sm">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              <IconShield size={18} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                <Ar>الطلاب</Ar>
              </p>
              <p className="text-xl font-extrabold leading-tight text-[var(--ink)]">{rows.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 shadow-sm">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <IconClock size={18} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                <Ar>النهارده</Ar>
              </p>
              <p className="text-xl font-extrabold leading-tight text-[var(--ink)]">
                {visits ? visits.today : '—'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 shadow-sm">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <IconEye size={18} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                <Ar>لايف دلوقتي</Ar>
              </p>
              <p className="text-xl font-extrabold leading-tight text-[var(--ink)]">
                {visits ? visits.live : '—'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 shadow-sm">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <IconFlame size={18} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-faint)]">
                <Ar>إجمالي الفتح</Ar>
              </p>
              <p className="text-xl font-extrabold leading-tight text-[var(--ink)]">
                {visits ? visits.total : '—'}
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line-strong)] px-3 py-1.5 text-[13px] font-semibold text-[var(--ink-soft)] transition-colors hover:bg-[var(--line)] disabled:opacity-50"
        >
          <IconRefresh size={14} className={loading ? 'animate-spin' : ''} />
          <Ar>تحديث</Ar>
        </button>
      </div>

      <div ref={composeRef} className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--line)]/50 px-4 py-2.5">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
            <span className="grid size-7 place-items-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              <IconChat size={15} />
            </span>
            <Ar>إرسال رسالة</Ar>
          </span>
          <label className="flex items-center gap-2 text-[12px] font-bold text-[var(--ink-faint)]">
            <Ar>المستلم</Ar>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              dir="rtl"
              className="rounded-lg border border-[var(--line-strong)] bg-[var(--bg)] px-3 py-1.5 text-[13px] font-semibold text-[var(--ink)] outline-none"
            >
              <option value="">الكل (جميع الطلاب)</option>
              {rows.map((row) =>
                row.username ? (
                  <option key={row.user_id ?? row.username} value={row.username}>
                    {row.username}
                  </option>
                ) : null,
              )}
            </select>
          </label>
        </div>
        <div className="p-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={2}
            placeholder="اكتب نص الرسالة هنا..."
            className="w-full resize-none rounded-xl border border-[var(--line-strong)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:border-brand-400"
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              disabled={busy || !body.trim()}
              onClick={() => void sendComposed()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconChat size={14} />
              <Ar>إرسال</Ar>
            </button>
            {busy && (
              <span className="text-[12px] text-[var(--ink-faint)]">
                <Ar>بيتبعت...</Ar>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-[13px]">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--line)]/50 text-[11px] uppercase tracking-wider text-[var(--ink-faint)]">
                <th className="px-3 py-2.5 font-bold"><Ar>الطالب</Ar></th>
                <th className="px-3 py-2.5 font-bold"><Ar>التسجيل</Ar></th>
                <th className="px-3 py-2.5 font-bold"><Ar>التقدّم</Ar></th>
                <th className="px-3 py-2.5 text-center font-bold"><Ar>رسالة</Ar></th>
                <th className="px-3 py-2.5 text-center font-bold"><Ar>مسح</Ar></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-sm text-[var(--ink-faint)]">
                    <Ar>لسه مفيش طلاب مسجلين.</Ar>
                  </td>
                </tr>
              )}
              {rows.map((row) => {
                const { xp, lessons, quizzes } = summaryOf(row)
                const username = row.username ?? '—'
                const age = ageOf(row)
                return (
                  <tr
                    key={row.user_id ?? username}
                    className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--line)]/40"
                  >
                    <td className="px-3 py-2.5">
                      <span className="font-bold text-[var(--ink)]">{username}</span>
                      {age && (
                        <span dir="rtl" lang="ar" className="mr-1.5 text-[11px] text-[var(--ink-faint)]">
                          · {age} سنة
                        </span>
                      )}
                      {row.user_id.startsWith('local:') && (
                        <span
                          dir="rtl"
                          lang="ar"
                          className="mr-1.5 rounded bg-[var(--line)] px-1.5 py-0.5 text-[10px] text-[var(--ink-faint)]"
                        >
                          محلي
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[var(--ink-soft)]" dir="ltr">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-3 py-2.5 text-[var(--ink-soft)]">
                      <span className="font-bold text-brand-700 dark:text-brand-300">{xp} XP</span>
                      <span dir="rtl" lang="ar" className="mr-1.5">
                        · {lessons} دروس · {quizzes} كويز
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => focusCompose(username)}
                        title={`ابعُت رسالة إلى ${username}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-brand-200 px-2.5 py-1.5 text-[12px] font-bold text-brand-700 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-brand-800 dark:text-brand-300 dark:hover:bg-brand-950/40"
                      >
                        <IconChat size={13} />
                        <Ar>رسالة</Ar>
                      </button>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        type="button"
                        disabled={busy || username === user}
                        onClick={() => void remove(username)}
                        title={username === user ? 'مش تقدر تمسح نفسك' : `مسح ${username}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-bold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        <IconTrash size={13} />
                        <Ar>مسح</Ar>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {!envName && (
        <p
          dir="rtl"
          lang="ar"
          className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[13px] text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
        >
          <Ar>تنبيه: اسم الأدمن لسه مش مكتوب في ملف .env (متغير VITE_ADMIN_USERNAME).
          لو انت صاحب الكتاب، اكتب اسمك بالظبط زي ما سجلت بيه في الكود، وضيفه برضه في
          جدول admins في Supabase.</Ar>
        </p>
      )}
    </div>
  )
}
