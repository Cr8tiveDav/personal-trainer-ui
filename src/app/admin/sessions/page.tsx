import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { adminSessionsQueryKey } from '@/lib/adminSessions/queryKeys'
import { fetchAdminSessionsFromBackend } from '@/lib/adminSessions/server'
import { SessionsPageClient } from './SessionsPageClient'

export default async function SessionsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: adminSessionsQueryKey,
    queryFn: () => fetchAdminSessionsFromBackend(1, 100),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionsPageClient />
    </HydrationBoundary>
  )
}
