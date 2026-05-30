import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeMode } from '@/context/ThemeModeContext'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, CheckCircle2, Database, Layers } from 'lucide-react'

const SHARED_TOKENS = `
  [data-theme="dark"]  { --fg:rgba(255,255,255,0.92);--fg-muted:rgba(255,255,255,0.55);--fg-dim:rgba(255,255,255,0.30);--fg-faint:rgba(255,255,255,0.14);--surface:rgba(255,255,255,0.03);--surface-2:rgba(255,255,255,0.055);--border:rgba(255,255,255,0.07);--border-2:rgba(255,255,255,0.13);--bg-base:#080B12; }
  [data-theme="light"] { --fg:rgba(15,23,42,0.92);--fg-muted:rgba(15,23,42,0.55);--fg-dim:rgba(15,23,42,0.35);--fg-faint:rgba(15,23,42,0.12);--surface:rgba(15,23,42,0.03);--surface-2:rgba(15,23,42,0.055);--border:rgba(15,23,42,0.09);--border-2:rgba(15,23,42,0.16);--bg-base:#F8FAFC; }
`

/* ─── Projects data ──────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'selten-hms',
    name: 'Selten ONE – Hospital Management System',
    type: 'Healthcare Enterprise Platform',
    description: 'A production-grade Hospital Management System designed to streamline healthcare operations through configurable modules and workflow automation.',
    featured: true,
    techStack: ['Next.js', 'Python FastAPI', 'PostgreSQL', 'Docker', 'VPS'],
    challenge: 'Healthcare organizations needed a unified system to manage complex workflows across patient management, appointments, billing, medical records, and reporting-with the flexibility to adapt to different hospital processes.',
    solution: 'Built a modular, configuration-driven architecture with dynamic CRUD handlers, customizable workflows, and event-driven notifications. Used PostgreSQL with relationship-driven schemas to handle complex healthcare data structures.',
    impact: [
      'Deployed to live production serving multiple hospitals',
      'Reduced manual administrative work by 70%',
      'Handles 1000+ daily transactions seamlessly',
      'Configurable modules allow adaptation to hospital-specific workflows',
    ],
    features: [
      'Dynamic Module Builder', 'Dynamic CRUD Handler', 'Appointment Management',
      'Patient Management', 'Visit Management', 'OP/IP Workflow',
      'Medical Reports Management', 'Notification Hub with Workflow-Based Triggers',
      'Role-Based Access Control', 'Analytics Dashboard',
    ],
    technicalHighlights: [
      'Relationship-driven database architecture',
      'Configurable workflows and dynamic field management',
      'Event-driven notification system',
      'Optimized backend for high-volume transactions',
      'Real-time data synchronization',
    ],
  },
  {
    id: 'billing-inventory',
    name: 'Billing & Inventory Management Software',
    type: 'Business Operations Platform',
    description: 'A customized business management platform designed for billing, stock tracking, reporting, and business analytics.',
    featured: false,
    techStack: ['React.js', 'Laravel', 'MySQL', 'Linux VPS'],
    challenge: 'Small to medium businesses struggled with manual inventory tracking, billing errors, and lack of visibility into business metrics. They needed an integrated solution for billing, stock management, and reporting.',
    solution: 'Developed a comprehensive platform with real-time inventory synchronization, automated billing workflows, and role-based access controls. Created analytics modules for operational insights and decision-making.',
    impact: [
      'Supporting multiple businesses with high-volume daily transactions',
      'Reduced billing errors by 95%',
      'Inventory accuracy improved from 75% to 99%',
      'Real-time reporting enabled faster business decisions',
    ],
    features: [
      'Purchase Billing', 'Sales Billing', 'Stock Management', 'Product Management',
      'GST Report Generation', 'Daily Sales Reports', 'Purchase Reports',
      'Role-Based Access Control', 'Admin Dashboard & Analytics', 'Inventory Synchronization',
    ],
    technicalHighlights: [
      'Complex inventory synchronization logic',
      'Role-based permission management',
      'Real-time reporting modules',
      'Optimized database queries for performance',
      'Live production environment with VPS deployment',
    ],
  },
]

/* ─── Additional domains data ────────────────────────────────────────────── */
const ADDITIONAL_DOMAINS = [
  {
    title: 'Enterprise applications',
    accent: '#0891B2',   // cyan-600
    tagBg: (isDark) => isDark ? 'rgba(8,145,178,0.14)' : 'rgba(8,145,178,0.10)',
    catIcon: 'ti-building-skyscraper',
    headerIcon: 'ti-briefcase',
    items: [
      { icon: 'ti-users',         name: 'CRM systems',                   desc: 'Customer pipelines, contact management, sales tracking' },
      { icon: 'ti-id-badge',      name: 'Employee management systems',   desc: 'Attendance, payroll, HR workflows' },
      { icon: 'ti-package',       name: 'Inventory & stock management',  desc: 'Real-time stock tracking, purchase & sales sync' },
      { icon: 'ti-receipt',       name: 'Billing solutions',             desc: 'Invoicing, GST reports, payment workflows' },
      { icon: 'ti-shopping-cart', name: 'E-commerce applications',      desc: 'Product catalogues, cart, order management' },
    ],
  },
  {
    title: 'Web development',
    accent: '#059669',   // emerald-600
    tagBg: (isDark) => isDark ? 'rgba(5,150,105,0.14)' : 'rgba(5,150,105,0.10)',
    catIcon: 'ti-code',
    headerIcon: 'ti-layout',
    items: [
      { icon: 'ti-building-store', name: 'Static business websites',     desc: 'Marketing pages, landing sites, SEO-optimised builds' },
      { icon: 'ti-world',          name: 'Dynamic web applications',     desc: 'Full-stack apps with auth, APIs, and real-time data' },
      { icon: 'ti-devices',        name: 'Responsive user interfaces',   desc: 'Mobile-first layouts, accessibility, design systems' },
      { icon: 'ti-chart-bar',      name: 'Admin dashboards',             desc: 'Analytics panels, role-based views, data tables' },
    ],
  },
]

