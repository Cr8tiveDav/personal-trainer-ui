import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Jade M.',
    country: 'Atlanta, GA',
    review:
      'As a busy mother of two, I always felt guilty spending time on myself. My trainer helped me realize that taking care of my health benefits my entire family. The flexibility of FitCall made it easy to fit workouts around my schedule.',
    avatar: '/images/ads/avatar-jade.png',
  },
  {
    name: 'Callum B.',
    country: 'London, UK',
    review:
      "I've spent years starting and stopping fitness programs. I'd be motivated for a week, then life would get in the way and I'd quit. Joining FitCall changed that completely.",
    avatar: '/images/ads/avatar-callum.png',
  },
  {
    name: 'Sophie Dubois',
    country: 'Atlanta, GA',
    review:
      "The biggest challenge for me wasn't knowing what exercises to do; it was staying motivated. My trainer on FitCall became my biggest supporter and toughest accountability partner at the same time.",
    avatar: '/images/ads/us/sophie.svg',
  },
  {
    name: 'Kyle A.',
    country: 'Manchester, UK',
    review:
      "I've tried countless fitness apps, but most of them felt like I was doing everything alone. FitCall was different because there was a real person invested in my success. Having that human connection made all the difference.",
    avatar: '/images/ads/avatar-kyle.png',
  },
]

export function TestimonialsSection() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-primarybadge px-3 py-1 text-xs font-semibold text-primary">
            OUR TESTIMONIAL
          </span>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              What people are saying
            </h2>
            <p className="text-base leading-relaxed text-muted lg:text-lg">
              Real reviews from people having real lifestyle changes
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-6 flex-col md:flex-row md:flex-wrap md:justify-center items-center lg:items-stretch pb-4">
          {testimonials.map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.country}`}
              className="flex min-h-[300px] max-w-100 min-w-75 shrink-0 flex-col gap-4 justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs flex-1"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="relative flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      src="/images/golden-star.svg"
                      alt=""
                      width={16}
                      height={16}
                      key={index}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  &quot;{testimonial.review}&quot;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-semibold leading-tight text-muted-foreground md:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {testimonial.country}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
