import type { ReactNode } from 'react'

interface SessionStatCardProps {
  label: string
  value?: string | number
  subtext?: ReactNode
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
    <div className='rounded-[8px] border border-gray-100 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]'>
      <p className='whitespace-nowrap text-xs font-bold uppercase text-muted'>{label}</p>
      <h3 className={`mt-2 flex h-8 items-center font-bold ${valueSizeClass} ${valueClass}`}>{value ?? '-'}</h3>
      {subtext && <p className='mt-1 text-xs font-medium text-muted'>{subtext}</p>}
    </div>
  )
}

export function SessionsStatsSection({ totalSessions }: { totalSessions: number }) {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
      <SessionStatCard
        label='Total Sessions'
        value={totalSessions}
        subtext={<><span className='text-[#0f973d]'>0%</span> vs last month</>}
      />
      <SessionStatCard
        label='Need Confirmation'
        value={0}
        subtext='0 awaiting resolution'
        valueColor='amber'
      />
      <SessionStatCard
        label='Open Disputes'
        value={0}
        subtext='0 awaiting resolution'
        valueColor='red'
      />
      <SessionStatCard
        label='Trial to Paid Rate'
        value='0%'
        subtext={<><span className='text-[#0f973d]'>0pt</span> this month</>}
      />
      <SessionStatCard
        label='No-Show Rate'
        value='0%'
        subtext={<><span className='text-[#0f973d]'>0pt</span> vs last month</>}
      />
    </div>
  )
}
