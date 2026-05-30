import { useEffect, useRef, useState } from 'react'
import {
  BrainCircuit,
  Building2,
  ChevronDown,
  CreditCard,
  Database,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const pages = [
  {
    id: 'selten-hms',
    label: 'Selten HMS',
    eyebrow: 'Smart Hospital Management System',
    title: 'Hospital workflows built for configurable modules and faster daily operations.',
    summary:
      'Built for patients, appointments, OP/IP, billing, pharmacy, and reports with a dynamic module builder and production-focused flow.',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1400&auto=format&fit=crop&q=80',
    imageAlt: 'Modern hospital corridor with medical equipment',
    accent: 'from-cyan-400/95 via-sky-500/85 to-blue-600/95',
    contentSide: 'left',
    kicker: 'Production system',
    stats: [
      { label: 'Modules', value: 'Dynamic workflow builder', icon: Sparkles },
      { label: 'Backend', value: 'FastAPI + Laravel', icon: BrainCircuit },
      { label: 'Scale', value: 'Secure & enterprise ready', icon: ShieldCheck },
    ],
    chips: ['Patients', 'Appointments', 'OP/IP', 'Billing', 'Pharmacy', 'Reports'],
  },
  {
    id: 'billing-inventory',
    label: 'Billing & Inventory',
    eyebrow: 'Billing Software',
    title: 'Billing, inventory, and reporting in one business operations platform.',
    summary:
      'Automates invoicing, supports access control, analytics, product administration, and inventory tracking for real-time business operations.',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&auto=format&fit=crop&q=80',
    imageAlt: 'Laptop with finance dashboard and payment cards',
    accent: 'from-amber-300/95 via-orange-500/85 to-rose-600/95',
    contentSide: 'right',
    kicker: 'Business platform',
    stats: [
      { label: 'Invoicing', value: 'Automated workflow', icon: CreditCard },
      { label: 'Inventory', value: 'Live stock tracking', icon: Database },
      { label: 'Reporting', value: 'Business insights', icon: Building2 },
    ],
    chips: ['Invoices', 'Payments', 'Inventory', 'Analytics', 'Access control'],
  },
]

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1)
  const currentPageRef = useRef(currentPage)
  const scrolling = useRef(false)
  const touchStartY = useRef(0)
  const wheelDelta = useRef(0)
  const wheelDirection = useRef(0)
  const numOfPages = pages.length
  const animTime = 760

  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  const navigateUp = () => {
    setCurrentPage((page) => Math.max(1, page - 1))
  }

  const navigateDown = () => {
    setCurrentPage((page) => Math.min(numOfPages, page + 1))
  }

  const lockScroll = () => {
    scrolling.current = true
    window.setTimeout(() => {
      scrolling.current = false
    }, animTime)
  }

  const resetWheelState = () => {
    wheelDelta.current = 0
    wheelDirection.current = 0
  }

  useEffect(() => {
    const handleWheel = (event) => {
      const page = currentPageRef.current
      const canGoDown = page < numOfPages
      const canGoUp = page > 1

      if (!canGoDown && !canGoUp) return

      event.preventDefault()

      if (scrolling.current) return

      const normalizedDelta =
        event.deltaMode === 1
          ? event.deltaY * 16
          : event.deltaMode === 2
            ? event.deltaY * 120
            : event.deltaY
      const direction = normalizedDelta > 0 ? 1 : normalizedDelta < 0 ? -1 : 0

      if (direction !== wheelDirection.current) {
        wheelDirection.current = direction
        wheelDelta.current = 0
      }

      wheelDelta.current += normalizedDelta * 0.72
      const threshold = 72

      if (Math.abs(wheelDelta.current) < threshold) return

      if (direction > 0 && canGoDown) {
        lockScroll()
        navigateDown()
        resetWheelState()
      } else if (direction < 0 && canGoUp) {
        lockScroll()
        navigateUp()
        resetWheelState()
      }
    }

    const handleKeyDown = (event) => {
      if (scrolling.current) return

      if (event.key === 'ArrowDown' && currentPageRef.current < numOfPages) {
        event.preventDefault()
        lockScroll()
        navigateDown()
      }

      if (event.key === 'ArrowUp' && currentPageRef.current > 1) {
        event.preventDefault()
        lockScroll()
        navigateUp()
      }
    }

    const handleTouchStart = (event) => {
      touchStartY.current = event.touches[0]?.clientY ?? 0
    }

    const handleTouchEnd = (event) => {
      if (scrolling.current) return

      const touchEndY = event.changedTouches[0]?.clientY ?? 0
      const deltaY = touchStartY.current - touchEndY
      const threshold = 44

      if (Math.abs(deltaY) < threshold) return

      const page = currentPageRef.current

      if (deltaY > 0 && page < numOfPages) {
        lockScroll()
        navigateDown()
        resetWheelState()
      }

      if (deltaY < 0 && page > 1) {
        lockScroll()
        navigateUp()
        resetWheelState()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [numOfPages])

  return (
    <div className="relative mx-auto max-w-7xl text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.14),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />

      <div className="relative h-[74svh] min-h-[620px] max-h-[860px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050816] shadow-[0_32px_100px_-42px_rgba(0,0,0,0.88)] sm:h-[72svh]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.15),_transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] tracking-[0.3em] text-white/78 backdrop-blur-xl sm:top-4 sm:px-4 sm:py-2 sm:text-xs">
          PROJECTS / {String(currentPage).padStart(2, '0')} - {String(numOfPages).padStart(2, '0')}
        </div>

        <div className="absolute right-4 top-4 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl md:flex">
          <span className="size-1.5 rounded-full bg-cyan-300" />
          Smooth scroll navigation
        </div>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {pages.map((page, index) => {
            const isActive = currentPage === index + 1

            return <span key={page.id} className={`h-1.5 rounded-full transition-all duration-500 ${isActive ? 'w-8 bg-white' : 'w-3 bg-white/25'}`} />
          })}
        </div>

        {pages.map((page, index) => {
          const pageNumber = index + 1
          const isActive = currentPage === pageNumber
          const isPast = pageNumber < currentPage
          const isContentLeft = page.contentSide === 'left'

          return (
            <article
              key={page.id}
              className={`absolute inset-0 p-3 transition-all duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-4 lg:p-5 ${
                isActive ? 'translate-y-0 opacity-100' : isPast ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
              }`}
              aria-hidden={!isActive}
            >
              <div className="grid h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a1020] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:grid-cols-[1.02fr_0.98fr]">
                <div className={`relative flex h-full min-h-0 flex-col justify-between gap-5 p-5 sm:p-6 lg:p-7 ${isContentLeft ? 'order-1' : 'order-2'}`}>
                  <div className="space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-cyan-200/80 sm:text-xs">
                      <span className="h-px w-8 bg-cyan-300/80" />
                      <span>{page.kicker}</span>
                    </div>

                    <div className="max-w-2xl space-y-3">
                      <p className="text-[11px] uppercase tracking-[0.42em] text-white/55 sm:text-xs">{page.label}</p>
                      <h2 className="max-w-xl text-3xl font-semibold leading-[1.06] text-balance text-white sm:text-4xl lg:text-[clamp(2.6rem,3.8vw,4.5rem)]">
                        {page.title}
                      </h2>
                      <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-[15px] sm:leading-8">
                        {page.summary}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {page.stats.map((stat) => {
                        const StatIcon = stat.icon

                        return (
                          <div key={stat.label} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/[0.06]">
                            <div className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${page.accent} text-white shadow-[0_16px_30px_-18px_rgba(0,0,0,0.8)]`}>
                              <StatIcon className="size-5" />
                            </div>
                            <p className="mt-3 text-base font-semibold text-white sm:text-[1.05rem]">{stat.label}</p>
                            <p className="mt-1 text-sm text-white/62">{stat.value}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {page.chips.map((chip) => (
                        <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/78 sm:text-xs">
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/85 backdrop-blur-xl sm:text-sm">
                      <span>Scroll or use arrow keys to move through projects</span>
                      <ChevronDown className="size-4 animate-bounce text-white/70" />
                    </div>
                  </div>
                </div>

                <div className={`relative min-h-[280px] overflow-hidden border-white/10 lg:min-h-0 ${isContentLeft ? 'order-2 lg:border-l' : 'order-1 lg:border-r'}`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[900ms] ease-out"
                    style={{
                      backgroundImage: `url(${page.image})`,
                      transform: isActive ? 'scale(1)' : 'scale(1.05)',
                    }}
                    aria-hidden="true"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.accent} opacity-70 mix-blend-screen`} />
                  <div className="absolute inset-0 bg-black/28" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_28%)]" />

                  <div className="absolute top-4 left-4 rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl sm:left-5 sm:top-5 sm:text-xs">
                    {String(pageNumber).padStart(2, '0')} / {String(numOfPages).padStart(2, '0')}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                    <div className="max-w-xl rounded-[1.5rem] border border-white/12 bg-black/35 p-4 backdrop-blur-2xl sm:p-5 lg:p-6">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-white/72 sm:text-xs">
                        <span className="h-px w-7 bg-white/60" />
                        <span>{page.label}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                        {page.eyebrow}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-white/82 sm:text-[15px]">
                        {page.summary}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-white/75">
                        <MonitorSmartphone className="size-4" />
                        <span>{page.imageAlt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}