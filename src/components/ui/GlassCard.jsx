import { motion } from 'framer-motion'
import { cn } from '@/utils/classNames'

export const GlassCard = ({ className = '', children, ...props }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    className={cn(
      'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl',
      className,
    )}
    {...props}
  >
    {children}
  </motion.div>
)