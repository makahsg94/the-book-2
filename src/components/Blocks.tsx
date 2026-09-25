import { useEffect, useMemo, useRef, useState } from 'react'
import type { ContentBlock } from '../types/content'
import { Quiz } from './Exercise'
import { AudioPlayer } from './Media'
import { VideoCard } from './VideoCard'
import { GrammarVideos } from './GrammarVideos'
import { PageFigure } from './PageFigure'
import EchoLab from './EchoLab'
import {
  IconChevronRight,
  IconChat,
  IconSpark,
  IconTarget,
  IconLayers,
  IconList,
  IconBook,
  IconVolume,
} from './Icons'
import { Link } from 'react-router-dom'
import { ACCENTS, sayWord, useSpeech } from '../lib/speech'

function BankLink({ page }: { page: number }) {
  return (
    <Link
      to="/bank/grammar"
      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-sm"
    >
      <IconTarget size={13} />
      Grammar Bank, page {page}
      <IconChevronRight size={13} />
    </Link>
  )
}

function RuleChips({ rule }: { rule: string }) {
  const parts = rule.split('·')
  if (parts.length < 2) {
    return <code className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">{rule}</code>
  }
  return (
    <span className="flex flex-wrap gap-1.5">
      {parts.map((p, i) => {
        const t = p.trim()
        if (!t) return null
        const tone = i % 2 === 0 ? 'bg-brand-600 text-white' : 'bg-accent-600 text-white'
        return (
          <code key={i} className={`rounded-md px-2 py-0.5 font-mono text-[12.5px] ${tone}`}>
            {t}
          </code>
        )
      })}
    </span>
  )
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`section-label bg-[var(--line)] text-[var(--ink-faint)] ${className}`}>
      {children}
    </span>
  )
}

/* Editorial rule under a section headline */
function Rule({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`my-4 block h-px w-16 bg-gradient-to-r from-brand-500 to-transparent ${className}`}
    />
  )
}

function calloutIcon(tone?: string) {
  switch (tone) {
    case 'warning':
      return <IconChat size={15} />
    case 'note':
      return <IconBook size={15} />
    case 'tip':
      return <IconSpark size={15} />
    default:
      return <IconSpark size={15} />
  }
}

function calloutToneClasses(tone?: string) {
  switch (tone) {
    case 'warning':
      return 'callout-warning border-rose-200 text-rose-900 dark:border-rose-800 dark:text-rose-100'
    case 'note':
      return 'callout-note border-warm-200 text-warm-900 dark:border-warm-900 dark:text-warm-100'
    case 'tip':
      return 'callout-tip border-accent-200 text-accent-900 dark:border-accent-800 dark:text-accent-100'
    default:
      return 'callout-info border-brand-200 text-brand-900 dark:border-brand-800 dark:text-brand-100'
  }
}

function splitSentences(text: string): string[] {
  const parts = text.match(/[^.!?\s][^.!?]*[.!?]*/g)
  return parts ? parts.map((s) => s.trim()).filter(Boolean) : [text.trim()]
}

