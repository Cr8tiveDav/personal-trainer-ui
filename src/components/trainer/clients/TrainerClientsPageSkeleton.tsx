'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TrainerClientsPageSkeleton() {
  return (
    <div className='pb-6'>
      <div className='mb-6'>
        <Skeleton className='h-7 w-28' />
        <Skeleton className='mt-2 h-4 w-64' />
      </div>

      <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
        <div className='flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <Skeleton className='h-10 w-full max-w-md' />
          <Skeleton className='h-10 w-48' />
        </div>

        <div className='divide-y divide-gray-50'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='grid grid-cols-2 gap-4 px-5 py-4 md:grid-cols-5'
            >
              <div className='col-span-2 flex items-center gap-3'>
                <Skeleton className='h-9 w-9 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-3 w-40' />
                </div>
              </div>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-20' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
