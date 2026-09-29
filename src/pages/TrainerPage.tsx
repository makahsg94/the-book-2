import { useState } from 'react'
import { Link } from 'react-router-dom'
import trainerPhoto from '../assets/trainer/abubakr-320.png'
import trainerPhoto640 from '../assets/trainer/abubakr-640.webp'
import trainerPhoto320 from '../assets/trainer/abubakr-320.webp'
import {
  FAQ,
  LESSONS_PER_MONTH_NOTE,
  PLANS,
  STEPS,
  TRAINER,
  TRAINER_LINK,
  TRAINER_STATS,
  WHATSAPP_DISPLAY,
  WHY,
  generalWhatsappLink,
  planMessage,
  whatsappLink,
  type TrainerPlan,
} from '../content/trainer'
import { playSound } from '../lib/sounds'
import Reveal from '../components/Reveal'
import {
  IconArrowUpRight,
  IconAward,
  IconBook,
  IconChat,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconLayers,
  IconMic,
  IconSpark,
  IconTarget,
} from '../components/Icons'

const ICONS = {
  mic: IconMic,
  target: IconTarget,
  chat: IconChat,
  award: IconAward,
  clock: IconClock,
  book: IconBook,
  spark: IconSpark,
  layers: IconLayers,
}

function SectionLabel({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="section-label">{en}</span>
      <span className="text-[11px] font-semibold text-[var(--ink-faint)]" dir="rtl" lang="ar">
        {ar}
      </span>
    </div>
  )
}

function SectionTitle({ en, ar }: { en: string; ar: string }) {
  return (
    <h2 className="display text-2xl tracking-tight sm:text-3xl">
      {en}{' '}
      <span className="text-[15px] font-semibold text-[var(--ink-soft)]" dir="rtl" lang="ar">
        {ar}
      </span>
    </h2>
  )
}

