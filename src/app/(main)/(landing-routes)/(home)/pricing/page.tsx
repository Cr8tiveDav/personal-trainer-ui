import React from 'react'
import FAQSection from '~/components/homepage/Faq'
import PricingSection from '~/components/pricing/PricingPage'

const Pricing = () => {
  return (
    <main className="w-full pt-[122px] md:pt-[154px]">
      <PricingSection />
      <FAQSection />
    </main>
  )
}

export default Pricing
