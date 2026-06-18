import Image from 'next/image'
import Link from 'next/link'
import TestimonialCard from '@/components/homepage/TestimonialCard'
import FAQSection from '@/components/homepage/Faq'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'

export default function TestSqueeze2Page() {
  const differenceItems = [
    'Understands your weight loss goals',
    'Creates a plan that fits your lifestyle',
    'Checks in regularly',
    'Keeps you accountable',
    'Helps you stay consistent when motivation fades',
    'Celebrates every win along the way',
  ]
  const audienceItems = [
    'Men and women looking to lose weight sustainably',
    'Busy professionals with little time to spare',
    'People who have tried diets, workouts and fitness apps before',
    'Anyone tired of starting over every Monday',
    'Anyone ready to make this their last restart',
  ]
  const testimonials = [
    {
      quote:
        "FitCall actually fixed my laziness. My trainer literally won't let me sleep in. The accountability is exactly what I needed to finally see progress.",
      name: 'Jade M.',
      location: 'Atlanta, GA',
      image: '/images/ads/avatar-jade.png',
    },
    {
      quote:
        "6 weeks in and I've never cancelled. Having a person who actually shows up for you instead of just a generic app notification is unmatched.",
      name: 'Kyle M.',
      location: 'Manchester, UK',
      image: '/images/ads/avatar-kyle.png',
    },
  ]
  const faqs = [
    {
      value: 'item-1',
      question: "What if I'm a complete beginner?",
      answer:
        'Perfect. Every plan is built around where you are today, not where you think you should be. Your coach guides you step by step.',
    },
    {
      value: 'item-2',
      question: "What if I've failed before?",
      answer:
        'Most of our clients have. FitCall was built for people who struggle with consistency. Your coach helps make success easier and quitting harder.',
    },
    {
      value: 'item-3',
      question: "What if I can't afford a personal trainer?",
      answer:
        'FitCall makes professional coaching accessible without the high cost of traditional personal training. Your first session is completely free.',
    },
  ]

  return (
    <main className="overflow-hidden bg-white text-muted-foreground">
      <section className="relative w-full overflow-hidden pb-12 pt-10 md:pb-20 md:pt-16">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[length:40px_40px] opacity-[0.03]" />
        <div className="absolute -left-20 top-0 h-200 w-150 rounded-[9999px] bg-[#C2DCFF]/30 blur-[120px]" />
        <div className="absolute -right-20 top-0 h-200 w-150 rounded-[9999px] bg-[#F5D9C0]/30 blur-[120px]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 pt-12 text-center lg:grid-cols-2 lg:items-center lg:text-left">
            <div className="space-y-6">
              <h1 className="wrap-break-word text-4xl font-bold leading-tight tracking-tight text-muted-foreground sm:text-5xl md:text-6xl">
                STOP STARTING OVER
              </h1>
              <p className="mx-auto max-w-full wrap-break-word text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
                Because another diet isn&apos;t what you need. Support is.
              </p>
              <Button asChild className="mt-0" size="xl">
                <Link href="/lose-weight/find-my-coach">FIND MY COACH</Link>
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute inset-x-8 bottom-0 top-12 rounded-[8px] bg-primary" />
              <Image
                alt="Weight loss coaching client training with FitCall support"
                className="relative z-10 mx-auto h-auto max-h-[620px] w-full rounded-[8px] object-contain"
                height={640}
                priority
                src="/images/ads/lose-weight-hero.png"
                width={640}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              If losing weight was just about knowing what to do, you&apos;d
              already be where you want to be.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted lg:text-lg">
              <p>
                You know the foods, you know the workouts, you&apos;ve saved the
                plans, you&apos;ve promised yourself that this time will be
                different.
              </p>
              <p>
                Then, work gets busy, you miss a few days, progress slows,
                motivation disappears and before you know it, you&apos;re back
                at square one.
              </p>
              <p>
                The truth is, most people don&apos;t struggle because
                they&apos;re lazy. They struggle because doing it alone is hard
                and that&apos;s where FitCall comes in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[1.2] overflow-hidden rounded-[8px] bg-[#F7F7F7]">
            <Image
              alt="Coach supporting a client through a sustainable weight loss plan"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/ads/lose-weight-feature.png"
            />
          </div>
          <div className="space-y-6 text-center lg:text-left">
            <SectionHeader
              badge="WHY FITCALL WORKS"
              title="Most fitness apps give you workouts. FitCall gives you a real person."
              align="center"
              className="mb-3 md:mb-4 lg:items-start lg:text-left"
            />
            <p className="text-base leading-relaxed text-muted lg:text-lg">
              When you join FitCall, you&apos;re matched with a dedicated coach
              who:
            </p>
            <ul className="space-y-4 text-left">
              {differenceItems.map((item) => (
                <li
                  className="flex items-start text-sm text-muted md:text-base"
                  key={item}
                >
                  <Image
                    alt=""
                    className="mr-3 mt-0.5 shrink-0"
                    height={20}
                    src="/images/features/check.svg"
                    width={20}
                  />
                  <span className="leading-relaxed opacity-90">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-base leading-relaxed text-muted lg:text-lg">
              Real change doesn&apos;t happen from information. It happens
              through support.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-5 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              IMAGINE THIS...
            </h2>
            <div className="space-y-2 text-base leading-relaxed text-muted lg:text-lg">
              <p>
                Looking in the mirror and feeling proud of what you see, having
                the energy to keep up with your kids, feeling comfortable in
                your clothes again, taking photos without hiding behind everyone
                else or walking into a room with confidence. Not because you
                found a magic diet, but because you finally stayed consistent
                long enough to see results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              Who FitCall is for
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative hidden aspect-[1.2] overflow-hidden rounded-[8px] bg-[#F7F7F7] lg:block">
              <Image
                alt="Person running outdoors while building sustainable fitness habits"
                className="object-cover object-top"
                fill
                sizes="50vw"
                src="/images/ads/athlete_desk.jpg"
              />
            </div>
            <ul className="space-y-4">
              {audienceItems.map((item) => (
                <li
                  className="flex items-start text-sm text-muted md:text-base"
                  key={item}
                >
                  <Image
                    alt=""
                    className="mr-3 mt-0.5 shrink-0"
                    height={20}
                    src="/images/features/check.svg"
                    width={20}
                  />
                  <span className="leading-relaxed opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#F7F7F7] py-12 md:py-20">
        <div className="container relative mx-auto px-4">
          <SectionHeader
            badge="SUCCESS STORIES"
            title="See what our clients are saying:"
            align="center"
          />
          <div className="max-w-2xl mx-auto grid gap-6 lg:grid-cols-2">
            {testimonials.map((item) => (
              <TestimonialCard
                content={item.quote}
                image={item.image}
                key={item.name}
                location={item.location}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      <section className="relative min-h-[460px] overflow-hidden px-4 py-20 text-white md:px-10">
        <Image
          alt="Weight loss coaching lifestyle background"
          className="object-cover"
          fill
          sizes="100vw"
          src="/images/ads/lose-weight-lifestyle.png"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-3xl flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl lg:leading-[1.1]">
            READY TO DO THIS DIFFERENTLY?
          </h2>
          <div className="space-y-3 text-base leading-relaxed opacity-90 md:text-lg">
            <p>You&apos;ve tried doing it alone.</p>
            <p>
              Maybe what you&apos;ve been missing isn&apos;t another plan. Maybe
              you&apos;ve been missing support.
            </p>
            <p>
              One free call. One real coach. One chance to finally stop starting
              over.
            </p>
          </div>
          <Button asChild size="xl">
            <Link href="/lose-weight/find-my-coach">FIND MY COACH</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
