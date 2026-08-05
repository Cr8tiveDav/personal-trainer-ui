'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '@/components/global/main-logo'
import { cn } from '@/lib/utils'
import { isActiveLink, NAV_LINKS } from './links'
import MobileNav from './mobile-navbar'
import { Button } from '@/components/ui/button'

const desktopLinks = NAV_LINKS.filter((item) => !item.hideOnDesktop)

const Navbar = () => {
  const [scrolling, setIsScrolling] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolling(window.scrollY > 10)
    }
    handleScrollEvent() // Check initial scroll position on mount
    window.addEventListener('scroll', handleScrollEvent, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 flex h-[88px] items-center border-b border-gray-100 transition-all duration-300',
        scrolling ? 'bg-white/90 shadow-xs backdrop-blur-md' : 'bg-white/20',
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-x-2 md:flex lg:gap-x-4"
        >
          {desktopLinks.map((item) => {
            const isActive = isActiveLink(pathname, item.link)

            return (
              <Link
                key={item.link}
                href={item.link}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative py-3 text-[16px] font-medium capitalize transition-all duration-300 hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {item.route}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-left-2 duration-300" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center">
          <Button asChild size="lg" className="hidden md:inline-flex">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
