'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { X, Menu } from 'lucide-react'

import { NAV_LINKS } from './links'
import { Button } from '@/components/ui/button'
import Logo from '@/components/global/main-logo'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [prevPath, setPrevPath] = useState(pathname)

  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center p-2"
      >
        <Menu className="h-7 w-7 text-foreground" />
      </button>

      <div
        className={cn(
          'fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          'fixed right-0 top-0 z-[100] flex h-[100dvh] w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-secondary px-6 py-5">
          <div onClick={() => setOpen(false)} className="flex">
            <Logo />
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-[9999px] p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-slate-700" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-4 py-4 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              onClick={() => setOpen(false)}
              className="rounded-[12px] py-4 text-xl font-medium text-slate-900 transition hover:bg-slate-100"
            >
              {link.route}
            </Link>
          ))}
        </nav>

        <div className="border-t px-4 pt-6 pb-8 border-secondary">
          <Button
            asChild
            className="h-14 w-full rounded-[12px] bg-[#0d2b45] text-base font-semibold"
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
