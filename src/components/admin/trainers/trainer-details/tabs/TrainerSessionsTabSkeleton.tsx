'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TrainerSessionsTabSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='flex flex-col justify-between gap-2 rounded-xl border border-[#EBEBEB] bg-white p-5'
          >
            <Skeleton className='h-10 w-10 rounded-full' />
            <Skeleton className='h-9 w-16' />
            <Skeleton className='h-3 w-24' />
          </div>
        ))}
      </div>

      <div className='overflow-hidden rounded-xl border border-[#EBEBEB] bg-white'>
        <div className='border-b border-gray-100 p-6'>
          <Skeleton className='h-7 w-36' />
        </div>
        <div className='min-h-64 overflow-x-auto p-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='mb-4 flex items-center gap-4'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-4 flex-1 max-w-[140px]' />
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
