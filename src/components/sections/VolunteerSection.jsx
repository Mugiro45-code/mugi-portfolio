import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { BadgeCheck, HeartHandshake, Users, Globe } from 'lucide-react'
import { SectionShell } from '@/components/common/SectionShell'
import { volunteerItems } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'

/* ─── Per-card identity ──────────────────────────────────────────────────── */
const CARD_CONFIG = [
  { icon: HeartHandshake, accent: '#DB2777', glowDark: 'rgba(219,39,119,0.16)',  glowLight: 'rgba(219,39,119,0.09)'  }, // pink-600
  { icon: Users,          accent: '#059669', glowDark: 'rgba(5,150,105,0.16)',   glowLight: 'rgba(5,150,105,0.09)'   }, // emerald-600
  { icon: Globe,          accent: '#2563EB', glowDark: 'rgba(37,99,235,0.16)',   glowLight: 'rgba(37,99,235,0.09)'   }, // blue-600
  { icon: BadgeCheck,     accent: '#D97706', glowDark: 'rgba(217,119,6,0.16)',   glowLight: 'rgba(217,119,6,0.09)'   }, // amber-600
]

/* ─── Theme tokens ───────────────────────────────────────────────────────── */
const tokens = (isDark) => ({
  textPrimary:      isDark ? 'rgba(255,255,255,0.92)' : 'rgba(10,10,20,0.92)',
  textMuted:        isDark ? 'rgba(255,255,255,0.40)' : 'rgba(10,10,20,0.42)',
  textDetail:       isDark ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,20,0.48)',
  textPoint:        isDark ? 'rgba(255,255,255,0.58)' : 'rgba(10,10,20,0.58)',
  textOrg:          isDark ? 'rgba(255,255,255,0.30)' : 'rgba(10,10,20,0.32)',
  textDot:          isDark ? 'rgba(255,255,255,0.15)' : 'rgba(10,10,20,0.15)',
  cardBg:           isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  cardBorderIdle:   isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
  bulletBg:         isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
  bulletBorder:     isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
  shadowIdle:       isDark ? 'rgba(0,0,0,0.28)'       : 'rgba(0,0,0,0.07)',
  shadowHover:      isDark ? 'rgba(0,0,0,0.40)'       : 'rgba(0,0,0,0.12)',
  shimmer:          isDark ? 'rgba(255,255,255,0.04)'  : 'rgba(255,255,255,0.55)',
})

/* ─── Card ───────────────────────────────────────────────────────────────── */
const VolunteerCard = ({ item, index, isDark }) => {
  const cfg = CARD_CONFIG[index % CARD_CONFIG.length]
  const Icon = cfg.icon
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const t = tokens(isDark)
  const glow = isDark ? cfg.glowDark : cfg.glowLight

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-50, 50], [6, -6])
  const rotY = useTransform(x, [-50, 50], [-6, 6])
  const sx = useSpring(rotX, { stiffness: 260, damping: 26 })
  const sy = useSpring(rotY, { stiffness: 260, damping: 26 })

  const points = item.points ?? []
  const visiblePoints = expanded ? points : points.slice(0, 2)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false) }}
      className="relative h-full"
    >
      {/* Back glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -inset-2 rounded-2xl blur-xl -z-10"
        style={{ background: glow }}
      />

      <div
        className="relative h-full overflow-hidden rounded-2xl p-6 flex flex-col gap-5"
        style={{
          background: t.cardBg,
          border: `1px solid ${hovered ? cfg.accent + '45' : t.cardBorderIdle}`,
          boxShadow: hovered
            ? `0 0 0 1px ${cfg.accent}18, 0 24px 56px ${t.shadowHover}`
            : `0 4px 24px ${t.shadowIdle}`,
          transition: 'border-color 0.35s, box-shadow 0.35s, background 0.35s',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}80, transparent)` }}
        />

        {/* Shimmer */}
        <motion.div
          animate={{ x: hovered ? '220%' : '-100%' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 w-1/3 skew-x-12"
          style={{ background: `linear-gradient(90deg, transparent, ${t.shimmer}, transparent)` }}
        />

        {/* Ambient radial */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at top left, ${glow}, transparent 55%)` }}
        />

        {/* Header row */}
        <div className="relative flex items-start gap-4">
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 350 }}
            className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: cfg.accent + '18', border: `1px solid ${cfg.accent}40` }}
          >
            <Icon className="h-5 w-5" style={{ color: cfg.accent }} strokeWidth={1.5} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.p
              animate={{ color: hovered ? cfg.accent : t.textPrimary }}
              transition={{ duration: 0.3 }}
              className="text-sm font-semibold leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.title}
            </motion.p>
            <p
              className="mt-1 text-[10px] uppercase tracking-[0.22em] leading-relaxed"
              style={{ color: t.textOrg }}
            >
              {item.organization}
              {item.period && (
                <>
                  <span className="mx-1.5" style={{ color: t.textDot }}>•</span>
                  <span style={{ color: cfg.accent + 'aa' }}>{item.period}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px"
          style={{ background: `linear-gradient(90deg, ${cfg.accent}30, transparent)` }}
        />

        {/* Detail */}
        <p
          className="relative text-xs leading-relaxed"
          style={{ color: t.textDetail, fontWeight: 300 }}
        >
          {item.detail}
        </p>

        {/* Points */}
        {points.length > 0 && (
          <div className="relative space-y-2.5 flex-1">
            <AnimatePresence initial={false}>
              {visiblePoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                  style={{
                    background: t.bulletBg,
                    border: `1px solid ${t.bulletBorder}`,
                  }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: cfg.accent, boxShadow: `0 0 6px ${cfg.accent}` }}
                  />
                  <p className="text-xs leading-relaxed" style={{ color: t.textPoint }}>
                    {point}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {points.length > 2 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 text-[11px] font-medium transition-opacity hover:opacity-80"
                style={{ color: cfg.accent }}
              >
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  ↓
                </motion.span>
                {expanded ? 'Show less' : `+${points.length - 2} more`}
              </button>
            )}
          </div>
        )}

        {/* Index watermark */}
        <div
          className="absolute bottom-4 right-5 text-[10px] font-semibold tabular-nums pointer-events-none"
          style={{ color: cfg.accent + '35' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export const VolunteerSection = () => {
  const { isDark } = useThemeMode()
  const t = tokens(isDark)

  return (
    <SectionShell id="volunteer" className="py-20 sm:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        #volunteer * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-14">

        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: '#DB2777' }}
            >
              Volunteer Work
            </span>
            <span className="h-px w-12" style={{ background: 'rgba(219,39,119,0.35)' }} />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-light leading-tight"
              style={{ color: t.textPrimary, fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Giving back to the{' '}
              <em style={{ color: '#DB2777', fontStyle: 'italic' }}>community.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-lg text-sm leading-relaxed"
            style={{ color: t.textMuted, fontWeight: 300 }}
          >
            Mentorship and community support are part of the long-term architecture
            of a healthy engineering career.
          </motion.p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          style={{ gridAutoRows: '1fr' }}
        >
          {volunteerItems.map((item, i) => (
            <VolunteerCard key={item.title} item={item} index={i} isDark={isDark} />
          ))}
        </div>

      </div>
    </SectionShell>
  )
}