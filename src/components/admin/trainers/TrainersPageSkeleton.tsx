'use client'

import { Skeleton } from '@/components/ui/skeleton'
import TrainerTableSkeleton from './trainers-list/table/TrainerTableSkeleton'

function StatCardSkeleton() {
  return (
    <div className='flex flex-col justify-between gap-2 rounded-[12px] border border-[#EBEBEB] bg-white p-5'>
      <Skeleton className='h-10 w-10 rounded-[9999px]' />
      <Skeleton className='h-9 w-20' />
      <Skeleton className='h-3 w-28' />
    </div>
  )
}

function TrainersListSkeleton() {
  return (
    <div className='flex flex-col rounded-[24px] border border-[#CBD5E1] bg-white'>
      <div className='py-6 px-4'>
        <section className='flex w-full flex-col items-start gap-6'>
          <div className='flex w-full gap-6 border-b border-[#CBD5E1] pb-3'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-5 w-28' />
            ))}
          </div>

          <div className='flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-11.5'>
            <Skeleton className='h-10 w-full rounded-[8px] md:flex-1' />
            <div className='flex items-center gap-4'>
              <Skeleton className='h-10 w-24 rounded-[8px]' />
              <Skeleton className='h-10 w-24 rounded-[8px]' />
            </div>
          </div>
        </section>
      </div>

      <div className='overflow-x-auto min-h-100'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='h-15 border-b border-gray-200 bg-[#F5F5F5]'>
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i} className='px-6 py-4'>
                  <Skeleton className='h-3 w-16' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TrainerTableSkeleton />
          </tbody>
        </table>
      </div>

      <div className='flex flex-col items-center justify-center gap-4 border-t border-gray-200 py-6'>
        <div className='flex items-center gap-1 md:gap-3'>
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className='h-9 w-9 rounded-[6px]' />
          ))}
        </div>
        <Skeleton className='mt-4 h-4 w-40' />
      </div>
    </div>
  )
}

export function TrainersPageSkeleton() {
  return (
    <>
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <TrainersListSkeleton />
    </>
  )
}
