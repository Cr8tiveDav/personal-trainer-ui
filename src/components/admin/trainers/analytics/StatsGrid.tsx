'use client'

import React from 'react'
import StatCard from './StatCard'
import { useGetTrainers } from '@/api/trainers'

const StatsGrid = () => {
  const { data } = useGetTrainers()

  const stats = [
    {
      title: 'Active Trainers',
      value: data?.counts?.active ?? '...',
      icon: '/images/admin-dashboard/icons/users-three.svg',
      variant: '#F7F7F7',
    },
    {
      title: 'Pending Approvals',
      value: data?.counts?.pending ?? '...',
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
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
        />
      ))}
    </div>
  )
}

export default StatsGrid
