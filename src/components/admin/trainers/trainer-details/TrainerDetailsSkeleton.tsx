'use client'

import { Skeleton } from '@/components/ui/skeleton'

function ProfileHeaderSkeleton() {
  return (
    <div className='w-full min-h-88 md:h-88 pb-6 md:pb-0 bg-white rounded-[16px] border border-gray-100 overflow-hidden flex flex-col relative'>
      <div className='h-44 w-full bg-[#1a2b3c]/80 relative flex items-end pb-4 pl-32.5 md:pl-55'>
        <div className='flex items-center gap-3 z-10 pr-4'>
          <Skeleton className='h-8 w-48 max-w-[60%] bg-white/20' />
          <Skeleton className='h-7 w-24 rounded-[6px] bg-white/20' />
        </div>
      </div>

      <div className='absolute top-28.75 left-4 md:left-8 z-20'>
        <Skeleton className='h-25 w-25 md:h-42.5 md:w-42.5 rounded-[9999px] border-[3px] border-[#EBEBEB]' />
      </div>

      <div className='pl-4 md:pl-55 pr-4 md:pr-8 pt-12 md:pt-6 flex flex-col md:flex-row md:items-start justify-between gap-6'>
        <div className='flex flex-col gap-3.5'>
          <Skeleton className='h-4 w-56' />
          <Skeleton className='h-4 w-40' />
        </div>
        <Skeleton className='h-12 w-full md:w-34.25 rounded-[8px] shrink-0' />
      </div>
    </div>
  )
}

function QuickDetailsSkeleton() {
  return (
    <div className='w-full h-full bg-white rounded-[16px] border border-[#EBEBEB] py-6 px-4 flex flex-col min-h-[320px]'>
      <Skeleton className='h-7 w-24 mb-4' />
      <Skeleton className='h-px w-full mb-8' />
      <div className='flex flex-col gap-6.5 flex-1'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='flex items-center justify-between gap-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-20' />
          </div>
        ))}
      </div>
    </div>
  )
}

function TabContentSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='bg-white rounded-[12px] border border-[#EBEBEB] py-8 px-8 md:px-12'>
        <Skeleton className='h-7 w-24 mb-4' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full max-w-3xl' />
          <Skeleton className='h-4 w-full max-w-2xl' />
          <Skeleton className='h-4 w-3/4 max-w-xl' />
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className='bg-white rounded-[12px] border border-[#EBEBEB] p-5 flex flex-col gap-3'
          >
            <Skeleton className='h-10 w-10 rounded-[8px]' />
            <Skeleton className='h-3 w-16' />
            <Skeleton className='h-7 w-20' />
          </div>
        ))}
      </div>

      <div className='bg-white rounded-[16px] border border-[#EBEBEB] overflow-hidden'>
        <div className='p-6 pb-5'>
          <Skeleton className='h-7 w-36' />
        </div>
        <div className='border-t border-[#EBEBEB] divide-y divide-[#EBEBEB]'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex items-center justify-between px-6 py-4'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-8 w-8 rounded-[9999px]' />
                <Skeleton className='h-4 w-64 max-w-[50vw]' />
              </div>
              <Skeleton className='h-4 w-20' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TrainerDetailsSkeleton() {
  return (
    <div className='w-full mx-auto space-y-6 px-4 pb-12'>
      <Skeleton className='h-4 w-32' />

      <div className='flex flex-col lg:flex-row gap-6 w-full'>
        <div className='flex-1 lg:w-2/3'>
          <ProfileHeaderSkeleton />
        </div>
        <div className='w-full lg:w-1/3'>
          <QuickDetailsSkeleton />
        </div>
      </div>

      <div className='w-full mt-8'>
        <div className='flex gap-6 border-b border-gray-200 pb-px overflow-x-auto'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='h-5 w-20 mb-3 shrink-0' />
          ))}
        </div>
        <div className='mt-6'>
          <TabContentSkeleton />
        </div>
      </div>
    </div>
  )
}
