import React from 'react'
import Image from 'next/image'

const beliefs = [
  {
    icon: '/images/about-us/heart.svg',
    title: 'Humans over algorithms',
    content: "A coach who knows you beats a feed that doesn't.",
  },
  {
    icon: '/images/about-us/crosshair.svg',
    title: 'Consistency over intensity',
    content: 'Showing up beats burning out.',
  },
  {
    icon: '/images/about-us/users.svg',
    title: 'Real accountability',
    content: "If a person is waiting, you'll show up.",
  },
  {
    icon: '/images/about-us/lightning.svg',
    title: 'Structure works',
    content: 'Plans you actually finish create real change.',
  },
]

const CoreBeliefs = () => {
  return (
    <section className="bg-gray-50 pb-14 pt-16 md:pt-24">
      <div className="container">
        <div className="flex flex-col items-center">
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-muted-foreground md:mb-16 md:text-4xl">
            What we believe
          </h2>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-sm"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primarybadge">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    sizes='true'
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
        </div>
      </div>
    </section>
  )
}

export default CoreBeliefs
