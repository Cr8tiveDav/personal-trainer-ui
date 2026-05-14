'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import useVersionSync from '~/actions/useVersionSync'
import Logo from '~/components/global/main-logo'
import { cn } from '~/utils'
import { NAV_LINKS } from './links'
import MobileNav from './mobile-navbar'
import { Button } from '~/components/ui/button'

const Navbar = () => {
  const [scrolling, setIsScrolling] = useState<boolean>(false)
  const pathname = usePathname()

  const version = 'v1.0'
  useVersionSync(version)

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
        'fixed left-0 right-0 top-0 z-50 border-b border-gray-200 transition-all duration-300',
        scrolling
          ? 'bg-white/90 py-2.5 shadow-md backdrop-blur-md'
          : 'bg-transparent py-4 md:py-6'
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
                  'p-3 text-[16px] font-medium capitalize transition-all duration-300 hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.route}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center">
          <Button
            asChild
            className="hidden bg-[#0d2b45] text-white hover:bg-[#1a3a5f] md:inline-flex"
          >
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
