import Image from 'next/image'
import Link from 'next/link'
import TestimonialCard from '@/components/homepage/TestimonialCard'
import FAQSection from '@/components/homepage/Faq'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'

export default function TestSqueeze2Page() {
  const differenceItems = [
    'Understands your goals',
    'Builds a realistic plan',
    'Keeps you accountable',
    'Helps you stay on track',
    'Celebrates your wins',
  ]
  const audienceItems = [
    'Busy professionals',
    'Men and women 25+',
    'People who have tried before',
    'People who are tired of starting over',
    'Anyone ready for sustainable change',
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
        'Every session is tailored to where you are right now — not where you think you should be. Your trainer builds up with you.',
    },
    {
      value: 'item-2',
      question: "What if I've failed at this before?",
      answer:
        "That's exactly who FitCall was built for. The trainer's job is to make failure harder, not blame you for it.",
    },
    {
      value: 'item-3',
      question: "What if I can't afford a personal trainer?",
      answer:
        'FitCall makes professional training accessible. Your first session is free. Paid plans are priced for everyday people — not gym memberships with hidden fees.',
    },
  ]

  return (
    <main
      className="fitcall-figma-test-screen overflow-hidden bg-white text-muted-foreground"
      data-figma-id="test-squeeze-2"
    >
      <style>
        {`body:has(.fitcall-figma-test-screen) nav,body:has(.fitcall-figma-test-screen) footer,body:has(.fitcall-figma-test-screen) [role="button"].fixed{display:none!important}`}
      </style>

      <section className="relative w-full overflow-hidden pb-12 pt-10 md:pb-20 md:pt-16">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[length:40px_40px] opacity-[0.03]" />
        <div className="absolute -left-20 top-0 h-200 w-150 rounded-[9999px] bg-[#C2DCFF]/30 blur-[120px]" />
        <div className="absolute -right-20 top-0 h-200 w-150 rounded-[9999px] bg-[#F5D9C0]/30 blur-[120px]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 pt-12 text-center lg:grid-cols-2 lg:items-center lg:text-left">
            <div className="space-y-6">
              <h1 className="wrap-break-word text-4xl font-bold leading-tight tracking-tight text-muted-foreground sm:text-5xl md:text-6xl">
                Lose Weight Without Starting Over Again.
              </h1>
              <p className="mx-auto max-w-full wrap-break-word text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
                Get matched with a coach who helps you stay accountable, stay
                consistent, and finally build habits that last.
              </p>
              <Button asChild className="mt-0" size="xl">
                <Link href="/lose-weight/find-my-coach">START MY JOURNEY</Link>
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute inset-x-8 bottom-0 top-12 rounded-[8px] bg-primary" />
              <Image
                alt=""
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
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Because another diet isn&apos;t the answer. Support is.
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              The real reason most people struggle
            </h2>
            <div className="text-base leading-relaxed text-muted lg:text-lg">
              <p>
                It&apos;s not because they&apos;re lazy or because they
                don&apos;t care. It&apos;s because staying consistent alone is
                hard.
              </p>
              <p>
                Motivation disappears, life gets busy, progress slows and people
                quit.
              </p>
              <p>That&apos;s where Fitcall comes in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[1.2] overflow-hidden rounded-[8px] bg-[#F7F7F7]">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/ads/lose-weight-feature.png"
            />
          </div>
          <div className="space-y-6 text-center lg:text-left">
            <SectionHeader
              badge="WHAT MAKES FITCALL DIFFERENT"
              title="Most fitness apps give you information but Fitcall gives you support."
              align="left"
              className="mb-0"
            />
            <p className="text-base leading-relaxed text-muted lg:text-lg">
              You&apos;ll be matched with a coach who:
            </p>
            <ul className="space-y-4 text-left">
              {differenceItems.map((item, index) => (
                <li
                  className="flex items-start text-sm text-muted md:text-base"
                  key={item}
                >
                  <Image
                    alt={`check ${index + 1}`}
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

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-5 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              Real change takes consistency
            </h2>
            <div className="space-y-2 text-base leading-relaxed text-muted lg:text-lg">
              <p>
                Imagine feeling confident in photos, having more energy, feeling
                comfortable in your clothes or walking into a room feeling good
                about yourself again.
              </p>
              <p>
                That starts with consistency and consistency starts with
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              Who this is for
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative hidden aspect-[1.2] overflow-hidden rounded-[8px] bg-[#F7F7F7] lg:block">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="50vw"
                src="/images/ads/lose-weight-lifestyle.png"
              />
            </div>
            <ul className="space-y-4">
              {audienceItems.map((item, index) => (
                <li
                  className="flex items-start text-sm text-muted md:text-base"
                  key={item}
                >
                  <Image
                    alt={`check ${index + 1}`}
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
          alt=""
          className="object-cover"
          fill
          sizes="100vw"
          src="/images/ads/lose-weight-lifestyle.png"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-3xl flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl lg:leading-[1.1]">
            You&apos;ve waited long enough.
          </h2>
          <p className="text-base leading-relaxed opacity-90 md:text-lg">
            Let&apos;s make this the time it finally sticks.
          </p>
          <Button asChild size="xl">
            <Link href="/lose-weight/find-my-coach">FIND MY COACH</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
