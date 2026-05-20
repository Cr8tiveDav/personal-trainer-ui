'use client'

import { useState } from 'react'
import { CheckCircle2, CalendarPlus, Star, RefreshCcw, Dumbbell, DollarSign, Users, XCircle, Clock } from 'lucide-react'
import type { ClientDetail, SessionStatus } from './mock-data'

const ACTIVITY_ICONS = {
  completed: <CheckCircle2 className='h-4 w-4 text-green-500' />,
  booked: <CalendarPlus className='h-4 w-4 text-blue-500' />,
  review: <Star className='h-4 w-4 text-yellow-400' />,
  rescheduled: <RefreshCcw className='h-4 w-4 text-gray-400' />,
}

const TABS = ['Overview', 'Trainer', 'Sessions', 'Payment', 'Feedback']

function OverviewTab({ client }: { client: ClientDetail }) {
  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h4 className='mb-2 text-base font-semibold text-gray-900'>About</h4>
        <p className='text-sm leading-relaxed text-gray-500'>{client.about}</p>
      </div>

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {[
          { icon: <Dumbbell className='h-5 w-5 text-gray-400' />, value: client.totalSessions, label: 'Sessions' },
          { icon: <DollarSign className='h-5 w-5 text-gray-400' />, value: `$${client.earnings.toLocaleString()}`, label: 'Earnings' },
          { icon: <Star className='h-5 w-5 text-gray-400' />, value: client.rating, label: 'Ratings' },
          { icon: <CheckCircle2 className='h-5 w-5 text-gray-400' />, value: client.activeClients, label: 'Active clients' },
        ].map(({ icon, value, label }) => (
          <div key={label} className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
            <div className='mb-3'>{icon}</div>
            <p className='text-2xl font-bold text-gray-900'>{value}</p>
            <p className='mt-1 text-sm text-gray-400'>{label}</p>
          </div>
        ))}
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h4 className='mb-4 text-base font-semibold text-gray-900'>Recent activity</h4>
        <ul className='divide-y divide-gray-50'>
          {client.recentActivity.map((item) => (
            <li key={item.id} className='flex items-center justify-between py-3'>
              <div className='flex items-center gap-3'>
                {ACTIVITY_ICONS[item.type]}
                <span className='text-sm text-gray-700'>{item.text}</span>
              </div>
              <span className='shrink-0 text-xs text-gray-400'>{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const SESSION_STATUS_STYLES: Record<SessionStatus, string> = {
  Completed: 'bg-green-50 text-green-600',
  Upcoming: 'bg-blue-50 text-blue-600',
  Rescheduled: 'bg-orange-50 text-orange-500',
  Cancelled: 'bg-red-50 text-red-500',
}

function SessionsTab({ client }: { client: ClientDetail }) {
  const { sessionStats, sessions } = client

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {[
          { icon: <Users className='h-5 w-5 text-blue-400' />, value: sessionStats.upcoming, label: 'Upcoming' },
          { icon: <CheckCircle2 className='h-5 w-5 text-green-500' />, value: sessionStats.completed, label: 'Completed' },
          { icon: <Clock className='h-5 w-5 text-orange-400' />, value: sessionStats.rescheduled, label: 'Rescheduled' },
          { icon: <XCircle className='h-5 w-5 text-red-400' />, value: sessionStats.cancelled, label: 'Cancelled' },
        ].map(({ icon, value, label }) => (
          <div key={label} className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
            <div className='mb-3'>{icon}</div>
            <p className='text-2xl font-bold text-gray-900'>{value}</p>
            <p className='mt-1 text-sm text-gray-400'>{label}</p>
          </div>
        ))}
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white shadow-sm'>
        <div className='border-b border-gray-100 px-6 py-4'>
          <h4 className='text-base font-semibold text-gray-900'>All sessions</h4>
        </div>
        {sessions.length === 0 ? (
          <div className='flex min-h-[200px] items-center justify-center'>
            <p className='text-sm text-gray-400'>No sessions found.</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-400'>
                  <th className='px-6 py-3'>Client</th>
                  <th className='px-6 py-3'>Type</th>
                  <th className='px-6 py-3'>Date</th>
                  <th className='px-6 py-3'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {sessions.map((session) => (
                  <tr key={session.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 font-medium text-gray-900'>{session.client}</td>
                    <td className='px-6 py-4 text-gray-500'>{session.type}</td>
                    <td className='px-6 py-4 text-gray-500'>{session.date}</td>
                    <td className='px-6 py-4'>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${SESSION_STATUS_STYLES[session.status]}`}>
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export function ClientDetailTabs({ client }: { client: ClientDetail }) {
  const [active, setActive] = useState('Overview')

  return (
    <div className='space-y-6'>
      <div className='border-b border-gray-200'>
        <div className='flex gap-6 overflow-x-auto'>
          {TABS.map((tab) => (
            <button
              key={tab}
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
      {active === 'Sessions' && <SessionsTab client={client} />}
      {active === 'Payment' && <EmptyTab name='Payment' />}
      {active === 'Feedback' && <EmptyTab name='Feedback' />}
    </div>
  )
}
