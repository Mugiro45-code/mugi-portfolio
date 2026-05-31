/**
 * HeroSection — "The Terminal Card" concept
 * 
 * Design philosophy:
 * - Your identity rendered as a premium developer artifact
 * - Monospace typewriter effect assembles your name on load
 * - Morphing role text cycles through your specialisations
 * - Animated code-comment metadata strip (stack, location, status)
 * - Floating achievement card with shimmer border
 * - Full dark/light theme aware via Tailwind dark: prefix
 * - Responsive: stacked mobile → side-by-side desktop
 * 
 * Fonts needed in index.html:
 * <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
 */

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, MapPin, Globe } from 'lucide-react'
import { SectionShell } from '@/components/common/SectionShell'
import heroPic from '@/assets/images/Profile-Pic-hero.jpg'
import resumePdf from '@/assets/Resume/Resume - MUGILAN S.pdf'

/* ─── Data ─────────────────────────────────────────── */
const ROLES = [
  'Full-Stack Engineer',
  'Backend Architect',
  'API Developer',
  'AI Integration Dev',
  'DevOps Practitioner',
]

const META_LINES = [
  { key: 'location',  val: 'Karaikudi, Tamil Nadu' },
  { key: 'company',   val: 'Selten Technologies' },
  { key: 'status',    val: 'open_to_work: true' },
  { key: 'stack',     val: 'Python · FastAPI · Laravel · React · PostgreSQL · Docker' },
  { key: 'shipped',   val: 'HMS · CRM · Billing · Inventory · E-Commerce' },
]

const STACK_BADGES = ['Python', 'FastAPI', 'Laravel', 'React', 'PostgreSQL', 'Docker']

/* ─── Typewriter hook ───────────────────────────────── */
function useTypewriter(text, speed = 55, startDelay = 400) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, speed)
      return () => clearInterval(iv)
    }, startDelay)
    return () => clearTimeout(t)
  }, [text, speed, startDelay])

  return { displayed, done }
}

/* ─── Morphing role ─────────────────────────────────── */
function useMorphRole(roles, interval = 2800) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % roles.length)
        setVisible(true)
      }, 350)
    }, interval)
    return () => clearInterval(id)
  }, [roles, interval])

  return { role: roles[idx], visible }
}

