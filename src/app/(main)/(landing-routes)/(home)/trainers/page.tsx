import React from 'react'
import FAQSection from '~/components/homepage/Faq'
import TrainerSection from '~/components/trainers/Trainers'

const Trainers = () => {
  return (
    <main className="w-full pt-28 md:pt-48">
      <TrainerSection />
      <FAQSection />
    </main>
  )
}

export default Trainers
