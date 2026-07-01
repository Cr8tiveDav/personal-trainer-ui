import { cn } from '@/lib/utils'
import Image from 'next/image'

const steps = [
  {
    title: 'Choose Your Trainer',
    copy: "Get paired with a trainer who keeps you accountable even on the days you don't feel like showing up.",
    image: '/images/ads/uk/how-it-works-1.webp',
  },
  {
    title: 'Booking your Sessions',
    copy: 'Create a schedule that fits your life and helps you stay consistent without burnout.',
    image: '/images/ads/uk/how-it-works-2.png',
  },
  {
    title: 'Get a Call & Train Live',
    copy: 'Train live with expert guidance, stay disciplined, and feel the confidence that comes from real progress.',
    image: '/images/ads/uk/how-it-works-3.jpg',
  },
]

export function HowItWorksSection() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="mx-auto max-w-[712px] text-center">
          <span className="rounded-full bg-primarybadge px-3 py-1 text-xs font-semibold text-primary">
            HOW IT WORKS
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
            Not just another workout plan
          </h2>
        </div>

        <div className="mt-6 grid gap-6 gap-y-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="flex min-h-[300px] md:min-h-100 space-y-6 flex-col items-center rounded-[8px] lg:min-h-[420px]"
            >
              <div
                className={cn(
                  'w-full border self-center border-gray-100 bg-white flex-1 overflow-hidden rounded-[8px]',
                  index !== 2 && 'md:py-8 px-10',
                )}
              >
                <div className="relative size-full">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={cn(
                      index === 2 ? 'object-cover' : 'object-contain',
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="mb-3 rounded-full bg-primarybadge px-3 py-1 text-xs font-bold text-primary">
                  STEP 0{index + 1}
                </span>
                <h3 className="mb-2 text-xl font-bold text-muted-foreground md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
