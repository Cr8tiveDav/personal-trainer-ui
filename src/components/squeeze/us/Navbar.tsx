import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Logo from '@/components/global/logo'

const Navbar = () => {
  const [scrolling, setIsScrolling] = useState<boolean>(false)

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
        scrolling ? 'bg-white/90  shadow-xs backdrop-blur-md' : 'bg-white/20 ',
      )}
    >
      <div className="w-full container flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 md:gap-4"
        >
          <Logo className="text-2xl" />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
