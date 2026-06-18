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
  const ctaLabel = 'Find My Coach'

  return (
    <main className="w-full pt-28 md:pt-48">
      <Hero
        badge="Busy professional"
        headline="No time for the gym? Your trainer comes to your schedule. Literally."
        description="Build strength, lose weight, and stay consistent with coaching designed around your work, meetings, and real life."
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
