'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { X, Menu } from 'lucide-react'

import { NAV_LINKS } from './links'
import { Button } from '~/components/ui/button'
import Logo from '~/components/global/main-logo'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
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

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 250,
              }}
              className="fixed right-0 top-0 z-[100] flex h-screen w-[85%] max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b px-6 py-5">
                <Logo />

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-slate-100 p-2"
                >
                  <X className="h-5 w-5 text-slate-700" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 px-6 py-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.link}
                    href={link.link}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-4 text-lg font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    {link.route}
                  </Link>
                ))}
              </nav>

              <div className="border-t p-6">
                <Button
                  asChild
                  className="h-14 w-full rounded-xl bg-[#0d2b45] text-base font-semibold"
                >
                  <Link href="/waitlist" onClick={() => setOpen(false)}>
                    Join Waitlist
                  </Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
