import IntegrationsBar from '@/components/homepage/HeroBottom'
import Features from '@/components/squeeze/uk/Features'
import { FormCtaSection } from '@/components/squeeze/uk/FormCtaSection'
import { Hero } from '@/components/squeeze/uk/Hero'
import { HowItWorksSection } from '@/components/squeeze/uk/HowItWorksSection'
import { Navbar } from '@/components/squeeze/uk/Navbar'
import { StorySection } from '@/components/squeeze/uk/StorySection'
import { TestimonialsSection } from '@/components/squeeze/uk/TestimonialsSection'
import { VideoSection } from '@/components/squeeze/uk/VideoSection'
import SqueezeFooter from '@/components/squeeze/us/SqueezeFooter'

const formCtas = [
  {
    title: 'Because Fitness Is Easier Together',
    description:
      'Working out alone can be difficult. Having a dedicated trainer who expects you to show up changes everything. Kindly fill the form, download FitCall and begin your fitness journey.',
  },
  {
    title: "Fitness Isn't About Being Perfect",
    description:
      "It's about showing up, even on difficult days. Your FitCall Fitness Trainer helps you stay focused when motivation is low and excuses start creeping in. Kindly fill the form, download FitCall and begin your fitness journey.",
  },
  {
    title: 'Never Workout Alone Again',
    description:
      'Get paired with a trainer who understands your goals, supports your journey, and helps you stay committed until you achieve them. Kindly fill the form, download FITCALL and begin your fitness journey',
  },
  {
    title: 'Accountability Changes Everything',
    description:
      'The right trainer can be the difference between giving up after two weeks and finally reaching your fitness goals. FitCall provides the best trainers. Kindly fill the form, download FitCall, and begin your fitness journey.',
  },
  {
    title: 'Results Come From Consistency',
    description:
      'Not from motivation. Not from shortcuts. Consistency is what transforms your body, and accountability is what creates consistency. Kindly fill the form, download FitCall, and begin your fitness journey.',
  },
]

export default function SqueezePageUk() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fcfcfc] text-muted-foreground">
        <Hero />
        <IntegrationsBar className="bg-white" />
        <TestimonialsSection />
        <FormCtaSection {...formCtas[0]} />
        <StorySection />
        <FormCtaSection {...formCtas[1]} />
        <HowItWorksSection />
        <FormCtaSection {...formCtas[2]} />
        <Features />
        <FormCtaSection {...formCtas[3]} />
        <VideoSection />
        <FormCtaSection {...formCtas[4]} />
      </main>

      <SqueezeFooter />
    </>
  )
}
