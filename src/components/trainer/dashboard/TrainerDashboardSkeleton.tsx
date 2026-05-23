'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TrainerDashboardSkeleton() {
  return (
    <div className='space-y-6 pb-6'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-7 w-56' />
          <Skeleton className='h-4 w-72 max-w-full' />
        </div>
        <Skeleton className='h-10 w-40 rounded-lg' />
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-28 rounded-xl' />
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='flex flex-col gap-6 lg:col-span-2'>
          <Skeleton className='h-64 rounded-xl' />
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <Skeleton className='h-52 rounded-xl' />
            <Skeleton className='h-52 rounded-xl' />
          </div>
          <Skeleton className='h-48 rounded-xl' />
        </div>
        <Skeleton className='h-96 rounded-xl lg:col-span-1' />
      </div>
    </div>
  )
}
