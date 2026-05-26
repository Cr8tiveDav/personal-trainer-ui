import AdsFormCtaSection from '../AdsFormCtaSection'

const BuildUpTrainerReady = () => {
  return (
    <AdsFormCtaSection
      title="Your Trainer is Ready. Are you?"
      description='Stop restarting. Stop promising yourself "next week." Kindly fill the form and download FitCall today.'
      formId="build-up-trainer-ready-lead"
      className="pt-4 pb-16 md:pt-0 md:pb-20"
      innerClassName="lg:grid-cols-[minmax(0,420px)_370px]"
      textClassName="max-w-[330px] lg:max-w-[410px]"
      titleClassName="leading-[0.98] md:text-[38px]"
      descriptionClassName="lg:max-w-[360px]"
    />
  )
}

export default BuildUpTrainerReady
