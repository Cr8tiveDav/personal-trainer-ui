'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function ClientDetailsSkeleton() {
  return (
    <div className='w-full max-w-[1400px] mx-auto space-y-6 px-4 pb-6'>
      <Skeleton className='h-4 w-32' />
      <div className='flex flex-col gap-6 lg:flex-row'>
        <div className='relative flex-1 rounded-[16px] border border-gray-100 bg-white shadow-sm'>
          <Skeleton className='h-44 w-full rounded-t-[16px]' />
          <Skeleton className='absolute left-6 top-[112px] h-32 w-32 rounded-[9999px] border-4 border-white' />
          <div className='space-y-2 rounded-b-[16px] px-6 pb-5 pl-[180px] pt-20'>
            <Skeleton className='h-4 w-48' />
            <Skeleton className='h-4 w-56' />
          </div>
        </div>
        <div className='w-full rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm lg:w-[280px]'>
          <Skeleton className='mb-5 h-6 w-20' />
          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-28' />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Skeleton className='h-10 w-full max-w-md' />
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-28 rounded-[12px]' />
        ))}
      </div>
    </div>
  )
}
