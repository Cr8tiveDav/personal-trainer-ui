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
  const ctaLabel = 'Start Losing Weight Smarter'

  return (
    <main className="w-full pt-28">
      <Hero
        badge="Weight loss"
        headline="You didn't fail every plan you tried. Every plan left you alone. FitCall doesn't."
        description="Get the accountability, guidance, and support you need to finally make weight loss stick."
        ctaLabel={ctaLabel}
      />
      <IntegrationsBar />
      <section className="bg-secondary py-6">
        <Testimonials />
        <ProgressSection showForm={false} />
      </section>
      <SuccessStory />
      <FindSomeoneSection showForm={false} />
      <FitnessLifestyle />
      <TrainerReady ctaLabel={ctaLabel} />
      <SqueezeFooter />
    </main>
  )
}

export default FindMyCoachPage
