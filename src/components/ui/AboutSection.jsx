import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Zap, Server, Wrench, Archive, Database, Award } from 'lucide-react'
import mugiImage from '@/assets/images/Mugi.jpg'
import { useThemeMode } from '@/context/ThemeModeContext'
import { cn } from '@/utils/classNames'

const tiles = [
  { icon: Zap,      title: 'Frontend',       desc: 'React, Next.js, React Native, Bootstrap',                  color: '#6EE7F7' },
  { icon: Server,   title: 'Backend',        desc: 'Python (FastAPI), PHP (Laravel)',                          color: '#A78BFA' },
  { icon: Wrench,   title: 'DevOps & Tools', desc: 'Docker, CI/CD, VPS, Git, GitHub, Figma',                  color: '#34D399' },
  { icon: Archive,  title: 'Projects',       desc: 'HMS, Billing & Inventory, CRM, E-commerce',               color: '#FBBF24' },
  { icon: Database, title: 'Database',       desc: 'PostgreSQL, MySQL, MongoDB, MSSQL',                       color: '#F472B6' },
  { icon: Award,    title: 'Achievements',   desc: 'NSS rep, Best Performer, Leadership Roles',               color: '#FB923C' },
]

function MagneticTile({ t, i }) {
  const Icon = t.icon
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { isDark } = useThemeMode()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-40, 40], [8, -8])
  const rotateY = useTransform(x, [-40, 40], [-8, 8])
  const springX = useSpring(rotateX, { stiffness: 300, damping: 25 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 25 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      {/* Glow behind card */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: t.color }}
        className="absolute inset-0 rounded-2xl blur-xl opacity-20 scale-95 -z-10"
      />

      <div
        className="relative rounded-2xl p-4 border transition-colors duration-300 overflow-hidden"
        style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
          borderColor: hovered ? t.color + '55' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(2,6,23,0.06)'),
          boxShadow: hovered
            ? (isDark ? `0 0 0 1px ${t.color}33, inset 0 0 40px ${t.color}08` : `0 6px 18px rgba(2,6,23,0.06), 0 0 0 1px ${t.color}33`)
            : (isDark ? 'none' : '0 8px 20px rgba(2,6,23,0.03)') ,
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: hovered ? '200%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
        />

        <div className="flex items-start gap-3">
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: t.color + '18', border: `1px solid ${t.color}44` }}
          >
            <Icon style={{ color: t.color }} className="h-5 w-5" strokeWidth={1.5} />
          </motion.div>

          <div>
            <h3
              className="text-sm font-semibold tracking-wide"
              style={{ color: hovered ? t.color : (isDark ? 'rgba(255,255,255,0.9)' : 'rgba(17,24,39,0.9)'), transition: 'color 0.3s' }}
            >
              {t.title}
            </h3>
            <p className="mt-0.5 text-xs leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(17,24,39,0.6)' }}>{t.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const imageRef = useRef(null)
  const { isDark } = useThemeMode()
  const imgX = useMotionValue(0)
  const imgY = useMotionValue(0)
  const imgRotateX = useTransform(imgY, [-60, 60], [6, -6])
  const imgRotateY = useTransform(imgX, [-60, 60], [-6, 6])
  const imgSpringX = useSpring(imgRotateX, { stiffness: 200, damping: 30 })
  const imgSpringY = useSpring(imgRotateY, { stiffness: 200, damping: 30 })

  const handleImageMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect()
    imgX.set(e.clientX - rect.left - rect.width / 2)
    imgY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <section
      id="about"
      className={`relative overflow-hidden py-24 ${isDark ? '' : 'light'}`}
      style={{ background: isDark ? '#080B12' : '#FAFAFB', fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap');

        #about * { box-sizing: border-box; }

        .about-noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(110,231,247,0.07) 0%, transparent 70%);
          top: -150px; left: -100px;
          pointer-events: none;
        }
        .glow-orb-2 {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%);
          bottom: -100px; right: 0;
          pointer-events: none;
        }

        .char-animate {
          display: inline-block;
          animation: charIn 0.6s both;
        }
        @keyframes charIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .image-glow {
          box-shadow:
            0 0 0 1px rgba(110,231,247,0.15),
            0 0 40px rgba(110,231,247,0.08),
            0 40px 80px rgba(0,0,0,0.6);
        }
        .light .image-glow {
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.06),
            0 0 30px rgba(99,102,241,0.04),
            0 20px 40px rgba(2,6,23,0.06);
        }

        /* Lighter glow orbs for light theme */
        .light .glow-orb-1 {
          background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
        }
        .light .glow-orb-2 {
          background: radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%);
        }

        .light .about-noise::before { opacity: 0.12 }
      `}</style>

      <div className="about-noise glow-orb-1" />
      <div className="glow-orb-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 items-start">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#6EE7F7' }}
              >
                Who I Am
              </span>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(110,231,247,0.3)' }} />
            </motion.div>

            {/* Heading */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl font-light leading-tight"
                style={{ color: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.95)' }}
              >
                <span
                  className={cn(
                    'bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.28)]',
                    isDark
                      ? 'bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400'
                      : 'bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600',
                  )}
                  style={{ fontFamily: 'Harry P, Cinzel Decorative, serif' }}
                >
                  MUGILAN S
                </span>
              </motion.h2>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.p
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-base leading-[1.85] max-w-[500px]"
                style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(17,24,39,0.6)', fontWeight: 300 }}
              >
                Results-driven Software Engineer building scalable applications across healthcare,
                billing, CRM, and inventory systems. Full-stack expertise spanning{' '}
                <span style={{ color: 'rgba(0, 136, 255, 0.75)', fontWeight: 500 }}>FastAPI, Laravel, and React</span>
                {' '} - with a sharp focus on production performance and long-term maintainability.
              </motion.p>
            </div>

            {/* Tiles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tiles.map((t, i) => (
                <MagneticTile key={t.title} t={t} i={i} />
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN - Image ── */}
            <div className="flex items-start justify-center lg:justify-end">
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                rotateX: imgSpringX,
                rotateY: imgSpringY,
                transformStyle: 'preserve-3d',
                perspective: 900,
              }}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={() => { imgX.set(0); imgY.set(0) }}
              className="relative w-full max-w-[420px] sm:max-w-[460px] cursor-none"
            >
              {/* Decorative corner brackets */}
              {[
                { top: -8, left: -8, borderTop: '2px solid #6EE7F7', borderLeft: '2px solid #6EE7F7', borderRadius: '4px 0 0 0' },
                { top: -8, right: -8, borderTop: '2px solid #6EE7F7', borderRight: '2px solid #6EE7F7', borderRadius: '0 4px 0 0' },
                { bottom: -8, left: -8, borderBottom: '2px solid #6EE7F7', borderLeft: '2px solid #6EE7F7', borderRadius: '0 0 0 4px' },
                { bottom: -8, right: -8, borderBottom: '2px solid #6EE7F7', borderRight: '2px solid #6EE7F7', borderRadius: '0 0 4px 0' },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + idx * 0.08, duration: 0.4 }}
                  className="absolute w-5 h-5 pointer-events-none"
                  style={s}
                />
              ))}

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
                className="absolute -right-4 top-8 z-20 rounded-xl px-3 py-2 text-xs font-semibold"
                style={{
                  background: 'rgba(110,231,247,0.1)',
                  border: '1px solid rgba(110,231,247,0.25)',
                  color: '#6EE7F7',
                  backdropFilter: 'blur(10px)',
                  animationDuration: '3s',
                  borderRadius: '5px',
                }}
              >
                Full-Stack
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
                animate={{ y: [0, 5, 0] }}
                className="absolute -left-6 bottom-12 z-20 rounded-xl px-3 py-2 text-xs font-semibold"
                style={{
                  background: 'rgba(167,139,250,0.1)',
                  border: '1px solid rgba(167,139,250,0.25)',
                  color: '#A78BFA',
                  backdropFilter: 'blur(10px)',
                  animationDuration: '4s',
                  borderRadius: '5px',
                }}
              >
                Open to Work
              </motion.div>

              {/* Image frame */}
              <div
                className="image-glow rounded-2xl overflow-hidden"
                style={{ border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(17,24,39,0.06)' }}
              >
                <motion.img
                  src={mugiImage}
                  alt="Mugilan S - Software Engineer"
                  className="w-full object-cover"
                  style={{ height: '520px', display: 'block', filter: 'contrast(1.05) brightness(0.95)' }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />

                {/* Overlay gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${isDark ? '#080B12' : '#FAFAFB'} 0%, transparent 100%)` }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}