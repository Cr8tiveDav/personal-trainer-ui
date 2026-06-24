import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'
import React, { useState } from 'react'
import WaitlistSection from './WaitlistSection'

const categories = [
  { label: 'Yoga', image: '/images/ads/us/yoga.svg' },
  { label: 'Mobility', image: '/images/ads/us/mobility.svg' },
  { label: 'Cardio', image: '/images/ads/us/cardio.svg' },
  { label: 'Endurance', image: '/images/ads/us/endurance.svg' },
  { label: 'Strength', image: '/images/ads/us/strength.svg' },
]

const steps = [
  {
    id: 'STEP 01',
    title: 'Choose your trainer',
    desc: 'Get paired with a trainer who keeps you accountable even on the days you don’t feel like showing up.',
  },
  {
    id: 'STEP 02',
    title: 'Book Your Sessions',
    desc: 'Create a schedule that fits your life and helps you stay consistent without burnout.',
  },
  {
    id: 'STEP 03',
    title: 'Get a Call & Train Live',
    desc: 'Train live with expert guidance, stay disciplined, and feel the confidence that comes from real progress.',
  },
]

const HowItWorks = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0)
  return (
    <section className="w-full py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeader
          badge="HOW IT WORKS"
          title="Not another workout plan"
          align="center"
          className="max-w-3xl mx-auto mb-8 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 — Trainer Discovery */}
          <div className="flex flex-col">
            <div className="mb-6 flex h-72 md:w-[426px] md:h-80 lg:h-96 flex-col overflow-hidden rounded-[24px] border border-[#D1D1D1] bg-[#FCFCFC] p-10">
              {/* Circular image categories */}
              <div className="hide_scrollbar mb-4 flex justify-between gap-3 overflow-x-auto">
                {categories.map((cat, i) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(i)}
                    className="flex shrink-0 flex-col items-center gap-1"
                  >
                    <div
                      className={`relative h-10 w-10 overflow-hidden rounded-[9999px] border-2 transition-all ${
                        activeCategory === i
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span
                      className={`text-[9.28px] font-medium ${
                        activeCategory === i ? 'text-primary' : 'text-[#5C5C5C]'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative w-full flex-1 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/ads/us/trainers-card.png"
                  alt={steps[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-left-top"
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="mb-3 rounded-[9999px] bg-primarybadge px-3 py-1 text-[12px] font-bold text-primary">
                STEP 01
              </span>
              <h3 className="mb-2 text-xl font-bold text-muted-foreground md:text-2xl">
                {steps[0].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {steps[0].desc}
              </p>
            </div>
          </div>

          {/* Card 2 — Book Sessions */}
          <div className="flex flex-col">
            <div className="mb-6 flex h-72 md:w-[426px] md:h-80 lg:h-96 flex-col items-center justify-center overflow-hidden rounded-[24px] border border-[#D1D1D1] bg-white p-6 lg:p-10">
              <div className="flex w-full flex-col items-center rounded-2xl bg-white py-4 px-6 border border-[#EBEBEB]">
                <div className="flex items-center gap-2 mb-4 text-sm text-[#5C5C5C]">
                  <Image
                    src="/images/landing-page/icons/noti.png"
                    alt="Notification"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="text-base text-muted-foreground">
                    Starts in
                  </span>
                </div>

                <div className="mb-4 flex items-end gap-5.5">
                  <div className="flex flex-col items-center">
                    <span className="text-[32px] font-bold">2</span>
                    <span className="text-xs md:text-sm text-[#5C5C5C] mt-0.5">
                      Days
                    </span>
                  </div>
                  <span className="mb-4 text-[32px] font-bold">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[32px] font-bold">14</span>
                    <span className="text-xs md:text-sm text-[#5C5C5C] mt-0.5">
                      hrs
                    </span>
                  </div>
                  <span className="mb-4 text-[32px] font-bold">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[32px] font-bold">22</span>
                    <span className="text-xs md:text-sm text-[#5C5C5C] mt-0.5">
                      mins
                    </span>
                  </div>
                </div>

                <p className="text-center text-[11px] leading-relaxed text-[#5C5C5C] md:text-[13px]">
                  You will be reminded of your session an hour before time
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="mb-3 rounded-[9999px] bg-primarybadge px-3 py-1 text-[12px] font-bold text-primary">
                STEP 02
              </span>
              <h3 className="mb-2 text-xl font-bold text-muted-foreground md:text-2xl">
                {steps[1].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {steps[1].desc}
              </p>
            </div>
          </div>

          {/* Card 3 — Train Live */}
          <div className="flex flex-col">
            <div className="relative mb-6 flex h-72 md:w-[426px] md:h-80 lg:h-96 w-full flex-col overflow-hidden rounded-[24px] border border-[#D1D1D1]">
              <Image
                src="/images/ads/us/lady-step3.png"
                alt={steps[2].title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="mb-3 rounded-[9999px] bg-primarybadge px-3 py-1 text-[12px] font-bold text-primary">
                STEP 03
              </span>
              <h3 className="mb-2 text-xl font-bold text-muted-foreground md:text-2xl">
                {steps[2].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {steps[2].desc}
              </p>
            </div>
          </div>
        </div>

        <WaitlistSection text="Motivation comes and goes. Accountability is what creates lasting change. FitCall pairs you with experienced trainers who help you stay committed, focused, and consistent until your goals become reality. Kindly fill the form, download FitCall and begin your fitness journey.">
          <h2 className="text-3xl md:text-4xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] md:text-[64px]">
            When Motivation <br className="hidden md:block" />
            Quits, Your Trainer <br className="hidden md:block" />
            Won&apos;t
          </h2>
        </WaitlistSection>
      </div>
    </section>
  )
}

export default HowItWorks
