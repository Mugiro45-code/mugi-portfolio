import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingOrbs } from '@/components/animations/FloatingOrbs'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect } from 'react'

export const SiteLayout = () => {
  useLenisScroll()
  useScrollReveal()
  const { pathname } = useLocation()

  useEffect(() => {
    // Try a smooth scroll to top on route change. If a custom scroller (Lenis) is active
    // this will still request the browser to move to top; Lenis may intercept for a smooth effect.
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