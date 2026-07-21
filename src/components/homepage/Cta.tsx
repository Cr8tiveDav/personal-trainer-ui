'use client'

import { cn } from '@/lib/utils'
import FitcallDownload from './FitcallDownload'


const CTASection = ({ className }: { className?: string }) => {
  return (
    <section className={cn('bg-white py-20', className)}>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[8px] bg-linear-to-br from-primary via-[#063660] to-[#0C6FC6] px-6 py-16 text-center text-white md:py-24">
          <div className="relative z-10 mx-auto w-full max-w-2xl">
            <h2 className="text-2xl font-bold leading-[1.1] tracking-tight md:text-4xl">
              Stop skipping workouts. Start showing up.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-blue-100 md:text-lg">
              Your trainer will show up. So should you. Book your free session
              and feel the difference one phone call makes.
            </p>

            <FitcallDownload />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
