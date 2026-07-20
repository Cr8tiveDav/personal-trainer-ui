import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'

export default function Features() {
  return (
    <section className="mt-0 md:mt-12 w-full scroll-mt-28 py-12 md:py-20">
      <div className="container flex flex-col">
        <SectionHeader
          badge="POWERFUL FEATURES"
          title="Everything you need in one place"
          align="center"
          className="mb-6 md:mb-10"
        />

        <div className="flex flex-col gap-8 px-2">
          {/* Card 1 - Image left, text right */}
          <div className="flex h-auto items-end overflow-hidden rounded-[8px] bg-[#F7F7F7] px-6 md:min-h-105 md:px-16 lg:px-24">
            <div className="flex h-full w-full flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
              <div className="relative w-full max-w-62.5 self-center md:max-w-87.5 md:self-end lg:max-w-95">
                <Image
                  src="/features.png"
                  alt="Trainer Discovery"
                  width={350}
                  height={350}
                  className="h-auto w-full object-contain object-bottom"
                />
              </div>

              <div className="flex max-w-137.5 w-full md:w-auto flex-col items-start justify-end pt-4 text-left md:pb-16 md:pt-0">
                <h3 className="mb-2 text-xl font-bold leading-tight text-muted-foreground md:text-3xl lg:text-4xl">
                  Trainer Discovery
                </h3>
                <ul className="space-y-2">
                  {[
                    'Browse a list of trainers',
                    'View trainer profiles',
                    'Watch a short intro video',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-lg text-muted"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 - Image right, text left */}
          <div className="flex h-auto items-end overflow-hidden rounded-[8px] bg-[#F7F7F7] px-6 md:min-h-105 md:px-16 lg:px-24">
            <div className="flex h-full w-full flex-col-reverse items-start justify-between gap-6 md:flex-row-reverse md:items-end md:gap-10">
              <div className="relative w-full max-w-62.5 self-center md:max-w-87.5 md:self-end lg:max-w-85">
                <Image
                  src="/features1.png"
                  alt="Session Booking"
                  width={300}
                  height={300}
                  className="h-auto w-full object-contain object-bottom"
                />
              </div>

              <div className="flex max-w-137.5 w-full md:w-auto flex-col items-start justify-end pt-4 text-left md:pb-16 md:pt-0">
                <h3 className="mb-2 text-xl font-bold leading-tight text-muted-foreground md:text-3xl lg:text-[44px]">
                  Book Session
                </h3>
                <ul className="space-y-2">
                  {[
                    'Select a trainer',
                    'Choose date & time',
                    'Book a free trial session',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-lg text-muted"
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
