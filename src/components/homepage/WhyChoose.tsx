'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import SectionHeader from '../ui/SectionHeader'
import { AnimatePresence, motion } from 'motion/react'

interface Feature {
  icon: string
  title: string
  description: string
  image: string
}

const features: Feature[] = [
  {
    icon: '/images/landing-page/icons/ve.png',
    title: 'Verified Coaches',
    description: 'All trainers are verified and experienced professionals',
    image: '/images/landing-page/phone-frame1.png',
  },
  {
    icon: '/images/landing-page/icons/pe.png',
    title: 'Personalized Coaching',
    description: 'Get customized guidance built around your goals',
    image: '/images/landing-page/phone-frame2.png',
  },
  {
    icon: '/images/landing-page/icons/flex.png',
    title: 'Flexible & Convenient',
    description: 'Choose coaches that fit your schedule and lifestyle',
    image: '/images/landing-page/phone-frame3.png',
  },
  {
    icon: '/images/landing-page/icons/las.png',
    title: 'Lasting Results',
    description: 'Build healthy habits with support and accountability',
    image: '/images/landing-page/phone-frame4.png',
  },
]

const WhyChoose = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="mt-12 w-full overflow-hidden pb-14 md:mt-24">
      <div className="container mx-auto min-h-126 max-w-4xl px-4">
        <SectionHeader
          badge="WHY CHOOSE FITCALL?"
          title="Coaching that fits your lifestyle"
          className="mb-6 md:mb-10"
          align="center"
          description="Every session has sets, reps, rest times, and a video demo. No gym floor confusion — open the app and follow."
        />
        <div className="flex h-full flex-col items-center md:gap-12 lg:flex-row lg:items-stretch">
          {/* Left Side: Phone Carousel */}
          <div className="relative flex w-full items-center justify-center overflow-hidden lg:w-1/2">
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full w-full"
                >
                  <Image
                    src={features[activeIndex].image}
                    alt={`App Interface ${activeIndex + 1}`}
                    fill
                    priority
                    sizes="true"
                    className="object-contain object-center drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Features List */}
          <div className="relative w-full lg:w-1/2 lg:pl-12">
            <div className="flex flex-col justify-between py-4">
              {features.map((feature, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="relative flex h-30.5 items-center px-4"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeLine"
                        className="absolute left-0 top-0 hidden h-full w-1 bg-primary lg:block"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <div
                      key={index}
                      className="relative flex w-xl items-start gap-4 rounded-2xl border border-[#EBEBEB] px-4 py-3 shadow-sm transition-all duration-300 md:items-center md:gap-4 md:px-5 md:py-6"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/50 bg-blue-50">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={20}
                          height={20}
                          sizes="true"
                          className="object-contain"
                        />
                      </div>

                      <div>
                        <h4 className="mb-1 text-lg font-semibold text-muted-foreground md:text-xl">
                          {feature.title}
                        </h4>
                        <p className="text-sm leading-snug text-muted">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
