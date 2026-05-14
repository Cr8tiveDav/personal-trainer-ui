import React from 'react'
import FAQSection from '~/components/homepage/Faq'
import PricingSection from '~/components/pricing/PricingPage'

const Pricing = () => {
  return (
    <main className="w-full pt-28 md:pt-48">
      <PricingSection />
      <FAQSection />
    </main>
  )
}

export default Pricing
