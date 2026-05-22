'use client'

import { useSessionStats } from '@/api/sessions'

interface SessionStatCardProps {
  label: string
  value?: string | number
  subtext?: string
  valueColor?: 'default' | 'amber' | 'red'
  isLoading?: boolean
}

function SessionStatCard({ label, value, subtext, valueColor = 'default', isLoading = false }: SessionStatCardProps) {
  const valueClass =
    isLoading
      ? 'text-gray-400'
      : valueColor === 'amber'
      ? 'text-[#f59e0b]'
      : valueColor === 'red'
      ? 'text-[#d92d20]'
      : 'text-muted-foreground'
  const valueSizeClass = isLoading ? 'text-sm' : 'text-2xl'

  return (
    <div className='bg-white rounded-xl p-5'>
      <p className='whitespace-nowrap text-xs font-bold uppercase text-muted'>{label}</p>
      <h3 className={`mt-2 flex h-8 items-center font-bold ${valueSizeClass} ${valueClass}`}>{value ?? '-'}</h3>
      {subtext && <p className='mt-1 text-xs font-medium text-muted'>{subtext}</p>}
    </div>
  )
}

export function SessionsStatsSection() {
  const { data: response, isError, isLoading } = useSessionStats()
  const stats = response?.data

  return (
    <div className='w-full space-y-4'>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
        <SessionStatCard
          label='Total Sessions'
          value={isLoading && !stats ? 'Loading' : stats?.total_sessions}
          isLoading={isLoading && !stats}
          subtext={stats?.total_sessions_change ? `${stats.total_sessions_change} this month` : 'this month'}
        />
        <SessionStatCard
          label='Need Confirmation'
          value={stats?.need_confirmation}
          subtext='awaiting resolution'
          valueColor='amber'
        />
        <SessionStatCard
          label='Open Disputes'
          value={stats?.open_disputes}
          valueColor='red'
        />
        <SessionStatCard
          label='Trial to Paid Rate'
          value={stats?.trial_paid_rate}
          subtext={stats?.trial_paid_rate_change}
        />
        <SessionStatCard
          label='No-Show Rate'
          value={stats?.no_show_rate}
          subtext={stats?.no_show_rate_change}
        />
      </div>

      {isError && !stats && (
        <div className='rounded-lg border border-gray-100 bg-white p-4 text-xs font-medium text-gray-400'>
          Session metrics could not be loaded.
        </div>
      )}
    </div>
  )
}
