'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { X, Menu } from 'lucide-react'

import { isActiveLink, NAV_LINKS } from './links'
import { Button } from '@/components/ui/button'
import Logo from '@/components/global/main-logo'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [prevPath, setPrevPath] = useState(pathname)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Close the drawer whenever navigation happens.
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)

    // Move focus into the drawer for keyboard/screen-reader users.
    closeRef.current?.focus()

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    // Return focus to the trigger after the drawer closes.
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="flex items-center justify-center p-2"
      >
        <Menu className="h-7 w-7 text-foreground" aria-hidden="true" />
      </button>

      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        onClick={handleClose}
      />

      <aside
        id="mobile-nav-drawer"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        // Keep the drawer out of the tab order while it is hidden.
        inert={!open}
        className={cn(
          'fixed right-0 top-0 z-[100] flex h-[100dvh] w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-secondary px-6 py-5">
          <Logo />

          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            className="rounded-[9999px] p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-slate-700" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
          {NAV_LINKS.map((item) => {
            const isActive = isActiveLink(pathname, item.link)

            return (
              <Link
                key={item.link}
                href={item.link}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-[12px] px-4 py-4 text-xl font-medium transition hover:bg-slate-100',
                  isActive ? 'text-primary' : 'text-slate-900',
                )}
              >
                {item.route}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-secondary px-4 pb-8 pt-6">
          <Button
            asChild
            className="h-14 w-full rounded-[12px] text-base font-semibold"
          >
            <Link href="/waitlist" onClick={() => setOpen(false)}>
              Join Waitlist
            </Link>
          </Button>
        </div>
      </aside>
    </>
  )
}
