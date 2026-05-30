'use client'

import { Users, UserX, CalendarCheck, TrendingUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface StatCounts {
  all: number
  active: number
  inactive: number
  paused: number
}

interface ClientStatCardsProps {
  counts: StatCounts
  isLoading?: boolean
}

export function ClientStatCards({ counts, isLoading }: ClientStatCardsProps) {
  const stats = [
    {
      label: 'Active clients',
      value: counts.active.toLocaleString(),
      icon: Users,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
    },
    {
      label: 'Inactive clients',
      value: (counts.inactive + counts.paused).toLocaleString(),
      icon: UserX,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-50',
    },
    {
      label: 'Total clients',
      value: counts.all.toLocaleString(),
      icon: CalendarCheck,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50',
    },
    {
      label: 'Revenue generated',
      value: '—',
      icon: TrendingUp,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
    },
  ]

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className='rounded-[12px] border border-gray-100 bg-white p-5'
          >
            <div
              className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-[8px] ${stat.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            {isLoading ? (
              <Skeleton className='mb-2 h-8 w-20' />
            ) : (
              <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
            )}
            <p className='mt-1 text-sm text-gray-500'>{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}