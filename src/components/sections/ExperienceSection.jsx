import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionShell } from '@/components/common/SectionShell'
import { experienceItems } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'
import { BadgeCheck, CalendarDays, Layers, Zap } from 'lucide-react'

/* ─── Data transform ────────────────────────────────────────────────────── */
const experiencePhases = experienceItems.map((experience) => {
  const position = experience.positions[0]
  const description = String(position?.description ?? '')
    .split('\n')
    .map((l) => l.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean)
  return {
    id: experience.id,
    title: experience.companyName,
    subtitle: position?.title ?? '',
    period: position?.employmentPeriod ?? '',
    meta: position?.employmentType ?? '',
    description,
    skills: Array.isArray(position?.skills) ? position.skills : [],
  }
})

/* ─── Accent palette per role ───────────────────────────────────────────── */
const ROLE_CONFIG = [
  {
    label: 'Lead Role',
    accent: '#0EA5E9',          // sky-500 - readable on both themes
    glowDark: 'rgba(14,165,233,0.18)',
    glowLight: 'rgba(14,165,233,0.10)',
    pillDark: 'rgba(14,165,233,0.12)',
    pillLight: 'rgba(14,165,233,0.10)',
    pillBorderDark: 'rgba(14,165,233,0.30)',
    pillBorderLight: 'rgba(14,165,233,0.35)',
  },
  {
    label: 'Supporting Role',
    accent: '#7C3AED',          // violet-600 - readable on both themes
    glowDark: 'rgba(124,58,237,0.18)',
    glowLight: 'rgba(124,58,237,0.08)',
    pillDark: 'rgba(124,58,237,0.12)',
    pillLight: 'rgba(124,58,237,0.10)',
    pillBorderDark: 'rgba(124,58,237,0.30)',
    pillBorderLight: 'rgba(124,58,237,0.35)',
  },
]

/* ─── Theme-aware token helper ──────────────────────────────────────────── */
const tokens = (isDark) => ({
  // Surfaces
  cardBg:         isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  cardBgActive:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
  bulletBg:       isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
  bulletBorder:   isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
  periodBg:       isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
  periodBorder:   isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  statsBg:        isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)',
  statsBorder:    isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
  // Text
  textPrimary:    isDark ? 'rgba(255,255,255,0.95)' : 'rgba(10,10,20,0.92)',
  textSecondary:  isDark ? 'rgba(255,255,255,0.65)' : 'rgba(10,10,20,0.60)',
  textMuted:      isDark ? 'rgba(255,255,255,0.40)' : 'rgba(10,10,20,0.42)',
  textFaint:      isDark ? 'rgba(255,255,255,0.30)' : 'rgba(10,10,20,0.30)',
  textPeriod:     isDark ? 'rgba(255,255,255,0.75)' : 'rgba(10,10,20,0.72)',
  textPeriodMeta: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(10,10,20,0.45)',
  textStats:      isDark ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,20,0.82)',
  // Borders
  cardBorderIdle: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
  timelineLine:   isDark
    ? 'linear-gradient(to bottom, #0EA5E930, #7C3AED30, transparent)'
    : 'linear-gradient(to bottom, #0EA5E940, #7C3AED40, transparent)',
})

/* ─── Skill chip ────────────────────────────────────────────────────────── */
const Chip = ({ label, accent }) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
    style={{
      background: accent + '18',
      border: `1px solid ${accent}40`,
      color: accent,
    }}
  >
    {label}
  </span>
)

