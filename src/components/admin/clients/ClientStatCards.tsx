'use client'

import { Users, UserX, CalendarCheck, TrendingUp } from 'lucide-react'
import { useAdminUserTrainerCount } from '@/api/clients'
import { Skeleton } from '@/components/ui/skeleton'

const stats = [
  {
    label: 'Active clients',
    key: 'active' as const,
    icon: Users,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
  },
  {
    label: 'Inactive client',
    key: 'inactive' as const,
    icon: UserX,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-50',
  },
  {
    label: 'Sessions booked',
    key: 'sessions' as const,
    icon: CalendarCheck,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
  },
  {
    label: 'Revenue generated',
    key: 'revenue' as const,
    icon: TrendingUp,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
  },
]

export function ClientStatCards() {
  const { data, isLoading } = useAdminUserTrainerCount()
  const counts = data?.data
  const showSkeleton = isLoading && data === undefined

  function getValue(key: (typeof stats)[number]['key']) {
    if (key === 'active') {
      return (counts?.total_clients ?? 0).toLocaleString()
    }
    return '0'
  }

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className='rounded-[12px] border border-gray-100 bg-white p-5 shadow-sm'
          >
            <div
              className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-[8px] ${stat.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            {showSkeleton ? (
              <Skeleton className='mb-2 h-8 w-20' />
            ) : (
              <p className='text-2xl font-bold text-gray-900'>{getValue(stat.key)}</p>
            )}
            <p className='mt-1 text-sm text-gray-500'>{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
