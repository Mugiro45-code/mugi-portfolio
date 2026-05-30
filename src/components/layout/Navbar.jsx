import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import BottomNavBar from '@/components/ui/bottom-nav-bar'
import { useThemeMode } from '@/context/ThemeModeContext'
import { cn } from '@/utils/classNames'

export const Navbar = () => {
  const { isDark, toggleMode } = useThemeMode()

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-300',
        isDark ? 'border-white/10 bg-slate-950/40' : 'border-slate-300/70 bg-white/60',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group shrink-0 rounded-xl px-1 py-1">
          <span
            className={cn(
              'bg-clip-text text-xl tracking-[0.06em] text-transparent drop-shadow-[0_0_14px_rgba(56,189,248,0.28)] sm:text-2xl',
              isDark
                ? 'bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400'
                : 'bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600',
            )}
            style={{ fontFamily: 'Harry P, Cinzel Decorative, serif' }}
          >
            MUGILAN S
          </span>
        </Link>

        <div className="flex flex-1 justify-center">
          <BottomNavBar isDark={isDark} className="w-full max-w-[620px] justify-between overflow-x-auto px-1 md:w-fit md:justify-center" />
        </div>

        <div className="flex w-[44px] justify-end md:w-[150px]">
          <button
            type="button"
            onClick={toggleMode}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300',
              isDark
                ? 'border-white/15 bg-white/10 text-slate-100 hover:bg-white/20'
                : 'border-slate-300/80 bg-white/80 text-slate-700 hover:bg-slate-100',
            )}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}