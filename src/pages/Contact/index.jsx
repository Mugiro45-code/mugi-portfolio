import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useThemeMode } from '@/context/ThemeModeContext'
import { contactPoints, socialLinks } from '@/data/portfolio'
import { sendContactMessage } from '@/services/contactService'
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin,
  MessageSquare, Send, AlertCircle, ChevronDown, Zap,
} from 'lucide-react'

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const SHARED_TOKENS = `
  [data-theme="dark"]  { --fg:rgba(255,255,255,0.92);--fg-muted:rgba(255,255,255,0.55);--fg-dim:rgba(255,255,255,0.30);--fg-faint:rgba(255,255,255,0.14);--surface:rgba(255,255,255,0.03);--surface-2:rgba(255,255,255,0.055);--border:rgba(255,255,255,0.07);--border-2:rgba(255,255,255,0.13);--bg-base:#080B12; }
  [data-theme="light"] { --fg:rgba(15,23,42,0.92);--fg-muted:rgba(15,23,42,0.55);--fg-dim:rgba(15,23,42,0.35);--fg-faint:rgba(15,23,42,0.12);--surface:rgba(15,23,42,0.03);--surface-2:rgba(15,23,42,0.055);--border:rgba(15,23,42,0.09);--border-2:rgba(15,23,42,0.16);--bg-base:#F8FAFC; }
`

const ACCENT  = '#0891B2'   // cyan-600
const ACCENT2 = '#7C3AED'   // violet-600
const ACCENT3 = '#059669'   // emerald-600

const SERVICE_OPTIONS = [
  'Website / Portfolio',
  'Frontend UI',
  'Full-stack Product',
  'Freelance / Collaboration',
  'Other',
]
const INITIAL_FORM = { name: '', email: '', subject: '', service: SERVICE_OPTIONS[0], message: '' }

/* ─── Theme-aware tokens helper ─────────────────────────────────────────── */
const tk = (isDark) => ({
  inputBg:         isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
  inputBgFocus:    isDark ? 'rgba(8,145,178,0.05)'   : 'rgba(8,145,178,0.04)',
  inputBorderIdle: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)',
  inputText:       isDark ? 'rgba(255,255,255,0.88)' : 'rgba(15,23,42,0.88)',
  labelIdle:       isDark ? 'rgba(255,255,255,0.30)' : 'rgba(15,23,42,0.35)',
  dropdownBg:      isDark ? '#0D1220'                : '#FFFFFF',
  dropdownBorder:  isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
  dropdownShadow:  isDark ? 'rgba(0,0,0,0.60)'       : 'rgba(0,0,0,0.12)',
  dropdownText:    isDark ? 'rgba(255,255,255,0.70)' : 'rgba(15,23,42,0.68)',
  cardBg:          isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  cardBorder:      isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
  formShadow:      isDark ? 'rgba(0,0,0,0.45)'       : 'rgba(0,0,0,0.08)',
  autofillBg:      isDark ? '#0a0e1c'                : '#ffffff',
  statusMsgColor:  isDark ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.72)',
  replyColor:      isDark ? 'rgba(255,255,255,0.25)' : 'rgba(15,23,42,0.30)',
  tipText:         isDark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.55)',
  socialBorder:    isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
  socialText:      isDark ? 'rgba(255,255,255,0.60)' : 'rgba(15,23,42,0.58)',
  faqBg:           isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  faqBorder:       isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
  faqAnswer:       isDark ? 'rgba(255,255,255,0.50)' : 'rgba(15,23,42,0.52)',
  scrollText:      isDark ? 'rgba(255,255,255,0.25)' : 'rgba(15,23,42,0.28)',
})

