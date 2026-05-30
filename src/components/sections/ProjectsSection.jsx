import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { SectionShell } from '@/components/common/SectionShell'
import { projects } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'
import { ArrowUpRight, BadgeCheck, Layers, Star } from 'lucide-react'

/* ─── Per-project visual identity ───────────────────────────────────────── */
const PROJECT_CONFIG = [
  {
    label: 'Featured',
    accent: '#06B6D4',          // cyan-500 - readable on both themes
    glowDark: 'rgba(6,182,212,0.15)',
    glowLight: 'rgba(6,182,212,0.09)',
    gridPattern: true,
    covers: [
      'Patient and appointment flows',
      'Billing, pharmacy, OP/IP workflows',
      'Operational reporting and dashboards',
    ],
  },
  {
    label: 'Supporting',
    accent: '#7C3AED',          // violet-600 - readable on both themes
    glowDark: 'rgba(124,58,237,0.15)',
    glowLight: 'rgba(124,58,237,0.08)',
    gridPattern: false,
    covers: [
      'Billing flows and invoicing',
      'Access control and analytics',
      'Inventory and sales operations',
    ],
  },
]

/* ─── Theme tokens ───────────────────────────────────────────────────────── */
const tokens = (isDark) => ({
  textPrimary:   isDark ? 'rgba(255,255,255,0.95)' : 'rgba(10,10,20,0.92)',
  textSecondary: isDark ? 'rgba(255,255,255,0.60)' : 'rgba(10,10,20,0.58)',
  textMuted:     isDark ? 'rgba(255,255,255,0.40)' : 'rgba(10,10,20,0.42)',
  textFaint:     isDark ? 'rgba(255,255,255,0.30)' : 'rgba(10,10,20,0.30)',
  textDivider:   isDark ? 'rgba(255,255,255,0.20)' : 'rgba(10,10,20,0.20)',
  cardBg:        isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  bulletBg:      isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
  bulletBorder:  isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
  dividerLine:   isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
  shadow:        isDark ? 'rgba(0,0,0,0.45)'       : 'rgba(0,0,0,0.10)',
})

/* ─── Skill chip ─────────────────────────────────────────────────────────── */
const Chip = ({ label, accent }) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
    style={{ background: accent + '18', border: `1px solid ${accent}40`, color: accent }}
  >
    {label}
  </span>
)

/* ─── 3-D tilt card ──────────────────────────────────────────────────────── */
const TiltCard = ({ children, className, style }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-60, 60], [5, -5])
  const rotY = useTransform(x, [-60, 60], [-5, 5])
  const sx = useSpring(rotX, { stiffness: 250, damping: 28 })
  const sy = useSpring(rotY, { stiffness: 250, damping: 28 })

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', perspective: 900, ...style }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Project card ───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, cfg, index, featured, isDark }) => {
  const t = tokens(isDark)
  const glow = isDark ? cfg.glowDark : cfg.glowLight

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard
        className="relative overflow-hidden rounded-2xl h-full"
        style={{
          background: t.cardBg,
          border: `1px solid ${cfg.accent}30`,
          boxShadow: `0 0 0 1px ${cfg.accent}12, 0 30px 80px ${t.shadow}`,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${cfg.accent}90 40%, ${cfg.accent}90 60%, transparent 100%)` }}
        />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at top left, ${glow}, transparent 55%)` }}
        />

        {/* Subtle grid (featured only) */}
        {cfg.gridPattern && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: isDark ? 0.30 : 0.18,
              backgroundImage: `linear-gradient(${cfg.accent}18 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent}18 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        )}

        <div className="relative p-6 sm:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="space-y-2">
              {/* Label pill */}
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ background: cfg.accent + '18', border: `1px solid ${cfg.accent}40`, color: cfg.accent }}
              >
                {featured && <Star className="h-2.5 w-2.5" fill="currentColor" />}
                {cfg.label}
              </span>

              <h3
                className="text-2xl sm:text-3xl font-light tracking-tight leading-tight"
                style={{ color: t.textPrimary, fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {project.name}
              </h3>

              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: t.textFaint }}>
                {project.type}
              </p>
            </div>

            {/* CTA */}
            <Link
              to={`/projects/${project.id ?? project.slug ?? ''}`}
              className="group flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200"
              style={{
                background: cfg.accent + '18',
                border: `1px solid ${cfg.accent}35`,
                color: cfg.accent,
              }}
            >
              View project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px" style={{ background: `linear-gradient(90deg, ${cfg.accent}30, transparent)` }} />

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: t.textSecondary, fontWeight: 300 }}
          >
            {project.description}
          </p>

          {/* Covers */}
          <div className="space-y-2 mb-6">
            <p
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] mb-3"
              style={{ color: t.textFaint }}
            >
              <BadgeCheck className="h-3 w-3" style={{ color: cfg.accent }} />
              What it covers
            </p>
            <AnimatePresence initial={false}>
              {cfg.covers.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: t.bulletBg, border: `1px solid ${t.bulletBorder}` }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: cfg.accent, boxShadow: `0 0 6px ${cfg.accent}` }}
                  />
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Stack */}
          <div className="mt-auto">
            <p
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] mb-3"
              style={{ color: t.textFaint }}
            >
              <Layers className="h-3 w-3" />
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} accent={cfg.accent} />
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export const ProjectsSection = () => {
  const { isDark } = useThemeMode()
  const t = tokens(isDark)

  const featuredProject   = projects[0]
  const supportingProject = projects[1]

  return (
    <SectionShell id="projects" className="py-20 sm:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        #projects * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-16">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-end justify-between gap-6">
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
                style={{ color: '#06B6D4' }}
              >
                Projects
              </span>
              <span className="h-px w-12" style={{ background: 'rgba(6,182,212,0.35)' }} />
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
                Things I've{' '}
                <em style={{ color: '#06B6D4', fontStyle: 'italic' }}>built.</em>
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
              Production systems built for real workflows - not demos. Two focused
              projects, each grounded in backend depth and shipped delivery.
            </motion.p>
          </div>

          {/* View all CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200"
              style={{
                background: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.10)',
                border: `1px solid ${isDark ? 'rgba(6,182,212,0.25)' : 'rgba(6,182,212,0.35)'}`,
                color: '#06B6D4',
              }}
            >
              Full showcase
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── Featured card ── */}
        <ProjectCard
          project={featuredProject}
          cfg={PROJECT_CONFIG[0]}
          index={0}
          featured
          isDark={isDark}
        />

        {/* ── "Also built" divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-4 -mb-4"
        >
          <div className="h-px flex-1" style={{ background: t.dividerLine }} />
          <span
            className="text-[10px] uppercase tracking-[0.28em]"
            style={{ color: t.textDivider }}
          >
            also built
          </span>
          <div className="h-px flex-1" style={{ background: t.dividerLine }} />
        </motion.div>

        {/* ── Supporting card ── */}
        <div className="lg:ml-12">
          <ProjectCard
            project={supportingProject}
            cfg={PROJECT_CONFIG[1]}
            index={1}
            featured={false}
            isDark={isDark}
          />
        </div>

      </div>
    </SectionShell>
  )
}