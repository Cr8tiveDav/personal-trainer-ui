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
        badge="Strength builder"
        headline="Same numbers. Same plateau. Same excuses. One call fixes all three."
        description="Work with a coach who helps you train smarter, stay consistent, and finally push past your limits."
        ctaLabel="Build More Strength"
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
