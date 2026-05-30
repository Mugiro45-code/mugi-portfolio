import { useEffect } from 'react'
import Lenis from 'lenis'

// Module-scoped reference to the active Lenis instance so other modules can use it.
let lenisInstance = null

export const getLenis = () => lenisInstance

export const useLenisScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    lenisInstance = lenis

    let rafId = 0

    const raf = (time) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}