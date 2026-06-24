import Image from 'next/image'
import React from 'react'
import { WaitlistForm } from '../WaitListForm'
import WaitlistSection from './WaitlistSection'

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-[122px] md:pt-[154px]">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col gap-6 sm:flex-row mb-6">
          <div className="flex flex-1 flex-col">
            <h2 className="max-w-3xl text-4xl mb-4 font-bold leading-12 md:leading-16 text-muted-foreground md:text-5xl">
              Transform Your Fitness Life with{' '}
              <span className="text-primary">FitCall</span>
            </h2>
            <p className="text-muted text-base mb-4 md:text-2xl tracking-wide leading-6 md:leading-7">
              You already know fitness matters. The challenge is making it a
              habit. With FitCall, you&apos;ll have a professional trainer
              guiding your journey, and helping you stay on track even when life
              gets busy. Kindly fill the form, download FitCall and begin your
              fitness journey.
            </p>
            <div className="hidden md:flex items-center gap-4 mt-auto">
              <Image
                src="/images/ads/us/hero-2.png"
                alt="Squeeze Page Image 2"
                width={200}
                height={399}
                priority
                loading="eager"
                className="flex-1 h-[210px] md:h-[399px] rounded-[16px] object-cover"
              />
              <Image
                src="/images/ads/us/hero-3.png"
                alt="Squeeze Page Image 3"
                width={200}
                height={399}
                priority
                loading="eager"
                className="flex-1 h-[210px] md:h-[399px] rounded-[16px] object-cover"
              />
            </div>
          </div>
          <div className="relative flex-1 h-[751px] w-full">
            <Image
              src="/images/ads/us/hero-1.png"
              alt="Squeeze Page Hero"
              width={648}
              height={751}
              priority
              loading="eager"
              className="h-[305px] md:h-[751px] rounded-[24px] object-cover"
            />
          </div>
          <div className="md:hidden flex items-center gap-4 mt-auto">
            <Image
              src="/images/ads/us/hero-2.png"
              alt="Squeeze Page Image 2"
              width={200}
              height={399}
              priority
              loading="eager"
              className="flex-1 h-[210px] md:h-[399px] rounded-[24px] object-cover"
            />
            <Image
              src="/images/ads/us/hero-3.png"
              alt="Squeeze Page Image 3"
              width={200}
              height={399}
              priority
              loading="eager"
              className="flex-1 h-[210px] md:h-[399px] rounded-[24px] object-cover"
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
          <h2 className="text-3xl md:text-4xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] md:text-[64px]">
            Never Tackle Your <br className="hidden md:block" />
            Fitness Journey <br className="hidden md:block" />
            Alone
          </h2>
        </WaitlistSection>
        {/* <div className="flex flex-col md:flex-row justify-between gap-4 mt-6 mb-20">
          <div className="w-full md:max-w-[701px]">
            <h2 className="text-3xl md:text-4xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] md:text-[64px]">
              Never Tackle Your <br className="hidden md:block" />
              Fitness Journey <br className="hidden md:block" />
              Alone
            </h2>
            <p className="text-muted text-base md:text-[22px] md:tracking-wide leading-6 md:leading-7 md:pr-6">
              When challenges arise, it&apos;s easy to lose momentum. With
              FitCall, you&apos;ll have a professional trainer by your side,
              helping you overcome obstacles, stay motivated, and keep making
              progress no matter what life throws your way. Kindly fill the
              form, download FitCall and begin your fitness journey.
            </p>
          </div>
          <div className="w-full md:w-[600px] mt-12 flex flex-col items-end">
            <WaitlistForm ctaLabel="Submit" />
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Hero
