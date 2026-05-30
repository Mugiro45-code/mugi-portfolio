"use client"

import * as React from 'react'

import { useMeasure } from '@uidotdev/usehooks'
import { cva } from 'class-variance-authority'
import { motion, useScroll, useTransform } from 'motion/react'

import { cn } from '@/lib/utils'

const processCardVariants = cva(
  'absolute inset-0 flex overflow-hidden rounded-[1.9rem] border backdrop-blur-xl',
  {
    variants: {
      variant: {
        indigo:
          'border-slate-700/70 bg-gradient-to-br from-[rgba(15,23,42,0.92)_35%] via-[rgba(15,23,42,0.88)] to-[rgba(55,48,163,0.82)] text-slate-50 shadow-[0_28px_90px_-50px_rgba(0,0,0,0.9)]',
        light:
          'border-slate-200 bg-white/92 text-slate-900 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.22)]',
      },
    },
    defaultVariants: {
      variant: 'indigo',
    },
  }
)

const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)

  if (!context) {
    throw new Error('useContainerScrollContext must be used within a ContainerScroll Component')
  }

  return context
}

export const ContainerScroll = ({ children, className, style, ...props }) => {
  const scrollRef = React.useRef(null)
  // ensure scrollYProgress maps 0..1 across the element bounds
  // trigger the scroll mapping around the viewport center so cards begin moving earlier
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start center', 'end center'] })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn('relative min-h-[120vh]', className)} style={style} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const ContainerSticky = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('sticky left-0 top-24 w-full overflow-hidden', className)} {...props} />
))

ContainerSticky.displayName = 'ContainerSticky'

export const ProcessCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 sm:p-6', className)} {...props} />
))

ProcessCardTitle.displayName = 'ProcessCardTitle'

export const ProcessCardBody = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-1 flex-col gap-6 p-5 sm:p-6', className)} {...props} />
))

ProcessCardBody.displayName = 'ProcessCardBody'

export const ProcessCard = ({ className, style, variant, itemsLength, index, ...props }) => {
  const { scrollYProgress } = useContainerScrollContext()
  // keep the motion gentle so both cards remain readable in the viewport
  const segments = Math.max(itemsLength ?? 1, 1)
  const start = index / segments
  const end = (index + 1) / segments
  const [ref, { height }] = useMeasure()
  const enterDistance = Math.max((height ?? 0) * 0.45, 180)
  const y = useTransform(scrollYProgress, [start, end], [enterDistance, 0])
  const opacity = useTransform(scrollYProgress, [start, end], [index === 0 ? 1 : 0.7, 1])
  const scale = useTransform(scrollYProgress, [start, end], [index === 0 ? 1 : 0.96, 1])

  return (
    <motion.article
      ref={ref}
      style={{
        y,
        opacity,
        scale,
        zIndex: (itemsLength ?? 1) - index,
        ...style,
      }}
      className={cn(processCardVariants({ variant }), className)}
      {...props}
    />
  )
}

ProcessCard.displayName = 'ProcessCard'
