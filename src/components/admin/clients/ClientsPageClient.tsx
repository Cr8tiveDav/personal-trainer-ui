'use client'

import { useAdminClients, useAdminUserTrainerCount } from '@/api/clients'
import { ClientStatCards } from './ClientStatCards'
import { ClientsList } from './ClientsList'
import { ClientsPageHeader } from './ClientsPageHeader'
import { ClientsPageSkeleton } from './ClientsPageSkeleton'

export function ClientsPageClient() {
  const { data: countData, isLoading: countLoading } = useAdminUserTrainerCount()
  const { data: allSummary, isLoading: summaryLoading } = useAdminClients(1, 1)

  const showSkeleton =
    (countLoading && countData === undefined) ||
    (summaryLoading && allSummary === undefined)

  return (
    <div className='mx-auto w-full max-w-[1400px] space-y-6 px-4 pb-6'>
      <ClientsPageHeader />
      {showSkeleton ? (
        <ClientsPageSkeleton />
      ) : (
        <>
          <ClientStatCards />
          <ClientsList />
        </>
      )}
    </div>
  )
}
