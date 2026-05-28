'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TrainerReviewsPageSkeleton() {
  return (
    <div className='space-y-6 px-10 py-6'>
      <Skeleton className='h-7 w-28' />
      <div className='space-y-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-28 w-full rounded-[12px]' />
        ))}
      </div>
    </div>
  )
}
