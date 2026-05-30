import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export const ScrollSection = ({
  children,
  className = '',
  intensity = 1,
  drift = 'up',
  blur = true,
}) => {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 92%', 'end 8%'],
  })

  const baseTravel = 44 * intensity
  const sideTravel = 20 * intensity

  const xRange =
    drift === 'left'
      ? [sideTravel, 0, -sideTravel * 0.55]
      : drift === 'right'
        ? [-sideTravel, 0, sideTravel * 0.55]
        : [0, 0, 0]

  const yRange =
    drift === 'up'
      ? [baseTravel, 0, -baseTravel * 0.28]
      : drift === 'down'
        ? [-baseTravel, 0, baseTravel * 0.28]
        : [0, 0, 0]

  const x = useTransform(scrollYProgress, [0, 0.42, 1], xRange)
  const y = useTransform(scrollYProgress, [0, 0.42, 1], yRange)
  const opacity = useTransform(scrollYProgress, [0, 0.22, 1], [0.16, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.965, 1, 0.992])
  const filter = useTransform(scrollYProgress, [0, 0.3, 1], blur ? ['blur(9px)', 'blur(0px)', 'blur(1px)'] : ['blur(0px)', 'blur(0px)', 'blur(0px)'])

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ x, y, opacity, scale, filter }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}

export default ScrollSection
