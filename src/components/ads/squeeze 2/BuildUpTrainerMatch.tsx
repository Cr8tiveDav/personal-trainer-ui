import AdsFormCtaSection from '../AdsFormCtaSection'

const BuildUpTrainerMatch = () => {
  return (
    <AdsFormCtaSection
      title="We find someone who fits how you move."
      description="Every FitCall trainer is matched to you based on your goals, your schedule, and the kind of energy that actually keeps you going. We figure that out before the first call. Kindly fill the form and download FitCall today."
      formId="build-up-match-lead"
      className="pt-12 pb-16 md:pt-20 md:pb-20"
      innerClassName="lg:grid-cols-[minmax(0,470px)_370px]"
      textClassName="max-w-[350px] lg:max-w-[455px]"
      titleClassName="leading-[1.08] md:text-[38px] md:leading-[1.08]"
      descriptionClassName="leading-[1.5] md:leading-[1.48] lg:max-w-[440px]"
    />
  )
}

export default BuildUpTrainerMatch
