import { Check } from 'lucide-react'
import { cn } from '@/utils'

interface Step {
  number: number
  title: string
  subtitle: string
}

const STEPS: Step[] = [
  { number: 1, title: 'Basic Information', subtitle: 'Personal & professional details' },
  { number: 2, title: 'Media upload', subtitle: 'Profile image & intro video' },
  { number: 3, title: 'Account setup', subtitle: 'Invite or set credentials' },
]

interface StepperProps {
  currentStep: number
}

export function AddTrainerStepper({ currentStep }: StepperProps) {
  return (
    <div className='flex items-center gap-0 w-full mb-8 bg-white p-6 rounded-lg'>
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isActive = currentStep === step.number

        return (
          <div key={step.number} className='flex items-center flex-1'>
            <div className='flex items-center gap-3'>
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-1 text-sm font-semibold transition-colors',
                  isCompleted
                    ? 'border-primary bg-primary text-white'
                    : isActive
                    ? 'border-primary bg-primarybadge text-primary'
                    : 'bg-gray-100 text-muted border-0'
                )}
              >
                {isCompleted ? <Check className='h-4 w-4' /> : step.number}
              </div>
              <div className='hidden sm:block'>
                <p className={cn('text-sm font-semibold', isActive || isCompleted ? 'text-muted-foreground' : 'text-muted')}>
                  {step.title}
                </p>
                <p className='text-xs text-muted'>{step.subtitle}</p>
              </div>
            </div>
            {index < STEPS.length - 1 && (
              <div className={cn('flex-1 h-px mx-4', isCompleted ? 'bg-primary' : 'bg-gray-200')} />
            )}
          </div>
        )
      })}
    </div>
  )
}