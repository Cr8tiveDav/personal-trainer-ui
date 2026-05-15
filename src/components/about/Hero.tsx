'use client'

import Image from 'next/image'
import SectionHeader from '../ui/SectionHeader'

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="md:[&_h2]:text-5xl lg:[&_p]:text-lg">
          <SectionHeader
            badge="Our story"
            title="Built for people who are tired of starting over."
            description="Apps don't fix consistency. People do. FitCall pairs you with real trainers who guide every session, live, so you actually show up."
            align="center"
            className="mx-auto max-w-3xl"
          />
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-2xl shadow-sm md:rounded-[2.5rem]">
          <Image
            src="/images/about-us/about.png"
            alt="FitCall team and mission"
            width={1200}
            height={800}
            priority
            className="h-auto w-full object-cover md:h-[500px] lg:h-[650px]"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
