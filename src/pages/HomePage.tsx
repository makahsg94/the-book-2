import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK, flattenLessons, unitGlyph, unitLabel } from '../content/book'
import { BOOK_1_URL } from '../config/sites'
import { useProgress } from '../lib/appContext'
import { useAuth } from '../lib/authContext'
import { levelProgress, achievementsFor } from '../lib/progress'
import { shareCardBlob } from '../lib/shareCard'
import { playSound } from '../lib/sounds'
import Reveal from '../components/Reveal'
import AnimatedBar from '../components/AnimatedBar'
import LineMap from '../components/LineMap'
import { IconBook, IconCheck, IconFlame, IconLayers, IconMic, IconShare } from '../components/Icons'

export default function HomePage() {
  const progress = useProgress()
  const { user } = useAuth()
  const [sharing, setSharing] = useState(false)
  const lessons = flattenLessons()
  const doneCount = lessons.filter((f) => progress.isLessonComplete(f.lesson.id)).length
  const pct = Math.round((doneCount / Math.max(1, lessons.length)) * 100)

  const continueTarget =
    progress.state.lastUnit && progress.state.lastLesson
      ? `/unit/${progress.state.lastUnit}/lesson/${progress.state.lastLesson}`
      : null
  const firstLesson = lessons[0]
  const startTarget = continueTarget ?? (firstLesson ? `/unit/${firstLesson.unit.id}/lesson/${firstLesson.lesson.id}` : '/book')

  const lp = levelProgress(progress.state.xp)
  const achievements = achievementsFor(progress.state, lessons.length)
  const earnedCount = achievements.filter((a) => a.earned).length

  const shareToday = async () => {
    if (sharing) return
    setSharing(true)
    try {
      const blob = await shareCardBlob(progress.state, lessons.length)
      const fileName = `speakout-${new Date().toISOString().slice(0, 10)}.jpg`
      const file = new File([blob], fileName, { type: 'image/jpeg' })
      const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean }
      if (nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: 'My day on the Speakout line!' })
          playSound('star')
          return
        } catch {
          /* fall through to download */
        }
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 4000)
      playSound('star')
    } catch {
      /* card failed – ignore */
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className="fade-up space-y-16">
      {/* ---- 1. Title page ---- */}
      <section className="title-page mx-auto max-w-2xl pt-6">
        <p
          className="mb-3 inline-block rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-[12px] font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300"
          dir="rtl"
          lang="ar"
        >
          الجزء التاني
        </p>
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--ink-faint)]">
          {BOOK.edition} {'\u00b7'} Level {BOOK.level}
        </p>
        <h1 className="display mt-4 text-7xl leading-none tracking-tight sm:text-8xl">{BOOK.title}</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          {BOOK.subtitle}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
          {BOOK.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={startTarget}
            className="page-turn bg-brand-600 text-white hover:text-white"
          >
            <IconBook size={16} />
            {continueTarget ? 'Continue reading' : 'Start reading'}
          </Link>
          <Link to="/book" className="page-turn">
            Contents of this course
          </Link>
        </div>

        <div className="mx-auto mt-9 max-w-md">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Level {lp.level}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink-soft)]">
                <IconFlame size={14} className="text-orange-500" />
                {progress.state.streak} day{progress.state.streak === 1 ? '' : 's'} streak
              </span>
            </div>
            <p className="mt-3 flex items-center justify-between text-xs text-[var(--ink-faint)]">
              <span className="font-medium">{progress.state.xp} XP</span>
              <span>
                {lp.current}/{lp.target} to level {lp.level + 1}
              </span>
            </p>
            <div className="mt-1.5">
              <AnimatedBar value={lp.pct} className="h-2.5" bar="bg-gradient-to-r from-brand-500 via-accent-500 to-warm-500" />
            </div>
            <p className="mt-3 text-[11px] text-[var(--ink-faint)]">
              {doneCount} of {lessons.length} lessons {'\u00b7'} {pct}% of the course
            </p>
            <button
              type="button"
              onClick={shareToday}
              disabled={sharing}
              className="tactile mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-800 transition-colors hover:bg-brand-100 disabled:opacity-60 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200 dark:hover:bg-brand-900"
            >
              <IconShare size={14} />
              {sharing ? 'Preparing your card\u2026' : 'Share today\u2019s card'}
            </button>
          </div>
        </div>
      </section>

      {/* ---- Account CTA ---- */}
      {!user && (
        <section className="mx-auto max-w-2xl">
          <Link
            to="/account"
            className="group flex items-center gap-4 rounded-2xl border border-brand-300 bg-gradient-to-r from-brand-600 to-accent-600 p-5 shadow-md transition-all hover:shadow-lg dark:border-brand-700"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15 text-xl text-white">
              <IconLayers size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold tracking-tight text-white" dir="rtl" lang="ar">
                أنشئ حسابك وخلّي تقدّمك معاك على أي جهاز
              </span>
              <span className="block text-[13px] leading-snug text-white/85" dir="rtl" lang="ar">
                تسجيل دخول مجاني — الكويزات والدروس والإنجازات تتسجّل لك، وترجعها أول ما تدخل
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-700 transition-transform group-hover:translate-x-0.5">
              دخول / تسجيل
            </span>
          </Link>
        </section>
      )}

      {/* ---- Review banner ---- */}
      <section className="mx-auto max-w-2xl">
        <Link
          to="/review"
          className="group flex items-center gap-4 rounded-2xl border border-warm-200 bg-gradient-to-r from-warm-50 to-brand-50 p-5 shadow-sm transition-all hover:shadow-md dark:border-warm-900 dark:from-warm-950/60 dark:to-brand-950/60"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-xl text-white">
            <IconLayers size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold tracking-tight text-brand-800 dark:text-brand-200" dir="rtl" lang="ar">
              المراجعة الشاملة
            </span>
            <span className="block text-[13px] leading-snug text-[var(--ink-soft)]" dir="rtl" lang="ar">
              كلمات في جداول بالعربي وأمثلة · ملخص الجرامر · كويز 25 سؤال بتصحيح فوري وشرح لكل غلطة
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-transform group-hover:translate-x-0.5">
            افتح الصفحة
          </span>
        </Link>
      </section>

      {/* ---- Trainer banner ---- */}
      <section className="mx-auto max-w-2xl">
        <Link
          to="/trainer"
          className="group flex items-center gap-4 rounded-2xl border border-brand-300 bg-gradient-to-r from-brand-600 to-accent-600 p-5 shadow-md transition-all hover:shadow-lg dark:border-brand-700"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
            <IconMic size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold tracking-tight text-white" dir="rtl" lang="ar">
              مدرب إنجليزي أونلاين · أبو بكر مختار
            </span>
            <span className="block text-[13px] leading-snug text-white/85" dir="rtl" lang="ar">
              ٩ سنين خبرة · حصص لايف ١:١ على زووم · اشتراك شهري: حصة أو اتنين أو تلاتة في الأسبوع
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-700 transition-transform group-hover:translate-x-0.5">
            الباقات
          </span>
        </Link>
      </section>

      {/* ---- Shadowing banner ---- */}
      <section className="mx-auto max-w-2xl">
        <Link
          to="/shadowing"
          className="group flex items-center gap-4 rounded-2xl border border-accent-200 bg-gradient-to-r from-accent-50 to-brand-50 p-5 shadow-sm transition-all hover:shadow-md dark:border-accent-900 dark:from-accent-950/60 dark:to-brand-950/60"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-600 text-xl text-white">
            <IconMic size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold tracking-tight text-accent-800 dark:text-accent-200" dir="rtl" lang="ar">
              الشادونج (التكرار الصوتي)
            </span>
            <span className="block text-[13px] leading-snug text-[var(--ink-soft)]" dir="rtl" lang="ar">
              تدرّب على النطق بالإيقاع الصحيح · اسمع مقطع من الفيلم وقول بعده بالسرعة اللي تناسبك
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-accent-600 px-3 py-1.5 text-xs font-bold text-white transition-transform group-hover:translate-x-0.5">
            افتح الصفحة
          </span>
        </Link>
      </section>

      {/* ---- Book 1 link ---- */}
      <section className="mx-auto max-w-2xl">
        <a
          href={BOOK_1_URL}
          className="group flex items-center gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-warm-50 p-5 shadow-sm transition-all hover:shadow-md dark:border-brand-800 dark:from-brand-950/60 dark:to-warm-950/60"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-xl text-white">
            <IconBook size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold tracking-tight text-brand-800 dark:text-brand-200" dir="rtl" lang="ar">
              الجزء الأول · كتاب Speakout A2
            </span>
            <span className="block text-[13px] leading-snug text-[var(--ink-soft)]" dir="rtl" lang="ar">
              محتوى المستوى الأول — دروس، مراجعة، وشادونج بنفس النظام، لو حابب تبدأ من هناك الأول
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-transform group-hover:translate-x-0.5">
            روح للجزء الأول
          </span>
        </a>
      </section>

      {/* ---- 2. The line: the whole course as one ride ---- */}
      <section>
        <LineMap />
      </section>

      {/* ---- 3. Achievements ---- */}
      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="display text-2xl tracking-tight">Achievements</h2>
          <span className="section-label">{earnedCount}/{achievements.length} unlocked</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 30}>
              <div
                className={`flex h-full flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all ${
                  a.earned
                    ? 'border-brand-300 bg-brand-50 dark:border-brand-800 dark:bg-brand-950'
                    : 'border-dashed border-[var(--line-strong)] bg-[var(--surface)] opacity-60'
                }`}
              >
                <span className={`text-2xl ${a.earned ? 'pop' : 'opacity-40 grayscale'}`} aria-hidden>
                  {a.emoji}
                </span>
                <span className={`text-[12px] font-bold ${a.earned ? 'text-brand-800 dark:text-brand-200' : 'text-[var(--ink-faint)]'}`}>
                  {a.title}
                </span>
                <span className="text-[10px] leading-tight text-[var(--ink-faint)]">{a.desc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- 3. Printed contents ---- */}
      <section className="book-page px-6 py-8 sm:px-10">
        <div className="running-head">
          <span>
            {BOOK.title} {'\u00b7'} Level {BOOK.level}
          </span>
          <span className="rh-right">Contents</span>
        </div>

        <ol className="space-y-3">
          {BOOK.units.map((unit, i) => {
            const unitDone = unit.lessons.filter((l) => progress.isLessonComplete(l.id)).length
            const unitPct = Math.round((unitDone / Math.max(1, unit.lessons.length)) * 100)
            return (
              <Reveal key={unit.id} delay={i * 40}>
                <li className="border-b border-[var(--line)] pb-4">
                  <Link
                    to={`/unit/${unit.id}`}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="chapter-num font-display text-5xl leading-none">
                      {unitGlyph(unit)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                        {unitLabel(unit)}
                      </span>
                      <span className="mt-0.5 block truncate font-display text-xl font-semibold tracking-tight group-hover:text-brand-700 dark:group-hover:text-brand-300">
                        {unit.phrase ?? unit.title}
                      </span>
                    </span>
                    <span className="hidden text-xs text-[var(--ink-faint)] sm:inline">{unitPct}%</span>
                    <span className="toc-page">{unit.pages[0]}</span>
                  </Link>

                  <ul className="mt-1.5 space-y-0.5 border-l border-[var(--line)] pl-4">
                    {unit.lessons.map((lesson) => {
                      const isDone = progress.isLessonComplete(lesson.id)
                      return (
                        <li key={lesson.id}>
                          <Link
                            to={`/unit/${unit.id}/lesson/${lesson.id}`}
                            className="toc-row group truncate text-[13px]"
                          >
                            <span className="w-3 shrink-0 text-center text-[10px] leading-none">
                              {isDone ? (
                                <IconCheck size={10} className="text-brand-600" />
                              ) : (
                                <span className="text-[var(--ink-faint)]">○</span>
                              )}
                            </span>
                            <span className="min-w-0 truncate transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
                              {lesson.code !== 'Review' ? `${lesson.code} ` : ''}
                              {lesson.title}
                            </span>
                            <span className="toc-dots" aria-hidden />
                            <span className="toc-page shrink-0">{lesson.pages[0]}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </Reveal>
            )
          })}
        </ol>

        <div className="mt-8 border-t border-[var(--line)] pt-5">
          <div className="flex items-baseline gap-3">
            <IconLayers size={14} className="shrink-0 self-center text-[var(--ink-faint)]" />
            <span className="font-display text-lg font-semibold tracking-tight">Reference banks</span>
            <span className="toc-dots" aria-hidden />
            <span className="toc-page">back</span>
          </div>
          <ul className="mt-2 space-y-0.5">
            {BOOK.banks.map((bank) => (
              <li key={bank.id}>
                <Link to={`/bank/${bank.id}`} className="toc-row text-[13px]">
                  <span className="w-3 shrink-0 text-[10px] text-[var(--ink-faint)]">▲</span>
                  <span className="min-w-0 truncate transition-colors hover:text-brand-700 dark:hover:text-brand-300">
                    {bank.title}
                  </span>
                  <span className="toc-dots" aria-hidden />
                  <span className="toc-page shrink-0">{bank.pages[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}