import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import trainerPhoto from '../assets/trainer/abubakr-320.webp'
import { TRAINER, WHATSAPP_DISPLAY, generalWhatsappLink } from '../content/trainer'
import { playSound } from '../lib/sounds'
import { IconClose } from './Icons'

const KEY = 'sponsor-dismissed'
const BAR_H = '64px'

function dismissed(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * شريط دعوة المدرب — بيتعرض لكل زائر (قبل التسجيل وبعده).
 * ممكن يقفله الزائر، والاختيار بيتحفظ على الجهاز.
 */
export default function SponsorBar() {
  const [hidden, setHidden] = useState(() => dismissed())

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--sponsor-h', hidden ? '0px' : BAR_H)
    return () => {
      root.style.removeProperty('--sponsor-h')
    }
  }, [hidden])

  if (hidden) return null

  const close = () => {
    try {
      window.localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    playSound('tap')
    setHidden(true)
  }

  return (
    <div className="sponsor-aware-bottom fixed inset-x-0 z-30 border-t border-brand-300 bg-[var(--surface)]/95 backdrop-blur dark:border-brand-800">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-3 py-2.5 sm:px-6">
        <img
          src={trainerPhoto}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="size-10 shrink-0 rounded-xl object-cover object-top ring-1 ring-brand-300 dark:ring-brand-800"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold leading-tight" dir="rtl" lang="ar">
            محتاجة مساعدة في الإنجليزي؟ {TRAINER.nameAr} بياخد اشتراكات
          </p>
          <p className="truncate text-[11px] leading-tight text-[var(--ink-faint)]">
            9+ years teaching {'\u00b7'} live 1:1 on Zoom {'\u00b7'} monthly plans
          </p>
        </div>

        <a
          href={generalWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('tap')}
          className="tactile hidden shrink-0 rounded-xl bg-[#25D366] px-4 py-2 text-[13px] font-bold text-[#06301a] hover:bg-[#1eb857] sm:inline-flex"
        >
          <span dir="rtl" lang="ar">
            واتساب {WHATSAPP_DISPLAY}
          </span>
        </a>

        <Link
          to="/trainer"
          onClick={() => playSound('tap')}
          className="tactile shrink-0 rounded-xl border border-brand-300 bg-brand-50 px-3 py-2 text-[13px] font-bold text-brand-800 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200"
        >
          <span dir="rtl" lang="ar">
            الباقات
          </span>
        </Link>

        <button
          type="button"
          onClick={close}
          aria-label="Hide the trainer banner"
          title="Hide"
          className="grid size-8 shrink-0 place-items-center rounded-lg text-[var(--ink-faint)] transition-colors hover:bg-[var(--line)] hover:text-[var(--ink)]"
        >
          <IconClose size={15} />
        </button>
      </div>
    </div>
  )
}
