import React from 'react'
import { WaitlistForm } from '../WaitListForm'

interface WaitlistSectionProps {
  text?: string
  children?: React.ReactNode
}

const WaitlistSection = ({ text, children }: WaitlistSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mt-6 mb-20">
      <div className="w-full md:max-w-[701px]">
        {children}
        {text && (
          <p className="text-muted text-base md:text-[22px] md:tracking-wide leading-6 md:leading-7 md:pr-6">
            {text}
          </p>
        )}
      </div>
      <div className="w-full md:w-[600px] mt-12 flex flex-col items-end">
        <WaitlistForm ctaLabel="Submit" />
      </div>
    </div>
  )
}

export default WaitlistSection
