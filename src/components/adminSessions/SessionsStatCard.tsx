'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'

interface SessionStats {
  total_sessions: number
  total_sessions_change: string
  need_confirmation: number
  open_disputes: number
  trial_paid_rate: string
  trial_paid_rate_change: string
  no_show_rate: string
  no_show_rate_change: string
}

interface SessionStatCardProps {
  label: string
  value: string | number
  subtext: string
  trendColor?: 'green' | 'red'
}

function SessionStatCard({ label, value, subtext, trendColor }: SessionStatCardProps) {
  const trendClass = trendColor === 'green' ? 'text-[#0f973d]' : trendColor === 'red' ? 'text-[#d92d20]' : 'text-gray-400'
  const firstWord = subtext.split(' ')[0]
  const restText = subtext.substring(subtext.indexOf(' '))

  return (
    <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
      <p className='text-[10px] font-bold uppercase tracking-wider text-gray-400'>{label}</p>
      <h3 className='mt-2 text-2xl font-bold text-gray-900'>{value}</h3>
      <p className='mt-1 text-xs font-medium text-gray-400'>
        <span className={trendClass}>{firstWord}</span>
        {restText}
      </p>
    </div>
  )
}

async function fetchSessionStats(): Promise<SessionStats> {
  const res = await fetch('/api/v1/sessions/stats')
  if (!res.ok) throw new Error('Failed to fetch session stats')
  const data = await res.json()
  return data.data
}

export function SessionsStatsSection() {
  const { data } = useQuery({
    queryKey: ['session-stats'],
    queryFn: fetchSessionStats,
  })

  const stats = data ?? {
    total_sessions: 342,
    total_sessions_change: '+12% vs April',
    need_confirmation: 11,
    open_disputes: 4,
    trial_paid_rate: '62%',
    trial_paid_rate_change: '+4pts this month',
    no_show_rate: '6.2%',
    no_show_rate_change: '+1pt vs April',
  }

  return (
    <div className='w-full space-y-6'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
        <SessionStatCard
          label='Total Sessions (May)'
          value={stats.total_sessions}
          subtext={stats.total_sessions_change}
          trendColor='green'
        />
        <SessionStatCard
          label='Need Confirmation'
          value={stats.need_confirmation}
          subtext='awaiting resolution'
        />
        <SessionStatCard
          label='Open Disputes'
          value={stats.open_disputes}
          subtext='awaiting resolution'
          trendColor='red'
        />
        <SessionStatCard
          label='Trial → Paid Rate'
          value={stats.trial_paid_rate}
          subtext={stats.trial_paid_rate_change}
          trendColor='green'
        />
        <SessionStatCard
          label='No-Show Rate'
          value={stats.no_show_rate}
          subtext={stats.no_show_rate_change}
          trendColor='red'
        />
      </div>

      <div className='flex items-start gap-3 rounded-xl border border-[#ffeccc] bg-[#fffcf5] p-4 text-[#b25e00]'>
        <AlertCircle className='h-5 w-5 shrink-0 text-[#f59e0b]' />
        <div className='text-xs leading-relaxed'>
          <p className='font-bold text-[#944a00]'>4 sessions need your attention</p>
          <p className='mt-0.5 text-[#b25e00]/90'>
            2 disputes awaiting admin decision, 1 trainer flagged for repeated no-shows (3 this month), and 1 suspected trial abuse — client has booked free trials with 3 different trainers.
          </p>
        </div>
      </div>
    </div>
  )
}