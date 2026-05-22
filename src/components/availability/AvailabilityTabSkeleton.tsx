'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { WEEK_DAYS } from '@/lib/availability/week-days'

function AvailabilitySetupPanelSkeleton() {
  return (
    <div className='flex flex-col lg:flex-row gap-0 bg-white rounded-xl border border-gray-100 overflow-hidden'>
      <div className='flex-1 p-6 lg:border-r lg:border-gray-100'>
        <Skeleton className='h-4 w-28 mb-2' />
        <Skeleton className='h-3 w-full max-w-md mb-5' />

        <div className='flex flex-wrap gap-2 mb-6'>
          {WEEK_DAYS.map((day) => (
            <Skeleton
              key={day.value}
              className='min-w-[72px] h-[52px] rounded-lg'
            />
          ))}
        </div>

        <div className='rounded-lg border border-gray-100 bg-gray-50/80 p-4 mb-6'>
          <Skeleton className='h-3 w-32 mb-4' />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-11 w-full rounded-lg' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-11 w-full rounded-lg' />
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Skeleton className='h-10 w-36 rounded-lg' />
        </div>
      </div>

      <div className='w-full lg:w-72 p-6 flex flex-col gap-8 bg-gray-50/30'>
        <div>
          <Skeleton className='h-4 w-36 mb-3' />
          <Skeleton className='h-6 w-11 rounded-full' />
        </div>
        <div>
          <Skeleton className='h-4 w-20 mb-3' />
          <Skeleton className='h-4 w-40' />
        </div>
      </div>
    </div>
  )
}

function AvailabilityScheduleSkeleton() {
  return (
    <div className='bg-white rounded-xl border border-gray-100 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-3 w-56' />
        </div>
        <Skeleton className='h-4 w-28' />
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='flex-1 border border-gray-100 rounded-xl p-4 sm:p-6 min-w-0'>
          <div className='min-w-[640px]'>
            <div className='flex gap-2 mb-1'>
              <div className='w-[88px] shrink-0' />
              <div className='flex-1 flex gap-1'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className='h-3 flex-1' />
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
              {WEEK_DAYS.map((day) => (
                <div key={day.value} className='flex items-center gap-2'>
                  <div className='w-[88px] shrink-0 space-y-1 py-1'>
                    <Skeleton className='h-3 w-10' />
                    <Skeleton className='h-2.5 w-12' />
                  </div>
                  <Skeleton className='flex-1 h-10 rounded-md' />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full lg:w-64 flex flex-col gap-4'>
          <div className='border border-gray-100 rounded-xl p-5 space-y-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-5 w-16 rounded-full' />
            </div>
            <Skeleton className='h-3 w-full' />
            <Skeleton className='h-3 w-[75%]' />
          </div>
          <div className='border border-gray-100 rounded-xl p-5 space-y-3'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-3 w-full' />
            <Skeleton className='h-3 w-[66%]' />
          </div>
        </div>
      </div>
    </div>
  )
}

type AvailabilityTabSkeletonProps = {
  /** When true, includes add-availability header + weekly schedule (trainer already has slots). */
  showFullLayout?: boolean
}

export function AvailabilityTabSkeleton({
  showFullLayout = true,
}: AvailabilityTabSkeletonProps) {
  if (!showFullLayout) {
    return <AvailabilitySetupPanelSkeleton />
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-3'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-full max-w-lg' />
        </div>
        <AvailabilitySetupPanelSkeleton />
      </div>
      <AvailabilityScheduleSkeleton />
    </div>
  )
}
