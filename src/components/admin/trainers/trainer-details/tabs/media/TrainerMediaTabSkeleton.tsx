'use client'

import { Skeleton } from '@/components/ui/skeleton'

type TrainerMediaTabSkeletonProps = {
  variant: 'image' | 'video'
}

export function TrainerMediaTabSkeleton({ variant }: TrainerMediaTabSkeletonProps) {
  if (variant === 'video') {
    return (
      <div className='space-y-3'>
        <div>
          <Skeleton className='h-4 w-44' />
          <Skeleton className='mt-1.5 h-3 w-72 max-w-full' />
        </div>
        <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
          <div className='flex gap-4 border-b border-gray-100 px-5 py-3.5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-3 w-16' />
            ))}
          </div>
          <div className='flex items-center gap-4 px-5 py-4'>
            <Skeleton className='h-12 w-20 shrink-0 rounded-lg' />
            <div className='flex-1 space-y-1.5'>
              <Skeleton className='h-3.5 w-28' />
              <Skeleton className='h-3 w-20' />
            </div>
            <Skeleton className='h-3.5 w-12' />
            <Skeleton className='h-3.5 w-16' />
            <Skeleton className='h-3.5 w-24' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <div className='flex max-w-4xl flex-wrap gap-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className='h-48 w-48 shrink-0 rounded-xl sm:h-52 sm:w-52'
          />
        ))}
      </div>
      <Skeleton className='h-3 w-28' />
    </div>
  )
}
