'use client'

import { useDashboardStats } from '@/api/dashboard'
import type { StatsData } from '@/api/types/dashboard'
import { StatCard } from './StatCard'

const EMPTY_STATS: StatsData = {
  total_clients: { value: 0, trend: 0, is_up: true },
  active_subscriptions: { value: 0, trend: 0, is_up: true },
  trial_users: { value: 0, trend: 0, is_up: true },
  total_trainers: { value: 0, trend: 0, is_up: true },
}

export function StatCardsSection() {
  const { data } = useDashboardStats()

  const stats = data?.data ?? EMPTY_STATS

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      <StatCard
        title='Total Clients'
        value={stats.total_clients.value}
        trend={stats.total_clients.trend}
        isUp={stats.total_clients.is_up}
      />
      <StatCard
        title='Active Subscription'
        value={stats.active_subscriptions.value}
        trend={stats.active_subscriptions.trend}
        isUp={stats.active_subscriptions.is_up}
      />
      <StatCard
        title='Trial Users'
        value={stats.trial_users.value}
        trend={stats.trial_users.trend}
        isUp={stats.trial_users.is_up}
      />
      <StatCard
        title='Total Trainers'
        value={stats.total_trainers.value}
        trend={stats.total_trainers.trend}
        isUp={stats.total_trainers.is_up}
      />
    </div>
  )
}
