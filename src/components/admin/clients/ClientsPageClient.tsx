'use client';

import { useAdminClients, useAdminUserTrainerCount } from '@/api/clients';
import { ClientStatCards } from './ClientStatCards';
import { ClientsList } from './ClientsList';
import { ClientsPageHeader } from './ClientsPageHeader';
import { ClientsPageSkeleton } from './ClientsPageSkeleton';

export function ClientsPageClient() {
  const { data: countData, isLoading: countLoading } =
    useAdminUserTrainerCount();
  const { data: allSummary, isLoading: summaryLoading } = useAdminClients(1, 1);

  const showSkeleton =
    (countLoading && countData === undefined) ||
    (summaryLoading && allSummary === undefined);

  return (
    <div className='w-full  space-y-6 pb-6 md:px-10'>
      <ClientsPageHeader />
      {showSkeleton ? (
        <ClientsPageSkeleton />
      ) : (
        <>
        
          <ClientsList />
        </>
      )}
    </div>
  );
}
