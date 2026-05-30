import { createContext, useContext, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

const CollapsibleContext = createContext(null)

export function Collapsible({
  defaultOpen = false,
  open,
  onOpenChange,
  asChild = false,
  className = '',
  children,
  ...props
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const setOpen = nextOpen => {
    const resolvedOpen = typeof nextOpen === 'function' ? nextOpen(isOpen) : nextOpen

    if (!isControlled) {
      setInternalOpen(resolvedOpen)
    }

    if (onOpenChange) {
      onOpenChange(resolvedOpen)
    }
  }

  const value = useMemo(
    () => ({ open: isOpen, setOpen }),
    [isOpen],
  )

  return (
    <CollapsibleContext.Provider value={value}>
      {asChild ? (
        children
      ) : (
        <div className={cn(className)} {...props}>
          {children}
        </div>
      )}
    </CollapsibleContext.Provider>
  )
}

export function CollapsibleTrigger({ className = '', children, onClick, ...props }) {
  const context = useContext(CollapsibleContext)

  if (!context) {
    throw new Error('CollapsibleTrigger must be used within Collapsible')
  }

  const { open, setOpen } = context

  return (
    <button
      type="button"
      aria-expanded={open}
      data-state={open ? 'open' : 'closed'}
      className={className}
      onClick={event => {
        setOpen(previousOpen => !previousOpen)
        if (onClick) {
          onClick(event)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function CollapsibleContent({ className = '', children, ...props }) {
  const context = useContext(CollapsibleContext)

  if (!context) {
    throw new Error('CollapsibleContent must be used within Collapsible')
  }

  const { open } = context

  return (
    <div
      data-state={open ? 'open' : 'closed'}
      className={cn(
        'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className,
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}