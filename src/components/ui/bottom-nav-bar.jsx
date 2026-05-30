import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, UserRound, FolderKanban, BriefcaseBusiness, Mail } from 'lucide-react'
import { mainNavLinks } from '@/constants/navigation'
import { cn } from '@/utils/classNames'

const iconByLabel = {
  Home,
  About: UserRound,
  Projects: FolderKanban,
  Experience: BriefcaseBusiness,
  Contact: Mail,
}

const MOBILE_LABEL_WIDTH = 72
const ACTIVE_LABEL_GAP = 9

export const BottomNavBar = ({ className, defaultIndex = 0, isDark = true }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const location = useLocation()

  useEffect(() => {
    const currentIndex = mainNavLinks.findIndex((item) => item.href === location.pathname)
    if (currentIndex >= 0) setActiveIndex(currentIndex)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      role="navigation"
      aria-label="Primary Navigation"
      className={cn(
        // fill available width on small screens for better spacing, center and fit on md+
        'flex w-full max-w-[95vw] md:w-fit md:mx-auto items-center gap-1 rounded-full border px-1 py-1 shadow-xl backdrop-blur-xl transition-colors duration-300',
        isDark ? 'border-white/15 bg-white/5 shadow-black/20' : 'border-slate-300/75 bg-white/80 shadow-slate-300/35',
        className,
      )}
    >
      {mainNavLinks.map((item, idx) => {
        const isActive = activeIndex === idx
        const Icon = iconByLabel[item.label] || Home

        return (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => setActiveIndex(idx)}
            className={({ isActive: routeActive }) =>
              cn(
                'group flex h-9 md:h-10 min-w-[42px] items-center justify-center rounded-full px-2 md:px-3.5 transition-colors duration-200 focus:outline-none focus-visible:ring-0',
                routeActive || isActive
                  ? isDark
                    ? 'bg-white/12 text-white'
                    : 'bg-slate-900/10 text-slate-900'
                  : isDark
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-900',
              )
            }
            aria-label={item.label}
          >
            <motion.div
              className="flex items-center overflow-hidden"
              animate={{ gap: isActive ? ACTIVE_LABEL_GAP : 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              <Icon size={20} strokeWidth={2} aria-hidden className="shrink-0 transition-colors duration-200" />
              <motion.span
                initial={false}
                animate={{
                  width: isActive ? `${MOBILE_LABEL_WIDTH}px` : '0px',
                  opacity: isActive ? 1 : 0,
                  marginLeft: isActive ? '8px' : '0px',
                }}
                transition={{
                  width: { type: 'spring', stiffness: 350, damping: 32 },
                  opacity: { duration: 0.18 },
                  marginLeft: { duration: 0.18 },
                }}
                className={cn(
                  // hide labels on small screens for a compact mobile layout
                  'hidden md:inline-block overflow-hidden whitespace-nowrap text-xs font-medium',
                  isDark ? 'text-white' : 'text-slate-900',
                )}
              >
                {item.label}
              </motion.span>
            </motion.div>
          </NavLink>
        )
      })}
    </motion.nav>
  )
}

export default BottomNavBar
