import { Check } from 'lucide-react'
import React from 'react'

interface StepCardProps {
  badge: string
  title: string
  desc: string
  bullets: string[]
}

const StepCard = ({ badge, title, desc, bullets }: StepCardProps) => {
  return (
    <div className="h-fit md:min-h-120 p-6 md:p-8 bg-[#FCFCFC] border border-border rounded-[20px]">
      <div className="flex flex-col justify-center gap-2">
        <span className="w-fit rounded-[9999px] bg-primarybadge text-base text-primary font-medium px-4 py-1">
          {badge}
        </span>
        <h2 className="text-2xl md:text-3xl text-foreground font-semibold mb-6">
          {title}
        </h2>
      </div>

      <p className="text-lg text-muted mb-6">{desc}</p>

      <ul className="w-full flex flex-col gap-4">
        {bullets.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-4 text-muted-foreground"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#1E7829] text-white mt-0.5">
              <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
            </span>
            <span className="text-sm md:text-base">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepCard
