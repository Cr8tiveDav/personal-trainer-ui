import { cn } from '@/utils'
import Image from 'next/image'
import React from 'react'

const SqueezeFooter = ({ className }: { className?: string }) => {
  return (
    <section className={cn('relative h-[733px] w-full', className)}>
      <Image
        src="/images/squeeze-footer-stretch.jpg"
        alt="Squeeze Footer"
        fill
        sizes="true"
        priority
        className="object-cover md:object-center"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 px-5 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:max-w-none md:text-5xl">
          Find your trainer today
        </h2>
        <p className="max-w-lg text-base md:text-lg text-white leading-tight md:max-w-2xl">
          Sign up for consistent training with our expert FitCall{' '}
          <br className="hidden md:block" /> trainers in your corner.
        </p>
      </div>
    </section>
  )
}

export default SqueezeFooter
