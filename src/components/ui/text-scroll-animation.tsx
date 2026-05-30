import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type CharacterProps = {
  char: string
  index: number
  centerIndex: number
  scrollYProgress: any
}

const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const isSpace = char === ' '
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0])

  return (
    <motion.span
      className={cn('inline-block text-orange-500', isSpace && 'w-4')}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  )
}

const CharacterV2 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0])

  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, scale, y, transformOrigin: 'center' }}
    />
  )
}

const CharacterV3 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1])

  return (
    <motion.img
      src={char}
      alt=""
      className="h-16 w-16 shrink-0 object-contain will-change-transform"
      style={{ x, rotate, y, scale, transformOrigin: 'center' }}
    />
  )
}

type StackChipProps = {
  icon: string
  index: number
  scrollYProgress: any
}

const StackChip = ({ icon, index, scrollYProgress }: StackChipProps) => {
  const drift = index % 2 === 0 ? -180 : 180
  const x = useTransform(scrollYProgress, [0, 1], [drift, 0])
  const y = useTransform(scrollYProgress, [0, 1], [70 + index * 10, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -18 : 18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.84, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.5], [0, 1, 1])

  return (
    <motion.div
      className="flex items-center gap-4 rounded-[22px] border border-black/10 bg-white px-4 py-3 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.25)]"
      style={{ x, y, rotate, scale, opacity }}
    >
      <CharacterV2 char={icon} index={index} centerIndex={Math.floor(iconSources.length / 2)} scrollYProgress={scrollYProgress} />
      <div>
        <p className="text-sm font-semibold text-slate-900">Stack item {index + 1}</p>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">animated by scroll</p>
      </div>
    </motion.div>
  )
}

const Bracket = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
    <path
      fill="currentColor"
      d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
    />
  </svg>
)

const iconSources = [
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/figma.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/framer.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/notion.svg',
]

export const Skiper31 = () => {
  const shouldReduceMotion = useReducedMotion()
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  const text = 'see more from '
  const characters = text.split('')
  const centerIndex = Math.floor(characters.length / 2)
  const iconCenterIndex = Math.floor(iconSources.length / 2)

  const panelY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -56])
  const panelRotate = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 2])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 240])
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.15])
  const orbX = useTransform(scrollYProgress, [0, 1], [-140, 140])
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -100])
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.12, 0.92])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12, 0.25], [0.15, 1, 1])
  const headlineY = useTransform(scrollYProgress, [0, 0.35], [120, 0])
  const headlineScale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1])
  const headlineX = useTransform(scrollYProgress, [0, 0.35], [-120, 0])
  const iconRowY = useTransform(scrollYProgress, [0, 0.4], [120, 0])
  const iconRowOpacity = useTransform(scrollYProgress, [0, 0.18, 0.4], [0, 1, 1])
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const copyLift = useTransform(scrollYProgress, [0, 1], [24, -24])

  if (shouldReduceMotion) {
    return (
      <div className="w-full rounded-[28px] border border-white/10 bg-white/90 p-8 text-slate-900 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.2)]">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Scroll animation</p>
        <h2 className="mt-4 text-3xl font-semibold">See more from your favorite stack.</h2>
      </div>
    )
  }

  return (
    <section className="relative w-full bg-[#f5f4f3] text-black">
      <div ref={targetRef} className="relative min-h-[320vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
          <motion.div
            style={{ y: panelY, rotate: panelRotate }}
            className="relative mx-auto flex h-[calc(100vh-3rem)] w-full max-w-7xl items-center overflow-hidden rounded-[36px] border border-black/10 bg-white/80 px-5 py-6 shadow-[0_50px_140px_-70px_rgba(15,23,42,0.4)] backdrop-blur sm:px-8 lg:px-12"
          >
            <motion.div
              aria-hidden="true"
              style={{ x: orbX, y: orbY, scale: orbScale }}
              className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.25),_rgba(168,85,247,0)_72%)] blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              style={{ x: orbX, y: orbY }}
              className="pointer-events-none absolute right-2 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.22),_rgba(34,211,238,0)_70%)] blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              style={{ rotate: ringRotate, scale: ringScale }}
              className="pointer-events-none absolute -right-24 bottom-[-7rem] h-96 w-96 rounded-full border border-black/10 bg-transparent"
            >
              <div className="absolute inset-[14%] rounded-full border border-cyan-400/20" />
            </motion.div>

            <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-black/55">
                    Scroll to see the motion
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.28em] text-black/40">
                    01 / 03
                  </span>
                </div>

                <motion.div
                  style={{ opacity: headlineOpacity, y: headlineY, x: headlineX, scale: headlineScale, translateY: copyLift }}
                  className="max-w-4xl"
                >
                  <div className="text-[clamp(2.8rem,8vw,8rem)] font-black uppercase leading-[0.88] tracking-[-0.09em] text-[#0f172a]">
                    {characters.map((char, index) => (
                      <CharacterV1
                        key={`${char}-${index}`}
                        char={char}
                        index={index}
                        centerIndex={centerIndex}
                        scrollYProgress={scrollYProgress}
                      />
                    ))}
                    <span className="inline-block text-black/25">motion</span>
                  </div>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    The cards, icons, and headline are all tied to scroll progress so the effect stays obvious while you move through the page.
                  </p>
                </motion.div>

                <motion.div style={{ opacity: iconRowOpacity, y: iconRowY }} className="space-y-5">
                  <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
                    <Bracket className="h-10 text-slate-400" />
                    <span>integrate with your fav tech stack</span>
                    <Bracket className="h-10 scale-x-[-1] text-slate-400" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {iconSources.map((icon, index) => (
                      <StackChip key={icon} icon={icon} index={index} scrollYProgress={scrollYProgress} />
                    ))}
                  </div>
                </motion.div>
              </div>

                <motion.div
                  style={{ opacity: headlineOpacity, y: useTransform(scrollYProgress, [0, 0.35], [120, 0]) }}
                  className="relative rounded-[28px] border border-black/10 bg-[#0f172a] p-5 text-white shadow-[0_24px_90px_-40px_rgba(15,23,42,0.6)]"
                >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">live progress</p>
                    <p className="mt-2 text-2xl font-semibold">Motion you can actually see</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.24em] text-slate-300/70">
                    Scroll down
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      style={{ scaleX: progressScaleX, originX: 0 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {['Headline drift', 'Icon lift', 'Card glide'].map((label, index) => (
                      <div key={label} className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                        <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400">Stage 0{index + 1}</p>
                        <p className="mt-2 text-sm font-semibold text-white">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                    This panel stays pinned while the scroll progress moves the headline, the stack cards, and the progress bar.
                    If this still feels static, the scroll demo is not being reached in the browser.
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { CharacterV1, CharacterV2, CharacterV3 }

export default Skiper31