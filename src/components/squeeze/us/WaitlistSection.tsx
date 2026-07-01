import React from 'react'
import { WaitlistForm } from '../WaitListForm'

interface WaitlistSectionProps {
  text?: string
  children?: React.ReactNode
}

const WaitlistSection = ({ text, children }: WaitlistSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-6 md:gap-8 mt-6 mb-20">
      <div className="min-w-0">
        {children}
        {text && (
          <p className="text-muted text-base md:text-[22px] md:tracking-wide leading-6 md:leading-7">
            {text}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col md:items-end">
        <WaitlistForm ctaLabel="Submit" />
      </div>
    </div>
  )
}

export default WaitlistSection
