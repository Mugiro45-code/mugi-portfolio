import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/common/Container'

export const PageHero = ({ eyebrow, title, description, ctaLabel, ctaHref = '/contact' }) => (
  <section className="relative overflow-hidden py-24 sm:py-28">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        {eyebrow ? (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
        ) : null}
        {ctaLabel ? (
          <div className="mt-8">
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/20"
            >
              {ctaLabel}
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : null}
      </motion.div>
    </Container>
  </section>
)