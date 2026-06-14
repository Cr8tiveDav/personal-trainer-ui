import React from 'react'
import IntegrationsBar from '~/components/homepage/HeroBottom'
import SuccessStory from '~/components/homepage/SuccessStory'
import Testimonials from '~/components/homepage/Testimonials'
import FindSomeoneSection from '~/components/squeeze/FindSomeone'
import FitnessLifestyle from '~/components/squeeze/FitnessLifestyle'
import Hero from '~/components/squeeze/Hero'
import ProgressSection from '~/components/squeeze/Progress'
import SqueezeFooter from '~/components/squeeze/SqueezeFooter'
import TrainerReady from '~/components/squeeze/TrainerReady'

const FindMyCoachPage = () => {
  return (
    <main className="w-full pt-28 md:pt-48">
      <Hero
        badge="Weight loss"
        headline="You didn't fail every plan you tried. Every plan left you alone. FitCall doesn't."
        description="Get the accountability, guidance, and support you need to finally make weight loss stick."
        ctaLabel="Start Losing Weight Smarter"
      />
      <IntegrationsBar />
      <section className="bg-secondary py-6">
        <Testimonials />
        <ProgressSection />
      </section>
      <SuccessStory />
      <FindSomeoneSection />
      <FitnessLifestyle />
      <TrainerReady />
      <SqueezeFooter />
    </main>
  )
}

export default FindMyCoachPage
