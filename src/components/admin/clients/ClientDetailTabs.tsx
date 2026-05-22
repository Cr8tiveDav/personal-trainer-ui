'use client'

import { useState } from 'react'
import { Calendar, DollarSign, Dumbbell, User } from 'lucide-react'
import type { Client } from './mock-data'
import { ClientStatusBadge } from './ClientStatusBadge'

const TABS = ['Overview', 'Trainer', 'Sessions', 'Payment', 'Feedback'] as const

function formatRevenue(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function OverviewTab({ client }: { client: Client }) {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {[
          {
            icon: <Dumbbell className='h-5 w-5 text-gray-400' />,
            value: client.sessions,
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
            className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'
          >
            <div className='mb-3'>{icon}</div>
            <p className='text-2xl font-bold text-gray-900'>{value}</p>
            <p className='mt-1 text-sm text-gray-400'>{label}</p>
          </div>
        ))}
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h4 className='mb-2 text-base font-semibold text-gray-900'>
          Account
        </h4>
        <p className='text-sm leading-relaxed text-gray-500'>
          Client profile for {client.name}. Additional session, trainer, and
          payment history will appear here when those endpoints are available.
        </p>
      </div>
    </div>
  )
}

function EmptyTab({ name }: { name: string }) {
  return (
    <div className='flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white'>
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
      {active === 'Trainer' && <EmptyTab name='Trainer' />}
      {active === 'Sessions' && <EmptyTab name='Sessions' />}
      {active === 'Payment' && <EmptyTab name='Payment' />}
      {active === 'Feedback' && <EmptyTab name='Feedback' />}
    </div>
  )
}
