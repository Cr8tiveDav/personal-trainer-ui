'use client'

import { useState } from 'react'
import SectionHeader from '../ui/SectionHeader'
import CategoryFilter from './TrainersCatergory'
import TrainerCard from './TrainersCard'
import { categories, Category, trainers } from './trianers'

const TrainerSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered =
    activeCategory === 'All'
      ? trainers
      : trainers.filter((t) => t.categories.includes(activeCategory))

  return (
    <section className="w-full pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:[&_h2]:text-5xl lg:[&_p]:text-lg">
          <SectionHeader
            badge="Trainer"
            title="Meet your trainer."
            description="Certified coaches, real session schedules. Filter by specialty or by what you want to achieve."
            align="center"
            className="mx-auto mb-12 max-w-xl md:mb-20"
          />
        </div>

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((trainer) => (
            <TrainerCard key={trainer.name} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrainerSection
