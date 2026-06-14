import Image from 'next/image'
import Link from 'next/link'
import TestimonialCard from '@/components/homepage/TestimonialCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/button'

export default function TestSqueeze1Page() {
  const proofCards = [
    {
      title: 'Structured training',
      body: 'Every session has the sets, reps, tempo, and rest times you need with a video demo so there is zero guesswork.',
      image: 'card-1.png',
      imageAlt: 'Trainer reviewing a structured strength workout plan',
    },
    {
      title: 'Live accountability',
      body: 'Your trainer calls you at your booked time to train with you, push your last rep, and keep your session honest.',
      image: 'card-2.png',
      imageAlt: 'Personal trainer coaching a live strength session',
    },
    {
      title: 'Progressive overload',
      body: 'Structured, tracked, intentional training that builds week on week so your effort actually adds up.',
      image: 'card-3.png',
      imageAlt: 'Athlete tracking strength progress between workouts',
    },
  ]
  const benefits = [
    'A verified strength & conditioning trainer matched to your goals',
    'A fully structured programme: sets, reps, rest, video demos',
    'Live video sessions. Your trainer calls you at your booked time',
    "Progressive overload built in so you're always moving forward",
    "Accountability that doesn't negotiate with your excuses",
  ]
  const testimonials = [
    {
      quote:
        "By session twenty I realised it had become about being someone who doesn't quit.",
      name: 'Frank',
      location: 'FitCall user',
      image: '/images/ads/avatar-callum.png',
    },
    {
      quote:
        'Having a person who actually shows up for you instead of just a generic app notification is unmatched.',
      name: 'Kyle M.',
      location: 'Manchester, UK',
      image: '/images/ads/avatar-kyle.png',
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
                Random Workouts Build Random Results. You Need a System and
                Someone Who Won&apos;t Let You Slack.
              </h1>
              <p className="mx-auto max-w-full wrap-break-word text-base leading-relaxed text-muted lg:mx-0 lg:text-lg">
                FitCall connects you with verified strength trainers who build
                your programme, push your limits, and call you to make sure you
                show up.
              </p>
              <Button asChild className="mt-0" size="xl">
                <Link href="/build-muscle/find-my-coach">FIND MY COACH</Link>
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute inset-x-8 bottom-0 top-16 rounded-[8px] bg-primary" />
              <Image
                alt="Strength athlete holding dumbbells during a focused workout"
                className="relative z-10 mx-auto h-auto max-h-[640px] w-full rounded-[8px] object-contain"
                height={760}
                priority
                src="/images/ads/build-muscle-mini-1.png"
                width={560}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              You&apos;re not a beginner.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted lg:text-lg">
              <p>
                You&apos;ve been in the gym. You know the difference between a
                deadlift and a Romanian deadlift. You&apos;ve watched enough
                YouTube to build a decent session.
              </p>
              <p>
                But you&apos;re also honest enough to admit: you&apos;ve been
                stuck at the same numbers for months. Maybe longer.
              </p>
              <p>
                Not because you&apos;re not working hard. Because you&apos;re
                not working smart and because on the days you don&apos;t feel
                it, nobody&apos;s there to tell you to show up anyway.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Progress in strength doesn't come from trying harder."
            description="It comes from progressive overload. structured, tracked, intentional training that builds week on week."
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {proofCards.map((card) => (
              <article
                className="flex h-full flex-col gap-5 rounded-[8px] border border-gray-100 bg-white p-4 shadow-xs"
                key={card.title}
              >
                <div className="relative aspect-[1.1] overflow-hidden rounded-[8px] bg-[#F7F7F7]">
                  <Image
                    alt={card.imageAlt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={`/images/ads/build-muscle-${card.image}`}
                  />
                </div>
                <h3 className="text-lg font-semibold leading-tight text-muted-foreground md:text-xl">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-14">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-5">
            <h2 className="text-xl font-bold text-muted-foreground md:text-2xl lg:text-4xl">
              Your FitCall strength trainer builds your programme around your
              current level and your specific goals.
            </h2>
            <p className="text-base leading-relaxed text-muted lg:text-lg">
              Every session has the sets, reps, tempo, and rest times you need
              with a video demo so there&apos;s zero guesswork.
            </p>
            <Button asChild className="mt-0" size="lg">
              <Link href="/build-muscle/find-my-coach">FIND MY COACH</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F7F7F7] py-12 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[1.15] overflow-hidden rounded-[8px] bg-white">
            <Image
              alt="Trainer leading a live accountability workout session"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/ads/build-muscle-accountability-card-1.png"
            />
          </div>
          <div className="space-y-5 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              And then they call you.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted lg:text-lg">
              <p>Not to check up on you. To train with you. Live.</p>
              <p>
                Where they can see your form, push your last rep, and tell you
                when you&apos;re sandbagging.
              </p>
              <p>
                That&apos;s the difference between going through the motions and
                actually getting stronger.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto  px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              Three months of consistent, structured training.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted lg:text-lg">
              <p>
                You&apos;re pulling heavier. Moving better. Your body looks like
                the work you&apos;ve been putting in &mdash; because this time,
                the work is actually adding up.
              </p>
              <p>
                You&apos;re not starting from scratch every other week.
                You&apos;re building on last session, and the one before it.
                That compound effect, that&apos;s what serious progress looks
                like.
              </p>
              <p>
                And the best part? You didn&apos;t have to figure any of it out
                yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#F7F7F7] py-12 md:py-20">
        <div className="container relative mx-auto px-4">
          <SectionHeader
            badge="CUSTOMER STORIES"
            title="Here's what our customers say:"
            align="center"
          />
          <div className="mx-auto grid max-w-2xl gap-6 lg:grid-cols-2">
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

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]">
              What you get
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative hidden aspect-[1.2] overflow-hidden rounded-[8px] bg-[#F7F7F7] lg:block">
              <Image
                alt="Strength trainer supporting a client with structured coaching"
                className="object-cover"
                fill
                sizes="50vw"
                src="/images/ads/build-muscle-feature-2.png"
              />
            </div>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li
                  className="flex items-start text-sm text-muted md:text-base"
                  key={benefit}
                >
                  <Image
                    alt=""
                    className="mr-3 mt-0.5 shrink-0"
                    height={20}
                    src="/images/features/check.svg"
                    width={20}
                  />
                  <span className="leading-relaxed opacity-90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative min-h-[460px] overflow-hidden px-4 py-20 text-white md:px-10">
        <Image
          alt="Strength training session background"
          className="object-cover"
          fill
          sizes="100vw"
          src="/images/ads/build-muscle-feature-1.png"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-3xl flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl lg:leading-[1.1]">
            One call with a strength trainer who knows their stuff and
            won&apos;t let you waste the session.
          </h2>
          <Button asChild size="xl">
            <Link href="/build-muscle/find-my-coach">FIND MY COACH</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
