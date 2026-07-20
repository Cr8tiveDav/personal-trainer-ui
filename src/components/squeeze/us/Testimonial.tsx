import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'
import React from 'react'
import WaitlistSection from './WaitlistSection'

const testimonials = [
  {
    name: 'Jade M.',
    country: 'Atlanta, GA',
    review:
      'As a busy mother of two, I always felt guilty spending time on myself. My trainer helped me realize that taking care of my health benefits my entire family. The flexibility of FitCall made it easy to fit workouts around my schedule',
    stars: '/images/ads/us/stars.png',
    avatar: '/images/ads/us/jade.svg',
  },
  {
    name: 'Callum B.',
    country: 'London, UK',
    review:
      "I\'ve spent years starting and stopping fitness programs. I\'d be motivated for a week, then life would get in the way and I\'d quit. Joining FitCall changed that completely.",
    stars: '/images/ads/us/stars.png',
    avatar: '/images/ads/us/callum.svg',
  },
  {
    name: 'Sophie Dubois',
    country: 'Atlanta, GA',
    review:
      "The biggest challenge for me wasn\'t knowing what exercises to do it was staying motivated. My trainer on FitCall became my biggest supporter and toughest accountability partner at the same time.",
    stars: '/images/ads/us/stars.png',
    avatar: '/images/ads/us/sophie.svg',
  },
  {
    name: 'Kyle A.',
    country: 'Manchester, UK',
    review:
      "I\'ve tried countless fitness apps, but most of them felt like I was doing everything alone. FitCall was different because there was a real person invested in my success. Having that human connection made all the difference.",
    stars: '/images/ads/us/stars.png',
    avatar: '/images/ads/avatar-kyle.png',
  },
]

const Testimonial = () => {
  return (
    <section className="w-full py-4">
      <div className="container mx-auto max-w-4xl px-4">
        <SectionHeader
          badge="OUR TESTIMONIAL"
          title="What people are saying"
          align="center"
          className="max-w-3xl mx-auto mb-1 md:mb-4"
        />
        <p className="text-base font-medium text-muted text-center mb-4">
          Real reviews from people having real lifestyle changes
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {testimonials.map((testimonial, i) => {
            const { name, country, review, stars, avatar } = testimonial
            return (
              <div
                key={i}
                className="w-full min-h-[300px] bg-white flex flex-col gap-2 py-4 px-5 border border-[#D1D1D1] rounded-[24px]"
              >
                <Image src={stars} alt="Stars" width={120} height={24} />
                <p className="text-base text-muted flex-1">{review}</p>
                <div className="flex items-center gap-2">
                  <Image src={avatar} alt={name} width={48} height={48} />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {name}
                    </span>
                    <span className="text-sm text-muted">{country}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <WaitlistSection text="Starting is easy. Staying committed is the hard part. With FitCall, you get a professional trainer who checks in, tracks your progress, and helps you stay on course long after the initial excitement wears off. Kindly fill the form, download FitCall and begin your fitness journey.">
          <h2 className="text-3xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] lg:text-4xl xl:text-[64px]">
            Your Goals Need <br className="hidden md:block" />
            More Than Good <br className="hidden md:block" />
            Intentions
          </h2>
        </WaitlistSection>

        {/* Emily Story */}
        <div className="flex flex-col items-center mb-4">
          <p className="text-lg md:text-2xl text-muted">
            Emily&apos;s Personal Story
          </p>
          <h2 className="text-xl md:text-4xl font-semibold text-muted-foreground">
            From Struggling to Strong
          </h2>
        </div>

        <div>
          <Image
            src="/images/ads/us/emily-story.png"
            alt="Emily Story"
            width={1200}
            height={600}
            className="w-full h-auto"
          />

          <div className="md:px-6">
            <h3 className="text-base md:text-4xl font-semibold text-muted-foreground mt-6 mb-4">
              Emily Carter, 36 - San Diego, California
            </h3>

            <div className="flex flex-col gap-4 text-base md:text-2xl text-muted leading-7">
              <p>
                For most of my adult life, fitness was always something I
                planned to start &quot;next week.&quot;
              </p>
              <p>
                I wasn&apos;t severely overweight, but I wasn&apos;t healthy
                either. I spent most of my days working from home, sitting in
                front of a computer for hours. By the end of each day, I felt
                exhausted, had tense energy and often found myself ordering
                takeout instead of cooking. I knew I needed to make a change,
                but every time I tried, I quickly lost motivation after a few
                weeks.
              </p>
              <p>
                I joined gyms, followed fitness influencers, and downloaded
                countless workout apps. Nothing seemed to work because I always
                felt like I was doing it alone.
              </p>
              <p>
                Then I discovered FitCall app. What immediately stood out was
                the opportunity to work directly with a real trainer who would
                guide me and hold me accountable. After signing up, I was
                matched with a trainer who took the time to understand my goals,
                lifestyle, and challenges.
              </p>
              <p>
                Instead of putting me on an extreme diet or intense workout
                routine, my trainer created a realistic plan that fit my
                schedule. We started with simple workouts, healthier eating
                habits, and weekly progress check-ins.
              </p>
              <p>
                The accountability changed everything. On days when I wanted to
                skip a workout, my trainer would message me. When I felt
                discouraged, she reminded me how much progress I had already
                made. Every small victory was celebrated, which kept me
                motivated to continue.
              </p>
              <p>
                After three months, I noticed significant changes. I had more
                energy throughout the day, my clothes fit, and I felt stronger
                than I had in years. Friends and coworkers began asking what I
                was doing differently.
              </p>
              <p>
                Six months later, I had lost 32 pounds, improved my confidence,
                and developed habits that finally felt sustainable. For the
                first time, fitness wasn&apos;t something I was forcing myself
                to do &mdash; it had become part of my lifestyle.
              </p>
              <p>
                Today, I wake up feeling energized, enjoy being active, and no
                longer avoid taking photos because I&apos;m uncomfortable with
                how I look. More importantly, I&apos;ve learned that real
                transformation isn&apos;t about being perfect. It&apos;s about
                being consistent.
              </p>
              <p>
                FitCall didn&apos;t just help me get fit &mdash; it gave me the
                support, accountability, and confidence I needed to become the
                healthiest version of myself.
              </p>
            </div>
          </div>
        </div>

        <WaitlistSection text="How many times have you promised yourself you'd get serious about fitness? FitCall helps break the cycle by connecting you with a trainer who provides the guidance, encouragement, and accountability needed to keep going when motivation disappears. Kindly fill the form, download FitCall and begin your fitness journey.">
          <h2 className="text-3xl mb-6 font-semibold md:font-bold text-muted-foreground leading-[1.2] md:leading-[1.1] lg:text-4xl xl:text-[64px]">
            Stop Starting Over
          </h2>
        </WaitlistSection>
      </div>
    </section>
  )
}

export default Testimonial
