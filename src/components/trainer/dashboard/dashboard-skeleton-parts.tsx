'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/utils'

export function StatCardSkeleton() {
  return (
    <div className='rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm'>
      <Skeleton className='h-3 w-28' />
      <Skeleton className='mt-3 h-8 w-14' />
      <Skeleton className='mt-2 h-3 w-32' />
    </div>
  )
}

type DashboardPanelSkeletonProps = {
  rows?: number
  className?: string
}

export function DashboardPanelSkeleton({
  rows = 3,
  className,
}: DashboardPanelSkeletonProps) {
  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white shadow-sm',
        className,
      )}
    >
      <div className='flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4'>
        <Skeleton className='h-4 w-28' />
        <Skeleton className='h-3 w-16' />
      </div>
      <div className='flex min-h-0 flex-1 flex-col divide-y divide-gray-50'>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className='flex items-center gap-3 px-5 py-4'>
            <Skeleton className='h-9 w-9 shrink-0 rounded-full' />
            <div className='min-w-0 flex-1 space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-24' />
            </div>
            <Skeleton className='hidden h-8 w-8 shrink-0 rounded-lg sm:block' />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm',
        className,
      )}
    >
      <Skeleton className='h-4 w-36' />
      <Skeleton className='mt-6 h-[180px] w-full rounded-lg' />
    </div>
  )
}

export function DashboardAvailabilitySidebarSkeleton({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('flex h-full min-h-0 flex-col gap-4', className)}>
      <div className='flex min-h-0 flex-1 flex-col rounded-xl border border-gray-100 bg-white shadow-sm'>
        <div className='border-b border-gray-100 px-5 py-4'>
          <Skeleton className='h-4 w-40' />
          <Skeleton className='mt-2 h-3 w-56' />
        </div>
        <div className='divide-y divide-gray-50 px-5'>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className='flex items-center justify-between py-3'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-5 w-24' />
            </div>
          ))}
        </div>
      </div>
      <div className='shrink-0 rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
        <Skeleton className='h-4 w-40' />
        <div className='mt-4 space-y-3'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='flex items-center gap-3'>
              <Skeleton className='h-4 w-4 rounded' />
              <Skeleton className='h-4 w-28' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SessionsTableBodySkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className='divide-y divide-gray-50'>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className='grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto]'
        >
          <div className='flex items-center gap-3'>
            <Skeleton className='h-9 w-9 shrink-0 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-24' />
            </div>
          </div>
          <Skeleton className='hidden h-8 w-20 sm:block' />
          <Skeleton className='hidden h-6 w-16 rounded-full sm:block' />
          <Skeleton className='ml-auto h-8 w-8 rounded-lg' />
        </div>
      ))}
    </div>
  )
}
