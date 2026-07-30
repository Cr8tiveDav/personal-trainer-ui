'use client'

import Logo from '@/components/global/logo'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolling(window.scrollY > 10)
    }
    handleScrollEvent() // Check initial scroll position on mount
    window.addEventListener('scroll', handleScrollEvent)
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <nav
      className={cn(
        'sticky left-0 right-0 h-[88px] items-center flex  top-0 z-50 border-b border-gray-100 transition-all duration-300',
        scrolling
          ? 'bg-white/90  shadow-xs backdrop-blur-md'
          : 'bg-white/20 ',
      )}
    >
      <div className="container mx-auto flex items-center justify-center">
        <Logo />
      </div>
    </nav>
  )
}
