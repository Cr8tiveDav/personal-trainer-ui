'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  DashboardAvailabilitySidebarSkeleton,
  DashboardChartSkeleton,
  DashboardPanelSkeleton,
  StatCardSkeleton,
} from './dashboard-skeleton-parts'

export function TrainerDashboardSkeleton() {
  return (
    <div className='space-y-6 pb-10 md:pb-12'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <Skeleton className='h-8 w-64 max-w-[80vw]' />
        <Skeleton className='h-10 w-48 rounded-[8px]' />
      </div>

      <div className='grid grid-cols-1 gap-3 xl:grid-cols-4 xl:items-stretch'>
        <div className='flex h-full min-h-0 flex-col xl:col-span-3'>
          <div className='grid grid-cols-2 gap-1.5 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>

          <div className='my-2.5 grid flex-1 grid-cols-1 gap-2.5 xl:grid-cols-12 xl:items-stretch'>
            <div className='flex h-full min-h-[520px] flex-col gap-2.5 xl:col-span-7 xl:min-h-[620px]'>
              <DashboardPanelSkeleton className='min-h-0 flex-1' rows={4} />
              <DashboardChartSkeleton className='min-h-0 flex-1' />
            </div>
            <div className='flex h-full min-h-[520px] flex-col gap-2.5 xl:col-span-5 xl:min-h-[620px]'>
              <DashboardPanelSkeleton className='min-h-0 flex-1' rows={3} />
              <DashboardPanelSkeleton className='min-h-0 flex-1' rows={2} />
            </div>
          </div>
        </div>

        <div className='col-span-1 flex h-full min-h-0 flex-col'>
          <DashboardAvailabilitySidebarSkeleton className='h-full min-h-[520px] flex-1 xl:min-h-[620px]' />
        </div>
      </div>
    </div>
  )
}
