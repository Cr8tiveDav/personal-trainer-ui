import AdsTestimonialsSection from '../AdsTestimonialsSection'
import { adsTestimonials } from '../testimonials'

const BuildUpTestimonials = () => {
  return (
    <AdsTestimonialsSection
      testimonials={adsTestimonials}
      bottomTitle="Progress you can see"
      bottomDescription="Weekly recaps, habit streaks, and session notes from your trainer - so you know exactly how far you've come. Kindly fill the form and download FitCall today."
      bottomFormId="build-up-progress-lead"
      sectionClassName="md:pt-20 md:pb-24"
      cardsGridClassName="md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6"
      cardClassName="min-h-[150px] md:min-h-[142px]"
      quoteClassName="mt-8"
      bottomClassName="mt-11 gap-10 min-[520px]:justify-items-center"
      bottomTextClassName="min-[520px]:mx-auto min-[520px]:max-w-[620px] min-[520px]:text-center"
      bottomTitleClassName="text-[31px] leading-[0.98]"
      bottomDescriptionClassName="text-[15px] leading-[1.33] min-[520px]:mx-auto min-[520px]:max-w-[600px]"
    />
  )
}

export default BuildUpTestimonials
