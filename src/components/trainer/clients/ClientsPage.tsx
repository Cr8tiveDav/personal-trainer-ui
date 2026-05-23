'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { mockClients, ClientStatus, TrainerClient } from './mock-data'
import { cn } from '~/utils'

const TABS: { label: string; value: 'All' | ClientStatus }[] = [
  { label: 'All Clients', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Suspended', value: 'Suspended' },
]

const STATUS_STYLES: Record<ClientStatus, { dot: string; text: string; bg: string }> = {
  Active: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  Pending: { dot: 'bg-orange-400', text: 'text-orange-600', bg: 'bg-orange-50' },
  Suspended: { dot: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50' },
}

function StatusBadge({ status }: { status: ClientStatus }) {
  const { dot, text, bg } = STATUS_STYLES[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  )
}

function ClientRow({ client }: { client: TrainerClient }) {
  return (
    <tr className='hover:bg-gray-50/50 transition-colors'>
      <td className='px-5 py-3.5'>
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white'>
            {client.name.charAt(0)}
          </div>
          <div>
            <p className='text-sm font-medium text-gray-900'>{client.name}</p>
            <p className='text-xs text-gray-400'>{client.email}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-3.5 text-sm text-gray-600'>{client.goal}</td>
      <td className='px-5 py-3.5 text-sm text-gray-600'>{client.sessionsCompleted}</td>
      <td className='px-5 py-3.5 text-sm text-gray-600'>{client.nextSession}</td>
      <td className='px-5 py-3.5 text-sm text-gray-500'>{client.joinedAt}</td>
      <td className='px-5 py-3.5'>
        <StatusBadge status={client.status} />
      </td>
    </tr>
  )
}

export function ClientsPage() {
  const [activeTab, setActiveTab] = useState<'All' | ClientStatus>('All')
  const [search, setSearch] = useState('')

  const filtered = mockClients.filter((c) => {
    const matchesTab = activeTab === 'All' || c.status === activeTab
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className='pb-6'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-gray-900'>Clients</h1>
        <p className='text-sm text-gray-500 mt-0.5'>Manage and view all your clients.</p>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
        <div className='flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex gap-1 overflow-x-auto'>
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  activeTab === tab.value
                    ? 'bg-primary text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2'>
              <Search className='h-4 w-4 shrink-0 text-gray-400' />
              <input
                type='text'
                placeholder='Search clients'
                aria-label='Search clients'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-48 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400'
              />
            </div>
            <button
              disabled
              className='flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400 cursor-not-allowed opacity-60'
            >
              <SlidersHorizontal className='h-4 w-4' />
              Filter
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-100 bg-gray-50'>
                <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Client</th>
                <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Goal</th>
                <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Sessions</th>
                <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Next Session</th>
                <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Joined</th>
                <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {filtered.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className='py-12 text-center text-sm text-gray-400'>No clients found</div>
          )}
        </div>
      </div>
    </div>
  )
}
