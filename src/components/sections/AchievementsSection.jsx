import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Award, ShieldCheck, Sparkles, Trophy, Star, Zap } from 'lucide-react'
import { SectionShell } from '@/components/common/SectionShell'
import { achievementItems } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'

/* ─── Icon + accent cycle ────────────────────────────────────────────────── */
const CARD_CONFIG = [
  { icon: Trophy,      accent: '#D97706', glowDark: 'rgba(217,119,6,0.18)',   glowLight: 'rgba(217,119,6,0.10)'   }, // amber-600
  { icon: ShieldCheck, accent: '#0891B2', glowDark: 'rgba(8,145,178,0.18)',   glowLight: 'rgba(8,145,178,0.10)'   }, // cyan-600
  { icon: Award,       accent: '#7C3AED', glowDark: 'rgba(124,58,237,0.18)',  glowLight: 'rgba(124,58,237,0.10)'  }, // violet-600
  { icon: Star,        accent: '#059669', glowDark: 'rgba(5,150,105,0.18)',   glowLight: 'rgba(5,150,105,0.10)'   }, // emerald-600
  { icon: Sparkles,    accent: '#DB2777', glowDark: 'rgba(219,39,119,0.18)',  glowLight: 'rgba(219,39,119,0.10)'  }, // pink-600
  { icon: Zap,         accent: '#EA580C', glowDark: 'rgba(234,88,12,0.18)',   glowLight: 'rgba(234,88,12,0.10)'   }, // orange-600
]

/* ─── Theme tokens ───────────────────────────────────────────────────────── */
const tokens = (isDark) => ({
  textPrimary:    isDark ? 'rgba(255,255,255,0.95)' : 'rgba(10,10,20,0.92)',
  textMuted:      isDark ? 'rgba(255,255,255,0.40)' : 'rgba(10,10,20,0.42)',
  textDetail:     isDark ? 'rgba(255,255,255,0.42)' : 'rgba(10,10,20,0.44)',
  cardBg:         isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  cardBorderIdle: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
  shadowIdle:     isDark ? 'rgba(0,0,0,0.30)'       : 'rgba(0,0,0,0.07)',
  shadowHover:    isDark ? 'rgba(0,0,0,0.40)'       : 'rgba(0,0,0,0.12)',
  shimmer:        isDark ? 'rgba(255,255,255,0.05)'  : 'rgba(255,255,255,0.55)',
})

/* ─── Single achievement card ────────────────────────────────────────────── */
const AchievementCard = ({ item, index, isDark }) => {
  const cfg = CARD_CONFIG[index % CARD_CONFIG.length]
  const Icon = cfg.icon
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const t = tokens(isDark)
  const glow = isDark ? cfg.glowDark : cfg.glowLight

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-50, 50], [7, -7])
  const rotY = useTransform(x, [-50, 50], [-7, 7])
  const sx = useSpring(rotX, { stiffness: 280, damping: 26 })
  const sy = useSpring(rotY, { stiffness: 280, damping: 26 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false) }}
      className="relative h-full cursor-default"
    >
      {/* Back glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -inset-2 rounded-2xl blur-xl -z-10"
        style={{ background: glow }}
      />

      {/* Card */}
      <div
        className="relative h-full overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
        style={{
          background: t.cardBg,
          border: `1px solid ${hovered ? cfg.accent + '45' : t.cardBorderIdle}`,
          boxShadow: hovered
            ? `0 0 0 1px ${cfg.accent}20, 0 20px 50px ${t.shadowHover}`
            : `0 4px 24px ${t.shadowIdle}`,
          transition: 'border-color 0.35s, box-shadow 0.35s, background 0.35s',
        }}
      >
        {/* Top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}80, transparent)` }}
        />

        {/* Shimmer sweep on hover */}
        <motion.div
          animate={{ x: hovered ? '220%' : '-100%' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 w-1/3 skew-x-12"
          style={{ background: `linear-gradient(90deg, transparent, ${t.shimmer}, transparent)` }}
        />

        {/* Ambient glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at top left, ${glow}, transparent 60%)` }}
        />

        {/* Icon */}
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 350 }}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            background: cfg.accent + '18',
            border: `1px solid ${cfg.accent}40`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: cfg.accent }} strokeWidth={1.5} />
        </motion.div>

        {/* Text */}
        <div className="relative flex-1 flex flex-col justify-between">
          <motion.p
            animate={{ color: hovered ? cfg.accent : t.textPrimary }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold leading-snug"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item.title}
          </motion.p>

          <p
            className="mt-2 text-xs leading-relaxed"
            style={{ color: t.textDetail, fontWeight: 300 }}
          >
            {item.detail}
          </p>
        </div>

        {/* Bottom index number */}
        <div
          className="absolute bottom-4 right-5 text-[10px] font-semibold tabular-nums"
          style={{ color: cfg.accent + '40' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export const AchievementsSection = () => {
  const { isDark } = useThemeMode()
  const t = tokens(isDark)

  return (
    <SectionShell id="achievements" className="py-20 sm:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        #achievements * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-14">

        {/* ── Header ── */}
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
              style={{ color: '#D97706' }}
            >
              Achievements
            </span>
            <span className="h-px w-12" style={{ background: 'rgba(217,119,6,0.35)' }} />
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
              Craft, consistency,{' '}
              <em style={{ color: '#D97706', fontStyle: 'italic' }}>and judgment.</em>
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
            Milestones that stay meaningful after the launch-day polish fades.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: '1fr' }}>
          {achievementItems.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} isDark={isDark} />
          ))}
        </div>

      </div>
    </SectionShell>
  )
}