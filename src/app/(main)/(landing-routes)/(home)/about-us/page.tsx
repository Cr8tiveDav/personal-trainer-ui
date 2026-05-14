import Hero from '~/components/about/Hero'
import CoreBeliefs from '~/components/about/CoreBeliefs'
import ProblemSolution from '~/components/about/ProblemSolution'
import StartTrialBanner from '~/components/about/StartTrialBanner'

const AboutUs = () => {
  return (
    <main className="w-full bg-secondary pt-28 md:pt-48">
      <Hero />
      <ProblemSolution />
      <CoreBeliefs />
      <StartTrialBanner />
    </main>
  )
}

export default AboutUs
