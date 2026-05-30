import { motion, useReducedMotion } from 'framer-motion'

export const Reveal = ({
  children,
  delay = 0,
  className = '',
  distance = 30,
  duration = 0.72,
  origin = 'bottom',
  once = true,
  amount = 0.24,
}) => {
  const shouldReduceMotion = useReducedMotion()

  const axis = {
    bottom: { x: 0, y: distance },
    top: { x: 0, y: -distance },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  }

  const offset = axis[origin] ?? axis.bottom

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.985, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}