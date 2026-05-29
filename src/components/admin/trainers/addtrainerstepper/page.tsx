'use client'

import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/utils'

interface Step {
  number: number
  title: string
  subtitle: string
}

const STEPS: Step[] = [
  { number: 1, title: 'Basic Information', subtitle: 'Profile, specializations & benefits' },
  { number: 2, title: 'Profile image', subtitle: 'Optional display picture' },
  { number: 3, title: 'Review & create', subtitle: 'Confirm and provision account' },
]

interface StepperProps {
  currentStep: number
  onStepClick?: (step: number) => void
}

export function AddTrainerStepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className='flex items-center gap-0 w-full mb-8 bg-white p-6 rounded-[8px]'
    >
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isActive = currentStep === step.number

        return (
          <div key={step.number} className={cn('flex items-center', index < STEPS.length - 1 ? 'flex-1' : 'flex-none')}>
            <div className='flex items-center gap-3'>
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-[9999px] border-1 text-sm font-semibold select-none',
                  isCompleted
                    ? 'border-primary bg-primary text-white cursor-pointer'
                    : isActive
                      ? 'border-primary bg-primarybadge text-primary'
                      : 'bg-gray-100 text-muted border-0'
                )}
                onClick={() => {
                  if (isCompleted && onStepClick) {
                    onStepClick(step.number)
                  }
                }}
              >
                {isCompleted ? <Check className='h-4 w-4' /> : step.number}
              </motion.div>
              <div className='hidden sm:block'>
                <p
                  className={cn(
                    'text-sm font-semibold',
                    isActive || isCompleted ? 'text-muted-foreground' : 'text-muted'
                  )}
                >
                  {step.title}
                </p>
                <p className='text-xs text-muted'>{step.subtitle}</p>
              </div>
            </div>
            {index < STEPS.length - 1 && (
              <div className='flex-1 h-px mx-4 overflow-hidden rounded-[9999px] bg-gray-200'>
                <motion.div
                  className='h-full bg-primary origin-left'
                  initial={false}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: '100%' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}
