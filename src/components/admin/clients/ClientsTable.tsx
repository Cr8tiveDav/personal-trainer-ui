'use client'

import { useMemo, useState } from 'react'
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useAdminClients, useAdminUserTrainerCount } from '@/api/clients'
import { ClientFilterTabs, type ClientTab } from './ClientFilterTabs'
import { ClientTableRow } from './ClientTableRow'
import { ClientTableSkeleton } from './ClientTableSkeleton'
import { ClientsEmptyState } from './ClientsEmptyState'

type Tab = ClientTab

const PER_PAGE = 10

const TABLE_COLUMNS = [
  'CLIENT',
  'SESSIONS',
  'JOINED',
  'REVENUE',
  'STATUS',
  'ACTIONS',
] as const

function getInactiveCount(allClientsTotal: number, activeTotal: number) {
  return Math.max(0, allClientsTotal - activeTotal)
}

function getTabCount(
  tab: Tab,
  allClientsTotal: number,
  activeTotal: number,
) {
  if (tab === 'All') return allClientsTotal
  if (tab === 'Active') return activeTotal
  if (tab === 'Inactive') return getInactiveCount(allClientsTotal, activeTotal)
  return 0
}

function getListTotalCount(
  tab: Tab,
  allClientsTotal: number,
  activeTotal: number,
  metaTotal: number,
  search: string,
  filteredLength: number,
) {
  if (search) return filteredLength
  if (tab === 'Paused') return 0
  if (tab === 'Active') return activeTotal
  if (tab === 'Inactive') {
    return allClientsTotal > 0
      ? getInactiveCount(allClientsTotal, activeTotal)
      : metaTotal
  }
  return allClientsTotal > 0 ? allClientsTotal : metaTotal
}

function getPaginationPages(itemCount: number, pageSize: number) {
  if (itemCount <= 0 || pageSize <= 0) return 0
  return Math.ceil(itemCount / pageSize)
}

function getVisiblePages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5, '...'] as const
  }
  if (current >= total - 2) {
    return [
      '...',
      total - 4,
      total - 3,
      total - 2,
      total - 1,
      total,
    ] as const
  }
  return ['...', current - 1, current, current + 1, '...'] as const
}

function getListFilter(tab: Tab): { isActive?: boolean } | undefined {
  if (tab === 'Active') return { isActive: true }
  if (tab === 'Inactive') return { isActive: false }
  return undefined
}

