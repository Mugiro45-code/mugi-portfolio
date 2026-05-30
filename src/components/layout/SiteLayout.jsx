import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingOrbs } from '@/components/animations/FloatingOrbs'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const SiteLayout = () => {
  useLenisScroll()
  useScrollReveal()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--app-bg)] text-[var(--app-text)] transition-colors duration-300">
      <FloatingOrbs />
      <Navbar />
      <main className="relative z-10 pt-24 sm:pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}