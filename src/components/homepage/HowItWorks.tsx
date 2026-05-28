'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import SectionHeader from '../ui/SectionHeader'
import { cn } from '@/lib/utils'

const CountdownTimer = () => {
  const [time, setTime] = useState({ days: 2, hrs: 14, mins: 22 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hrs, mins } = prev;
        mins--;
        if (mins < 0) { mins = 59; hrs--; }
        if (hrs < 0) { hrs = 23; days--; }
        if (days < 0) { days = 0; hrs = 0; mins = 0; }
        return { days, hrs, mins };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex h-full flex-col items-center justify-center gap-4'>
      <div className='flex w-full max-w-xs flex-col items-center gap-4 rounded-[16px] border border-[#EBEBEB] bg-white px-8 py-6 shadow-sm'>
        <div className='flex items-center gap-2 text-sm text-[#5C5C5C]'>
          <Image
            src='/images/landing-page/icons/noti.png'
            alt='Notification'
            width={20}
            height={20}
            className='object-contain'
          />
          <span>Starts in</span>
        </div>
        <div className='flex items-center gap-3'>
          {[
            { value: time.days, label: 'Days' },
            { value: time.hrs, label: 'hrs' },
            { value: time.mins, label: 'mins' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <div className='flex flex-col items-center'>
                <span className='text-4xl font-bold leading-none text-[#1C1C1C]'>
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className='mt-1 text-xs text-[#5C5C5C]'>{item.label}</span>
              </div>
              {i < 2 && (
                <span className='mb-4 text-2xl font-bold text-[#1C1C1C]'>:</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className='text-center text-sm text-[#5C5C5C]'>
          You will be reminded of your session an hour before time
        </p>
      </div>
    </div>
  )
}

const categories = [
  { label: 'All', image: '/images/landing-page/tra1.jpg' },
  { label: 'Weight Loss', image: '/images/landing-page/tra2.png' },
  { label: 'Strength', image: '/images/landing-page/tra3.jpg' },
  { label: 'Yoga', image: '/images/landing-page/tra4.jpg' },
  { label: 'Cardio', image: '/images/landing-page/tra5.jpg' },
  { label: 'Mobility', image: '/images/landing-page/tra6.jpg' },
   { label: 'Fat loss', image: '/images/landing-page/tra3.jpg' },
  { label: 'Mind', image: '/images/landing-page/tra4.jpg' },
  { label: 'Body', image: '/images/landing-page/tra5.jpg' },
  { label: 'HIIT', image: '/images/landing-page/tra6.jpg' },
]

const steps = [
  {
    id: 'STEP 01',
    title: 'Pick a trainer',
    desc: 'Pick a trainer that fits your goals and schedule.',
  },
  {
    id: 'STEP 02',
    title: 'Book Your Sessions',
    desc: "Set your workout times and just like appointments you can't ignore",
  },
  {
    id: 'STEP 03',
    title: 'Get a Call & Train Live',
    desc: 'At your session time, your trainer calls you. You show up, train, and stay accountable.',
  },
]

interface HowItWorksProps {
  className?: string
}

const HowItWorks = ({ className }: HowItWorksProps) => {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className={cn("w-full py-20", className)}>
      <div className="container flex flex-col">
        <SectionHeader
          badge='HOW IT WORKS'
          title='Not another workout plan, a system built for you'
          align='center'
          className='max-w-3xl mx-auto mb-8 md:mb-14'
        />
        <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-3">

          {/* Card 1 — Trainer Discovery */}
          <div className="flex flex-col">
            <div className="mb-6 flex h-72 md:h-80 lg:h-96 flex-col overflow-hidden rounded-[12px] border border-[#EBEBEB] bg-[#F7F7F7] p-10">
              {/* Circular image categories */}
              <div className="hide_scrollbar mb-4 flex gap-3 overflow-x-auto">
                {categories.map((cat, i) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(i)}
                    className="flex shrink-0 flex-col items-center gap-1"
                  >
                    <div className={`relative h-10 w-10 overflow-hidden rounded-[9999px] border-2 transition-all ${
                      activeCategory === i ? 'border-primary' : 'border-transparent'
                    }`}>
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span className={`text-[9px] font-medium ${
                      activeCategory === i ? 'text-primary' : 'text-[#5C5C5C]'
                    }`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="relative w-full flex-1 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/landing-page/ste1.png"
                  alt={steps[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
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

          {/* Card 2 — Countdown Timer */}
          <div className="flex flex-col">
            <div className="mb-6 flex h-72 md:h-80 lg:h-96 flex-col items-center justify-center rounded-[12px] border border-[#EBEBEB] bg-[#F7F7F7] p-4">
              <CountdownTimer />
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

          {/* Card 3 — Photo */}
          <div className="flex flex-col">
            <div className="relative mb-6 h-72 md:h-80 lg:h-96 overflow-hidden rounded-[12px] border border-[#EBEBEB]">
              <Image
                src="/images/landing-page/step-3.png"
                alt={steps[2].title}
                fill
                sizes="true"
                className="object-cover"
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
      </div>
    </section>
  )
}

export default HowItWorks
