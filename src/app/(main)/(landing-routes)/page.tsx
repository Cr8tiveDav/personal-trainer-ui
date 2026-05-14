import Features from '@/components/homepage/Features'
import Hero from '@/components/homepage/Hero'
import HowItWorks from '@/components/homepage/HowItWorks'
import Testimonials from '@/components/homepage/Testimonials'
import UserSection from '@/components/homepage/WhyChoose'
import SuccessStory from '@/components/homepage/SuccessStory'
import CTASection from '@/components/homepage/Cta'
import FAQSection from '@/components/homepage/Faq'

export default function Home() {
  return (
    <>
      <Hero />
      <UserSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <SuccessStory />
      <FAQSection />
      <CTASection />
    </>
  )
}
