'use client'

import { useAdminUserTrainerCount } from '@/api/clients'
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
  const { data, isLoading: dashboardLoading } = useDashboardStats()
  const { data: countData, isLoading: countLoading } = useAdminUserTrainerCount()

  const stats = data?.data ?? EMPTY_STATS
  const totalClients = countData?.data?.total_clients ?? 0
  const totalTrainers = countData?.data?.total_approved_trainers ?? 0

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      <StatCard
        title='Total Clients'
        value={totalClients}
        isLoading={countLoading}
      />
      <StatCard
        title='Active Subscription'
        value={stats.active_subscriptions.value}
        trend={stats.active_subscriptions.trend}
        isUp={stats.active_subscriptions.is_up}
        isLoading={dashboardLoading}
      />
      <StatCard
        title='Trial Users'
        value={stats.trial_users.value}
        trend={stats.trial_users.trend}
        isUp={stats.trial_users.is_up}
        isLoading={dashboardLoading}
      />
      <StatCard
        title='Total Trainers'
        value={totalTrainers}
        isLoading={countLoading}
      />
    </div>
  )
}
