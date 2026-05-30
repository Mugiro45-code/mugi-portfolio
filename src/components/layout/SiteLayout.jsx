import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingOrbs } from '@/components/animations/FloatingOrbs'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect } from 'react'
import { getLenis } from '@/hooks/useLenisScroll'

export const SiteLayout = () => {
  useLenisScroll()
  useScrollReveal()
  const { pathname } = useLocation()

  useEffect(() => {
    // If Lenis is active, use its scrollTo for consistent smooth scrolling.
    const lenis = getLenis()
    if (lenis && typeof lenis.scrollTo === 'function') {
      // duration in ms; easing handled by Lenis
      try {
        lenis.scrollTo(0, { duration: 600 })
        return
      } catch (_) {
        // fallthrough to window scroll
      }
    }

    // Fallback: native smooth scroll
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

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