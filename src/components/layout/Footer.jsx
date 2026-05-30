import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { mainNavLinks } from '@/constants/navigation'
import { portfolioProfile, socialLinks } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'

const ACCENT  = '#0891B2'   // cyan-600
const ACCENT2 = '#7C3AED'   // violet-600

/* ─── Magnetic nav pill ──────────────────────────────────────────────────── */
const MagneticPill = ({ children, to, href, external, isDark }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const tx = useSpring(useTransform(x, [-40, 40], [-4, 4]), { stiffness: 300, damping: 22 })
  const ty = useSpring(useTransform(y, [-20, 20], [-3, 3]), { stiffness: 300, damping: 22 })

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set(e.clientX - r.left - r.width / 2)
    y.set(e.clientY - r.top - r.height / 2)
  }
  const reset = () => { x.set(0); y.set(0) }

  const inner = (
    <motion.span
      ref={ref}
      style={{
        x: tx,
        y: ty,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(2,6,23,0.09)',
        color: isDark ? 'rgba(255,255,255,0.78)' : 'rgba(17,24,39,0.72)',
      }}
      onMouseMove={move}
      onMouseLeave={reset}
      className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-250 cursor-pointer"
      whileHover={{
        borderColor: `${ACCENT}55`,
        color: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(2,6,23,0.92)',
      }}
    >
      {children}
    </motion.span>
  )

  if (external) return (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      {inner}
    </a>
  )
  return <Link to={to} style={{ textDecoration: 'none' }}>{inner}</Link>
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
export const Footer = () => {
  const { isDark } = useThemeMode()

  const BG           = isDark ? '#070B12'                 : '#FAFAFB'
  const TOP_BORDER   = isDark ? 'rgba(255,255,255,0.07)'  : 'rgba(2,6,23,0.07)'
  const HEADING      = isDark ? 'rgba(255,255,255,0.92)'  : 'rgba(17,24,39,0.92)'
  const MUTED        = isDark ? 'rgba(255,255,255,0.25)'  : 'rgba(17,24,39,0.45)'
  const NAME_COLOR   = isDark ? 'rgba(255,255,255,0.55)'  : 'rgba(17,24,39,0.65)'
  const BUILT_COLOR  = isDark ? 'rgba(255,255,255,0.20)'  : 'rgba(17,24,39,0.35)'
  const GLOW_BG      = isDark
    ? `radial-gradient(ellipse at 20% 0%, rgba(8,145,178,0.06) 0%, transparent 50%),
       radial-gradient(ellipse at 80% 100%, rgba(124,58,237,0.06) 0%, transparent 50%)`
    : `radial-gradient(ellipse at 20% 0%, rgba(8,145,178,0.04) 0%, transparent 50%),
       radial-gradient(ellipse at 80% 100%, rgba(124,58,237,0.03) 0%, transparent 50%)`
  const DIVIDER_BG   = isDark
    ? `linear-gradient(90deg, ${ACCENT}30, rgba(255,255,255,0.06), ${ACCENT2}30)`
    : `linear-gradient(90deg, ${ACCENT}20, rgba(2,6,23,0.06), ${ACCENT2}20)`

  return (
    <footer
      style={{
        borderTop: `1px solid ${TOP_BORDER}`,
        background: BG,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        footer * { box-sizing: border-box; }
      `}</style>

      {/* Ambient glow orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: GLOW_BG }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${ACCENT}50, ${ACCENT2}50, transparent)`,
      }} />

      <Container>
        <div style={{ padding: '64px 0 40px' }}>

          {/* ── Top: headline + nav ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '40px',
            justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: '48px',
          }}>
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: '480px' }}
            >
              <p style={{
                fontSize: '10px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.25em',
                color: ACCENT, marginBottom: '12px',
              }}>
                Stay in touch
              </p>
              <h2 style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 300, lineHeight: 1.2,
                color: HEADING, margin: 0,
              }}>
                {portfolioProfile.headline.split(' ').slice(0, -1).join(' ')}{' '}
                <em style={{ color: ACCENT, fontStyle: 'italic' }}>
                  {portfolioProfile.headline.split(' ').at(-1)}
                </em>
              </h2>
            </motion.div>

            {/* Right: nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              {mainNavLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <MagneticPill to={item.href} isDark={isDark}>{item.label}</MagneticPill>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: '1px', background: DIVIDER_BG, marginBottom: '32px' }} />

          {/* ── Bottom bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            {/* Copyright */}
            <p style={{ fontSize: '12px', color: MUTED, margin: 0 }}>
              © {new Date().getFullYear()}{' '}
              <span style={{ color: NAME_COLOR, fontWeight: 500 }}>
                {portfolioProfile.name}
              </span>
              . All rights reserved.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {socialLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                >
                  <MagneticPill href={item.href} external isDark={isDark}>
                    {item.label}
                    <ArrowUpRight size={11} />
                  </MagneticPill>
                </motion.div>
              ))}
            </div>

            {/* Built with */}
            <p style={{
              fontSize: '11px', color: BUILT_COLOR,
              margin: 0, textAlign: 'right',
              fontWeight: 300, lineHeight: 1.7,
            }}>
              Built with 🤍
            </p>
          </motion.div>

        </div>
      </Container>
    </footer>
  )
}