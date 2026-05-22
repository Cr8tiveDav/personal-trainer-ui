'use client'

import { useMemo, useState } from 'react'
import { useAdminClients, useAdminUserTrainerCount } from '@/api/clients'
import { useDebounce } from '@/hooks/use-debounce'
import { ClientFilterTabs, type ClientTab } from './ClientFilterTabs'
import { ClientsTable } from './ClientsTable'

const PER_PAGE = 10

function getInactiveCount(allClientsTotal: number, activeTotal: number) {
  return Math.max(0, allClientsTotal - activeTotal)
}

function getTabCount(
  tab: ClientTab,
  allClientsTotal: number,
  activeTotal: number,
) {
  if (tab === 'All') return allClientsTotal
  if (tab === 'Active') return activeTotal
  if (tab === 'Inactive') return getInactiveCount(allClientsTotal, activeTotal)
  return 0
}

function getListFilter(tab: ClientTab): { isActive?: boolean } | undefined {
  if (tab === 'Active') return { isActive: true }
  if (tab === 'Inactive') return { isActive: false }
  return undefined
}

function getListTotalCount(
  tab: ClientTab,
  allClientsTotal: number,
  activeTotal: number,
  metaTotal: number,
  search: string,
  filteredLength: number,
) {
  if (search.trim()) return filteredLength
  if (tab === 'Paused') return 0
  if (tab === 'Active') return activeTotal
  if (tab === 'Inactive') {
    return allClientsTotal > 0
      ? getInactiveCount(allClientsTotal, activeTotal)
      : metaTotal
  }
  return allClientsTotal > 0 ? allClientsTotal : metaTotal
}

export function ClientsList() {
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState<ClientTab>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)

  const listFilter = getListFilter(activeTab)

  const { data: allSummary } = useAdminClients(1, 1)
  const { data: countData } = useAdminUserTrainerCount()

  const allClientsTotal = allSummary?.meta?.total_count ?? 0
  const activeTotal = countData?.data?.total_clients ?? 0

  const pagerTotalWithoutSearch = getListTotalCount(
    activeTab,
    allClientsTotal,
    activeTotal,
    allSummary?.meta?.total_count ?? 0,
    '',
    0,
  )
  const maxPage = Math.max(1, Math.ceil(pagerTotalWithoutSearch / PER_PAGE) || 1)
  const queryPage =
    debouncedSearch.trim() || pagerTotalWithoutSearch === 0
      ? page
      : Math.min(page, maxPage)

  const { data, isLoading, isError, isFetching } = useAdminClients(
    queryPage,
    PER_PAGE,
    listFilter,
  )

  const hasListData = data !== undefined
  const showSkeleton = isLoading && !hasListData
  const metaTotal = data?.meta?.total_count ?? 0

  const filteredClients = useMemo(() => {
    const clients = data?.clients ?? []
    let list = clients

    if (activeTab === 'Paused') {
      list = list.filter((c) => c.status === 'Paused')
    }

    const query = debouncedSearch.trim().toLowerCase()
    if (query) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query),
      )
    }

    return list
  }, [data?.clients, activeTab, debouncedSearch])

  const listTotalCount = getListTotalCount(
    activeTab,
    allClientsTotal,
    activeTotal,
    metaTotal,
    debouncedSearch,
    filteredClients.length,
  )

  const totalPages = Math.max(1, Math.ceil(listTotalCount / PER_PAGE) || 1)
  const displayPage =
    listTotalCount === 0 ? 1 : Math.min(queryPage, totalPages)

  function handleTabChange(tab: ClientTab) {
    setActiveTab(tab)
    setPage(1)
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value)
    setPage(1)
  }

  function goToPage(next: number) {
    if (next < 1 || next > totalPages || next === displayPage) return
    setPage(next)
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
          isLoading={showSkeleton}
        />
      </div>

      <ClientsTable
        clients={filteredClients}
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isLoading={showSkeleton}
        isFetching={isFetching && !showSkeleton}
        isError={isError}
        listKey={`${activeTab}-${debouncedSearch}-page-${displayPage}`}
        listTotalCount={listTotalCount}
        displayPage={displayPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  )
}
