'use client'

import Link from 'next/link'
import { useTopTrainers } from '@/api/dashboard'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { TrainerRow } from './TrainerRow'

export function TopTrainers() {
  const { data: response } = useTopTrainers()
  const list = response?.data ?? []

  return (
    <div className='flex-1 rounded-xl border border-gray-100 bg-white p-5 shadow-sm h-full'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-base font-semibold text-gray-900'>Top trainers this month</h2>
        <Link href='/admin/trainers' className='text-sm font-medium text-primary hover:underline'>
          View all
        </Link>
      </div>

      {list.length === 0 ? (
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.topTrainer}
          imageAlt='No top trainers'
          title='No trainer rankings yet'
          description='Top performers will appear here once trainers complete sessions this month.'
        />
      ) : (
        <div className='divide-y divide-gray-50'>
          {list.map((trainer) => (
            <TrainerRow key={trainer.rank} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  )
}
