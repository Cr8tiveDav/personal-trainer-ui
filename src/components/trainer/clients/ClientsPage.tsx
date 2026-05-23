'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import {
  trainerClientsQueryKeys,
  useMyTrainerClients,
} from '@/api/trainer-clients'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { TrainerClientsPageSkeleton } from './TrainerClientsPageSkeleton'
import type { TrainerClient } from './types'

const PER_PAGE = 10

function ClientRow({ client }: { client: TrainerClient }) {
  return (
    <tr className='transition-colors hover:bg-gray-50/50'>
      <td className='px-5 py-3.5'>
        <div className='flex items-center gap-3'>
          {client.avatarUrl ? (
            <Image
              src={client.avatarUrl}
              alt={client.name}
              width={36}
              height={36}
              className='h-9 w-9 shrink-0 rounded-full object-cover'
            />
          ) : (
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white'>
              {client.name.charAt(0)}
            </div>
          )}
          <div className='min-w-0'>
            <p className='truncate text-sm font-medium text-gray-900'>
              {client.name}
            </p>
            <p className='truncate text-xs text-gray-400'>{client.email}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-3.5 text-sm text-gray-600'>{client.goals}</td>
      <td className='px-5 py-3.5 text-sm capitalize text-gray-600'>
        {client.fitnessLevel}
      </td>
      <td className='px-5 py-3.5 text-sm text-gray-600'>
        {client.totalBookings}
      </td>
      <td className='px-5 py-3.5 text-sm text-gray-500'>
        {client.lastBookingDate}
      </td>
    </tr>
  )
}

export function ClientsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const knownTotalPagesRef = useRef(1)

  const queryPage = Math.min(page, knownTotalPagesRef.current)

  const { data, isLoading, isError, isFetching } = useMyTrainerClients(
    queryPage,
    PER_PAGE,
  )

  const clients = data?.clients ?? []
  const meta = data?.meta
  const totalCount = meta?.total_count ?? 0
  const totalPages = Math.max(1, meta?.total_pages ?? 1)
  const displayPage = totalCount === 0 ? 1 : Math.min(page, totalPages)

  if (meta?.total_pages) {
    knownTotalPagesRef.current = totalPages
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.goals.toLowerCase().includes(q),
    )
  }, [clients, search])

  const rangeStart =
    totalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1
  const rangeEnd =
    totalCount === 0 ? 0 : Math.min(displayPage * PER_PAGE, totalCount)

  if (isLoading && !data) {
    return <TrainerClientsPageSkeleton />
  }

  return (
    <div className='pb-6 px-10'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-gray-900'>Clients</h1>
        <p className='mt-0.5 text-sm text-gray-500'>
          Clients who have booked sessions with you.
        </p>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
        <div className='flex flex-col gap-4 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-gray-500'>
            {totalCount === 0
              ? 'No clients yet'
              : `${totalCount} client${totalCount === 1 ? '' : 's'}`}
          </p>
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
          </div>
        </div>

        <div className='overflow-x-auto'>
          {isError ? (
            <div className='px-5 py-12 text-center text-sm text-red-500'>
              Could not load clients. Please try again.
            </div>
          ) : (
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-100 bg-gray-50'>
                  <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>
                    Client
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>
                    Goals
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>
                    Fitness level
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>
                    Bookings
                  </th>
                  <th className='px-5 py-3 text-left text-xs font-medium text-gray-500'>
                    Last booking
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {filtered.map((client) => (
                  <ClientRow key={client.id} client={client} />
                ))}
              </tbody>
            </table>
          )}

          {!isError && filtered.length === 0 && (
            <EmptyState
              imageSrc={EMPTY_STATE_IMAGE_PATHS.client}
              imageAlt='No clients'
              title={search ? 'No clients match your search' : 'No clients yet'}
              description={
                search
                  ? 'Try a different name or email.'
                  : 'Clients will appear here after they book a session with you.'
              }
              className='py-12'
            />
          )}
        </div>

        {totalCount > 0 && (
          <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row'>
            <p className='text-sm text-gray-500'>
              {isFetching
                ? 'Loading clients…'
                : `Showing ${rangeStart}–${rangeEnd} of ${totalCount}`}
            </p>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => setPage((p) => Math.max(1, Math.min(p - 1, totalPages)))}
                disabled={displayPage <= 1 || isFetching}
                className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                aria-label='Previous page'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>
              <span className='min-w-16 text-center text-sm text-gray-600'>
                {displayPage} / {totalPages}
              </span>
              <button
                type='button'
                onClick={() =>
                  setPage((p) => Math.min(totalPages, Math.max(1, p + 1)))
                }
                disabled={displayPage >= totalPages || isFetching}
                className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                aria-label='Next page'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
