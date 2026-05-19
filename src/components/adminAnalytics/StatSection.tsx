'use client'

import { useQuery } from '@tanstack/react-query'
import { AnalyticsStatCard } from './AnalyticsStatCard'

interface AnalyticsStats {
  revenue_generated: { value: string; trend: string }
  avg_sessions_per_user: { value: number }
  session_completion_rate: { value: string }
  consultation_conversion: { value: string }
}

const EMPTY_STATS: AnalyticsStats = {
  revenue_generated: { value: '$0', trend: '+0% vs last month' },
  avg_sessions_per_user: { value: 0 },
  session_completion_rate: { value: '0%' },
  consultation_conversion: { value: '0%' },
}

async function fetchAnalyticsStats(): Promise<AnalyticsStats> {
  const res = await fetch('/api/v1/analytics/summary')
  if (!res.ok) throw new Error('Failed to fetch analytics stats')
  const data = await res.json()
  return data.data
}

export function AnalyticsStatsSection() {
  const { data } = useQuery({
    queryKey: ['analytics-stats'],
    queryFn: fetchAnalyticsStats,
  })

  const stats = data ?? EMPTY_STATS

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      <AnalyticsStatCard
        label='Revenue Generated'
        value={stats.revenue_generated.value}
        subtitle=''
        trend={stats.revenue_generated.trend}
      />
      <AnalyticsStatCard
        label='Average Sessions Per User'
        value={stats.avg_sessions_per_user.value}
        subtitle='Across active subscribers'
      />
      <AnalyticsStatCard
        label='Session Completion Rate'
        value={stats.session_completion_rate.value}
        subtitle='Consistency across sessions'
      />
      <AnalyticsStatCard
        label='Consultation Conversion'
        value={stats.consultation_conversion.value}
        subtitle='Users converted to subscriptions'
      />
    </div>
  )
}