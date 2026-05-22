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

export function ClientsList() {
  const [activeTab, setActiveTab] = useState<ClientTab>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)

  const { data: countData } = useAdminUserTrainerCount()
  const { data: summary } = useAdminClients(1, 1)

  const allClientsTotal = summary?.meta?.total_count ?? 0
  const activeTotal = countData?.data?.total_clients ?? 0
  const fetchSize = Math.max(allClientsTotal, PER_PAGE)

  const { data, isLoading, isError } = useAdminClients(1, fetchSize)
  const showSkeleton = isLoading && !data

  const filteredClients = useMemo(() => {
    const clients = data?.clients ?? []
    let list = clients

    if (activeTab === 'Active') {
      list = list.filter((c) => c.status === 'Active')
    } else if (activeTab === 'Inactive') {
      list = list.filter((c) => c.status === 'Inactive')
    } else if (activeTab === 'Paused') {
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
          onTabChange={setActiveTab}
          isLoading={showSkeleton}
        />
      </div>

      <ClientsTable
        clients={filteredClients}
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={showSkeleton}
        isError={isError}
        listKey={`${activeTab}-${debouncedSearch}`}
        listTotalCount={filteredClients.length}
      />
    </div>
  )
}