/* ─── Single experience card ────────────────────────────────────────────── */
const ExperienceCard = ({ phase, cfg, index, isActive, onClick, isDark }) => {
  const t = tokens(isDark)
  const visibleDesc = isActive ? phase.description : phase.description.slice(0, 2)

  const glow  = isDark ? cfg.glowDark  : cfg.glowLight
  const pill  = isDark ? cfg.pillDark  : cfg.pillLight
  const pillB = isDark ? cfg.pillBorderDark : cfg.pillBorderLight

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-2xl"
      style={{
        background: isActive ? t.cardBgActive : t.cardBg,
        border: isActive ? `1px solid ${cfg.accent}45` : `1px solid ${t.cardBorderIdle}`,
        boxShadow: isActive
          ? `0 0 0 1px ${cfg.accent}20, 0 30px 60px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)'}`
          : `0 8px 32px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.07)'}`,
        transition: 'border-color 0.4s, box-shadow 0.4s, background 0.4s',
      }}
    >
      {/* Top glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}80, transparent)` }}
      />

      {/* Background glow */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at top left, ${glow}, transparent 60%)` }}
      />

      <div className="relative p-6 sm:p-8">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="space-y-2">
            {/* Role label pill */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ background: pill, border: `1px solid ${pillB}`, color: cfg.accent }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: cfg.accent, boxShadow: `0 0 6px ${cfg.accent}` }}
              />
              {cfg.label}
            </span>

            <h3
              className="text-2xl sm:text-3xl font-light tracking-tight"
              style={{ color: t.textPrimary, fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {phase.title}
            </h3>

            <p className="text-sm uppercase tracking-[0.18em]" style={{ color: t.textMuted }}>
              {phase.subtitle}
            </p>
          </div>

          {/* Period badge */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs"
            style={{
              background: t.periodBg,
              border: `1px solid ${t.periodBorder}`,
              color: t.textPeriodMeta,
            }}
          >
            <CalendarDays className="h-3.5 w-3.5" style={{ color: cfg.accent }} />
            <span className="font-medium" style={{ color: t.textPeriod }}>{phase.period}</span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest"
              style={{ background: pill, color: cfg.accent }}
            >
              {phase.meta}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px" style={{ background: `linear-gradient(90deg, ${cfg.accent}30, transparent)` }} />

        {/* Description bullets */}
        <div className="space-y-3 mb-6">
          <AnimatePresence initial={false}>
            {visibleDesc.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{
                  background: t.bulletBg,
                  border: `1px solid ${t.bulletBorder}`,
                }}
              >
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: cfg.accent }}
                />
                <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                  {line}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Expand toggle */}
          {phase.description.length > 2 && (
            <button
              className="flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-80"
              style={{ color: cfg.accent }}
              onClick={(e) => { e.stopPropagation(); onClick() }}
            >
              <span>{isActive ? 'Show less' : `+${phase.description.length - 2} more`}</span>
              <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                ↓
              </motion.span>
            </button>
          )}
        </div>

        {/* Skills */}
        {phase.skills.length > 0 && (
          <div>
            <p
              className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]"
              style={{ color: t.textFaint }}
            >
              <Layers className="h-3 w-3" />
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((s) => (
                <Chip key={s} label={s} accent={cfg.accent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  )
}

/* ─── Main section ──────────────────────────────────────────────────────── */
export const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { isDark } = useThemeMode()
  const t = tokens(isDark)

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i))

  return (
    <SectionShell id="experience" className="py-20 sm:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        #experience * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-16">

        {/* ── Section header ── */}
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
              style={{ color: '#0EA5E9' }}
            >
              Career
            </span>
            <span className="h-px w-12" style={{ background: 'rgba(14,165,233,0.35)' }} />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl leading-tight font-light"
              style={{
                color: t.textPrimary,
                fontFamily: "'Instrument Serif', Georgia, serif",
              }}
            >
              Work that{' '}
              <em style={{ color: '#0EA5E9', fontStyle: 'italic' }}>shipped.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: t.textMuted, fontWeight: 300 }}
          >
            Two focused roles across healthcare, billing, and CRM - built with intention,
            deployed to production.
          </motion.p>
        </div>

        {/* ── Timeline connector + cards ── */}
        <div className="relative">

          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: t.timelineLine }}
          />

          <div className="sm:pl-8 space-y-6">
            {/* Timeline dots */}
            {experiencePhases.slice(0, 2).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: 'spring', stiffness: 300 }}
                className="absolute hidden sm:flex -left-[5px] items-center justify-center h-[10px] w-[10px] rounded-full"
                style={{
                  top: i === 0 ? '40px' : '50%',
                  background: ROLE_CONFIG[i].accent,
                  boxShadow: `0 0 12px ${ROLE_CONFIG[i].accent}`,
                }}
              />
            ))}

            {experiencePhases.slice(0, 2).map((phase, i) => (
              <ExperienceCard
                key={phase.id}
                phase={phase}
                cfg={ROLE_CONFIG[i]}
                index={i}
                isActive={activeIndex === i}
                onClick={() => toggle(i)}
                isDark={isDark}
              />
            ))}
          </div>
        </div>

        {/* ── Quick stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl"
          style={{ border: `1px solid ${t.statsBorder}` }}
        >
          {[
            { icon: Zap,          label: 'Current status', value: 'Software Engineer', accent: '#0EA5E9' },
            { icon: CalendarDays, label: 'Since',          value: 'May 2025',          accent: '#7C3AED' },
            { icon: Layers,       label: 'Scope',          value: 'Full-Stack',        accent: '#059669' },
          ].map(({ icon: Icon, label, value, accent }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-2 px-4 py-5 text-center"
              style={{ background: t.statsBg }}
            >
              <Icon className="h-4 w-4" style={{ color: accent }} />
              <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: t.textFaint }}>
                {label}
              </p>
              <p className="text-sm font-medium" style={{ color: t.textStats }}>
                {value}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </SectionShell>
  )
}