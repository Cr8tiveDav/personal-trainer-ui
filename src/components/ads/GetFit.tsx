import GetFitFinalCta from './GetFitFinalCta'
import GetFitHero from './GetFitHero'
import GetFitHowItWorks from './GetFitHowItWorks'
import GetFitPlatforms from './GetFitPlatforms'
import GetFitStory from './GetFitStory'
import GetFitTestimonials from './GetFitTestimonials'
import GetFitVideo from './GetFitVideo'

const GetFit = () => {
  return (
    <main className="min-h-screen bg-white text-[#202124]">
      <GetFitHero />
      <GetFitPlatforms />
      <GetFitTestimonials />
      <GetFitStory />
      <GetFitHowItWorks />
      <GetFitVideo />
      <GetFitFinalCta />
    </main>
  )
}

export default GetFit