/** Read the passage aloud with Web Speech, highlighting the sentence being spoken. */
function ReadingPanel({
  id,
  title,
  titleAr,
  paragraphs,
  total,
}: {
  id: string
  title: string
  titleAr?: string
  paragraphs: string[]
  total: number
}) {
  const sentences = useMemo(() => paragraphs.flatMap((p) => splitSentences(p)).filter(Boolean), [paragraphs])
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const token = useRef(0)
  const [speaking, setSpeaking] = useState(false)
  const [index, setIndex] = useState(-1)

  useEffect(
    () => () => {
      token.current++
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    },
    [],
  )

  const finish = () => {
    setSpeaking(false)
    setIndex(-1)
  }

  const speak = (start: number) => {
    const synth = window.speechSynthesis
    if (!synth || sentences.length === 0) return
    const t = ++token.current
    synth.cancel()
    setSpeaking(true)
    let errorBudget = 3
    const say = (i: number) => {
      if (token.current !== t || i >= sentences.length) {
        finish()
        return
      }
      setIndex(i)
      const u = new SpeechSynthesisUtterance(sentences[i])
      u.lang = 'en-GB'
      u.rate = 0.98
      const voices = synth.getVoices()
      const voice =
        voices.find((v) => v.lang.toLowerCase().startsWith('en-gb')) ??
        voices.find((v) => v.lang.toLowerCase().startsWith('en'))
      if (voice) u.voice = voice
      u.onend = () => say(i + 1)
      u.onerror = () => {
        if (token.current !== t) return
        errorBudget--
        if (errorBudget <= 0) {
          finish()
          return
        }
        say(i + 1)
      }
      synth.speak(u)
    }
    say(start)
  }

  const stop = () => {
    token.current++
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    finish()
  }

  const toggle = () => {
    if (speaking) stop()
    else speak(0)
  }

  let cursor = 0
  return (
    <section id={id} className="reading-panel fade-up">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7">
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <SectionLabel className="bg-accent-100 text-accent-700 dark:bg-accent-900/60 dark:text-accent-300">
              <IconBook size={12} />
              Reading
            </SectionLabel>
            <h2 className="display mt-2.5 text-2xl tracking-tight sm:text-[1.7rem]">{title}</h2>
            {titleAr && (
              <p dir="rtl" lang="ar" className="ar text-base font-bold text-brand-700 dark:text-brand-300">
                {titleAr}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {supported && (
              <button
                type="button"
                onClick={toggle}
                aria-pressed={speaking}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  speaking
                    ? 'border-accent-500 bg-accent-600 text-white'
                    : 'border-[var(--line-strong)] bg-[var(--bg)] text-[var(--ink-soft)] hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300'
                }`}
              >
                <IconVolume size={14} />
                {speaking ? 'Stop' : 'Read aloud'}
              </button>
            )}
            <span className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-[11px] font-medium tabular-nums text-[var(--ink-faint)]">
              {'\u2248'} {total} words
            </span>
          </div>
        </header>
        <div className="reading-body">
          {paragraphs.map((para, j) => {
            const sents = splitSentences(para)
            return (
              <p key={j} className={j === 0 ? 'reading-lead' : undefined}>
                {sents.map((s) => {
                  const fi = cursor++
                  const active = speaking && fi === index
                  return (
                    <span
                      key={fi}
                      className={`sentence${active ? ' is-speaking' : ''}`}
                      title="Read from here"
                      onClick={() => {
                        if (speaking && fi === index) stop()
                        else speak(fi)
                      }}
                    >
                      {s}
                      {fi < sentences.length - 1 ? ' ' : ''}
                    </span>
                  )
                })}
              </p>
            )
          })}
        </div>
        <span className="reading-rule" aria-hidden />
        <p className="study-tip">
          Study tip: read it once for the main idea, then again for the details
        </p>
        <EchoLab sentences={sentences} />
      </div>
    </section>
  )
}

export default function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        const id = `section-${i}`
        switch (block.type) {
          case 'text': {
            const paras = block.paragraphs
            const total = paras.join(' ').split(/\s+/).filter((w) => w.length > 0).length
            const isReading = total >= 110
            if (isReading) {
              return (
                <ReadingPanel
                  key={i}
                  id={id}
                  title={block.title ?? 'Reading passage'}
                  titleAr={block.titleAr}
                  paragraphs={paras}
                  total={total}
                />
              )
            }
            return (
              <section key={i} id={id} className={`fade-up prose-book ${i === 0 ? 'drop-cap' : ''}`}>
                {block.title && (
                  <>
                    <h2 className="display mb-1 mt-8 text-2xl tracking-tight">
                      {block.title}
                    </h2>
                    {block.titleAr && (
                      <p dir="rtl" lang="ar" className="ar mb-1 text-base font-bold text-brand-700 dark:text-brand-300">
                        {block.titleAr}
                      </p>
                    )}
                    <Rule />
                  </>
                )}
                {paras.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            )
          }

          case 'callout':
            return (
              <aside
                key={i}
                id={id}
                className={`rounded-xl border-l-4 p-4 ${calloutToneClasses(block.tone)}`}
              >
                {block.title && (
                  <p className="mb-1.5 flex items-center gap-2 text-sm font-bold">
                    {calloutIcon(block.tone)}
                    {block.title}
                  </p>
                )}
                {block.titleAr && (
                  <p dir="rtl" lang="ar" className="ar mb-1.5 text-sm font-bold text-brand-700 dark:text-brand-300">
                    {block.titleAr}
                  </p>
                )}
                <p className="text-[15px] leading-relaxed">{block.text}</p>
                {block.textAr && (
                  <p dir="rtl" lang="ar" className="ar mt-1.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    {block.textAr}
                  </p>
                )}
              </aside>
            )

          case 'vocab':
            return <VocabSection key={i} id={id} block={block} />

          case 'grammar':
            return (
              <section
                key={i}
                id={id}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-[var(--surface)] shadow-sm dark:border-brand-800"
              >
                <header className="flex items-center gap-2 bg-gradient-to-r from-brand-50 to-accent-50 px-4 py-2.5 dark:from-brand-950/70 dark:to-accent-950/70">
                  <span className="grid size-7 place-items-center rounded-md bg-brand-600 text-white">
                    <IconSpark size={15} />
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800 dark:text-brand-200">{block.title}</h2>
                  {block.titleAr && (
                    <p dir="rtl" lang="ar" className="ar text-sm font-bold text-brand-700 dark:text-brand-300">
                      {block.titleAr}
                    </p>
                  )}
                </header>

                <div className="space-y-4 p-4 sm:p-5">
                  {block.explanation && (
                    <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">{block.explanation}</p>
                  )}
                  {block.explanationAr && (
                    <p dir="rtl" lang="ar" className="ar text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {block.explanationAr}
                    </p>
                  )}

                  {block.rule && (
                    <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-3 dark:border-brand-800 dark:bg-brand-950/40">
                      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
                        <IconTarget size={13} />
                        The pattern
                      </p>
                      <RuleChips rule={block.rule} />
                      {block.ruleAr && (
                        <p dir="rtl" lang="ar" className="ar mt-1.5 text-[13.5px] leading-relaxed text-brand-800 dark:text-brand-200">
                          {block.ruleAr}
                        </p>
                      )}
                    </div>
                  )}

                  {block.table && (
                    <div className="overflow-x-auto rounded-xl">
                      <table className="content-table">
                        <thead>
                          <tr>
                            {block.table.headers.map((h) => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, j) => (
                            <tr key={j}>
                              {row.label && (
                                <td className="font-semibold text-brand-800 dark:text-brand-200">{row.label}</td>
                              )}
                              <td>
                                {row.values.map((v, k) => (
                                  <p key={k} className="text-[13.5px]">{v}</p>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {block.examples && block.examples.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-700 dark:text-accent-300">
                        <IconLayers size={13} />
                        Examples
                      </p>
                      <ul className="space-y-1.5">
                        {block.examples.map((ex, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 rounded-lg bg-[var(--line)]/40 px-3 py-2 text-sm leading-relaxed"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                              {j + 1}
                            </span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {block.videos && block.videos.length > 0 && <GrammarVideos videos={block.videos} />}
                  {block.bankPage && <BankLink page={block.bankPage} />}
                </div>
              </section>
            )

          case 'examples':
            return (
              <section key={i} id={id} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && (
                  <div className="mb-2 flex items-center gap-2">
                    <SectionLabel>
                      <IconList size={12} />
                      {block.title}
                    </SectionLabel>
                  </div>
                )}
                {block.titleAr && (
                  <p dir="rtl" lang="ar" className="ar mb-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                    {block.titleAr}
                  </p>
                )}
                <ul className="space-y-1">
                  {block.items.map((ex, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 rounded-lg px-3 py-2 text-[15px] leading-relaxed transition-colors hover:bg-[var(--line)]/30"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-[11px] font-bold text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                        {j + 1}
                      </span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )

          case 'exercise':
            return (
              <div key={i} id={id}>
                <Quiz exercise={block.exercise} />
              </div>
            )

          case 'audio':
            return (
              <div key={i} id={id}>
                <AudioPlayer tracks={block.tracks} title={block.title} />
              </div>
            )

          case 'video':
            return (
              <section key={i} id={id}>
                {block.title && (
                  <div className="mb-3 mt-6 flex items-center gap-2.5">
                    <SectionLabel className="bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                      <IconLayers size={12} />
                      {block.title}
                    </SectionLabel>
                  </div>
                )}
                {block.titleAr && (
                  <p dir="rtl" lang="ar" className="ar mb-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                    {block.titleAr}
                  </p>
                )}
                <div className="grid gap-3">
                  {block.videos.map((v, j) => (
                    <VideoCard key={j} video={v} />
                  ))}
                </div>
              </section>
            )

          case 'pages':
            return (
              <section key={i} id={id}>
                <div className="section-divider">
                  <span>Book Pages</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {block.images.map((image, j) => (
                    <PageFigure key={j} image={image} />
                  ))}
                </div>
              </section>
            )

          case 'review':
            return (
              <section key={i} id={id} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
                {block.title && (
                  <div className="mb-2 flex items-center gap-2">
                    <SectionLabel>
                      <IconBook size={12} />
                      {block.title}
                    </SectionLabel>
                  </div>
                )}
                {block.titleAr && (
                  <p dir="rtl" lang="ar" className="ar mb-2 text-sm font-bold text-brand-700 dark:text-brand-300">
                    {block.titleAr}
                  </p>
                )}
                <p className="text-[15px] leading-relaxed">{block.text}</p>
              </section>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

function VocabSection({
  id,
  block,
}: {
  id: string
  block: Extract<ContentBlock, { type: 'vocab' }>
}) {
  const [practice, setPractice] = useState(false)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const { settings: speech, setSettings: setSpeech } = useSpeech()
  const items = block.items ?? []
  const known = revealed.size

  const togglePractice = () => {
    setRevealed(new Set())
    setPractice((p) => !p)
  }

  const toggleReveal = (j: number) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(j)) next.delete(j)
      else next.add(j)
      return next
    })
  }

  return (
    <section id={id}>
      <div className="mb-3 mt-8 flex flex-wrap items-center gap-2.5">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="h-6 w-1 rounded-full bg-gradient-to-b from-accent-500 to-brand-500" />
          {block.title}
        </h2>
        {block.titleAr && (
          <span dir="rtl" lang="ar" className="ar text-sm font-bold text-brand-700 dark:text-brand-300">
            {block.titleAr}
          </span>
        )}
        <span className="inline-flex items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
          <IconVolume size={13} className="mx-1 shrink-0 text-[var(--ink-faint)]" />
          {ACCENTS.map((a) => {
            const active = speech.accent === a.id
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setSpeech({ ...speech, accent: a.id })}
                aria-pressed={active}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors ${
                  active
                    ? 'bg-accent-600 text-white'
                    : 'text-[var(--ink-soft)] hover:bg-[var(--line)] hover:text-accent-700 dark:hover:text-accent-300'
                }`}
              >
                {a.label}
              </button>
            )
          })}
        </span>
        <button
          type="button"
          onClick={togglePractice}
          aria-pressed={practice}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            practice
              ? 'border-brand-500 bg-brand-600 text-white'
              : 'border-[var(--line-strong)] text-[var(--ink-soft)] hover:border-brand-400'
          }`}
        >
          {practice ? 'Exit practice' : 'Practice: hide meanings'}
        </button>
      </div>

      {!practice ? (
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <div className="hidden border-b border-[var(--line)] bg-[var(--line)]/50 px-4 py-2 sm:grid sm:grid-cols-[1fr_1fr_2fr] sm:gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Word</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Meaning</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Example / Note</span>
          </div>
          <div className="divide-y divide-[var(--line)]">
            {items.map((item, j) => (
              <div
                key={j}
                className="group grid gap-1 px-4 py-3 transition-colors hover:bg-[var(--line)]/30 sm:grid-cols-[1fr_1fr_2fr] sm:items-start sm:gap-4"
              >
                <div className="min-w-0">
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="text-[15px] font-semibold text-brand-800 dark:text-brand-200">{item.word}</span>
                    <button
                      type="button"
                      onClick={() => sayWord(item.word, speech)}
                      aria-label={`Listen to ${item.word}`}
                      className="shrink-0 self-center rounded-md p-0.5 align-middle text-[var(--ink-faint)] opacity-70 transition-opacity hover:text-brand-600 hover:opacity-100 dark:hover:text-brand-300"
                    >
                      <IconVolume size={15} />
                    </button>
                  </span>
                  {item.opposite && (
                    <span className="ml-2 text-xs text-[var(--ink-faint)]">
                      opp.{' '}
                      <span className="font-medium text-accent-600 dark:text-accent-400">{item.opposite}</span>
                    </span>
                  )}
                  {item.pronunciation && (
                    <span className="ml-1.5 text-[11px] italic text-[var(--ink-faint)]">/{item.pronunciation}/</span>
                  )}
                </div>
                <div className="min-w-0 text-sm text-[var(--ink-soft)]">
                  {item.meaning || '\u2014'}
                  {item.meaningAr && (
                    <span dir="rtl" lang="ar" className="ar mt-0.5 block text-[13px] font-medium text-brand-700 dark:text-brand-300">
                      {item.meaningAr}
                    </span>
                  )}
                </div>
                <div className="min-w-0 space-y-1">
                  {item.example && (
                    <p className="text-[13px] italic text-[var(--ink-faint)]">
                      {'\u201c'}{item.example}{'\u201d'}
                    </p>
                  )}
                  {item.exampleAr && (
                    <p dir="rtl" lang="ar" className="ar text-[13px] text-[var(--ink-soft)]">
                      {item.exampleAr}
                    </p>
                  )}
                  {item.response && (
                    <p className="inline-flex items-center gap-1 rounded-md border border-accent-200 bg-accent-50 px-2 py-0.5 text-[12px] text-accent-800 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-200">
                      {'\u2192'} {item.response}
                    </p>
                  )}
                  {item.responseAr && (
                    <p dir="rtl" lang="ar" className="ar text-[12px] text-accent-800 dark:text-accent-200">
                      {item.responseAr}
                    </p>
                  )}
                  {item.note && (
                    <p className="text-[12px] text-[var(--ink-faint)]">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-faint)]">
            <span>Tap a card to reveal its meaning. Try to remember it first!</span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-semibold ${
                known === items.length && items.length > 0
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                  : 'bg-[var(--line)]'
              }`}
            >
              {known}/{items.length} revealed{known === items.length && items.length > 0 ? ' \u2713' : ''}
            </span>
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item, j) => {
              const isOpen = revealed.has(j)
              return (
                <button
                  key={j}
                  type="button"
                  onClick={() => toggleReveal(j)}
                  aria-pressed={isOpen}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    isOpen
                      ? 'border-brand-400 bg-brand-50/60 dark:bg-brand-950/30'
                      : 'border-[var(--line)] bg-[var(--surface)] hover:border-brand-300'
                  }`}
                >
                  <span className="flex flex-wrap items-baseline gap-1.5">
                    <span className="text-[15px] font-semibold text-brand-800 dark:text-brand-200">{item.word}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Listen to ${item.word}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        sayWord(item.word, speech)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          sayWord(item.word, speech)
                        }
                      }}
                      className="shrink-0 self-center rounded-md p-0.5 align-middle text-[var(--ink-faint)] opacity-70 transition-opacity hover:text-brand-600 hover:opacity-100 dark:hover:text-brand-300"
                    >
                      <IconVolume size={15} />
                    </span>
                    {item.pronunciation && (
                      <span className="text-[11px] italic text-[var(--ink-faint)]">/{item.pronunciation}/</span>
                    )}
                  </span>
                  {isOpen ? (
                    <span className="pop mt-2 block text-[13px] leading-snug text-[var(--ink-soft)]">
                      <span className="font-medium text-[var(--ink)]">{item.meaning || '\u2014'}</span>
                      {item.meaningAr && (
                        <span dir="rtl" lang="ar" className="ar mt-0.5 block text-[13px] font-medium text-brand-700 dark:text-brand-300">
                          {item.meaningAr}
                        </span>
                      )}
                      {item.opposite && (
                        <span className="mt-1 block text-xs text-[var(--ink-faint)]">
                          opp.{' '}
                          <span className="font-medium text-accent-600 dark:text-accent-400">{item.opposite}</span>
                        </span>
                      )}
                      {item.example && (
                        <span className="mt-1 block italic text-[var(--ink-faint)]">
                          {'\u201c'}{item.example}{'\u201d'}
                        </span>
                      )}
                      {item.exampleAr && (
                        <span dir="rtl" lang="ar" className="ar mt-0.5 block text-[13px] text-[var(--ink-soft)]">
                          {item.exampleAr}
                        </span>
                      )}
                      {item.response && (
                        <span className="mt-1 block rounded-md border border-accent-200 bg-accent-50 px-2 py-0.5 text-[12px] text-accent-800 dark:border-accent-800 dark:bg-accent-950 dark:text-accent-200">
                          {'\u2192'} {item.response}
                        </span>
                      )}
                      {item.responseAr && (
                        <span dir="rtl" lang="ar" className="ar mt-0.5 block text-[12px] text-accent-800 dark:text-accent-200">
                          {item.responseAr}
                        </span>
                      )}
                      {item.note && (
                        <span className="mt-1 block text-[12px] text-[var(--ink-faint)]">{item.note}</span>
                      )}
                    </span>
                  ) : (
                    <span aria-hidden className="mt-1 block text-[13px] tracking-[0.3em] text-[var(--ink-faint)]">
                      {'\u00b7'} {'\u00b7'} {'\u00b7'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {block.source && <p className="mt-2 text-[12px] text-[var(--ink-faint)]">{block.source}</p>}
    </section>
  )
}
