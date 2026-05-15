import React from 'react'
import Image from 'next/image'

const FitnessLifestyle = () => {
  return (
    <section className="bg-subtle-bg py-2.25 md:py-16">
      <div className="container flex flex-col items-center">
        <div className="mb-[18.69px] text-center md:mb-17.25">
          <h2 className="mb-[6.5px] text-xl font-bold text-accent-foreground md:mb-6 md:text-4xl lg:text-5xl">
            Built for your fitness lifestyle
          </h2>
          <p className="whitespace-nowrap text-[10px] text-muted-foreground md:whitespace-normal md:text-xl">
            Your schedule. Your pace. Your trainer works around all of it.
          </p>
        </div>

        <div>
          <Image
            src="/images/fitness-lifestyle.png"
            alt="Your fitness lifestyle"
            width={1280}
            height={487}
            priority
            sizes="true"
            className="rounded-[97.77px] object-cover md:rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}

export default FitnessLifestyle
