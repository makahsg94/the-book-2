import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import trainerPhoto from '../assets/trainer/abubakr-320.webp'
import {
  PLANS,
  TRAINER,
  WHATSAPP_DISPLAY,
  generalWhatsappLink,
  planMessage,
  whatsappLink,
} from '../content/trainer'
import { playSound } from '../lib/sounds'
import { IconArrowUpRight, IconCheck, IconClock, IconClose } from './Icons'

const SHOW_AFTER_MS = 2200

/**
 * نافذة دعوة المدرب — بتظهر لكل زائر عند فتح الصفحة (أو إعادة تحميلها)،
 * وبتتقفل بـ X أو Escape أو الضغط بره. مش بتتحفظ في localStorage عشان
 * كل مرة فتح الصفحة ترجع تاني.
 */
export default function TrainerOfferModal() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // ما تظهرش وانت داخل صفحة المدرب نفسها
  const suppressed = pathname === '/trainer'

  useEffect(() => {
    if (suppressed) return
    const t = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS)
    return () => window.clearTimeout(t)
  }, [suppressed])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open || suppressed) return null

  const close = () => {
    playSound('tap')
    setOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${TRAINER.nameAr} - online English trainer`}
        className="pop relative w-full max-w-md overflow-hidden rounded-t-3xl border border-brand-200 bg-[var(--surface)] shadow-2xl sm:rounded-3xl dark:border-brand-800"
      >
        {/* gradient cap */}
        <div className="relative bg-gradient-to-br from-brand-600 via-brand-600 to-accent-600 px-5 pb-5 pt-6 text-white">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute left-3 top-3 grid size-8 place-items-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <IconClose size={16} />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={trainerPhoto}
              alt=""
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-2xl object-cover object-top shadow-lg ring-2 ring-white/40"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                Online English trainer
              </p>
              <p className="truncate font-display text-xl font-bold leading-tight">{TRAINER.nameAr}</p>
              <p className="text-[11.5px] text-white/80" dir="rtl" lang="ar">
                {TRAINER.years} سنوات خبرة · حصص فردية مباشرة على زووم
              </p>
            </div>
          </div>

          <p className="mt-4 text-[13.5px] font-semibold leading-relaxed" dir="rtl" lang="ar">
            عايز تتكلم إنجليزي بثقة؟ احجز اشتراك شهري مع المدرب أبو بكر مختار، لخطة مخصصة ليك
            من أول حصة.
          </p>
        </div>

        {/* plans */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-3 gap-2">
            {PLANS.map((plan) => (
              <a
                key={plan.id}
                href={whatsappLink(planMessage(plan.id))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={`tactile rounded-xl border px-2 py-2.5 text-center transition-colors ${
                  plan.featured
                    ? 'border-brand-400 bg-brand-50 hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-950'
                    : 'border-[var(--line)] bg-[var(--bg)] hover:border-brand-300'
                }`}
              >
                <span className="block text-[11px] font-bold text-[var(--ink-soft)]" dir="rtl" lang="ar">
                  {plan.nameAr}
                </span>
                <span className="mt-0.5 block font-display text-lg font-bold leading-none text-brand-700 dark:text-brand-300">
                  {plan.price}
                </span>
                <span className="block text-[9.5px] text-[var(--ink-faint)]">جنيه / شهر</span>
              </a>
            ))}
          </div>

          <ul className="mt-3.5 space-y-1.5">
            {[
              'اختبار تحديد مستوى مجاني قبل أول حصة',
              'خطة مذاكرة مخصصة على هدفك',
              'تصحيح صوتي للواجبات خلال ٢٤ ساعة',
              'خصم ١٠٪ عند الدفع لـ ٣ شهور مقدماً',
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5 text-[12px] leading-snug" dir="rtl" lang="ar">
                <IconCheck size={13} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                <span className="text-[var(--ink-soft)]">{t}</span>
              </li>
            ))}
          </ul>

          <a
            href={generalWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="tactile mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-[#06301a] hover:bg-[#1eb857]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.15-1.35a9.96 9.96 0 0 0 4.89 1.24h.01c5.52 0 10-4.48 10-10 0-2.65-1.05-5.15-2.93-7.02A9.94 9.94 0 0 0 12.04 2Zm0 1.8c2.15 0 4.17.84 5.69 2.36a7.98 7.98 0 0 1 2.35 5.69c0 4.43-3.6 8.03-8.04 8.03a8 8 0 0 1-4.08-1.12l-.29-.17-3.06.8.82-3-.18-.31a7.96 7.96 0 0 1-1.22-4.29c0-4.43 3.6-7.99 8.01-7.99Zm-2.6 4.2c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.06 3.14 5 4.4.7.3 1.24.48 1.67.61.7.23 1.34.19 1.84.12.56-.09 1.73-.71 1.97-1.39.25-.68.25-1.26.17-1.38-.07-.13-.27-.2-.57-.35-.3-.15-1.73-.86-2-1.15-.27-.3-.45-.43-.65-.15-.2.27-.75.95-.92 1.14-.17.2-.34.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.64-.49h-.55Z" />
            </svg>
            احجز حصصك الآن عبر واتساب
            <span dir="ltr">{WHATSAPP_DISPLAY}</span>
          </a>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <Link
              to="/trainer"
              onClick={close}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[12.5px] font-bold text-brand-700 transition-colors hover:bg-[var(--line)] dark:text-brand-300"
            >
              <span dir="rtl" lang="ar">
                شوف كل الباقات والتفاصيل
              </span>
              <IconArrowUpRight size={14} />
            </Link>
            <p className="inline-flex items-center gap-1 text-[11px] text-[var(--ink-faint)]">
              <IconClock size={12} />
              <span dir="rtl" lang="ar">
                مواعيد من ٩ صباحاً لـ ١١ مساءً
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
