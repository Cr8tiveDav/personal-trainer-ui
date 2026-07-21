import Image from 'next/image'
import React from 'react'
import WaitlistSection from './WaitlistSection'

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-[122px] md:pt-[154px]">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8 mb-6">
          <div className="flex flex-1 flex-col overflow-hidden">
            <h2 className="max-w-3xl text-4xl mb-4 font-bold leading-12 md:leading-tight xl:leading-16 text-muted-foreground md:text-3xl xl:text-5xl">
              Transform Your Fitness Life with{' '}
              <span className="text-primary">FitCall</span>
            </h2>
            <p className="text-muted text-base mb-4 md:text-lg xl:text-2xl tracking-wide leading-6 xl:leading-7">
              You already know fitness matters. The challenge is making it a
              habit. With FitCall, you&apos;ll have a professional trainer
              guiding your journey, and helping you stay on track even when life
              gets busy. Kindly fill the form, download FitCall and begin your
              fitness journey.
            </p>
            <div className="hidden md:flex items-center gap-4 mt-4 min-w-0">
              <Image
                src="/images/ads/us/hero-2.png"
                alt="Squeeze Page Image 2"
                width={200}
                height={399}
                priority
                loading="eager"
                className="flex-1 min-w-0 h-[210px] md:h-[220px] xl:h-[399px] rounded-[16px] object-cover"
              />
              <Image
                src="/images/ads/us/hero-3.png"
                alt="Squeeze Page Image 3"
                width={200}
                height={399}
                priority
                loading="eager"
                className="flex-1 min-w-0 h-[210px] md:h-[220px] xl:h-[399px] rounded-[16px] object-cover"
              />
            </div>
          </div>
          <div className="relative h-[305px] md:h-auto md:flex-1 bg-slate-100 rounded-[24px]">
            <Image
              src="/images/ads/us/hero-1.png"
              alt="Squeeze Page Hero"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              loading="eager"
              className="rounded-[24px] object-cover"
            />
          </div>
        </div>

        {/* Mobile-only bottom images — shown below the stacked hero */}
        <div className="md:hidden flex items-center gap-4 mb-6 overflow-hidden">
          <div className="flex-1 min-w-0">
            <Image
              src="/images/ads/us/hero-2.png"
              alt="Squeeze Page Image 2"
              width={200}
              height={399}
              priority
              loading="eager"
              className="w-full h-[210px] rounded-[24px] object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Image
              src="/images/ads/us/hero-3.png"
              alt="Squeeze Page Image 3"
              width={200}
              height={399}
              priority
              loading="eager"
              className="w-full h-[210px] rounded-[24px] object-cover"
            />
          </div>
        </div>

        {/* Tackle Fitness Challenges */}
        <WaitlistSection
          text="When challenges arise, it's easy to lose momentum. With
              FitCall, you'll have a professional trainer by your side,
              helping you overcome obstacles, stay motivated, and keep making
              progress no matter what life throws your way. Kindly fill the
              form, download FitCall and begin your fitness journey."
        >
          <h2 className="text-3xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] lg:text-4xl xl:text-[64px]">
            Never Tackle Your <br className="hidden md:block" />
            Fitness Journey <br className="hidden md:block" />
            Alone
          </h2>
        </WaitlistSection>
      </div>
    </section>
  )
}

export default Hero
