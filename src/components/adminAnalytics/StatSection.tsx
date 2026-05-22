'use client'

import { useAnalyticsSummary } from '@/api/analytics'
import type { AnalyticsStats } from '@/api/types/analytics'
import { AnalyticsStatCard } from './AnalyticsStatCard'

const EMPTY_STATS: AnalyticsStats = {
  revenue_generated: { value: '$0', trend: '+0% vs last month' },
  avg_sessions_per_user: { value: 0 },
  session_completion_rate: { value: '0%' },
  consultation_conversion: { value: '0%' },
}

export function AnalyticsStatsSection() {
  const { data: response } = useAnalyticsSummary()
  const stats = response?.data ?? EMPTY_STATS

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
