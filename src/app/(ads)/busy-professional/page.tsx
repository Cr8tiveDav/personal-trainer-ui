import {
  ClipboardList,
  Dumbbell,
  PhoneCall,
  UserRoundCheck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import TestimonialCard from '@/components/homepage/TestimonialCard'
import FAQSection from '@/components/homepage/Faq'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'

const steps = [
  {
    title: 'Tell us about your goals.',
    body: 'Share what you want to change, where you are starting from, and what your schedule actually looks like.',
    icon: ClipboardList,
  },
  {
    title: 'Get matched with a coach.',
    body: 'FitCall connects you with a real fitness coach who works with your schedule, your goals, and your lifestyle.',
    icon: UserRoundCheck,
  },
  {
    title: 'Receive your personalized fitness plan.',
    body: 'No generic plans. No guessing. No going it alone.',
    icon: Dumbbell,
  },
  {
    title: 'Stay accountable with regular check-ins and support.',
    body: 'Just expert support and accountability every step of the way.',
    icon: PhoneCall,
  },
]
const reasons = [
  'Personalized coaching',
  'Flexible around busy schedules',
  'Real accountability',
  'Expert guidance',
  'Affordable compared to traditional personal training',
  'Support that fits real life',
]
const testimonials = [
  {
    quote:
      "I'd been 'starting Monday' for 3 years. With FitCall, my trainer calls me every Tuesday and Thursday at 7am. I haven't slept through a single session since.",
    name: 'Callum B.',
    location: 'London, UK',
    image: '/images/ads/avatar-callum.png',
  },
  {
    quote:
      "My trainer knows my name, my goals, and all my usual excuses. I can't hide anymore. It's the first time I've actually stuck to a routine.",
    name: 'Floyd N.',
    location: 'Atlanta, GA',
    image: '/images/ads/avatar-jade.png',
  },
]
const faqs = [
  {
    value: 'item-1',
    question: 'Do I need a gym?',
    answer:
      'No. Your coach can build a plan around your available equipment and lifestyle.',
  },
  {
    value: 'item-2',
    question: 'How often will my coach check in?',
    answer:
      'Your coach provides regular accountability and support throughout your journey.',
  },
  {
    value: 'item-3',
    question: 'Is this suitable for beginners?',
    answer:
      'Absolutely. Many Fitcall members are restarting their fitness journey.',
  },
  {
    value: 'item-4',
    question: 'Why Fitcall?',
    answer: "Because information isn't the problem. Consistency is.",
  },
]

export default function BusyProfessionalPage() {
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
                You Don&apos;t Have Time to Figure Out Fitness. You Need Someone
                to Just Handle It..
              </h1>
              <p className="mx-auto max-w-full wrap-break-word text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
                FitCall gives you a real personal trainer without the commute,
                the gym queue, or the hour you don&apos;t have.
              </p>
              <Button asChild className="mt-0" size="xl">
                <Link href="/busy-professional/find-my-coach">
                  FIND MY COACH
                </Link>
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute inset-x-8 bottom-0 top-12 rounded-[8px] bg-primary" />
              <Image
                alt=""
                className="relative z-10 mx-auto h-auto max-h-[620px] w-full rounded-[8px] object-contain"
                height={640}
                priority
                src="/images/ads/busy-professional-hero.png"
                width={640}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto space-y-5 text-center max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              You know what&apos;s on your calendar right now.
            </h2>
            <div className="space-y-3 text-base leading-relaxed text-muted lg:text-lg">
              <p>
                Meetings. Deadlines. School runs. Emails you haven&apos;t
                replied to from three days ago.
              </p>
              <p>
                Somewhere in there, go to the gym has been on your to-do list
                for six weeks. It keeps getting bumped. Not because you
                don&apos;t care, because by the time you have a free slot,
                you&apos;re too drained to use it wisely.
              </p>
              <p>
                Here&apos;s what nobody tells you: the problem isn&apos;t your
                schedule. It&apos;s that fitness has never been structured
                around YOUR life.
              </p>
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
              src="/images/ads/busy-professional-feature.png"
            />
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              INTRODUCING FITCALL:
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              Fitcall connects you with a real fitness coach who works with your
              schedule, your goals, and your lifestyle.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted lg:text-lg">
              <p>No generic plans. No guessing. No going it alone.</p>
              <p>
                Just expert support and accountability every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="HOW IT WORKS"
            title="Fitness support built around real life"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <article
                  className="rounded-[16px] border border-[#EBEBEB] bg-white p-6"
                  key={step.title}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primarybadge text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-muted-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {step.body}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              Why people love FitCall
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative hidden aspect-[1.2] overflow-hidden rounded-[8px] bg-[#F7F7F7] lg:block">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="50vw"
                src="/images/ads/busy-professional-feature.png"
              />
            </div>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li
                  className="flex items-start text-sm text-muted md:text-base"
                  key={reason}
                >
                  <Image
                    alt={`check ${index + 1}`}
                    className="mr-3 mt-0.5 shrink-0"
                    height={20}
                    src="/images/features/check.svg"
                    width={20}
                  />
                  <span className="leading-relaxed opacity-90">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F7F7F7] w-full overflow-hidden py-12 md:py-20">
        <div className="container text-center relative space-y-5 mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
            What our users describe
          </h2>
          <div className="mx-auto mb-10 max-w-5xl space-y-5 text-base leading-relaxed text-muted lg:text-lg">
            <p>
              Imagine this, three months from now, you have more energy, your
              clothes fit better, you&apos;re sleeping better, you feel
              stronger, more confident and more in control all because you
              finally had someone helping you stay consistent.
            </p>
            <p>
              Not willpower. Not discipline. Just a person who shows up for them
              so they show up for themselves.
            </p>
          </div>
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
          src="/images/ads/busy-professional-hero.png"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-3xl flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl lg:leading-[1.1]">
            Your future self will thank you.
          </h2>
          <p className="text-base leading-relaxed opacity-90 md:text-lg">
            Get matched with your coach today.
          </p>
          <Button asChild size="xl">
            <Link href="/busy-professional/find-my-coach">FIND MY COACH</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
