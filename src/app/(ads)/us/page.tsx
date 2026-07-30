'use client'
import IntegrationsBar from '@/components/homepage/HeroBottom'
import Experience from '@/components/squeeze/us/Experience'
import Hero from '@/components/squeeze/us/Hero'
import HowItWorks from '@/components/squeeze/us/HowItWorks'
import Navbar from '@/components/squeeze/us/Navbar'
import SqueezeFooter from '@/components/squeeze/us/SqueezeFooter'
import Testimonial from '@/components/squeeze/us/Testimonial'

const SqueezePageUS = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Testimonial />
        <Experience />
        <IntegrationsBar className="mb-20" />
        <SqueezeFooter />
      </main>
    </>
  )
}

export default SqueezePageUS
