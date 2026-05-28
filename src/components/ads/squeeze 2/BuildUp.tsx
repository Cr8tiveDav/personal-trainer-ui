import BuildUpHero from './BuildUpHero'
import BuildUpFinalCta from './BuildUpFinalCta'
import BuildUpLifestyle from './BuildUpLifestyle'
import BuildUpPhoneShowcase from './BuildUpPhoneShowcase'
import BuildUpTestimonials from './BuildUpTestimonials'
import BuildUpStory from './BuildUpStory'
import BuildUpTrainerMatch from './BuildUpTrainerMatch'
import BuildUpTrainerReady from './BuildUpTrainerReady'

const BuildUp = () => {
  return (
    <main className="min-h-screen bg-white text-[#202124]">
      <BuildUpHero />
      <BuildUpTestimonials />
      <BuildUpStory />
      <BuildUpTrainerMatch />
      <BuildUpLifestyle />
      <BuildUpPhoneShowcase />
      <BuildUpTrainerReady />
      <BuildUpFinalCta />
    </main>
  )
}

export default BuildUp
