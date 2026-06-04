import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

const CheckCircleIcon = ({ className }: { className: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 16 16'
    fill='none'
    className={className}
    aria-hidden='true'
  >
    <circle cx='8' cy='8' r='6.25' stroke='currentColor' strokeWidth='1.5' />
    <path
      d='M5.25 8.1L7.05 9.9L10.9 6.1'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

interface PricingCardProps {
  plan: {
    name: string
    sessions: string
    price: string
    description: string
    features: string[]
    action: string
    note?: string
    highlight?: string
  }
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const isHighlighted = plan.highlight === 'Most Popular'

  return (
    <div
      className={`relative flex h-full flex-col rounded-[16px] border bg-white p-8 transition-all ${
        isHighlighted ? 'border-[#2272AD] shadow-lg' : 'border-[#D1D1D1]'
      }`}
    >
      {isHighlighted && (
        <div className='absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-medium text-[#027A48]'>
          <CheckCircleIcon className='h-4 w-4 text-[#12B76A]' />
          {plan.highlight}
        </div>
      )}

      <div className={isHighlighted ? 'pt-10' : ''}>
        <h3 className='text-xl font-bold text-muted-foreground'>{plan.name}</h3>
        <p className='mt-1 text-sm font-medium text-muted'>{plan.sessions}</p>

        <div className='mt-6'>
          <span className='text-5xl font-bold tracking-tight text-muted-foreground'>
            {plan.price}
          </span>
        </div>

        <p className='mt-4 min-h-12 text-sm leading-relaxed text-muted'>
          {plan.description}
        </p>
      </div>

      <div className='my-8 h-px w-full bg-[#F2F4F7]' />

      <ul className='flex-1 space-y-4'>
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className='flex items-center gap-3 text-sm font-medium text-muted'
          >
            <CheckCircleIcon className='h-5 w-5 shrink-0 text-[#12B76A]' />
            {feature}
          </li>
        ))}
      </ul>

      <div className='mt-8'>
        {/* Button asChild renders the Link as the single interactive element, avoiding <a><button> nesting */}
        <Button
          asChild
          className={`h-11 w-full rounded-lg text-sm font-semibold transition-colors ${
            isHighlighted
              ? 'bg-primary text-white hover:bg-[#083D70]'
              : 'border border-[#EAECF0] bg-[#F9FAFB] text-muted-foreground hover:bg-[#F2F4F7]'
          }`}
        >
          <Link href='/waitlist'>{plan.action}</Link>
        </Button>
        {plan.note && (
          <p className='mt-3 text-center text-xs text-muted'>{plan.note}</p>
        )}
      </div>
    </div>
  )
}

export default PricingCard
