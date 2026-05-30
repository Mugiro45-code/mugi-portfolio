import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { experienceItems } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'
import { ArrowRight, Briefcase, Calendar, CheckCircle2, Code2, Users, TrendingUp } from 'lucide-react'

const SHARED_TOKENS = `
  [data-theme="dark"]  { --fg:rgba(255,255,255,0.92);--fg-muted:rgba(255,255,255,0.55);--fg-dim:rgba(255,255,255,0.30);--fg-faint:rgba(255,255,255,0.14);--surface:rgba(255,255,255,0.03);--surface-2:rgba(255,255,255,0.055);--border:rgba(255,255,255,0.07);--border-2:rgba(255,255,255,0.13);--bg-base:#080B12; }
  [data-theme="light"] { --fg:rgba(15,23,42,0.92);--fg-muted:rgba(15,23,42,0.55);--fg-dim:rgba(15,23,42,0.35);--fg-faint:rgba(15,23,42,0.12);--surface:rgba(15,23,42,0.03);--surface-2:rgba(15,23,42,0.055);--border:rgba(15,23,42,0.09);--border-2:rgba(15,23,42,0.16);--bg-base:#F8FAFC; }
`

/* ─── Experience card ──────────────────────────────────────────────────── */
const ExperienceCard = ({ experience, positions, index, expandedId, onToggle }) => {
  const accent = ['#38BDF8', '#A78BFA', '#22D3EE'][index % 3]
  const isExpanded = expandedId === experience.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline connector line */}
      {index < experienceItems.length - 1 && (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '56px',
            width: '2px',
            height: '80px',
            background: `linear-gradient(to bottom, ${accent}50, transparent)`,
          }}
        />
      )}

      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--surface)',
          border: `2px solid ${accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 12px ${accent}40`,
        }}
      >
        <Briefcase size={16} style={{ color: accent }} strokeWidth={2} />
      </div>

      {/* Card */}
      <div style={{ marginLeft: '80px' }}>
        <motion.button
          onClick={() => onToggle(experience.id)}
          style={{
            width: '100%',
            padding: '24px',
            borderRadius: '16px',
            background: 'var(--surface)',
            border: `1px solid ${isExpanded ? accent + '45' : 'var(--border)'}`,
            cursor: 'pointer',
            boxShadow: isExpanded ? `0 0 0 1px ${accent}18, 0 20px 50px rgba(0,0,0,0.25)` : 'none',
            transition: 'all 0.3s',
            textAlign: 'left',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}70, transparent)`,
              borderRadius: '16px 16px 0 0',
            }}
          />

          <motion.div
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at top left, ${accent}12, transparent 60%)`,
              borderRadius: '16px',
            }}
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--fg)', marginBottom: '8px' }}>
                {experience.companyName}
              </h3>
              <p style={{ fontSize: '13px', color: accent, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {positions.length} position{positions.length > 1 ? 's' : ''} • {positions.reduce((acc, p) => acc + (p.skills?.length || 0), 0)} skills
              </p>
            </div>

            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ color: accent, display: 'flex', alignItems: 'center' }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </div>
        </motion.button>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '12px' }}
            >
              <div style={{ display: 'grid', gap: '12px' }}>
                {positions.map((position, posIndex) => (
                  <motion.div
                    key={position.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: posIndex * 0.08 }}
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Position header */}
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--fg)', marginBottom: '8px' }}>
                        {position.title}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--fg-dim)' }}>
                          <Calendar size={14} />
                          {position.employmentPeriod}
                        </div>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            background: accent + '18',
                            color: accent,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {position.employmentType}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {position.description && (
                      <div style={{ marginBottom: '16px' }}>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--fg-muted)', whiteSpace: 'pre-wrap' }}>
                          {position.description}
                        </p>
                      </div>
                    )}

                    {/* Skills */}
                    {position.skills && position.skills.length > 0 && (
                      <div>
                        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-dim)', marginBottom: '10px', fontWeight: 600 }}>
                          Tech stack
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {position.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: accent + '14',
                                border: `1px solid ${accent}35`,
                                color: accent,
                                fontSize: '11px',
                                fontWeight: 600,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── Main page ────────────────────────────────────────────────────────── */
export const ExperiencePage = () => {
  const { isDark } = useThemeMode()
  const [expandedId, setExpandedId] = useState(experienceItems[0]?.id || null)

  const stats = [
    { icon: Briefcase, label: 'Total roles', value: experienceItems.length },
    {
      icon: Code2,
      label: 'Tech stacks',
      value: new Set(experienceItems.flatMap((e) => e.positions.flatMap((p) => p.skills || []))).size,
    },
    {
      icon: TrendingUp,
      label: 'Growth areas',
      value: '8+',
    },
  ]

  const additionalDomains = [
    {
      title: 'Enterprise Systems',
      items: [
        'CRM Platforms',
        'Employee Management Systems',
        'Inventory & Stock Management Systems',
        'Billing & Invoicing Solutions',
        'E-Commerce Applications',
      ],
    },
    {
      title: 'Web Products',
      items: [
        'Static Business Websites',
        'Dynamic Web Applications',
        'Responsive User Interfaces',
        'Admin Dashboards',
      ],
    },
  ]

  return (
    <main style={{ background: isDark ? '#080B12' : '#F8FAFC', color: 'var(--fg)', transition: 'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        ${SHARED_TOKENS}
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '60px 24px',
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

        <div style={{ maxWidth: '900px', width: '100%' }}>
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
              <Briefcase size={20} style={{ color: '#38BDF8' }} />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  color: '#38BDF8',
                }}
              >
                Professional Journey
              </span>
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
              Shipping real{' '}
              <em style={{ color: '#38BDF8', fontStyle: 'italic' }}>
                products
              </em>
              . Building{' '}
              <em style={{ color: '#A78BFA', fontStyle: 'italic' }}>teams.</em>
            </h1>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.7,
                marginBottom: '48px',
                color: 'var(--fg-muted)',
                maxWidth: '700px',
                fontWeight: 300,
              }}
            >
              {experienceItems.length}+ roles across healthcare, billing, and CRM systems. Each one focused on
              production-ready code, clear communication, and measurable impact.
            </p>

            {/* Stats grid */}
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', marginBottom: '48px' }}>
              {stats.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Icon className="h-5 w-5 mb-3" style={{ color: ['#38BDF8', '#A78BFA', '#22D3EE'][i] }} />
                  <p style={{ fontSize: '20px', fontWeight: 600, color: 'var(--fg)', marginBottom: '4px' }}>
                    {value}
                  </p>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-dim)' }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href="#timeline"
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
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                View timeline
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                to="/contact"
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
                Let's talk
              </Link>
            </div>
          </motion.div>
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
          <p
            style={{
              fontSize: '12px',
              color: 'var(--fg-dim)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Scroll to explore
          </p>
          <div style={{ color: '#38BDF8' }}>↓</div>
        </motion.div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────────────── */}
      <section id="timeline" style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px' }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 300,
              marginBottom: '12px',
              color: 'var(--fg)',
            }}
          >
            Experience <em style={{ color: '#38BDF8', fontStyle: 'italic' }}>Timeline</em>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--fg-dim)', fontWeight: 300 }}>
            Click on each company to see detailed roles, responsibilities, and technologies used.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: '40px' }}>
          {experienceItems.map((experience, i) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              positions={experience.positions}
              index={i}
              expandedId={expandedId}
              onToggle={setExpandedId}
            />
          ))}
        </div>
      </section>

      {/* ─── SKILLS SUMMARY ──────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--surface)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 300,
              marginBottom: '12px',
              color: 'var(--fg)',
            }}
          >
            Skills <em style={{ color: '#A78BFA', fontStyle: 'italic' }}>Developed</em>
          </h2>

          <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: '40px' }}>
            {[
              {
                category: 'Frontend',
                color: '#38BDF8',
                skills: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Framer Motion'],
              },
              {
                category: 'Backend',
                color: '#A78BFA',
                skills: ['Python (FastAPI)', 'PHP (Laravel)', 'Node.js', 'RESTful APIs'],
              },
              {
                category: 'Data & Tools',
                color: '#22D3EE',
                skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Git', 'CI/CD'],
              },
            ].map(({ category, color, skills }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: color + '12',
                        border: `1px solid ${color}30`,
                      }}
                    >
                      <CheckCircle2 size={14} style={{ color, flexShrink: 0 }} strokeWidth={2.5} />
                      <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 300,
              marginBottom: '12px',
              color: 'var(--fg)',
            }}
          >
            Additional Work <em style={{ color: '#A78BFA', fontStyle: 'italic' }}>Domains</em>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--fg-dim)', maxWidth: '700px', fontWeight: 300 }}>
            Beyond the timeline above, I have also contributed across these enterprise and web development areas.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {additionalDomains.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '16px',
                  color: index === 0 ? '#38BDF8' : '#A78BFA',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {domain.title}
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {domain.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: index === 0 ? '#38BDF8' : '#A78BFA' }} />
                    <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 300,
              marginBottom: '20px',
              color: 'var(--fg)',
            }}
          >
            Interested in{' '}
            <em style={{ color: '#38BDF8', fontStyle: 'italic' }}>working together?</em>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--fg-dim)',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px',
              fontWeight: 300,
            }}
          >
            I'm open to full-time roles, freelance projects, and collaborative opportunities. Let's discuss how I can
            contribute to your team.
          </p>

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
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}