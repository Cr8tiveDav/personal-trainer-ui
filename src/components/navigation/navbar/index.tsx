'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '@/components/global/main-logo'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from './links'
import MobileNav from './mobile-navbar'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const [scrolling, setIsScrolling] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolling(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScrollEvent)
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 h-[88px] items-center flex  top-0 z-50 border-b border-gray-100 transition-all duration-300',
        scrolling
          ? 'bg-white/90  shadow-xs backdrop-blur-md'
          : 'bg-white/20 '
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden items-center justify-center gap-x-2 md:flex lg:gap-x-4">
          {NAV_LINKS.map((item, index) => {
            const isActive = pathname === item.link

            return (
              <Link
                key={index}
                href={item.link}
                className={cn(
                  'relative p-3 text-[16px] font-medium capitalize transition-all duration-300 hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.route}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary animate-in fade-in slide-in-from-left-2 duration-300" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center">
          <Button asChild size='lg' className="hidden md:inline-flex">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
          <div className="md:hidden">
            <MobileNav key={pathname} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
