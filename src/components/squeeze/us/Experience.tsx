import SectionHeader from '@/components/ui/SectionHeader'
import React from 'react'
import Image from 'next/image'
import WaitlistSection from './WaitlistSection'
import WhatWeBelieve from '@/components/features/WhatWeBelieve'

const experience = [
  {
    icon: '/images/features/magnifying-glass.svg',
    title: 'Discover trainers',
    content: 'Browse certified trainers by goal, style, and schedule.',
  },
  {
    icon: '/images/features/calendar-check.svg',
    title: 'Book a session',
    content: 'Pick a time that fits you, morning, afternoon, or evening.',
  },
  {
    icon: '/images/features/phone-call.svg',
    title: 'Join the live call',
    content: 'Train one-on-one over Google  Meet, Messenger, WhatsApp or Zoom.',
  },
  {
    icon: '/images/features/trend-up.svg',
    title: 'Track your progress',
    content: 'See your streaks, sessions, and milestones grow.',
  },
]

const Experience = () => {
  return (
    <section className="w-full py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeader
          badge="Experience"
          title="Simple enough to use every day."
          align="center"
          className="max-w-3xl mx-auto mb-1 md:mb-4"
        />
        <p className="text-base font-medium text-muted text-center mb-4">
          Four steps from couch to consistent — designed to feel calm, never
          overwhelming.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 gap-4">
          {experience.map((item, index) => (
            <div
              key={index}
              className="rounded-[16px] border border-[#EBEBEB] bg-white p-6"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primarybadge">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  sizes="24px"
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-muted-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <WaitlistSection text="Everyone has days when they want to quit. That's why FitCall connects you with trainers who support, challenge, and encourage you to stay committed to your goals, even when life gets busy. Kindly fill the form, download FitCall and begin your fitness journey.">
          <h2 className="text-3xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] lg:text-4xl xl:text-[64px]">
            Fitness Is Easier With <br className="hidden md:block" />
            Someone In Your <br className="hidden md:block" />
            Corner
          </h2>
        </WaitlistSection>

        <WhatWeBelieve className="py-0" containerClassName="min-h-0 py-0" />

        <WaitlistSection text="Workout plans are everywhere. What most people lack is someone to keep them consistent. FitCall bridges that gap by connecting you with dedicated trainers who help you stay focused. Kindly fill the form, download FitCall and begin your fitness journey.">
          <h2 className="text-3xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] lg:text-4xl xl:text-[64px]">
            A Real Trainer. Real <br className="hidden md:block" />
            Accountability. Real <br className="hidden md:block" />
            Results.
          </h2>
        </WaitlistSection>

        {/* Respect your Lifestyle */}
        <SectionHeader
          badge="Experience"
          title="A fitness routine that respects your lifestyle"
          align="center"
          className="max-w-3xl mx-auto mb-1 md:mb-4"
        />
        <p className="text-base font-medium text-muted text-center mb-4">
          Match with world-class trainers who truly understand who and{' '}
          <br className="hidden md:block" /> where you are.
        </p>

        <WaitlistSection text="Small actions repeated consistently create extraordinary results. FitCall helps you stay committed to those actions through personalized coaching, regular check-ins, and accountability that keeps you moving forward. Kindly fill the form, download FitCall and begin your fitness journey.">
          <h2 className="text-3xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] lg:text-4xl xl:text-[64px]">
            Your Future Self Will <br className="hidden md:block" />
            Thank You.
          </h2>
        </WaitlistSection>
      </div>
    </section>
  )
}

export default Experience
