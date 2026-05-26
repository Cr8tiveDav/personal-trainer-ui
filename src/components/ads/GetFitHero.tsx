import AdsHeroSection from './AdsHeroSection'

const GetFitHero = () => {
  return (
    <AdsHeroSection
      badge="Live trainer accountability"
      title="Stay consistent with real trainers"
      description="Get matched with an expert Nigerian fitness coach who calls you at your work out time. Kindly fill the form and download FitCall today."
      formId="hero-lead"
      image={{
        src: '/images/ads/get-fit-runner.png',
        alt: 'Runner training outdoors',
        width: 460,
        height: 476,
      }}
    />
  )
}

export default GetFitHero
