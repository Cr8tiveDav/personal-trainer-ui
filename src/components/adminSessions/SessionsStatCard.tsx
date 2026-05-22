'use client'

import { useAdminSessions } from '@/hooks/adminSessions/useAdminSessions'

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
      <p className='text-sm font-bold uppercase text-muted'>{label}</p>
      <h3 className={`mt-2 font-bold ${valueSizeClass} ${valueClass}`}>{value ?? '-'}</h3>
      {subtext && <p className='mt-1 text-xs font-medium text-muted'>{subtext}</p>}
    </div>
  )
}

export function SessionsStatsSection() {
  const { data: sessions, isError, isLoading } = useAdminSessions()

  const totalSessions = sessions?.length
  const needsClientConfirmation = sessions?.filter(
    (session) => session.clientConf === 'Pending' || session.clientConf === 'N/A'
  ).length

  return (
    <div className='w-full space-y-4'>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
        <SessionStatCard
          label='Total Sessions'
          value={isLoading && !sessions ? 'Loading' : totalSessions}
          isLoading={isLoading && !sessions}
          subtext='this month'
        />
        <SessionStatCard
          label='Need Confirmation'
          value={needsClientConfirmation}
          subtext='awaiting resolution'
          valueColor='amber'
        />
        <SessionStatCard label='Open Disputes' />
        <SessionStatCard label='Trial to Paid Rate' />
        <SessionStatCard label='No-Show Rate' />
      </div>

      {isError && !sessions && (
        <div className='rounded-lg border border-gray-100 bg-white p-4 text-xs font-medium text-gray-400'>
          Session metrics could not be loaded.
        </div>
      )}
    </div>
  )
}
