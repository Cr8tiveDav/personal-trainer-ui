'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TrainerDashboardSkeleton() {
  return (
    <div className='mx-auto max-w-[1400px] space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-10 w-48 rounded-lg' />
      </div>

      <div className='grid grid-cols-1 gap-3 xl:grid-cols-4 xl:items-stretch'>
        <div className='flex h-full min-h-0 flex-col xl:col-span-3'>
          <div className='grid grid-cols-2 gap-1.5 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-24 rounded-xl' />
            ))}
          </div>
          <div className='my-2.5 grid flex-1 grid-cols-1 gap-2.5 xl:grid-cols-12 xl:items-stretch'>
            <div className='flex h-full min-h-[520px] flex-col gap-2.5 xl:col-span-7 xl:min-h-[620px]'>
              <Skeleton className='min-h-0 flex-1 rounded-xl' />
              <Skeleton className='min-h-0 flex-1 rounded-xl' />
            </div>
            <div className='flex h-full min-h-[520px] flex-col gap-2.5 xl:col-span-5 xl:min-h-[620px]'>
              <Skeleton className='min-h-0 flex-1 rounded-xl' />
              <Skeleton className='min-h-0 flex-1 rounded-xl' />
            </div>
          </div>
        </div>
        <div className='col-span-1 flex h-full min-h-0 flex-col'>
          <Skeleton className='h-full min-h-[520px] flex-1 rounded-xl xl:min-h-[620px]' />
        </div>
      </div>
    </div>
  )
}