function WhatsAppButton({
  href,
  label,
  variant = 'solid',
  className = '',
}: {
  href: string
  label: string
  variant?: 'solid' | 'ghost'
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => playSound('tap')}
      className={`tactile inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
        variant === 'solid'
          ? 'bg-[#25D366] text-[#06301a] hover:bg-[#1eb857]'
          : 'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-[#25D366] hover:text-[#128C4B]'
      } ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.15-1.35a9.96 9.96 0 0 0 4.89 1.24h.01c5.52 0 10-4.48 10-10 0-2.65-1.05-5.15-2.93-7.02A9.94 9.94 0 0 0 12.04 2Zm0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 0 1 2.35 5.69c0 4.43-3.6 8.03-8.04 8.03a8 8 0 0 1-4.08-1.12l-.29-.17-3.06.8.82-3-.18-.31a7.96 7.96 0 0 1-1.22-4.29c0-4.43 3.6-7.99 8.01-7.99Zm-2.6 4.2c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.06 3.14 5 4.4.7.3 1.24.48 1.67.61.7.23 1.34.19 1.84.12.56-.09 1.73-.71 1.97-1.39.25-.68.25-1.26.17-1.38-.07-.13-.27-.2-.57-.35-.3-.15-1.73-.86-2-1.15-.27-.3-.45-.43-.65-.15-.2.27-.75.95-.92 1.14-.17.2-.34.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.64-.49h-.55Z" />
      </svg>
      {label}
    </a>
  )
}

function FeatureCard({ item, index }: { item: TrainerPlan; index: number }) {
  const Icon = ICONS[item.icon]
  return (
    <Reveal delay={index * 45} className="h-full">
      <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:hover:border-brand-700">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
          <Icon size={20} />
        </span>
        <h3 className="mt-3.5 text-[15px] font-bold tracking-tight">{item.title}</h3>
        <p className="mt-0.5 text-[12px] font-semibold text-brand-700 dark:text-brand-300" dir="rtl" lang="ar">
          {item.titleAr}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
          {item.bodyAr}
        </p>
      </div>
    </Reveal>
  )
}

function PlanCard({ plan, index }: { plan: (typeof PLANS)[number]; index: number }) {
  return (
    <Reveal delay={index * 60} className="h-full">
      <div
        className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all ${
          plan.featured
            ? 'border-brand-400 bg-[var(--surface)] shadow-lg ring-1 ring-brand-300 dark:border-brand-600 dark:ring-brand-800'
            : 'border-[var(--line)] bg-[var(--surface)] shadow-sm hover:border-brand-300'
        }`}
      >
        {plan.badge && (
          <span className="absolute -top-3 right-5 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
            {plan.badge}
          </span>
        )}

        <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
        <p className="text-[12px] font-semibold text-brand-700 dark:text-brand-300" dir="rtl" lang="ar">
          {plan.nameAr}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-5xl font-bold leading-none tracking-tight text-brand-700 dark:text-brand-300">
            {plan.price}
          </span>
          <span className="text-sm font-bold text-[var(--ink-soft)]">EGP</span>
          <span className="text-[12px] text-[var(--ink-faint)]">/ month</span>
        </div>
        <p className="mt-1.5 text-[12px] text-[var(--ink-faint)]">
          about {plan.perLesson} EGP per 60-minute lesson
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-200">
            <IconClock size={13} />
            {plan.perWeek} lesson{plan.perWeek > 1 ? 's' : ''} a week
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--line)] px-3 py-1 text-[12px] font-bold text-[var(--ink-soft)]">
            ~{plan.perMonth} lessons / month
          </span>
        </div>

        <ul className="mt-4 flex-1 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f.en} className="flex items-start gap-2 text-[13px] leading-snug">
              <IconCheck size={14} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
              <span className="text-[var(--ink-soft)]">{f.en}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-4 space-y-1.5 border-t border-[var(--line)] pt-4" dir="rtl" lang="ar">
          {plan.features.map((f) => (
            <li key={f.ar} className="flex items-start gap-2 text-[12.5px] leading-snug text-[var(--ink-soft)]">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" />
              {f.ar}
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl bg-[var(--line)]/50 p-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">
            Pay upfront and save
          </p>
          <ul className="mt-2 space-y-1.5">
            {plan.prepay.map((p) => (
              <li key={p.months} className="flex items-baseline justify-between gap-2 text-[12.5px]">
                <span className="font-semibold text-[var(--ink-soft)]">
                  {p.months === 3 ? '3 months' : '12 months'}
                </span>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-bold text-[var(--ink)]">{p.total} EGP</span>
                  <span className="font-bold text-rose-600 dark:text-rose-500">save {p.save}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <WhatsAppButton
          href={whatsappLink(planMessage(plan.id))}
          label={`Book ${plan.name}`}
          variant={plan.featured ? 'solid' : 'ghost'}
          className="mt-5 w-full"
        />
      </div>
    </Reveal>
  )
}

function FaqItem({ item, open, onToggle }: { item: (typeof FAQ)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--line)]/40"
      >
        <span className="min-w-0">
          <span className="block text-sm font-bold leading-snug">{item.q}</span>
          <span className="block text-[12px] font-semibold text-[var(--ink-faint)]" dir="rtl" lang="ar">
            {item.qAr}
          </span>
        </span>
        <IconChevronDown
          size={18}
          className={`shrink-0 text-[var(--ink-soft)] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="fade-up border-t border-[var(--line)] px-4 py-3.5">
          <p className="text-[13px] leading-relaxed text-[var(--ink-soft)]">{item.a}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
            {item.aAr}
          </p>
        </div>
      )}
    </div>
  )
}

export default function TrainerPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQ[0]?.q ?? null)

  return (
    <div className="fade-up space-y-14">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-[var(--surface)] to-accent-50 p-6 shadow-sm dark:border-brand-900 dark:from-brand-950/70 dark:via-[var(--surface)] dark:to-accent-950/50 sm:p-9">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <picture>
              <source media="(min-width: 640px)" srcSet={trainerPhoto640} type="image/webp" />
              <source srcSet={trainerPhoto320} type="image/webp" />
              <img
                src={trainerPhoto}
                alt={TRAINER.name}
                width={320}
                height={320}
                className="size-24 rounded-3xl object-cover object-top shadow-lg ring-1 ring-brand-300 sm:size-28 dark:ring-brand-700"
              />
            </picture>
            <span className="absolute -bottom-1.5 -right-1.5 grid size-8 place-items-center rounded-full bg-[#25D366] text-white shadow-md">
              <IconCheck size={15} />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">
              <IconMic size={12} />
              {TRAINER.role}
            </p>
            <h1 className="display mt-3 text-4xl leading-tight tracking-tight sm:text-5xl">
              {TRAINER.nameAr}
            </h1>
            <p className="text-sm font-semibold text-[var(--ink-soft)]">
              {TRAINER.name} {'\u00b7'} {TRAINER.years} years online {'\u00b7'} {TRAINER.role}
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              {TRAINER.tagline}
            </p>
            <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
              {TRAINER.taglineAr}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <WhatsAppButton
                href={generalWhatsappLink()}
                label={`احجز عبر واتساب ${WHATSAPP_DISPLAY}`}
              />
              {TRAINER_LINK && (
                <a
                  href={TRAINER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile inline-flex items-center gap-1.5 rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--ink)] transition-colors hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300"
                >
                  <span>Portfolio</span>
                  <span className="text-[12px] font-semibold text-[var(--ink-faint)]" dir="rtl" lang="ar">
                    شوف أعماله
                  </span>
                  <IconArrowUpRight size={15} />
                </a>
              )}
            </div>
            <p className="mt-3 text-[12px] text-[var(--ink-faint)]" dir="rtl" lang="ar">
              التسجيل بيتم على الواتساب — رد خلال ساعات النهار، ومواعيد من الصبح لحد بالليل.
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 border-t border-[var(--line)] pt-6 sm:grid-cols-4">
          {TRAINER_STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-[var(--surface)]/70 p-3 text-center ring-1 ring-[var(--line)]">
              <p className="font-display text-2xl font-bold leading-none text-brand-700 dark:text-brand-300">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] text-[var(--ink-faint)]">{s.label}</p>
              <p className="text-[11px] font-semibold text-[var(--ink-soft)]" dir="rtl" lang="ar">
                {s.labelAr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="book-page px-6 py-7 sm:px-9">
        <div className="running-head">
          <span>{TRAINER.name}</span>
          <span className="rh-right">About the trainer</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            {TRAINER.bio.map((p) => (
              <p key={p.slice(0, 12)} className="text-[13.5px] leading-relaxed text-[var(--ink-soft)]">
                {p}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {TRAINER.languages.map((l) => (
                <span
                  key={l}
                  className="rounded-full bg-[var(--line)] px-2.5 py-1 text-[11.5px] font-semibold text-[var(--ink-soft)]"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div>
            {TRAINER.bioAr.map((p) => (
              <p
                key={p.slice(0, 12)}
                dir="rtl"
                lang="ar"
                className="mt-3 text-[13.5px] leading-relaxed text-[var(--ink-soft)] first:mt-0"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section>
        <SectionLabel en="Why him" ar="ليه تتعلم معاه" />
        <SectionTitle en="A trainer built around how you actually improve" ar="مدرب شغال على الطريقة اللي بتتعلم بيها فعلاً" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((item, i) => (
            <FeatureCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- Plans ---------- */}
      <section>
        <SectionLabel en="Monthly subscription" ar="الاشتراك الشهري" />
        <SectionTitle en="One price, pick how many lessons a week" ar="سعر واحد — اختار عدد الحصص في الأسبوع" />
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--ink-soft)]" dir="rtl" lang="ar">
          كل الباقات اشتراك شهري بحصص لايف ١:١ على زووم. اختار حصة في الأسبوع ولا اتنين ولا تلاتة، والدفع بيتم على الواتساب.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
        <p className="mt-4 text-[12px] text-[var(--ink-faint)]">
          * {LESSONS_PER_MONTH_NOTE} The free diagnostic session and the Zoom link are included in every plan.
        </p>
      </section>

      {/* ---------- Steps ---------- */}
      <section>
        <SectionLabel en="How to start" ar="إزاي تبدأ" />
        <SectionTitle en="Four steps, about ten minutes" ar="أربع خطوات في عشر دقايق" />
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = ICONS[step.icon]
            return (
              <Reveal key={step.id} delay={i * 50} className="h-full">
                <li className="relative h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
                  <span className="font-display text-4xl font-bold leading-none text-brand-200 dark:text-brand-900">
                    {i + 1}
                  </span>
                  <span className="mt-2 grid size-9 place-items-center rounded-lg bg-accent-600 text-white">
                    <Icon size={17} />
                  </span>
                  <h3 className="mt-3 text-[14px] font-bold leading-snug">{step.title}</h3>
                  <p className="mt-0.5 text-[12px] font-semibold text-[var(--ink-faint)]" dir="rtl" lang="ar">
                    {step.titleAr}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </section>

      {/* ---------- FAQ ---------- */}
      <section>
        <SectionLabel en="Questions" ar="أسئلة متكررة" />
        <SectionTitle en="Before you book" ar="قبل ما تحجز" />
        <div className="mt-5 space-y-2">
          {FAQ.map((item) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openFaq === item.q}
              onToggle={() => setOpenFaq(openFaq === item.q ? null : item.q)}
            />
          ))}
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="rounded-3xl border border-brand-300 bg-gradient-to-r from-brand-700 to-accent-700 p-7 text-center shadow-md dark:border-brand-800 sm:p-9">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
          <IconSpark size={12} />
          limited slots
        </p>
        <h2 className="display mt-3 text-3xl tracking-tight text-white sm:text-4xl">
          ابدأ أول حصة مع أبو بكر
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-[14px] leading-relaxed text-white/85" dir="rtl" lang="ar">
          تسع سنين خبرة، واختبار تحديد مستوى مجاني قبل ما تدفع. ابعت رسالة على الواتساب دلوقتي واحجز الباقة اللي تناسبك.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <WhatsAppButton
            href={whatsappLink(planMessage('twice'))}
            label={`احجز باقة الحصتين في الأسبوع · ${WHATSAPP_DISPLAY}`}
          />
          <Link
            to="/shadowing"
            onClick={() => playSound('tap')}
            className="tactile inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            جرّب الشادونج الأول
            <IconArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
