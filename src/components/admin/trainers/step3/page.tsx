'use client'

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { cn } from '@/utils'
import { BasicInfoValues } from '../step1/page'

interface Step3Props {
  basicInfo: BasicInfoValues
  hasImage: boolean
  isSubmitting: boolean
  onSubmit: () => void
}

export function Step3ReviewAndCreate({
  basicInfo,
  hasImage,
  isSubmitting,
  onSubmit,
}: Step3Props) {
  const benefitCount = basicInfo.benefits?.filter((b) => b.title && b.subtext).length ?? 0

  return (
    <div className='rounded-lg bg-white p-6'>
      <h2 className='text-base font-semibold text-gray-900'>Review & create</h2>
      <p className='mt-1 mb-6 text-sm text-gray-500'>
        Confirm the details below. A 16-character password will be generated and emailed to the
        trainer — it is never stored on the server.
      </p>

      <div className='mb-6 flex items-start gap-4 rounded-xl border border-[#0b4d8d]/20 bg-[#f4f9fd] p-4'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0b4d8d] text-white'>
          <Mail className='h-5 w-5' />
        </div>
        <div>
          <p className='text-sm font-semibold text-gray-900'>Credentials emailed automatically</p>
          <p className='text-xs text-gray-500 mt-1'>
            New trainers receive login details at {basicInfo.email}. Re-inviting an existing email
            rotates the password without creating a duplicate account.
          </p>
        </div>
      </div>

      <div className='rounded-xl bg-gray-50 p-5 mb-6'>
        <p className='text-sm font-semibold text-muted mb-4'>Summary</p>
        <div className='space-y-3'>
          {[
            { label: 'Name', value: basicInfo.name },
            { label: 'Email', value: basicInfo.email },
            {
              label: 'Specializations',
              value: basicInfo.specializations.join(', '),
              capitalize: true,
            },
            {
              label: 'Training styles',
              value: basicInfo.training_styles?.length
                ? basicInfo.training_styles.join(', ')
                : '—',
            },
            { label: 'Years of experience', value: String(basicInfo.years_of_experience) },
            {
              label: 'Onboarding',
              value: basicInfo.onboarding_status,
              capitalize: true,
            },
            { label: 'Benefits', value: benefitCount ? `${benefitCount} listed` : '—' },
            { label: 'Bio', value: basicInfo.bio?.trim() || '—' },
            { label: 'Profile image', value: hasImage ? 'Will upload on create' : 'None' },
          ].map(({ label, value, capitalize }) => (
            <div key={label} className='flex items-center justify-between gap-4'>
              <p className='text-sm text-gray-500 shrink-0'>{label}</p>
              <p
                className={cn(
                  'text-sm font-medium text-gray-900 text-right',
                  capitalize && 'capitalize'
                )}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          type='button'
          onClick={onSubmit}
          disabled={isSubmitting}
          className='flex items-center gap-2 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-11 px-6 rounded-lg font-semibold shadow-none'
        >
          {isSubmitting ? 'Creating trainer...' : 'Create trainer'}
        </Button>
      </div>
    </div>
  )
}
