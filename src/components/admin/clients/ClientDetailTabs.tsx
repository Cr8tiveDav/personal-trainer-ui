'use client'

import { useMemo, useState } from 'react'
import { Calendar, DollarSign, Dumbbell, User } from 'lucide-react'
import { useClientSessions } from '@/api/sessions'
import type { Client } from './types'
import { ClientStatusBadge } from './ClientStatusBadge'
import { ClientSessionsTab } from './ClientSessionsTab'

const TABS = ['Overview', 'Trainer', 'Sessions', 'Payment', 'Feedback'] as const

function formatRevenue(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function OverviewTab({ client }: { client: Client }) {
  const { data: sessions = [], isLoading } = useClientSessions(client.id)

  const sessionCount = isLoading
    ? '—'
    : sessions.length > 0
      ? sessions.length
      : client.sessions

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {[
          {
            icon: <Dumbbell className='h-5 w-5 text-gray-400' />,
            value: sessionCount,
            label: 'Sessions booked',
          },
          {
            icon: <DollarSign className='h-5 w-5 text-gray-400' />,
            value: formatRevenue(client.revenue),
            label: 'Revenue',
          },
          {
            icon: <Calendar className='h-5 w-5 text-gray-400' />,
            value: client.joinedAt,
            label: 'Joined',
          },
          {
            icon: <User className='h-5 w-5 text-gray-400' />,
            value: <ClientStatusBadge status={client.status} />,
            label: 'Status',
          },
        ].map(({ icon, value, label }) => (
          <div
            key={label}
            className='rounded-[12px] border border-gray-100 bg-white p-5 shadow-sm'
          >
            <div className='mb-3'>{icon}</div>
            <p className='text-2xl font-bold text-gray-900'>{value}</p>
            <p className='mt-1 text-sm text-gray-400'>{label}</p>
          </div>
        ))}
      </div>

      <div className='rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm'>
        <h4 className='mb-2 text-base font-semibold text-gray-900'>Account</h4>
        <p className='text-sm leading-relaxed text-gray-500'>
          Client profile for {client.name}. Open the Sessions tab to see every
          session with assigned trainers, schedule, and status.
        </p>
      </div>
    </div>
  )
}

function ClientTrainersTab({ clientId }: { clientId: string }) {
  const { data: sessions = [], isLoading, isError } = useClientSessions(clientId)

  const trainers = useMemo(() => {
    const seen = new Set<string>()
    return sessions
      .filter((session) => {
        const name = session.trainer.name
        if (!name || name === 'Unknown Trainer' || seen.has(name)) return false
        seen.add(name)
        return true
      })
      .map((session) => session.trainer)
  }, [sessions])

  if (isLoading) {
    return (
      <div className='flex min-h-[200px] items-center justify-center rounded-[16px] border border-gray-100 bg-white'>
        <div className='h-8 w-8 animate-spin rounded-[9999px] border-b-2 border-primary' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex min-h-[200px] items-center justify-center rounded-[16px] border border-gray-100 bg-white p-6 text-center text-sm text-red-500'>
        Failed to load trainer details.
      </div>
    )
  }

  if (trainers.length === 0) {
    return (
      <div className='flex min-h-[200px] items-center justify-center rounded-[16px] border border-dashed border-gray-200 bg-white'>
        <p className='text-sm text-gray-400'>No trainers linked to sessions yet.</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      {trainers.map((trainer) => (
        <div
          key={trainer.name}
          className='flex items-center gap-3 rounded-[12px] border border-gray-100 bg-white p-4 shadow-sm'
        >
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[9999px] bg-purple-50 text-sm font-bold uppercase text-purple-600'>
            {trainer.name.charAt(0)}
          </div>
          <div>
            <p className='text-sm font-semibold text-gray-900'>{trainer.name}</p>
            <p className='text-xs text-gray-400'>{trainer.country}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyTab({ name }: { name: string }) {
  return (
    <div className='flex min-h-[200px] items-center justify-center rounded-[16px] border border-dashed border-gray-200 bg-white'>
      <p className='text-sm text-gray-400'>{name} data will appear here.</p>
    </div>
  )
}

export function ClientDetailTabs({ client }: { client: Client }) {
  const [active, setActive] = useState<(typeof TABS)[number]>('Overview')

  return (
    <div className='space-y-6'>
      <div className='border-b border-gray-200'>
        <div className='flex gap-6 overflow-x-auto'>
          {TABS.map((tab) => (
            <button
              key={tab}
              type='button'
              onClick={() => setActive(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
                active === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {active === 'Overview' && <OverviewTab client={client} />}
      {active === 'Trainer' && <ClientTrainersTab clientId={client.id} />}
      {active === 'Sessions' && <ClientSessionsTab clientId={client.id} />}
      {active === 'Payment' && <EmptyTab name='Payment' />}
      {active === 'Feedback' && <EmptyTab name='Feedback' />}
    </div>
  )
}
