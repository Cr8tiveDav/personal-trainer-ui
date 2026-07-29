import React from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'
import StepCard from './StepCard'
import { CountdownTimer } from '@/components/homepage/HowItWorks'

const bullets = {
  step1: [
    'Browse trainer specialties',
    'Filter by yoga, strength, cardio, mobility',
    'View ratings and client success stories',
    'Match with someone who fits your pace',
  ],
  step2: [
    'Browse trainer specialties',
    'Filter by yoga, strength, cardio, mobility',
    'Match with someone who fits your pace',
  ],
  step3: [
    'Pick available times',
    'Set weekly routines',
    'Get reminders before sessions',
    'Reschedule anytime',
  ],
  step4: [
    'Personalized consultation with a fitness expert',
    'Get answers to all your concerns',
    'Make a confident decision about your subscription',
  ],
}

const HowItWorks = () => {
  return (
    <section className="pt-8 md:pt-10">
      <div className="container flex flex-col">
        <SectionHeader
          badge="HOW IT WORKS"
          title="Not just another workout plan"
          align="center"
          className="max-w-3xl mx-auto mb-8 md:mb-16"
        />

        <div>
          {/* Step 1 */}
          <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-2 py-7.5 md:py-15">
            <div className="relative w-full min-h-[300px] md:min-h-0 md:h-auto bg-[#D4D4D433]/20 overflow-hidden rounded-[20px] border border-border">
              <Image
                src="/images/how-it-works/how-it-works1.png"
                alt="Choose your trainer"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
            <StepCard
              badge="STEP 01"
              title="Choose your trainer"
              desc="Select a trainer who aligns with your goals and motivates you every step of the way."
              bullets={bullets.step1}
            />
          </div>
          {/* Step 2 */}
          <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-2 py-7.5 md:py-15">
            <div className="relative w-full min-h-[300px] md:min-h-0 md:h-auto overflow-hidden rounded-[20px] border border-border">
              <Image
                src="/images/how-it-works/how-it-works2.png"
                alt="Request a call"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
            <StepCard
              badge="STEP 02"
              title="Request a call"
              desc="Request a call to discuss your goals, ask questions, and get tailored advice."
              bullets={bullets.step2}
            />
          </div>
          {/* Step 3 */}
          <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-2 py-7.5 md:py-15">
            <StepCard
              badge="STEP 03"
              title="Book your sessions"
              desc="Create a schedule that fits your life and helps you stay consistent.
No rigid plans. No burnout. Just consistency."
              bullets={bullets.step3}
            />
            <div className="relative w-full min-h-[300px] md:min-h-0 md:h-auto overflow-hidden rounded-[20px] border border-border">
              <Image
                src="/images/how-it-works/how-it-works3.png"
                alt="Book your sessions"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CountdownTimer
                  className="bg-black/80 border-0"
                  textCls="text-white"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-2 py-7.5 md:py-15">
            <StepCard
              badge="STEP 04"
              title="Start Session & Train Live"
              desc="At your session time, your trainer calls you. You show up, train, and stay accountable."
              bullets={bullets.step4}
            />
            <div className="relative w-full min-h-[300px] md:min-h-0 md:h-auto overflow-hidden rounded-[20px] border border-border">
              <Image
                src="/images/how-it-works/how-it-works4.png"
                alt="Start Session & Train Live"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
