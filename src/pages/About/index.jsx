import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, MapPin, Mail, Code2, Database, Zap, Users } from 'lucide-react'
import { useThemeMode } from '@/context/ThemeModeContext'
import { portfolioProfile, skillGroups, achievementItems, volunteerItems, socialLinks } from '@/data/portfolio'

const SHARED_TOKENS = `
  [data-theme="dark"]  { --fg:rgba(255,255,255,0.92);--fg-muted:rgba(255,255,255,0.55);--fg-dim:rgba(255,255,255,0.30);--fg-faint:rgba(255,255,255,0.14);--surface:rgba(255,255,255,0.03);--surface-2:rgba(255,255,255,0.055);--border:rgba(255,255,255,0.07);--border-2:rgba(255,255,255,0.13);--bg-base:#080B12; }
  [data-theme="light"] { --fg:rgba(15,23,42,0.92);--fg-muted:rgba(15,23,42,0.55);--fg-dim:rgba(15,23,42,0.35);--fg-faint:rgba(15,23,42,0.12);--surface:rgba(15,23,42,0.03);--surface-2:rgba(15,23,42,0.055);--border:rgba(15,23,42,0.09);--border-2:rgba(15,23,42,0.16);--bg-base:#F8FAFC; }
`

/* ─── Skill category with hover ─────────────────────────────────────────── */
const SkillGroup = ({ group, index }) => {
  const [expanded, setExpanded] = useState(false)
  const colors = ['#38BDF8', '#A78BFA', '#22D3EE', '#34D399', '#FBBF24', '#FB923C']
  const accent = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
      />

      <motion.div
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}12, transparent 60%)` }}
      />

      <div className="relative p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div
              className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: accent + '18', border: `1px solid ${accent}35` }}
            >
              <Code2 className="h-5 w-5" style={{ color: accent }} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
                {group.name}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--fg-dim)' }}>
                {group.items.length} skills
              </p>
            </div>
          </div>

          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: accent }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      background: accent + '14',
                      border: `1px solid ${accent}35`,
                      color: accent,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── Achievement card ──────────────────────────────────────────────────── */
const AchievementCard = ({ item, index }) => {
  const colors = ['#FBBF24', '#22D3EE', '#A78BFA', '#34D399', '#FB923C', '#F472B6']
  const accent = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative overflow-hidden rounded-xl p-4"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
      />

      <div className="relative flex items-start gap-3">
        <div
          className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg mt-0.5"
          style={{ background: accent + '18', border: `1px solid ${accent}30` }}
        >
          <span className="text-xs font-semibold" style={{ color: accent }}>✓</span>
        </div>
        <div>
          <h4 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
            {item.title}
          </h4>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--fg-dim)' }}>
            {item.detail}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Volunteer card ───────────────────────────────────────────────────── */
const VolunteerCard = ({ item, index }) => {
  const colors = ['#F472B6', '#34D399', '#60A5FA', '#FBBF24']
  const accent = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }}
      />

      <motion.div
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${accent}08, transparent 70%)` }}
      />

      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
              {item.title}
            </h3>
            <p className="text-xs mt-1 uppercase tracking-[0.18em]" style={{ color: accent }}>
              {item.organization}
              {item.period && <> • {item.period}</>}
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          {item.detail}
        </p>

        {item.points && (
          <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            {item.points.map((point) => (
              <div key={point} className="flex items-start gap-2 text-xs">
                <span style={{ color: accent, marginTop: '2px' }}>→</span>
                <span style={{ color: 'var(--fg-dim)' }}>{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export const AboutPage = () => {
  const { isDark } = useThemeMode()

  return (
    <main style={{ background: isDark ? '#080B12' : '#F8FAFC', color: 'var(--fg)', transition: 'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        ${SHARED_TOKENS}
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 20% 50%, rgba(56,189,248,0.08) 0%, transparent 50%),
                         radial-gradient(ellipse at 80% 50%, rgba(167,139,250,0.08) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
          <div style={{ display: 'grid', gap: '60px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#38BDF8' }}>
                  Full-Stack Engineer
                </span>
                <div
                  style={{
                    height: '8px',
                    width: '8px',
                    borderRadius: '50%',
                    background: '#38BDF8',
                    boxShadow: '0 0 8px #38BDF8',
                  }}
                />
              </motion.div>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  marginBottom: '20px',
                  color: 'var(--fg)',
                }}
              >
                {portfolioProfile.name.split(' ')[0]}{' '}
                <em style={{ color: '#38BDF8', fontStyle: 'italic' }}>
                  {portfolioProfile.name.split(' ').slice(1).join(' ')}
                </em>
              </h1>

              <p
                style={{
                  fontSize: '18px',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                  color: 'var(--fg-muted)',
                  maxWidth: '500px',
                  fontWeight: 300,
                }}
              >
                {portfolioProfile.headline}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                {[
                  { icon: MapPin, label: portfolioProfile.location },
                  { icon: Mail, label: 'mugi.developer@gmail.com' },
                ].map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--fg-muted)' }}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #38BDF8, #A78BFA)',
                    color: '#080B12',
                    fontWeight: 600,
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(56,189,248,0.3)',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  Let's talk
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--fg)',
                    fontWeight: 600,
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#38BDF8'
                    e.currentTarget.style.color = '#38BDF8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--fg)'
                  }}
                >
                  View work
                </a>
              </div>
            </motion.div>

            {/* Right: visual with numbers/stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {[
                { number: '2+', label: 'Years experience', color: '#38BDF8' },
                { number: '5+', label: 'Projects shipped', color: '#A78BFA' },
                { number: '100%', label: 'Dedicated', color: '#22D3EE' },
                { number: '4', label: 'Tech stacks', color: '#34D399' },
              ].map(({ number, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    padding: '28px 20px',
                    borderRadius: '16px',
                    background: 'var(--surface)',
                    border: `1px solid var(--border)`,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
                  />
                  <p style={{ fontSize: '28px', fontWeight: 600, color, marginBottom: '6px' }}>
                    {number}
                  </p>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-dim)' }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--fg-dim)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Scroll to explore
          </p>
          <div style={{ color: '#38BDF8' }}>↓</div>
        </motion.div>
      </section>

      {/* ─── ABOUT STATEMENT ─────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'grid', gap: '60px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              {
                title: 'What I build',
                text: 'Production-minded interfaces, clean routing, reusable UI systems, and motion that improves clarity instead of getting in the way.',
                icon: Code2,
              },
              {
                title: 'How I work',
                text: 'I like direct feedback loops, well-scoped features, and shipping in layers so the page stays useful while the deeper detail is still growing.',
                icon: Users,
              },
              {
                title: 'What I care about',
                text: 'Readable structure, accessibility, performance, and the confidence that comes from predictable delivery.',
                icon: Zap,
              },
            ].map(({ title, text, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Icon className="h-6 w-6 mb-4" style={{ color: ['#38BDF8', '#A78BFA', '#34D399'][i] }} />
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: 'var(--fg)' }}>
                  {title}
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--fg-muted)', fontWeight: 300 }}>
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <h2 style={{ fontSize: '36px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '12px', color: 'var(--fg)' }}>
            Technical <em style={{ color: '#38BDF8', fontStyle: 'italic' }}>Skills</em>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--fg-dim)', maxWidth: '600px', fontWeight: 300 }}>
            Organized by category. Click to expand and see the full tech stack.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.name} group={group} index={i} />
          ))}
        </div>
      </section>

      {/* ─── ACHIEVEMENTS ────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <h2 style={{ fontSize: '36px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '12px', color: 'var(--fg)' }}>
            Achievements & <em style={{ color: '#FBBF24', fontStyle: 'italic' }}>Recognition</em>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {achievementItems.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ─── VOLUNTEER WORK ──────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '50px' }}
        >
          <h2 style={{ fontSize: '36px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '12px', color: 'var(--fg)' }}>
            Giving back to the <em style={{ color: '#F472B6', fontStyle: 'italic' }}>Community</em>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {volunteerItems.map((item, i) => (
            <VolunteerCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ─── FOOTER CTA ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '36px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '20px', color: 'var(--fg)' }}>
            Ready to <em style={{ color: '#38BDF8', fontStyle: 'italic' }}>collaborate?</em>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--fg-dim)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Let's talk about your next project. I'm open to freelance work, collaborations, and full-time opportunities.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '50px' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #38BDF8, #A78BFA)',
                color: '#080B12',
                fontWeight: 600,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                boxShadow: '0 12px 36px rgba(56,189,248,0.25)',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(56,189,248,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(56,189,248,0.25)'
              }}
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  color: 'var(--fg-muted)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#38BDF8'
                  e.currentTarget.style.color = '#38BDF8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--fg-muted)'
                }}
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}