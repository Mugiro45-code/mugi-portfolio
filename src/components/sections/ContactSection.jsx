import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  Mail, MapPinned, Clock3, Send, CheckCircle2, AlertCircle, ChevronDown
} from 'lucide-react'
import { SectionShell } from '@/components/common/SectionShell'
import { contactPoints } from '@/data/portfolio'
import { useThemeMode } from '@/context/ThemeModeContext'
import { sendContactMessage } from '@/services/contactService'

/* ─── Constants ──────────────────────────────────────────────────────────── */
const ICON_MAP   = [Mail, MapPinned, Clock3]
const ACCENT     = '#0891B2'   // cyan-600  - readable on both themes
const ACCENT2    = '#7C3AED'   // violet-600
const SERVICE_OPTIONS = [
  'Website / Portfolio',
  'Frontend UI',
  'Full-stack Product',
  'Freelance / Collaboration',
  'Other',
]
const INITIAL = { name: '', email: '', subject: '', service: SERVICE_OPTIONS[0], message: '' }

/* ─── Theme tokens ───────────────────────────────────────────────────────── */
const tokens = (isDark) => ({
  // Text
  textPrimary:     isDark ? 'rgba(255,255,255,0.95)' : 'rgba(10,10,20,0.92)',
  textSecondary:   isDark ? 'rgba(255,255,255,0.92)' : 'rgba(10,10,20,0.88)',
  textMuted:       isDark ? 'rgba(255,255,255,0.40)' : 'rgba(10,10,20,0.42)',
  textFaint:       isDark ? 'rgba(255,255,255,0.30)' : 'rgba(10,10,20,0.32)',
  textReply:       isDark ? 'rgba(255,255,255,0.25)' : 'rgba(10,10,20,0.28)',
  textLabel:       isDark ? 'rgba(255,255,255,0.30)' : 'rgba(10,10,20,0.35)',
  textInput:       isDark ? 'rgba(255,255,255,0.88)' : 'rgba(10,10,20,0.88)',
  textDropdown:    isDark ? 'rgba(255,255,255,0.70)' : 'rgba(10,10,20,0.68)',
  textStatusMsg:   isDark ? 'rgba(255,255,255,0.75)' : 'rgba(10,10,20,0.72)',
  // Surfaces
  cardBg:          isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  cardBorder:      isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
  formBg:          isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  formBorder:      isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)',
  inputBg:         isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
  inputBgFocus:    isDark ? 'rgba(8,145,178,0.05)'   : 'rgba(8,145,178,0.04)',
  inputBorderIdle: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)',
  dropdownBg:      isDark ? '#0D1220'                : '#FFFFFF',
  dropdownBorder:  isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
  dropdownShadow:  isDark ? 'rgba(0,0,0,0.60)'       : 'rgba(0,0,0,0.12)',
  hintBg:          isDark ? `${ACCENT2}10`            : `${ACCENT2}08`,
  hintBorder:      isDark ? `${ACCENT2}25`            : `${ACCENT2}30`,
  hintText:        isDark ? 'rgba(255,255,255,0.50)' : 'rgba(10,10,20,0.52)',
  formShadow:      isDark ? 'rgba(0,0,0,0.45)'       : 'rgba(0,0,0,0.08)',
  cardShadow:      isDark ? 'rgba(0,0,0,0.30)'       : 'rgba(0,0,0,0.06)',
  autofillBg:      isDark ? '#0a0e1c'                : '#ffffff',
  // Submit button text stays dark on gradient
  submitText:      '#080B12',
})

