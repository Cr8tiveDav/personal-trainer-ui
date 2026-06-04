'use client'

import { useQuery } from '@tanstack/react-query'
import { getRequest } from '~/lib/http'
import { API_ENDPOINTS } from './api-endpoints'

export interface WaitlistEntry {
  id: string
  name: string
  email: string
  phone_number?: string
  location?: string
  created_at?: string
}

export interface WaitlistResponse {
  status: string
  message: string
  code: string
  data: {
    items: WaitlistEntry[]
  }
}

export const waitlistQueryKeys = {
  list: (email?: string) => ['admin-waitlist', email] as const,
}

export function useAdminWaitlist(email?: string) {
  return useQuery({
    queryKey: waitlistQueryKeys.list(email),
    queryFn: async () => {
      const params = new URLSearchParams()
      if (email) {
        params.set('email', email)
      }
      const url = params.toString()
        ? `${API_ENDPOINTS.WAITLIST.LIST}?${params.toString()}`
        : API_ENDPOINTS.WAITLIST.LIST

      const response = await getRequest<WaitlistResponse>({ url })
      return response
    },
    staleTime: 60_000,
  })
}
