'use client'

import { useState } from 'react'
import { Search, Filter, ArrowUpDown, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { mockClients } from './mock-data'
import type { ClientStatus } from './mock-data'
import { ClientStatusBadge } from './ClientStatusBadge'

type Tab = 'All' | ClientStatus

const TABS: { label: string; tab: Tab }[] = [
  { label: 'All clients', tab: 'All' },
  { label: 'Active', tab: 'Active' },
  { label: 'Paused', tab: 'Paused' },
  { label: 'Inactive', tab: 'Inactive' },
]

function getTabCount(tab: Tab) {
  if (tab === 'All') return mockClients.length
  return mockClients.filter((c) => c.status === tab).length
}

export function ClientsTable() {
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const [search, setSearch] = useState('')

  const filtered = mockClients.filter((c) => {
    const matchesTab = activeTab === 'All' || c.status === activeTab
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className='rounded-2xl border-2 border-dashed border-blue-200 bg-white'>
      <div className='border-b border-gray-100 px-6 pt-5'>
        <div className='flex gap-6 overflow-x-auto'>
          {TABS.map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label} ({getTabCount(tab)})
            </button>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-3 border-b border-gray-100 px-6 py-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name or email'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary'
          />
        </div>
        <button className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
          <Filter className='h-4 w-4' />
          Filter
        </button>
        <button className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
          <ArrowUpDown className='h-4 w-4' />
          Sort
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-100'>
              {['CLIENT', 'TRAINER', 'PLAN', 'SESSIONS', 'LAST SESSION', 'STATUS', 'ACTIONS'].map(
                (col) => (
                  <th
                    key={col}
                    className='px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className='px-6 py-16 text-center text-sm text-gray-400'>
                  No clients found.
                </td>
              </tr>
            ) : (
              filtered.map((client) => (
                <tr key={client.id} className='border-b border-gray-50 hover:bg-gray-50'>
                  <td className='px-6 py-4'>
                    <Link href={`/admin/users/${client.id}`} className='flex items-center gap-3 hover:underline'>
                      <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white'>
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>{client.name}</p>
                        <p className='text-xs text-gray-400'>{client.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600'>
                        {client.trainer.charAt(0)}
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>{client.trainer}</p>
                        <p className='text-xs text-gray-400'>{client.trainerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600'>
                      {client.plan}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {client.sessions === null ? '—' : client.sessions}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500'>{client.lastSession}</td>
                  <td className='px-6 py-4'>
                    <ClientStatusBadge status={client.status} />
                  </td>
                  <td className='px-6 py-4'>
                    <button className='rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
                      <MoreVertical className='h-4 w-4' />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-between border-t border-gray-100 px-6 py-4'>
        <p className='text-sm text-gray-400'>Showing 1–{filtered.length} of {mockClients.length} results</p>
        <div className='flex items-center gap-1'>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                page === 1
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <span className='px-1 text-gray-400'>...</span>
          <button className='flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-500 hover:bg-gray-100'>
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