/* ─── Project card ───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, expandedId, onToggle }) => {
  const accent = project.featured ? '#0891B2' : '#7C3AED'
  const isExpanded = expandedId === project.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        onClick={() => onToggle(project.id)}
        style={{
          width: '100%',
          padding: project.featured ? '32px' : '24px',
          borderRadius: '20px',
          background: 'var(--surface)',
          border: `1px solid ${isExpanded ? accent + '45' : 'var(--border)'}`,
          cursor: 'pointer',
          textAlign: 'left',
          boxShadow: isExpanded ? `0 0 0 1px ${accent}18, 0 30px 80px rgba(0,0,0,0.18)` : 'none',
          transition: 'all 0.3s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)`, borderRadius: '20px 20px 0 0' }}
        />

        {/* Ambient glow */}
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at top left, ${accent}12, transparent 60%)`, borderRadius: '20px' }}
        />

        <div className="relative">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: project.featured ? '24px' : '18px', fontWeight: 600, color: 'var(--fg)', margin: '0 0 8px 0' }}>
                {project.name}
              </h3>
              <p style={{ fontSize: '12px', color: accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                {project.type}
              </p>
            </div>
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ color: accent, display: 'flex', alignItems: 'center', flexShrink: 0 }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--fg-muted)', margin: 0 }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '4px 10px', borderRadius: '6px',
                  background: accent + '18', border: `1px solid ${accent}30`,
                  color: accent, fontSize: '11px', fontWeight: 600,
                }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--fg-dim)', fontSize: '11px', fontWeight: 600 }}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.button>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{ marginTop: '12px', overflow: 'hidden' }}
          >
            <div style={{ padding: '28px', borderRadius: '16px', background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'grid', gap: '24px' }}>

              {[
                { label: 'Challenge', content: project.challenge, delay: 0.05 },
                { label: 'Solution',  content: project.solution,  delay: 0.10 },
              ].map(({ label, content, delay }) => (
                <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
                    {label}
                  </h4>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--fg-muted)', margin: 0 }}>{content}</p>
                </motion.div>
              ))}

              {/* Impact */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                  Impact & results
                </h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {project.impact.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={15} style={{ color: accent, flexShrink: 0, marginTop: '2px' }} strokeWidth={2} />
                      <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                  Key features
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '8px' }}>
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      style={{ padding: '9px 12px', borderRadius: '8px', background: accent + '12', border: `1px solid ${accent}28`, color: accent, fontSize: '11px', fontWeight: 600 }}
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tech stack */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                  Full tech stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} style={{ padding: '6px 12px', borderRadius: '8px', background: accent + '14', border: `1px solid ${accent}35`, color: accent, fontSize: '11px', fontWeight: 600 }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Technical highlights */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
                  Technical highlights
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {project.technicalHighlights.map((highlight) => (
                    <div key={highlight} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Code2 size={13} style={{ color: accent, flexShrink: 0, marginTop: '2px' }} strokeWidth={1.5} />
                      <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Domain item row ────────────────────────────────────────────────────── */
const DomainItem = ({ item, accent, bg, isLast }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0', borderBottom: isLast ? 'none' : '1px solid var(--border)' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <i className={`ti ${item.icon}`} style={{ fontSize: '15px', color: accent }} aria-hidden="true" />
    </div>
    <div>
      <p style={{ fontSize: '13px', color: 'var(--fg)', fontWeight: 500, margin: '0 0 2px' }}>{item.name}</p>
      <p style={{ fontSize: '11px', color: 'var(--fg-muted)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
    </div>
  </div>
)

/* ─── Domain card ────────────────────────────────────────────────────────── */
const DomainCard = ({ domain, index, isDark }) => {
  const bg = domain.tagBg(isDark)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        padding: '22px',
        borderRadius: '20px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color 0.2s',
      }}
      whileHover={{ borderColor: domain.accent + '40' }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '5px 12px', borderRadius: '99px',
          background: bg, color: domain.accent,
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em',
        }}>
          <i className={`ti ${domain.catIcon}`} style={{ fontSize: '13px' }} aria-hidden="true" />
          {domain.title}
        </span>
        <i className={`ti ${domain.headerIcon}`} style={{ fontSize: '20px', color: 'var(--fg-dim)' }} aria-hidden="true" />
      </div>

      {/* Items */}
      <div>
        {domain.items.map((item, i) => (
          <DomainItem
            key={item.name}
            item={item}
            accent={domain.accent}
            bg={bg}
            isLast={i === domain.items.length - 1}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export const ProjectsPage = () => {
  const { isDark } = useThemeMode()
  const [expandedId, setExpandedId] = useState('selten-hms')

  const featured   = PROJECTS.find((p) => p.featured)
  const supporting = PROJECTS.filter((p) => !p.featured)

  const ACCENT  = '#0891B2'
  const ACCENT2 = '#7C3AED'
  const ACCENT3 = '#059669'

  return (
    <main style={{ background: isDark ? '#080B12' : '#F8FAFC', color: 'var(--fg)', transition: 'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        ${SHARED_TOKENS}
      `}</style>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '60px 24px' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: isDark
            ? `radial-gradient(ellipse at 20% 50%, rgba(8,145,178,0.10) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.10) 0%, transparent 50%)`
            : `radial-gradient(ellipse at 20% 50%, rgba(8,145,178,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 50%)`,
        }} />

        <div style={{ maxWidth: '900px', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Code2 size={20} style={{ color: ACCENT }} />
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: ACCENT }}>
                Production work
              </span>
            </motion.div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, lineHeight: 1.1, marginBottom: '20px', color: 'var(--fg)' }}>
              Enterprise systems that{' '}
              <em style={{ color: ACCENT, fontStyle: 'italic' }}>scale.</em>
            </h1>

            <p style={{ fontSize: '18px', lineHeight: 1.7, marginBottom: '48px', color: 'var(--fg-muted)', maxWidth: '700px', fontWeight: 300 }}>
              Production-grade applications for healthcare, billing, and business operations. Each system built for real users, deployed to production, and continuously improved.
            </p>

            {/* Quick stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginBottom: '48px' }}>
              {[
                { label: 'Major systems', value: `${PROJECTS.length}` },
                { label: 'Users served',  value: '1000+' },
                { label: 'Tech expertise',value: '9+' },
              ].map(({ label, value }, i) => (
                <motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
                  <p style={{ fontSize: '28px', fontWeight: 600, color: ACCENT, margin: '0 0 4px' }}>{value}</p>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-dim)', margin: 0 }}>{label}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '12px',
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                color: '#FFFFFF', fontWeight: 600, fontSize: '13px',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                textDecoration: 'none', boxShadow: `0 8px 24px ${ACCENT}30`,
                cursor: 'pointer', border: 'none', transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              Explore projects <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
        >
          <p style={{ fontSize: '11px', color: 'var(--fg-dim)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll to explore</p>
          <div style={{ color: ACCENT }}>↓</div>
        </motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        {featured && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '28px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '32px', color: 'var(--fg)' }}>
              Featured <em style={{ color: ACCENT, fontStyle: 'italic' }}>project</em>
            </h2>
            <ProjectCard project={featured} index={0} expandedId={expandedId} onToggle={setExpandedId} />
          </motion.div>
        )}

        {supporting.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 style={{ fontSize: '28px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '32px', color: 'var(--fg)' }}>
              Other <em style={{ color: ACCENT2, fontStyle: 'italic' }}>work</em>
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {supporting.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i + 1} expandedId={expandedId} onToggle={setExpandedId} />
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* ── ADDITIONAL DOMAINS ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '28px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '12px', color: 'var(--fg)' }}>
            Additional project <em style={{ color: ACCENT2, fontStyle: 'italic' }}>domains</em>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--fg-dim)', maxWidth: '640px', fontWeight: 300, lineHeight: 1.7 }}>
            Beyond the featured case studies, here are the broader work areas I've contributed to.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {ADDITIONAL_DOMAINS.map((domain, i) => (
            <DomainCard key={domain.title} domain={domain} index={i} isDark={isDark} />
          ))}
        </div>
      </section>

      {/* ── TECH OVERVIEW ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontSize: '28px', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '36px', color: 'var(--fg)' }}>
            Technology <em style={{ color: ACCENT3, fontStyle: 'italic' }}>expertise</em>
          </h2>

          <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              { title: 'Frontend',                  icon: Code2,    color: ACCENT,  items: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
              { title: 'Backend',                   icon: Layers,   color: ACCENT2, items: ['Python FastAPI', 'Laravel', 'RESTful APIs', 'Event-Driven Systems'] },
              { title: 'Database & deployment',     icon: Database, color: ACCENT3, items: ['PostgreSQL', 'MySQL', 'Docker', 'VPS Deployment', 'CI/CD'] },
            ].map(({ title, icon: Icon, color, items }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: color + '18', border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} style={{ color }} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                    {title}
                  </h3>
                </div>
                <div style={{ display: 'grid', gap: '2px' }}>
                  {items.map((item, idx) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: idx < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '20px', color: 'var(--fg)' }}>
            Ready to build your <em style={{ color: ACCENT, fontStyle: 'italic' }}>next system?</em>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--fg-dim)', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.7 }}>
            Click any project above to see the complete case study - architecture decisions, challenges solved, and measurable impact.
          </p>

          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 36px', borderRadius: '12px',
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
              color: '#FFFFFF', fontWeight: 600, fontSize: '13px',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              textDecoration: 'none', boxShadow: `0 12px 36px ${ACCENT}28`,
              cursor: 'pointer', border: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 16px 48px ${ACCENT}38` }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = `0 12px 36px ${ACCENT}28` }}
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}