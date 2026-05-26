import AdsTestimonialsSection from './AdsTestimonialsSection'
import { adsTestimonials } from './testimonials'

const GetFitTestimonials = () => {
  return (
    <AdsTestimonialsSection
      testimonials={adsTestimonials}
      bottomTitle="A fitness routine built with you in mind"
      bottomDescription="FitCall is built for people who know what they want but need someone in their corner to make it happen. Fill the form, Download the app and Find your trainer today."
      bottomFormId="routine-lead"
    />
  )
}

export default GetFitTestimonials