export function ClientsTable() {
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const [search, setSearch] = useState('')
  const listFilter = getListFilter(activeTab)

  const { data: allSummary, isLoading: summaryLoading } = useAdminClients(1, 1)
  const { data: countData } = useAdminUserTrainerCount()

  const allClientsTotal = allSummary?.meta?.total_count ?? 0
  const activeTotal = countData?.data?.total_clients ?? 0
  const summaryMetaTotal = allSummary?.meta?.total_count ?? 0
  const pagerTotalWithoutSearch = getListTotalCount(
    activeTab,
    allClientsTotal,
    activeTotal,
    summaryMetaTotal,
    '',
    0,
  )
  const maxPage = getPaginationPages(pagerTotalWithoutSearch, PER_PAGE)
  const queryPage =
    search.trim() || maxPage === 0 ? page : Math.min(page, maxPage)

  const { data, isLoading, isError, isFetching } = useAdminClients(
    queryPage,
    PER_PAGE,
    listFilter,
  )

  const hasListData = data !== undefined
  const showSkeleton = isLoading && !hasListData
  const metaTotal = data?.meta?.total_count ?? 0

  const filtered = useMemo(() => {
    const clients = data?.clients ?? []
    return clients.filter((c) => {
      if (activeTab === 'Paused' && c.status !== 'Paused') return false
      const matchesSearch =
        search === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      return matchesSearch
    })
  }, [data?.clients, activeTab, search])

  const listTotalCount = getListTotalCount(
    activeTab,
    allClientsTotal,
    activeTotal,
    metaTotal,
    search,
    filtered.length,
  )
  const totalPages = getPaginationPages(listTotalCount, PER_PAGE)
  const displayPage =
    totalPages > 0 ? Math.min(queryPage, totalPages) : queryPage
  const rangeStart =
    listTotalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1
  const rangeEnd =
    listTotalCount === 0
      ? 0
      : Math.min(displayPage * PER_PAGE, listTotalCount)
  const visiblePages = getVisiblePages(displayPage, Math.max(totalPages, 1))

  const rowsAnimationKey = `${activeTab}-${search}-page-${displayPage}`
  const resultsLabel =
    listTotalCount === 0
      ? 'Showing 0 results'
      : `Showing ${rangeStart}–${rangeEnd} of ${listTotalCount} results`
  const isEmptyList =
    hasListData && !isError && listTotalCount === 0 && filtered.length === 0

  const emptyTitle =
    search.trim() !== ''
      ? 'No clients match your search'
      : activeTab === 'Inactive'
        ? 'No inactive clients'
        : activeTab === 'Active'
          ? 'No active clients'
          : activeTab === 'Paused'
            ? 'No paused clients'
            : 'No clients yet'

  const emptyDescription =
    search.trim() !== ''
      ? 'Try a different name or email, or clear the search.'
      : activeTab !== 'All'
        ? 'Switch tabs or check back when client activity changes.'
        : 'Clients will appear here once they register on the platform.'

  const showPagination =
    !showSkeleton &&
    !isError &&
    !isEmptyList &&
    listTotalCount > PER_PAGE &&
    filtered.length > 0

  function goToPage(next: number) {
    if (next < 1 || next > totalPages || next === displayPage) return
    setPage(next)
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab)
    setPage(1)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  const tabCounts = {
    all: getTabCount('All', allClientsTotal, activeTotal),
    active: getTabCount('Active', allClientsTotal, activeTotal),
    paused: getTabCount('Paused', allClientsTotal, activeTotal),
    inactive: getTabCount('Inactive', allClientsTotal, activeTotal),
  }

  return (
    <div className='rounded-2xl border-2 border-dashed border-blue-200 bg-white'>
      <div className='px-6 pt-5'>
        <ClientFilterTabs
          counts={tabCounts}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isLoading={showSkeleton || summaryLoading}
        />
      </div>

      <div className='flex items-center gap-3 border-b border-gray-100 px-6 py-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name or email'
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
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

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={isFetching && !showSkeleton ? 'opacity-90' : ''}
      >
        {showSkeleton ? (
          <div className='overflow-x-auto min-h-50'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b border-gray-100'>
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col}
                      className='px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ClientTableSkeleton />
              </tbody>
            </table>
          </div>
        ) : isError ? (
          <div className='px-6 py-16 text-center text-sm text-red-500'>
            Failed to load clients. Please try again.
          </div>
        ) : isEmptyList ? (
          <ClientsEmptyState
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : (
          <div className='overflow-x-auto min-h-50'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b border-gray-100'>
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col}
                      className='px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence key={rowsAnimationKey} initial mode='sync'>
                  {filtered.map((client, index) => (
                    <ClientTableRow
                      key={client.id}
                      client={client}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        <motion.div className='flex flex-col items-center justify-center gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-between'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={resultsLabel}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='text-sm text-gray-400'
            >
              {showSkeleton ? 'Loading clients…' : resultsLabel}
            </motion.p>
          </AnimatePresence>

          {showPagination && (
            <div className='flex items-center gap-1'>
              <motion.button
                type='button'
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(displayPage - 1)}
                disabled={displayPage <= 1 || showSkeleton}
                className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                aria-label='Previous page'
              >
                <ChevronLeft className='h-4 w-4' />
              </motion.button>

              {visiblePages.map((item, index) => {
                if (item === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className='flex h-9 w-9 items-center justify-center text-gray-500'
                    >
                      …
                    </span>
                  )
                }
                const pageNumber = item as number
                const isActive = displayPage === pageNumber
                return (
                  <motion.button
                    key={pageNumber}
                    type='button'
                    layout
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToPage(pageNumber)}
                    disabled={showSkeleton}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId='client-table-page'
                        className='absolute inset-0 rounded-md bg-primary'
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className='relative z-10'>{pageNumber}</span>
                  </motion.button>
                )
              })}

              <motion.button
                type='button'
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(displayPage + 1)}
                disabled={displayPage >= totalPages || showSkeleton}
                className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                aria-label='Next page'
              >
                <ChevronRight className='h-4 w-4' />
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