/* ─── Floating label input ───────────────────────────────────────────────── */
const Field = ({ label, name, type = 'text', value, onChange, error, as, rows, isDark }) => {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0
  const active = focused || filled
  const Tag = as ?? 'input'
  const t = tokens(isDark)

  return (
    <div className="relative">
      <label
        className="pointer-events-none absolute left-4 transition-all duration-200 select-none"
        style={{
          top: active ? '8px' : '50%',
          transform: as === 'textarea'
            ? (active ? 'none' : 'translateY(-50%)')
            : (active ? 'none' : 'translateY(-50%)'),
          fontSize: active ? '10px' : '13px',
          fontWeight: active ? 600 : 400,
          letterSpacing: active ? '0.18em' : '0.02em',
          textTransform: active ? 'uppercase' : 'none',
          color: focused ? ACCENT : t.textFaint,
          zIndex: 1,
          lineHeight: 1,
        }}
      >
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
          color: t.textInput,
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 flex items-center gap-1.5 text-[11px]"
            style={{ color: '#EF4444' }}
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Custom select ──────────────────────────────────────────────────────── */
const SelectField = ({ name, value, onChange, isDark }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const t = tokens(isDark)

  const pick = (opt) => {
    onChange({ target: { name, value: opt } })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between rounded-[14px] px-4 py-4 text-sm text-left"
        style={{
          background: t.inputBg,
          border: `1px solid ${open ? ACCENT + '70' : t.inputBorderIdle}`,
          color: t.textSecondary,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: open ? `0 0 0 3px ${ACCENT}14` : 'none',
          transition: 'border-color 0.25s, box-shadow 0.25s',
        }}
      >
        <span>
          <span
            className="block text-[10px] font-semibold uppercase tracking-[0.18em] mb-0.5"
            style={{ color: ACCENT }}
          >
            Project type
          </span>
          {value}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4" style={{ color: t.textFaint }} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl py-1"
            style={{
              background: t.dropdownBg,
              border: `1px solid ${t.dropdownBorder}`,
              boxShadow: `0 24px 48px ${t.dropdownShadow}`,
            }}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <li
                key={opt}
                onClick={() => pick(opt)}
                className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-colors"
                style={{
                  color: opt === value ? ACCENT : t.textDropdown,
                  background: opt === value ? `${ACCENT}10` : 'transparent',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${ACCENT}08` }}
                onMouseLeave={(e) => { e.currentTarget.style.background = opt === value ? `${ACCENT}10` : 'transparent' }}
              >
                {opt}
                {opt === value && <CheckCircle2 className="h-3.5 w-3.5" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Info card ──────────────────────────────────────────────────────────── */
const InfoCard = ({ point, index, isDark }) => {
  const Icon = ICON_MAP[index % ICON_MAP.length]
  const ref = useRef(null)
  const t = tokens(isDark)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-40, 40], [5, -5])
  const rotY = useTransform(x, [-40, 40], [-5, 5])
  const sx = useSpring(rotX, { stiffness: 280, damping: 26 })
  const sy = useSpring(rotY, { stiffness: 280, damping: 26 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', perspective: 700 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set(e.clientX - r.left - r.width / 2)
        y.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="relative overflow-hidden rounded-2xl p-5 flex items-center gap-4"
      style={{
        background: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        boxShadow: `0 4px 24px ${t.cardShadow}`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}60, transparent)` }}
      />

      <div
        className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${ACCENT}18`, border: `1px solid ${ACCENT}35` }}
      >
        <Icon className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={1.5} />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: t.textLabel }}>
          {point.label}
        </p>
        <p className="mt-1 text-sm font-semibold" style={{ color: t.textSecondary }}>
          {point.value}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export const ContactSection = () => {
  const { isDark } = useThemeMode()
  const t = tokens(isDark)

  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
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
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionShell id="contact" className="py-20 sm:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        #contact * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        #contact input:-webkit-autofill,
        #contact textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px ${t.autofillBg} inset !important;
          -webkit-text-fill-color: ${t.textInput} !important;
        }
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
              style={{ color: ACCENT }}
            >
              Contact
            </span>
            <span className="h-px w-12" style={{ background: `${ACCENT}55` }} />
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
              Let's build something{' '}
              <em style={{ color: ACCENT, fontStyle: 'italic' }}>memorable.</em>
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
            Share the idea, scope, and timeline - I'll reply with the clearest next step.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">

          {/* Left: contact info */}
          <div className="space-y-3">
            {contactPoints.map((point, i) => (
              <InfoCard key={point.label} point={point} index={i} isDark={isDark} />
            ))}

            {/* "What to include" hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-2xl p-5"
              style={{
                background: t.hintBg,
                border: `1px solid ${t.hintBorder}`,
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.28em] mb-2"
                style={{ color: ACCENT2 }}
              >
                What to include
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: t.hintText, fontWeight: 300 }}
              >
                Goal, timeline, and any reference links. A few lines is enough to get started.
              </p>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 space-y-5"
            style={{
              background: t.formBg,
              border: `1px solid ${t.formBorder}`,
              boxShadow: `0 30px 80px ${t.formShadow}`,
            }}
          >
            {/* Form top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}70, transparent)` }}
            />
            {/* Ambient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse at top right, ${isDark ? 'rgba(8,145,178,0.07)' : 'rgba(8,145,178,0.04)'}, transparent 55%)` }}
            />

            {/* Form heading */}
            <div className="relative mb-2">
              <p
                className="text-[10px] uppercase tracking-[0.28em] mb-1"
                style={{ color: ACCENT }}
              >
                Project inquiry
              </p>
              <h3
                className="text-xl sm:text-2xl font-light leading-snug"
                style={{ color: t.textPrimary, fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Tell me what you want to{' '}
                <em style={{ color: ACCENT2, fontStyle: 'italic' }}>build.</em>
              </h3>
            </div>

            {/* Name + Email */}
            <div className="relative grid gap-4 sm:grid-cols-2">
              <Field label="Name"  name="name"  value={form.name}  onChange={handleChange} error={errors.name}  isDark={isDark} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} isDark={isDark} />
            </div>

            {/* Subject */}
            <div className="relative">
              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} isDark={isDark} />
            </div>

            {/* Project type */}
            <div className="relative">
              <SelectField name="service" value={form.service} onChange={handleChange} isDark={isDark} />
            </div>

            {/* Message */}
            <div className="relative">
              <Field
                label="Project details"
                name="message"
                as="textarea"
                rows={6}
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                isDark={isDark}
              />
            </div>

            {/* Submit row */}
            <div className="relative flex flex-wrap items-center justify-between gap-4 pt-1">
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity disabled:opacity-60"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                  color: '#FFFFFF',
                  boxShadow: `0 8px 24px ${ACCENT}30`,
                }}
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </motion.button>

              <p
                className="text-[10px] uppercase tracking-[0.24em]"
                style={{ color: t.textReply }}
              >
                Reply within 24 h
              </p>
            </div>

            {/* Status banners */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="relative flex items-start gap-3 rounded-xl p-4"
                  style={{
                    background: isDark ? 'rgba(5,150,105,0.08)' : 'rgba(5,150,105,0.07)',
                    border: `1px solid ${isDark ? 'rgba(5,150,105,0.25)' : 'rgba(5,150,105,0.30)'}`,
                  }}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#059669' }} />
                  <p className="text-sm" style={{ color: t.textStatusMsg }}>
                    Message sent - I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="relative flex items-start gap-3 rounded-xl p-4"
                  style={{
                    background: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)',
                    border: `1px solid ${isDark ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.30)'}`,
                  }}
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#EF4444' }} />
                  <p className="text-sm" style={{ color: t.textStatusMsg }}>
                    Something went wrong - please check the fields and try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>

      </div>
    </SectionShell>
  )
}