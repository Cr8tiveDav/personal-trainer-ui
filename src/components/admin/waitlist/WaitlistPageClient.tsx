'use client'

import { useMemo, useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useAdminWaitlist } from '@/api/waitlist'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const PER_PAGE = 10

function getVisiblePages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5, '...'] as const
  }
  if (current >= total - 2) {
    return ['...', total - 4, total - 3, total - 2, total - 1, total] as const
  }
  return ['...', current - 1, current, current + 1, '...'] as const
}

function WaitlistTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className='border-b border-gray-100 last:border-none'>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-28' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-44' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-28' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-24' />
          </td>
          <td className='px-6 py-4'>
            <Skeleton className='h-4 w-20' />
          </td>
        </tr>
      ))}
    </>
  )
}

export function WaitlistPageClient() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: response, isLoading, isError, isFetching } = useAdminWaitlist()

  const allEntries = useMemo(() => {
    const items = Array.isArray(response?.data?.items) ? response.data.items : []
    return [...items].reverse()
  }, [response])

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return allEntries

    return allEntries.filter(
      (entry) =>
        entry.name?.toLowerCase().includes(query) ||
        entry.email?.toLowerCase().includes(query) ||
        entry.phone_number?.toLowerCase().includes(query) ||
        entry.location?.toLowerCase().includes(query)
    )
  }, [allEntries, searchQuery])

  const listTotalCount = filteredEntries.length
  const totalPages = Math.max(1, Math.ceil(listTotalCount / PER_PAGE))
  const displayPage = Math.min(page, totalPages)

  const paginatedEntries = useMemo(() => {
    const start = (displayPage - 1) * PER_PAGE
    const end = start + PER_PAGE
    return filteredEntries.slice(start, end)
  }, [filteredEntries, displayPage])

  const rangeStart = listTotalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1
  const rangeEnd = listTotalCount === 0 ? 0 : Math.min(displayPage * PER_PAGE, listTotalCount)

  const resultsLabel =
    listTotalCount === 0
      ? 'Showing 0 results'
      : `Showing ${rangeStart}–${rangeEnd} of ${listTotalCount} results`

  const visiblePages = getVisiblePages(displayPage, totalPages)

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  function goToPage(next: number) {
    if (next < 1 || next > totalPages || next === displayPage) return
    setPage(next)
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return '-'
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return dateStr
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className='w-full space-y-6 pb-6 md:px-10'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>Waitlist</h1>
        <div className='rounded-[8px] bg-blue-50 px-3 py-1 text-sm font-medium text-[#0F4F80]'>
          Total Signups: {allEntries.length}
        </div>
      </div>

      <div className='flex flex-col rounded-[24px] border border-[#CBD5E1] bg-white'>
        {/* Search Header */}
        <div className='flex flex-col gap-4 border-b border-gray-100 px-6 py-4 md:flex-row md:items-center md:gap-11.5'>
          <div className='w-full h-10 flex md:flex-1 items-center gap-2 rounded-[8px] border border-gray-200 px-3 py-2'>
            <Search className='h-4 w-4 shrink-0 text-gray-400' />
            <input
              type='text'
              placeholder='Search by name, email, phone, or location'
              value={searchQuery}
              onChange={handleSearchChange}
              className='flex-1 w-full text-sm text-gray-700 outline-none placeholder:text-[#D1D1D1] bg-transparent'
            />
          </div>
        </div>

        {/* Table Content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn('w-full', isFetching && !isLoading ? 'opacity-90' : '')}
        >
          <div className='min-h-50 overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b border-gray-100 bg-gray-50/50'>
                  <th className='px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'>
                    Phone Number
                  </th>
                  <th className='px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'>
                    Location
                  </th>
                  <th className='px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'>
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <WaitlistTableSkeleton />
                ) : isError ? (
                  <tr>
                    <td colSpan={5} className='px-6 py-16 text-center text-sm text-red-500'>
                      Failed to load waitlist. Please try again.
                    </td>
                  </tr>
                ) : listTotalCount === 0 ? (
                  <tr>
                    <td colSpan={5} className='px-6 py-16 text-center text-sm text-gray-500'>
                      {searchQuery.trim() !== ''
                        ? 'No waitlist signups match your search.'
                        : 'No waitlist signups yet.'}
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence mode='sync'>
                    {paginatedEntries.map((entry, index) => (
                      <motion.tr
                        key={entry.id || entry.email || index}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className='group border-b border-gray-100 hover:bg-gray-50/50 last:border-none transition-colors'
                      >
                        <td className='px-6 py-4 text-sm font-semibold text-gray-900'>
                          {entry.name || '-'}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-600'>
                          {entry.email}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-600'>
                          {entry.phone_number || '-'}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-600'>
                          {entry.location || '-'}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {formatDate(entry.created_at)}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!isLoading && !isError && listTotalCount > 0 && (
            <div className='flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row'>
              <p className='text-sm text-gray-400'>
                {resultsLabel}
              </p>

              {listTotalCount > PER_PAGE && (
                <div className='flex items-center gap-1'>
                  <button
                    type='button'
                    onClick={() => goToPage(displayPage - 1)}
                    disabled={displayPage <= 1 || isLoading}
                    className='flex h-8 w-8 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors'
                    aria-label='Previous page'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </button>

                  {visiblePages.map((item, index) => {
                    if (item === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className='flex h-8 w-8 items-center justify-center text-gray-400'
                        >
                          …
                        </span>
                      )
                    }
                    const pageNumber = item as number
                    const isActive = displayPage === pageNumber
                    return (
                      <button
                        key={pageNumber}
                        type='button'
                        onClick={() => goToPage(pageNumber)}
                        disabled={isLoading}
                        className={cn(
                          'relative flex h-8 w-8 items-center justify-center rounded-[6px] text-sm font-medium transition-colors border',
                          isActive
                            ? 'bg-[#0F4F80] border-[#0F4F80] text-white'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    type='button'
                    onClick={() => goToPage(displayPage + 1)}
                    disabled={displayPage >= totalPages || isLoading}
                    className='flex h-8 w-8 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors'
                    aria-label='Next page'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
