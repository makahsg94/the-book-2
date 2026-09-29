import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import MiniPlayer from './MiniPlayer'
import BackToTop from './BackToTop'
import SponsorBar from './SponsorBar'
import { LightboxProvider } from './Media'
import { IconClose } from './Icons'

function AnimatedMain() {
  const { pathname } = useLocation()
  return (
    <main key={pathname} className="page-enter mx-auto w-full max-w-4xl px-4 pb-28 pt-6 sm:px-6">
      <Outlet />
    </main>
  )
}

export default function Layout() {
  const [contentsOpen, setContentsOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Header onContents={() => setContentsOpen(true)} />
      <LightboxProvider />

      {/* Contents is an overlay everywhere – never a dashboard sidebar */}
      {contentsOpen && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Contents">
          <div className="absolute inset-0 bg-black/40" onClick={() => setContentsOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-r border-[var(--line)] bg-[var(--bg)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
                Contents
              </span>
              <button
                type="button"
                onClick={() => setContentsOpen(false)}
                aria-label="Close contents"
                className="grid size-8 place-items-center rounded-lg text-[var(--ink-soft)] hover:bg-[var(--line)]"
              >
                <IconClose size={16} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
              <Sidebar onNavigate={() => setContentsOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <AnimatedMain />

      <MiniPlayer />
      <BackToTop />
      <SponsorBar />

      <footer className="mx-auto max-w-4xl px-4 pb-8 pt-4 text-center text-xs text-[var(--ink-faint)]">
        <p>
          Speakout 3rd Edition A2 {'\u00b7'} course companion {'\u2013'} for studying with your class
        </p>
        <div className="mt-3 space-y-0.5" dir="rtl" lang="ar">
          <p className="text-[12px]">
            المطور:{' '}
            <a
              href="https://www.facebook.com/mahmoud.atef.239821"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
            >
              Mahmoud Atef
            </a>
          </p>
          <p className="text-[12px]">
            لدعم المطور:{' '}
            <span dir="ltr" className="font-semibold text-[var(--ink-soft)]">01042682754</span>
            {'\u00a0'}(فودافون كاش)
          </p>
          <p className="text-[12px]">
            واتساب:{' '}
            <a
              href="https://wa.me/201224552685"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
            >
              <span dir="ltr">01224552685</span>
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}