/* ─── Component ─────────────────────────────────────── */
export const HeroSection = () => {
  const { displayed: typedName, done: nameDone } = useTypewriter('Mugilan S.', 80, 300)
  const { role, visible: roleVisible } = useMorphRole(ROLES)
  const [metaVisible, setMetaVisible] = useState(false)
  const [shimmer, setShimmer] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMetaVisible(true), 1400)
    const s = setTimeout(() => setShimmer(true), 2000)
    return () => { clearTimeout(t); clearTimeout(s) }
  }, [])

  return (
    <SectionShell id="hero" className="!py-0">
      <section
        className="
          relative mx-3 my-3 w-[calc(100%-1.5rem)] min-h-[calc(100vh-1.5rem)] flex items-center overflow-hidden
          rounded-[12px] border border-black/[.04] dark:border-white/[.05]
          shadow-[0_30px_100px_rgba(0,0,0,.10)]
          bg-[#f7f6f3] dark:bg-[#0c0c0c]
          transition-colors duration-300
        "
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >

        {/* ── Background texture grid ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[.035] dark:opacity-[.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Ambient glow ── */}
        <div className="pointer-events-none absolute left-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-violet-500/[.05] dark:bg-violet-500/[.07] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-100px] right-[100px] h-[400px] w-[400px] rounded-full bg-blue-500/[.04] dark:bg-blue-500/[.06] blur-[100px]" />

        {/* ── Outer layout ── */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 md:px-10 md:py-0
                        grid grid-cols-1 md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_380px]
                        gap-10 md:gap-14 items-center min-h-screen">

          {/* ══════════════ LEFT PANEL ══════════════ */}
          <div className="flex flex-col gap-0 order-2 md:order-1 rounded-[8px] overflow-hidden border border-black/[.05] dark:border-white/[.06] bg-white/35 dark:bg-white/[.02] backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,.10)]">

            {/* Window chrome bar */}
            <div className="
              flex items-center gap-2 px-4 py-3 border-b
              bg-white/55 dark:bg-white/[.035]
              border-black/[.04] dark:border-white/[.05]
              backdrop-blur-sm
            ">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-[11px] text-black/30 dark:text-white/25 tracking-wide">
                mugilan.dev — portfolio.tsx
              </span>
            </div>

            {/* Main card body */}
            <div className="
              border border-t-0 border-transparent px-6 pt-7 pb-7
              bg-white/48 dark:bg-white/[.02]
              backdrop-blur-md
            ">

              {/* Status line */}
              <div className="mb-6 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[11px] tracking-[.1em] text-black/40 dark:text-white/35 uppercase">
                  available for opportunities
                </span>
              </div>

              {/* Typewriter name */}
              <div className="mb-1">
                <span className="text-[11px] text-black/25 dark:text-white/20 select-none">
                  const developer ={' '}
                </span>
                <span className="text-[11px] text-violet-500/70 dark:text-violet-400/60">
                  &quot;
                </span>
                <span
                  className="text-[clamp(34px,6vw,58px)] font-bold leading-tight tracking-tight
                             text-[#111] dark:text-white"
                  style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '-1.5px' }}
                >
                  {typedName}
                </span>
                {/* Blinking cursor */}
                <span
                  className="inline-block w-[3px] h-[1.1em] bg-violet-500 dark:bg-violet-400
                             align-middle ml-1 animate-pulse"
                  style={{ opacity: nameDone ? 1 : 0.7 }}
                />
                <span className="text-[11px] text-violet-500/70 dark:text-violet-400/60">
                  &quot;
                </span>
              </div>

              {/* Morphing role */}
              <div className="mb-7 h-7 flex items-center gap-2">
                <span className="text-[12px] text-black/30 dark:text-white/25">
                  //
                </span>
                <span
                  className="text-[13px] font-medium tracking-wide text-violet-600 dark:text-violet-400
                             transition-all duration-300"
                  style={{ opacity: roleVisible ? 1 : 0, transform: `translateY(${roleVisible ? 0 : 6}px)` }}
                >
                  {role}
                </span>
              </div>

              {/* Meta lines — code comment style */}
              <div
                className="mb-8 flex flex-col gap-2 overflow-hidden transition-all duration-700"
                style={{ maxHeight: metaVisible ? '300px' : '0', opacity: metaVisible ? 1 : 0 }}
              >
                {META_LINES.map((m, i) => (
                  <div
                    key={m.key}
                    className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
                    style={{
                      transitionDelay: `${i * 100}ms`,
                      opacity: metaVisible ? 1 : 0,
                      transform: `translateX(${metaVisible ? 0 : -12}px)`,
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                  >
                    <span className="text-[11px] text-black/25 dark:text-white/20 select-none shrink-0">
                      /**
                    </span>
                    <span className="text-[11px] text-blue-500/70 dark:text-blue-400/60 shrink-0">
                      @{m.key}
                    </span>
                    <span className="text-[11px] text-black/50 dark:text-white/40 break-all">
                      {m.val}
                    </span>
                    <span className="text-[11px] text-black/25 dark:text-white/20 select-none shrink-0">
                      */
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-7 h-px bg-gradient-to-r from-black/[.08] via-black/[.05] to-transparent dark:from-white/[.08] dark:via-white/[.04]" />

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="#projects"
                  className="
                    group flex items-center gap-2 rounded-lg px-5 py-2.5
                    bg-[#111] dark:bg-white
                    text-white dark:text-[#111]
                    text-[13px] font-medium tracking-wide
                    transition-all duration-200 hover:opacity-85 active:scale-[.98]
                  "
                >
                  <span>./view_projects</span>
                  <ArrowDownRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </a>
                <a
                  href={resumePdf}
                  download
                  className="
                    flex items-center gap-2 rounded-lg px-5 py-2.5
                    border border-black/[.1] dark:border-white/[.12]
                    text-black/60 dark:text-white/55
                    text-[13px] font-medium tracking-wide
                    transition-all duration-200 hover:border-black/25 dark:hover:border-white/25
                    hover:text-black/90 dark:hover:text-white/90
                  "
                >
                  resume.pdf ↓
                </a>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-0">
                {[
                  { n: '1+',  l: 'yr exp'      },
                  { n: '5+',  l: 'apps shipped' },
                  { n: '6+',  l: 'tech domains' },
                ].map((s, i) => (
                  <div key={s.l} className="flex items-center">
                    {i > 0 && <div className="h-8 w-px bg-black/[.08] dark:bg-white/[.08] mx-5" />}
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-[22px] font-bold leading-none tracking-tight text-[#111] dark:text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {s.n}
                      </span>
                      <span className="text-[10px] uppercase tracking-[.12em] text-black/35 dark:text-white/30">
                        {s.l}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact links row below card */}
            <div className="mt-4 flex items-center gap-5">
              <a
                href="https://github.com/Mugiro45-code"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] tracking-wide
                           text-black/35 dark:text-white/30
                           hover:text-black/70 dark:hover:text-white/70 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                github.com/Mugiro45-code
              </a>
              <span className="h-3.5 w-px bg-black/[.1] dark:bg-white/[.1]" />
              <a
                href="https://mugilan.dev"
                className="flex items-center gap-1.5 text-[11px] tracking-wide
                           text-black/35 dark:text-white/30
                           hover:text-black/70 dark:hover:text-white/70 transition-colors"
              >
                <Globe size={13} />
                mugilan.dev
              </a>
              <span className="h-3.5 w-px bg-black/[.1] dark:bg-white/[.1]" />
              <span className="flex items-center gap-1.5 text-[11px] tracking-wide text-black/35 dark:text-white/30">
                <MapPin size={13} />
                Karaikudi, TN
              </span>
            </div>
          </div>

          {/* ══════════════ RIGHT PANEL ══════════════ */}
          <div className="flex flex-col gap-4 order-1 md:order-2">

            {/* Photo card */}
            <div className="relative overflow-hidden rounded-xl mt-3">

              {/* Shimmer border */}
              <div
                className="absolute inset-0 rounded-2xl z-10 pointer-events-none transition-opacity duration-1000"
                style={{
                  opacity: shimmer ? 1 : 0,
                  background: `linear-gradient(135deg,
                    transparent 0%,
                    rgba(139,92,246,0.25) 30%,
                    rgba(59,130,246,0.15) 60%,
                    transparent 100%
                  )`,
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Photo */}
              <div className="relative overflow-hidden rounded-xl bg-[#e8e5de] dark:bg-[#1a1a1a]
                              aspect-[3/4] md:aspect-[4/5]">
                <img
                  src={heroPic}
                  alt="Mugilan S"
                  className="
                    w-full h-full object-cover object-top
                    grayscale hover:grayscale-0
                    transition-all duration-700 scale-[1.02] hover:scale-100
                  "
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32
                                bg-gradient-to-t from-[#f7f6f3] dark:from-[#0c0c0c] to-transparent" />
              </div>
            </div>

            {/* Award badge */}
            <div className="
              flex items-center gap-3 rounded-l px-4 py-3
              border border-amber-400/25 bg-amber-50/70 dark:bg-amber-400/[.06]
              dark:border-amber-400/[.18]
            ">
              <span className="text-lg shrink-0">✦</span>
              <div>
                <p className="text-[12px] font-medium text-amber-700 dark:text-amber-400/90 leading-tight">
                  Best Performer Award
                </p>
                <p className="text-[11px] text-amber-600/60 dark:text-amber-400/45 tracking-wide">
                  Selten Technologies · 2025
                </p>
              </div>
            </div>

            {/* Stack pills */}
            <div className="
              rounded-l border px-4 py-3
              border-black/[.07] dark:border-white/[.07]
              bg-white/50 dark:bg-white/[.02]
              mb-3
            ">
              <p className="mb-2.5 text-[10px] uppercase tracking-[.16em] text-black/30 dark:text-white/25">
                // tech_stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STACK_BADGES.map(t => (
                  <span
                    key={t}
                    className="
                      text-[11px] px-2.5 py-1 rounded-md tracking-wide
                      border border-black/[.08] dark:border-white/[.08]
                      bg-black/[.03] dark:bg-white/[.04]
                      text-black/55 dark:text-white/45
                    "
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <a
          href="#about"
          aria-label="Scroll to about"
          className="
            absolute bottom-7 left-1/2 -translate-x-1/2 z-20
            flex flex-col items-center gap-1.5
            text-[10px] uppercase tracking-[.16em]
            text-black/25 dark:text-white/20
            hover:text-black/50 dark:hover:text-white/45
            transition-colors
          "
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>scroll</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full
                          border border-black/[.1] dark:border-white/[.1]">
            <ArrowDownRight size={12} />
          </div>
        </a>

      </section>
    </SectionShell>
  )
}

export default HeroSection