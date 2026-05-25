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
  return (
    <div className='rounded-[8px] bg-white p-6'>
      <h2 className='text-base font-semibold text-gray-900'>Review & create</h2>
      <p className='mt-1 mb-6 text-sm text-gray-500'>
        Confirm the details below. Login credentials will be emailed to the trainer automatically.
      </p>

      <div className='mb-6 flex items-start gap-4 rounded-[12px] border border-[#0b4d8d]/20 bg-[#f4f9fd] p-4'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#0b4d8d] text-white'>
          <Mail className='h-5 w-5' />
        </div>
        <div>
          <p className='text-sm font-semibold text-gray-900'>Credentials emailed automatically</p>
          <p className='text-xs text-gray-500 mt-1'>
            Login details will be sent to {basicInfo.email}.
          </p>
        </div>
      </div>

      <div className='rounded-[12px] bg-gray-50 p-5 mb-6'>
        <p className='text-sm font-semibold text-muted mb-4'>Summary</p>
        <div className='space-y-3'>
          {[
            { label: 'Name', value: basicInfo.name },
            { label: 'Email', value: basicInfo.email },
            { label: 'Phone', value: basicInfo.phone_number },
            { label: 'Gender', value: basicInfo.gender },
            {
              label: 'Specialty',
              value: basicInfo.specializations?.[0],
              capitalize: true,
            },
            { label: 'Years of experience', value: String(basicInfo.years_of_experience) },
            { label: 'Bio', value: basicInfo.bio?.trim() || '—' },
            { label: 'Profile image', value: hasImage ? 'Included' : 'None' },
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
          className='flex items-center gap-2 bg-[#0b4d8d] hover:bg-[#093e72] text-white h-11 px-6 rounded-[8px] font-semibold shadow-none'
        >
          {isSubmitting ? 'Creating trainer...' : 'Create trainer'}
        </Button>
      </div>
    </div>
  )
}
