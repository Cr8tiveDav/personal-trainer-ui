'use client'

import { format } from 'date-fns'
import { useAdminSessions } from '@/api/sessions'
import { useTrainerStatusCounts } from '@/api/trainers'

export function DashboardGreeting() {
  const today = format(new Date(), 'EEEE, MMMM d')
  const { data: sessions } = useAdminSessions()
  const { counts } = useTrainerStatusCounts()

  const sessionCount = sessions?.length ?? 0
  const awaitingCount = counts.pending ?? 0

  const sessionLabel = sessionCount === 1 ? 'session' : 'sessions'
  const trainerLabel = awaitingCount === 1 ? 'trainer' : 'trainers'

  return (
    <div className='mb-6 rounded-sm border border-[#EBEBEB] bg-white'>
      <div className='flex flex-col gap-2 p-5'>
        <p className='w-fit rounded-sm bg-secondary p-1.5 text-sm text-muted-foreground'>
          {today}
        </p>
        <h1 className='text-xl font-semibold text-gray-900'>
          Your platform is up & running smoothly
        </h1>
        <p className='text-base text-[#1C1C1C]'>
          {sessionCount} {sessionLabel} · {awaitingCount} pending {trainerLabel}{' '}
         
        </p>
      </div>
    </div>
  )
}
