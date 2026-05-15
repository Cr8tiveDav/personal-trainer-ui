import React from 'react'
import Image from 'next/image'
import SectionHeader from '../ui/SectionHeader'

const Features = () => {
  return (
    <section id="features" className="mt-12 w-full scroll-mt-28 pb-14 md:mt-24">
      <div className="container flex flex-col">
        <SectionHeader
          badge="POWERFUL FEATURES"
          title="Everything you need in one place"
          align="center"
          className="mb-8 md:mb-14"
        />

        <div className="flex flex-col gap-8 px-2">
          <div className="flex h-auto items-end overflow-hidden rounded-3xl bg-[#F8F9FA] px-6 md:min-h-[420px] md:px-16 lg:px-24">
            <div className="flex h-full w-full flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
              <div className="relative w-full max-w-[250px] self-start md:max-w-[350px] md:self-end lg:max-w-[420px]">
                <Image
                  src="/features.png"
                  alt="Trainer Discovery"
                  width={450}
                  height={450}
                  className="h-auto w-full object-contain object-bottom"
                />
              </div>

              <div className="flex max-w-[550px] flex-col justify-end pt-4 text-left md:pb-16 md:pt-0">
                <h3 className="mb-2 text-xl font-bold leading-tight text-muted-foreground md:text-3xl lg:text-[44px]">
                  Trainer Discovery
                </h3>

                <ul className="space-y-2">
                  {[
                    'Browse a list of trainers',
                    'View trainer profiles (bio, specialization)',
                    'Watch a short intro video',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted md:text-base lg:text-lg"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex h-auto items-end overflow-hidden rounded-3xl bg-[#F8F9FA] px-6 md:min-h-[420px] md:px-16 lg:px-24">
            <div className="flex h-full w-full flex-col-reverse items-start justify-between gap-6 md:flex-row-reverse md:items-end md:gap-10">
              <div className="relative w-full max-w-[250px] self-start md:max-w-[350px] md:self-end lg:max-w-[420px]">
                <Image
                  src="/features1.png"
                  alt="Session Booking"
                  width={450}
                  height={450}
                  className="h-auto w-full object-contain object-bottom"
                />
              </div>

              <div className="flex max-w-[550px] flex-col justify-end pt-4 text-left md:pb-16 md:pt-0">
                <h3 className="mb-2 text-xl font-bold leading-tight text-muted-foreground md:text-3xl lg:text-[44px]">
                  Session Booking
                </h3>

                <ul className="space-y-2">
                  {[
                    'Select a trainer',
                    'Choose date & time',
                    'Book a free trial session',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted md:text-base lg:text-lg"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
