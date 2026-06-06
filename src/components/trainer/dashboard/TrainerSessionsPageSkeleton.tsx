'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { SessionsTableBodySkeleton } from './dashboard-skeleton-parts'

export function TrainerSessionsPageSkeleton() {
  return (
    <div className='px-10 py-6'>
      <div className='mb-6'>
        <Skeleton className='h-7 w-32' />
        <Skeleton className='mt-2 h-4 w-80 max-w-full' />
      </div>

      <div className='flex flex-col rounded-[12px] border border-gray-100 bg-white '>
        <div className='flex items-center justify-between border-b border-gray-100 px-5 py-4'>
          <Skeleton className='h-4 w-28' />
          <Skeleton className='h-3 w-16' />
        </div>
        <SessionsTableBodySkeleton rows={6} />
      </div>
    </div>
  )
}
