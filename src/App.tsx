import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider, ProgressProvider, useProgress } from './lib/appContext'
import { AuthProvider, useAuth } from './lib/authContext'
import { recordOpen } from './lib/visits'
import { ToastProvider, useToast } from './lib/toast'
import { dailyReminder } from './lib/reminders'
import { newInboxForBrowser } from './lib/messages'
import { ConfettiHost } from './lib/confetti'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import UnitPage from './pages/UnitPage'
import UnitQuizPage from './pages/UnitQuizPage'
import WritingPage from './pages/WritingPage'
import LessonPage from './pages/LessonPage'
import PageView from './pages/PageView'
import BankPage from './pages/BankPage'
import ReviewPage from './pages/ReviewPage'
import ShadowingPage from './pages/ShadowingPage'
import TrainerPage from './pages/TrainerPage'
import AccountPage, { AccountGate } from './pages/AccountPage'
import AdminPage from './pages/AdminPage'
import { Link } from 'react-router-dom'
import { IconHome } from './components/Icons'

function NotFound() {
  return (
    <div className="fade-up mx-auto max-w-md py-20 text-center">
      <p className="text-6xl font-bold text-brand-300">404</p>
      <h1 className="mt-2 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        This page isn{'\u2019'}t in the course companion.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        <IconHome size={16} />
        Take me home
      </Link>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function BootSplash() {
  return (
    <div className="grid min-h-screen place-items-center">
      <span className="size-12 animate-spin rounded-full border-[3px] border-[var(--line)] border-t-brand-600" />
    </div>
  )
}

function Gate() {
  const { user, ready } = useAuth()
  const progress = useProgress()
  const showToast = useToast()
  useEffect(() => {
    if (ready) recordOpen()
  }, [ready, user])
  useEffect(() => {
    if (!ready || !user) return
    const t = window.setTimeout(() => {
      const msg = dailyReminder(progress.state)
      if (msg) showToast(msg)
    }, 1600)
    return () => window.clearTimeout(t)
  }, [ready, user, progress.state, showToast])
  useEffect(() => {
    if (!ready || !user) return
    const t = window.setTimeout(() => {
      void newInboxForBrowser().then((msgs) => {
        for (const m of msgs.slice(0, 2)) {
          showToast({ title: user, body: m.body, tone: 'info' })
        }
      })
    }, 2600)
    return () => window.clearTimeout(t)
  }, [ready, user, showToast])
  if (!user) {
    if (!ready) return <BootSplash />
    return <AccountGate />
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="book" element={<BookPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="unit/:unitId" element={<UnitPage />} />
        <Route path="unit/:unitId/quiz" element={<UnitQuizPage />} />
        <Route path="unit/:unitId/writing" element={<WritingPage />} />
        <Route path="unit/:unitId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="page/:pdf" element={<PageView />} />
        <Route path="bank/:bankId" element={<BankPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="shadowing" element={<ShadowingPage />} />
        <Route path="trainer" element={<TrainerPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <ToastProvider>
            <ConfettiHost />
            <HashRouter>
              <ScrollToTop />
              <Gate />
            </HashRouter>
          </ToastProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}