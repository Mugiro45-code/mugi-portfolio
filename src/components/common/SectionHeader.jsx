import { motion } from 'framer-motion'
import { cn } from '@/utils/classNames'

export const SectionHeader = ({ eyebrow, title, description, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={cn('max-w-3xl', className)}
  >
    {eyebrow ? (
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{title}</h2>
    {description ? <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p> : null}
  </motion.div>
)