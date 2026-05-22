'use client'

import { useGetTrainers } from '@/api/trainers'
import TrainersPageHeader from './page-header/TrainersPageHeader'
import StatsGrid from './analytics/StatsGrid'
import TrainersList from './trainers-list/TrainersList'
import { TrainersPageSkeleton } from './TrainersPageSkeleton'

export function TrainersPageClient() {
  const { data, isLoading } = useGetTrainers()
  const showSkeleton = isLoading && !data

  return (
    <div className='mx-auto w-full space-y-6 px-4 pb-6 lg:px-10'>
      <TrainersPageHeader />
      {showSkeleton ? <TrainersPageSkeleton /> : (
        <>
          <StatsGrid />
          <TrainersList />
        </>
      )}
    </div>
  )
}
