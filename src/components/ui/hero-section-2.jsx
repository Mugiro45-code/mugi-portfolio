import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/utils/classNames'

const InfoIcon = ({ type }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  }

  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>
}

const HeroSection = React.forwardRef(function HeroSection(
  {
    className,
    logo,
    slogan,
    title,
    subtitle,
    callToAction,
    secondaryAction,
    highlights,
    backgroundImage,
    contactInfo,
    ...props
  },
  ref,
) {
  const heroRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const panelY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -56])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 76])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 30])
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.75, 0.18])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.section
      ref={ref}
      className={cn('relative flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      <div ref={heroRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.14),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_38%)]" />

      <motion.div style={{ y: contentY }} className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:p-16">
        <div>
          <motion.header className="mb-12" variants={itemVariants}>
            {logo ? (
              <div className="flex items-center">
                <img src={logo.url} alt={logo.alt} className="mr-3 h-8" />
                <div>
                  {logo.text ? <p className="text-lg font-bold text-foreground">{logo.text}</p> : null}
                  {slogan ? <p className="text-xs tracking-wider text-muted-foreground">{slogan}</p> : null}
                </div>
              </div>
            ) : null}
          </motion.header>

          <motion.main variants={containerVariants}>
            <motion.h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl" variants={itemVariants}>
              {title}
            </motion.h1>
            <motion.div className="my-6 h-1 w-20 bg-primary" variants={itemVariants} />
            <motion.p className="mb-8 max-w-lg text-pretty text-base text-muted-foreground" variants={itemVariants}>
              {subtitle}
            </motion.p>
            <motion.div className="flex flex-wrap items-center gap-4" variants={itemVariants}>
              <motion.a
                href={callToAction.href}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-widest text-primary-foreground transition hover:opacity-90"
              >
                {callToAction.text}
              </motion.a>
              {secondaryAction ? (
                <motion.a
                  href={secondaryAction.href}
                  className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold tracking-widest text-foreground transition hover:bg-muted"
                >
                  {secondaryAction.text}
                </motion.a>
              ) : null}
            </motion.div>

            {highlights?.length ? (
              <motion.div className="mt-6 flex flex-wrap gap-2" variants={itemVariants}>
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            ) : null}
          </motion.main>
        </div>

        <motion.footer className="mt-12 w-full" variants={itemVariants}>
          <div className="flex flex-nowrap items-center justify-between gap-6 text-[0.75rem] text-muted-foreground whitespace-nowrap">
            <div className="flex items-center gap-2">
              <InfoIcon type="website" />
              <span>{contactInfo.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <InfoIcon type="phone" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <InfoIcon type="address" />
              <span>{contactInfo.address}</span>
            </div>
          </div>
        </motion.footer>
      </motion.div>

      <motion.div
        className="min-h-[360px] w-full overflow-hidden bg-gradient-to-br from-[#4f6df5] via-[#9a67df] to-[#ff59ad] md:min-h-full md:w-1/2"
        initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
        animate={{ clipPath: 'polygon(23% 0, 100% 0, 100% 100%, 0% 100%)' }}
        transition={{ duration: 1.2, ease: 'circOut' }}
        style={{ y: panelY }}
      >
        <motion.img src={backgroundImage} alt={logo?.alt || 'Profile'} className="h-full w-full object-contain object-center" style={{ y: imageY }} />
      </motion.div>
    </motion.section>
  )
})

HeroSection.displayName = 'HeroSection'

export { HeroSection }
export default HeroSection