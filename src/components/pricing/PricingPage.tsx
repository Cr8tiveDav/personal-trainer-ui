'use client'

import React from 'react'
import SectionHeader from '../ui/SectionHeader'
import PricingCard from './PricingCard'
import { pricingPlans } from './pricing'

const PricingSection = () => {
  return (
    <section className="bg-white pb-16">
      <div className="container max-w-7xl px-4">
        <div className="md:[&_h2]:text-5xl lg:[&_p]:text-lg">
          <SectionHeader
            badge="Pricing"
            title="Plans that match how often you show up."
            description="Start with a 7-day free trial. Cancel anytime. No equipment lock-in."
            align="center"
            className="mx-auto mb-12 max-w-xl md:mb-20"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