/* ─── Floating label field ───────────────────────────────────────────────── */
const Field = ({ label, name, type = 'text', value, onChange, error, as, rows, isDark }) => {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0
  const active = focused || filled
  const Tag    = as ?? 'input'
  const t      = tk(isDark)

  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: '16px',
        top: active ? '8px' : (as === 'textarea' ? '20px' : '50%'),
        transform: active ? 'none' : (as === 'textarea' ? 'none' : 'translateY(-50%)'),
        fontSize: active ? '10px' : '13px',
        fontWeight: active ? 600 : 400,
        letterSpacing: active ? '0.18em' : '0.02em',
        textTransform: active ? 'uppercase' : 'none',
        color: focused ? ACCENT : t.labelIdle,
        zIndex: 1,
        lineHeight: 1,
        transition: 'all 0.2s',
      }}>
        {label}
      </label>

      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        style={{
          width: '100%',
          background: focused ? t.inputBgFocus : t.inputBg,
          border: `1px solid ${error ? '#EF4444' : focused ? ACCENT + '70' : t.inputBorderIdle}`,
          borderRadius: '14px',
          padding: as === 'textarea' ? '28px 16px 12px' : '28px 16px 10px',
          color: t.inputText,
          fontSize: '14px',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          lineHeight: 1.6,
          outline: 'none',
          resize: 'none',
          transition: 'border-color 0.25s, background 0.25s',
          boxShadow: focused ? `0 0 0 3px ${ACCENT}14` : 'none',
          display: 'block',
        }}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#EF4444', marginTop: '6px' }}
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Custom select ──────────────────────────────────────────────────────── */
const SelectField = ({ name, value, onChange, isDark }) => {
  const [open, setOpen] = useState(false)
  const t = tk(isDark)

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderRadius: '14px', padding: '16px', textAlign: 'left',
          background: t.inputBg,
          border: `1px solid ${open ? ACCENT + '70' : t.inputBorderIdle}`,
          color: t.inputText,
          fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
          boxShadow: open ? `0 0 0 3px ${ACCENT}14` : 'none',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          cursor: 'pointer',
        }}
      >
        <span>
          <span style={{ display: 'block', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '2px', color: ACCENT }}>
            Project type
          </span>
          {value}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} style={{ color: t.labelIdle }} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', left: 0, right: 0, top: '100%', marginTop: '8px', zIndex: 50,
              borderRadius: '16px', overflow: 'hidden', padding: '4px 0', listStyle: 'none',
              background: t.dropdownBg,
              border: `1px solid ${t.dropdownBorder}`,
              boxShadow: `0 24px 48px ${t.dropdownShadow}`,
            }}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <li
                key={opt}
                onClick={() => { onChange({ target: { name, value: opt } }); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', fontSize: '14px', cursor: 'pointer',
                  color: opt === value ? ACCENT : t.dropdownText,
                  background: opt === value ? `${ACCENT}10` : 'transparent',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${ACCENT}08` }}
                onMouseLeave={(e) => { e.currentTarget.style.background = opt === value ? `${ACCENT}10` : 'transparent' }}
              >
                {opt}
                {opt === value && <CheckCircle2 size={14} />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Tilt info card ─────────────────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, label, value, accent, delay, isDark }) => {
  const ref = useRef(null)
  const t   = tk(isDark)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)
  const rx  = useSpring(useTransform(y, [-40, 40], [5, -5]), { stiffness: 280, damping: 26 })
  const ry  = useSpring(useTransform(x, [-40, 40], [-5, 5]), { stiffness: 280, damping: 26 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 700 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: '16px', padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: '16px',
        background: t.cardBg, border: `1px solid ${t.cardBorder}`,
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', background: accent + '18', border: `1px solid ${accent}35` }}>
          <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
        </div>
        <div>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.28em', color: 'var(--fg-dim)', margin: '0 0 5px' }}>{label}</p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg)', margin: 0 }}>{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Social link pill ───────────────────────────────────────────────────── */
const SocialLink = ({ link, index, isDark }) => {
  const t = tk(isDark)
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -2 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '12px 22px', borderRadius: '12px',
        border: `1px solid ${t.socialBorder}`,
        background: 'transparent',
        color: t.socialText,
        textDecoration: 'none', fontSize: '13px', fontWeight: 600,
        transition: 'border-color 0.25s, color 0.25s, background 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = ACCENT + '60'
        e.currentTarget.style.color = ACCENT
        e.currentTarget.style.background = ACCENT + '08'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = t.socialBorder
        e.currentTarget.style.color = t.socialText
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {link.label}
      <ArrowUpRight size={13} />
    </motion.a>
  )
}

/* ─── FAQ accordion item ─────────────────────────────────────────────────── */
const FaqItem = ({ q, a, index, isDark }) => {
  const [open, setOpen] = useState(false)
  const t = tk(isDark)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{
        borderRadius: '14px', overflow: 'hidden',
        background: t.faqBg,
        border: `1px solid ${open ? ACCENT2 + '40' : t.faqBorder}`,
        transition: 'border-color 0.3s',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 22px', textAlign: 'left', background: 'transparent',
          border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg)', fontFamily: "'DM Sans', sans-serif" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ color: ACCENT2, flexShrink: 0, marginLeft: '12px' }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 22px 18px', borderTop: `1px solid ${t.faqBorder}` }}>
              <p style={{ fontSize: '13px', lineHeight: 1.75, color: t.faqAnswer, margin: '14px 0 0', fontWeight: 300 }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Hero stat ──────────────────────────────────────────────────────────── */
const HeroStat = ({ icon: Icon, label, value, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon size={15} style={{ color: accent }} />
      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-dim)' }}>{label}</span>
    </div>
    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--fg)' }}>{value}</span>
  </motion.div>
)

/* ─── Main page ──────────────────────────────────────────────────────────── */
export const ContactPage = () => {
  const { isDark } = useThemeMode()
  const t = tk(isDark)
  const [form, setForm]     = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name    = 'Name is required.'
    if (!form.email.trim()) e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.subject.trim()) e.subject = 'Subject is required.'
    if (!form.message.trim()) e.message = 'Tell me a little about the project.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  const contactIcons = { Email: Mail, Location: MapPin, Phone: Clock3 }

  return (
    <main style={{ background: isDark ? '#080B12' : '#F8FAFC', color: 'var(--fg)', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        ${SHARED_TOKENS}
        input:-webkit-autofill, textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px ${t.autofillBg} inset !important;
          -webkit-text-fill-color: ${t.inputText} !important;
        }
        @media (max-width: 640px) {
          .hero-stats { flex-direction: column !important; gap: 20px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-name-email { grid-template-columns: 1fr !important; }
          .social-grid { justify-content: flex-start !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 'clamp(80px,10vw,120px) clamp(16px,5vw,48px) 60px' }}>

        {/* Ambient glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: isDark
            ? `radial-gradient(ellipse at 15% 50%, rgba(8,145,178,0.12) 0%, transparent 45%), radial-gradient(ellipse at 85% 50%, rgba(124,58,237,0.10) 0%, transparent 45%)`
            : `radial-gradient(ellipse at 15% 50%, rgba(8,145,178,0.07) 0%, transparent 45%), radial-gradient(ellipse at 85% 50%, rgba(124,58,237,0.06) 0%, transparent 45%)`,
        }} />

        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: isDark ? 0.04 : 0.03,
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div style={{ maxWidth: '860px', width: '100%', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px', padding: '8px 16px', borderRadius: '99px', background: ACCENT + '14', border: `1px solid ${ACCENT}30` }}>
              <MessageSquare size={14} style={{ color: ACCENT }} />
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: ACCENT }}>Get in touch</span>
            </motion.div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, lineHeight: 1.08, marginBottom: '24px', color: 'var(--fg)' }}>
              Let's build something{' '}
              <em style={{ color: ACCENT, fontStyle: 'italic' }}>remarkable.</em>
            </h1>

            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.75, marginBottom: '48px', color: 'var(--fg-muted)', maxWidth: '640px', fontWeight: 300 }}>
              Whether it's a full-time opportunity, freelance project, or collaboration - share the idea and I'll come back with the clearest next step.
            </p>

            {/* Hero stats row */}
            <div className="hero-stats" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginBottom: '48px', padding: '24px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <HeroStat icon={Clock3}        label="Response time"  value="Within 24 h"            accent={ACCENT}  delay={0.5} />
              <div style={{ width: '1px', background: 'var(--border)', alignSelf: 'stretch' }} />
              <HeroStat icon={MessageSquare} label="Available for"  value="Full-time · Freelance"  accent={ACCENT2} delay={0.6} />
              <div style={{ width: '1px', background: 'var(--border)', alignSelf: 'stretch' }} />
              <HeroStat icon={Zap}           label="Current status" value="Open to opportunities"  accent={ACCENT3} delay={0.7} />
            </div>

            <a href="#contact-form"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 30px', borderRadius: '12px',
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                color: '#FFFFFF', fontWeight: 600, fontSize: '13px',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                textDecoration: 'none', boxShadow: `0 8px 28px ${ACCENT}30`,
                border: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 12px 36px ${ACCENT}40` }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = `0 8px 28px ${ACCENT}30` }}
            >
              Start conversation <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: t.scrollText, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Scroll to get in touch</p>
          <div style={{ color: ACCENT }}>↓</div>
        </motion.div>
      </section>

      {/* ── CONTACT INFO + FORM ── */}
      <section id="contact-form" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="contact-grid" style={{ display: 'grid', gap: '48px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))' }}>

          {/* Left: contact info */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.75rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '28px', color: 'var(--fg)' }}>
              Reach me <em style={{ color: ACCENT, fontStyle: 'italic' }}>directly.</em>
            </h2>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '28px' }}>
              {contactPoints.map((point, i) => {
                const Icon = contactIcons[point.label] ?? Mail
                return <InfoCard key={point.label} icon={Icon} label={point.label} value={point.value} accent={ACCENT} delay={i * 0.1} isDark={isDark} />
              })}
            </div>

            {/* Pro tip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
              style={{ padding: '18px 22px', borderRadius: '14px', background: ACCENT2 + '0e', border: `1px solid ${ACCENT2}28` }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: ACCENT2, margin: '0 0 8px' }}>Pro tip</p>
              <p style={{ fontSize: '13px', color: t.tipText, margin: 0, lineHeight: 1.65, fontWeight: 300 }}>
                Include your timeline and rough budget in the form - it helps me respond with more targeted insights faster.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: 'clamp(24px,5vw,40px)',
              borderRadius: '20px',
              background: 'var(--surface)',
              border: '1px solid var(--border-2)',
              boxShadow: `0 30px 80px ${t.formShadow}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent top line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${ACCENT}70, transparent)` }} />
            {/* Ambient */}
            <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: `radial-gradient(ellipse at top right, ${isDark ? 'rgba(8,145,178,0.07)' : 'rgba(8,145,178,0.04)'}, transparent 55%)` }} />

            <div style={{ position: 'relative', marginBottom: '28px' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.28em', color: ACCENT, fontWeight: 600, margin: '0 0 10px' }}>Project inquiry</p>
              <h3 style={{ color: 'var(--fg)', fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 'clamp(1.2rem,2.5vw,1.5rem)', fontWeight: 300, margin: 0 }}>
                Tell me what you want to <em style={{ color: ACCENT2, fontStyle: 'italic' }}>build.</em>
              </h3>
            </div>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Name + Email */}
              <div className="form-name-email" style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,160px), 1fr))' }}>
                <Field label="Name"  name="name"  value={form.name}  onChange={handleChange} error={errors.name}  isDark={isDark} />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} isDark={isDark} />
              </div>

              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} isDark={isDark} />
              <SelectField name="service" value={form.service} onChange={handleChange} isDark={isDark} />
              <Field label="Project details" name="message" as="textarea" rows={5} value={form.message} onChange={handleChange} error={errors.message} isDark={isDark} />

              {/* Submit row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '4px' }}>
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '13px 28px', borderRadius: '12px',
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                    color: '#FFFFFF', fontWeight: 600, fontSize: '13px',
                    border: 'none', cursor: 'pointer',
                    boxShadow: `0 8px 24px ${ACCENT}28`,
                    opacity: status === 'submitting' ? 0.65 : 1,
                    transition: 'opacity 0.2s',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <Send size={15} strokeWidth={2} />
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </motion.button>

                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', color: t.replyColor }}>
                  Reply within 24 h
                </p>
              </div>

              {/* Status banners */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', borderRadius: '12px', padding: '14px 16px', background: isDark ? 'rgba(5,150,105,0.08)' : 'rgba(5,150,105,0.07)', border: `1px solid ${isDark ? 'rgba(5,150,105,0.25)' : 'rgba(5,150,105,0.30)'}` }}>
                    <CheckCircle2 size={16} style={{ color: ACCENT3, flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ fontSize: '13px', color: t.statusMsgColor, margin: 0 }}>Message sent! I'll review it and get back to you soon.</p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', borderRadius: '12px', padding: '14px 16px', background: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)', border: `1px solid ${isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.30)'}` }}>
                    <AlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ fontSize: '13px', color: t.statusMsgColor, margin: 0 }}>Something went wrong - check the fields and try again.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ── SOCIAL LINKS ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,5vw,48px)', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,1.85rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '28px', textAlign: 'center', color: 'var(--fg)' }}>
            Connect on <em style={{ color: ACCENT2, fontStyle: 'italic' }}>socials.</em>
          </h2>
          <div className="social-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {socialLinks.map((link, i) => (
              <SocialLink key={link.label} link={link} index={i} isDark={isDark} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,5vw,48px)', maxWidth: '700px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,1.85rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '36px', textAlign: 'center', color: 'var(--fg)' }}>
            Quick <em style={{ color: ACCENT2, fontStyle: 'italic' }}>questions.</em>
          </h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              { q: 'What are your rates?', a: "Pricing depends on project scope, complexity, and timeline. Let's discuss your needs and I'll provide a detailed proposal." },
              { q: 'Do you work remotely?', a: 'Yes, I work fully remote and across time zones. Clear communication and regular updates ensure smooth collaboration.' },
              { q: "What's your typical project timeline?", a: "It varies based on scope. Small projects: 2–4 weeks. Medium: 1–3 months. Large systems: 3+ months. Let's align expectations upfront." },
              { q: 'How do you handle ongoing support?', a: 'I offer post-launch support, maintenance, and feature iterations. We can discuss a retainer or per-hour support model.' },
            ].map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} isDark={isDark} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,48px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {/* Decorative top line */}
          <div style={{ width: '48px', height: '2px', background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, margin: '0 auto 32px', borderRadius: '2px' }} />

          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, marginBottom: '18px', color: 'var(--fg)' }}>
            Looking forward to{' '}
            <em style={{ color: ACCENT, fontStyle: 'italic' }}>hearing from you.</em>
          </h2>
          <p style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'var(--fg-muted)', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.7 }}>
            Whether you have a specific project in mind or just want to explore possibilities, I'm excited to chat about what we can build together.
          </p>

          <a href="#contact-form"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 36px', borderRadius: '12px',
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
              color: '#FFFFFF', fontWeight: 600, fontSize: '13px',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              textDecoration: 'none', boxShadow: `0 12px 36px ${ACCENT}28`,
              border: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 16px 48px ${ACCENT}38` }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = `0 12px 36px ${ACCENT}28` }}
          >
            Fill out the form <ArrowRight size={16} />
          </a>
        </motion.div>
      </section>
    </main>
  )
}