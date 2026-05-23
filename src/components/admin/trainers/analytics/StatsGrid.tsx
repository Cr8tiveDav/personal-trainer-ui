'use client'

import React from 'react'
import StatCard from './StatCard'
import { useTrainerStatusCounts } from '@/api/trainers'
import { Skeleton } from '@/components/ui/skeleton'

const StatsGrid = () => {
  const { counts, isLoading } = useTrainerStatusCounts()
  const showSkeleton = isLoading

  const stats = [
    {
      title: 'Active Trainers',
      value: showSkeleton ? '' : (counts.active ?? 0),
      icon: '/images/admin-dashboard/icons/users-three.svg',
      variant: '#F7F7F7',
    },
    {
      title: 'Pending Approvals',
      value: showSkeleton ? '' : (counts.pending ?? 0),
      icon: '/images/admin-dashboard/icons/hourglass-high.svg',
      variant: '#FEF0EF',
    },
    {
      title: 'Sessions delivered',
      value: '0',
      icon: '/images/admin-dashboard/icons/check-circle.svg',
      variant: '#ECFDF5',
    },
    {
      title: 'Trainer earnings',
      value: '$0',
      icon: '/images/admin-dashboard/icons/trend-up.svg',
      variant: '#F7F7F7',
    },
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
      {stats.map((stat, index) =>
        showSkeleton ? (
          <div
            key={index}
            className='flex flex-col justify-between gap-2 rounded-xl border border-[#EBEBEB] bg-white p-5'
          >
            <Skeleton className='h-10 w-10 rounded-full' />
            <Skeleton className='h-9 w-20' />
            <Skeleton className='h-3 w-28' />
          </div>
        ) : (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
          />
        ),
      )}
    </div>
  )
}

export default StatsGrid
