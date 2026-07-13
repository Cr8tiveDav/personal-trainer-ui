'use client'
import IntegrationsBar from '@/components/homepage/HeroBottom'
import Experience from '@/components/squeeze/us/Experience'
import Hero from '@/components/squeeze/us/Hero'
import HowItWorks from '@/components/squeeze/us/HowItWorks'
import SqueezeFooter from '@/components/squeeze/us/SqueezeFooter'
import Testimonial from '@/components/squeeze/us/Testimonial'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const SqueezePageUS = () => {
  const [scrolling, setIsScrolling] = useState<boolean>(false)

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsScrolling(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScrollEvent)
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])
  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 h-[88px] items-center flex  top-0 z-50 border-b border-gray-100 transition-all duration-300',
          scrolling
            ? 'bg-white/90  shadow-xs backdrop-blur-md'
            : 'bg-white/20 ',
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 md:gap-4"
          >
            <Image
              src="/images/ads/us/logo-icon.svg"
              alt=""
              width={55}
              height={55}
              className="shrink-0"
            />
            <span className="text-muted-foreground font-bold text-3xl md:text-4xl leading-none tracking-tight">
              FitCall
            </span>
          </Link>
        </div>
      </nav>

      <main>
        <Hero />
        <HowItWorks />
        <Testimonial />
        <Experience />
        <IntegrationsBar className="mb-20" />
        <SqueezeFooter />
      </main>
    </>
  )
}

export default SqueezePageUS
