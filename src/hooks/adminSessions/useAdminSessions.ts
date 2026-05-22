'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchAdminSessionsClient } from '@/lib/adminSessions/client'
import { adminSessionsQueryKey } from '@/lib/adminSessions/queryKeys'

export function useAdminSessions() {
  return useQuery({
    queryKey: adminSessionsQueryKey,
    queryFn: fetchAdminSessionsClient,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 15_000,
  })
}
