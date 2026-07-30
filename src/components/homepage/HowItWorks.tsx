'use client'
import { Fragment, useState, useEffect, startTransition } from 'react'
import Image from 'next/image'
import SectionHeader from '../ui/SectionHeader'
import { cn } from '@/lib/utils'

/** Cyclic countdown — resets to CYCLE_SECONDS when it reaches zero */
const CYCLE_SECONDS = 3 * 24 * 60 * 60 // 3 days
const STORAGE_KEY = 'fitcall_countdown_target'

function getRemainingSeconds(): number {
  if (typeof window === 'undefined') return CYCLE_SECONDS
  const stored = sessionStorage.getItem(STORAGE_KEY)
  const target = stored ? Number(stored) : Date.now() + CYCLE_SECONDS * 1000
  if (!stored) sessionStorage.setItem(STORAGE_KEY, String(target))
  const remaining = Math.floor((target - Date.now()) / 1000)
  if (remaining <= 0) {
    const next = Date.now() + CYCLE_SECONDS * 1000
    sessionStorage.setItem(STORAGE_KEY, String(next))
    return CYCLE_SECONDS
  }
  return remaining
}

function useCountdown() {
  const [seconds, setSeconds] = useState(CYCLE_SECONDS)

  useEffect(() => {
    startTransition(() => setSeconds(getRemainingSeconds()))
    const id = setInterval(() => {
      setSeconds(getRemainingSeconds())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const days = Math.floor(seconds / 86400)
  const hrs = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return { days, hrs, mins, secs }
}

export const CountdownTimer = ({
  className,
  textCls,
}: {
  className?: string
  textCls?: string
}) => {
  const { days, hrs, mins, secs } = useCountdown()

  const units = [
    { value: days, label: 'Days' },
    { value: hrs, label: 'hrs' },
    { value: mins, label: 'mins' },
    { value: secs, label: 'secs' },
  ]

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'flex w-full max-w-xs flex-col items-center gap-4 rounded-[16px] border border-[#EBEBEB] bg-white px-8 py-6',
          className,
        )}
      >
        <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
          <Image
            src="/images/landing-page/icons/noti.png"
            alt="Notification"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className={cn('text-base text-muted-foreground', textCls)}>
            Starts in
          </span>
        </div>
        <div className="flex items-center gap-3">
          {units.map((item, i) => (
            <Fragment key={item.label}>
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'text-[24px] sm:text-[32px] font-bold leading-none text-[#1C1C1C]',
                    textCls,
                  )}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className={cn('mt-1 text-xs text-[#5C5C5C]', textCls)}>
                  {item.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span
                  className={cn(
                    'mb-4 text-2xl font-bold text-[#1C1C1C]',
                    textCls,
                  )}
                >
                  :
                </span>
              )}
            </Fragment>
          ))}
        </div>
        <p className={cn('text-center text-sm text-[#5C5C5C]', textCls)}>
          You will be reminded of your session an hour before time
        </p>
      </div>
    </div>
  )
}

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
  return (
    <section className={cn('w-full py-12 md:py-20', className)}>
      <div className="container flex flex-col">
        <SectionHeader
          badge="HOW IT WORKS"
          title="Not just another workout plan"
          align="center"
          className="max-w-3xl mx-auto mb-8 md:mb-14"
        />
        <div className="grid grid-cols-1 gap-8 px-2 lg:grid-cols-3">
          {/* Card 1 — Trainer Discovery */}
          <div className="flex flex-col">
            <div className="mb-6 h-72 md:h-80 lg:h-96 flex flex-col items-center overflow-hidden rounded-[24px] border border-[#D1D1D1] bg-[#FCFCFC] p-10">
              <div className="relative w-full flex-1 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/ads/us/trainers-card.png"
                  alt={steps[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain"
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
            <div className="mb-6 flex h-72 md:h-80 lg:h-96 flex-col items-center justify-center overflow-hidden rounded-[24px] border border-[#D1D1D1] bg-white p-6 lg:p-10">
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
            <div className="relative mb-6 h-72 md:h-80 lg:h-96 overflow-hidden rounded-[24px] border border-[#D1D1D1]">
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
