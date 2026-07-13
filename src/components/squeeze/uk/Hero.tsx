import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FormBlock } from './FormBlock'

const heroImages = [
  {
    src: '/images/ads/uk/hero-1.jpg',
    alt: 'Woman training at home with a laptop coach',
    className: 'lg:h-[592px]',
  },
  {
    src: '/images/ads/uk/hero-2.jpg',
    alt: 'Woman following an online workout',
    className: 'lg:h-[498px]',
  },
  {
    src: '/images/ads/uk/hero-3.jpg',
    alt: 'Older woman stretching at home',
    className: 'lg:h-[431px]',
  },
]

export function Hero() {
  return (
    <section className="px-4 py-12 md:px-8 lg:pb-6 lg:pt-12">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="lg:max-w-[700px] xl:min-w-120 text-center lg:text-left">
            <h1 className="wrap-break-word text-4xl font-bold leading-tight tracking-tight text-muted-foreground sm:text-5xl md:text-6xl">
              Get the Support <br className="hidden sm:block" />
              You Need
            </h1>
            <p className="mt-6 lg:max-w-[672px] text-base leading-relaxed text-muted lg:text-lg">
              No judgment. No pressure. Just a real trainer helping you stay
              committed and consistent. FitCall pairs you with a real trainer
              who calls you for every session. You get real accountability and
              structured workouts. Kindly fill the form, download FitCall and
              begin your fitness journey.
            </p>
          </div>
          <FormBlock />
        </div>

        <div className="grid gap-6 grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 max-h-100 md:max-h-none ">
          {heroImages.map((image, i) => (
            <div
              key={image.src}
              className={cn(
                'relative min-h-40 md:min-h-90 overflow-hidden rounded-2xl bg-[#F7F7F7]',
                i === 0 && 'row-span-2 lg:row-span-1',
                image.className,
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
