import { useEffect, useState } from 'react'
import { IconChevronRight } from './Icons'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`sponsor-aware-fab fixed right-3 z-30 grid size-11 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] shadow-lg transition-all hover:-translate-y-0.5 hover:text-brand-700 sm:right-6 ${
        show ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <IconChevronRight size={18} className="-rotate-90" />
    </button>
  )
}
