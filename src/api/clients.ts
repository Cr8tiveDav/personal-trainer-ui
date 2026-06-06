'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteRequest, getRequest } from '~/lib/http'
import { displayError, showSuccessToast } from '~/lib/utils'
import { mapBackendToClient } from '@/lib/clients/map-client'
import { API_ENDPOINTS } from './api-endpoints'
import type {
  AdminClientDetailResponse,
  AdminClientsListResponse,
  AdminUserTrainerCountResponse,
  BackendClientResponse,
  ClientsListMeta,
} from './types/clients'
import type { Client } from '@/components/admin/clients/types'

export type AdminClientsFilters = {
  isActive?: boolean
}

export const clientsQueryKeys = {
  count: ['admin-user-trainer-count'] as const,
  list: (page: number, perPage: number, isActive?: boolean) =>
    ['admin-clients', page, perPage, isActive] as const,
  detail: (id: string) => ['admin-client', id] as const,
}

const DEFAULT_META: ClientsListMeta = {
  page: 1,
  per_page: 10,
  total_pages: 1,
  total_count: 0,
}

function isBackendClient(value: unknown): value is BackendClientResponse {
  if (!value || typeof value !== 'object') return false
  const row = value as BackendClientResponse
  return typeof row.id === 'string' && typeof row.email === 'string'
}

function normalizeClientsList(response: AdminClientsListResponse): {
  clients: Client[]
  meta: ClientsListMeta
} {
  const rows = Array.isArray(response.data) ? response.data : []
  const meta = response.meta ?? DEFAULT_META

  const perPage = meta.per_page ?? 10
  const totalCount = meta.total_count ?? rows.length
  const totalPages =
    totalCount > 0 ? Math.max(1, Math.ceil(totalCount / perPage)) : 0

  return {
    clients: rows.filter(isBackendClient).map(mapBackendToClient),
    meta: {
      page: meta.page ?? 1,
      per_page: perPage,
      total_pages: totalPages,
      total_count: totalCount,
      next: meta.next,
    },
  }
}

export function useAdminUserTrainerCount() {
  return useQuery({
    queryKey: clientsQueryKeys.count,
    queryFn: () =>
      getRequest<AdminUserTrainerCountResponse>({
        url: API_ENDPOINTS.ADMIN.USER_TRAINER_COUNT,
      }),
    staleTime: 60_000,
  })
}

export function useAdminClients(
  page: number,
  perPage = 10,
  filters?: AdminClientsFilters,
  options?: { enabled?: boolean },
) {
  const isActive = filters?.isActive

  return useQuery({
    queryKey: clientsQueryKeys.list(page, perPage, isActive),
    enabled: options?.enabled ?? true,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
      })
      if (isActive !== undefined) {
        params.set('is_active', String(isActive))
      }
      const response = await getRequest<AdminClientsListResponse>({
        url: `${API_ENDPOINTS.ADMIN.CLIENTS}?${params.toString()}`,
      })
      console.log('Admin Clients Response:', response)
      return normalizeClientsList(response)
    },
    staleTime: 60_000,
  })
}

export function useAdminClient(id: string) {
  return useQuery({
    queryKey: clientsQueryKeys.detail(id),
    queryFn: async () => {
      const response = await getRequest<AdminClientDetailResponse>({
        url: API_ENDPOINTS.ADMIN.CLIENT_DETAIL(id),
      })
      const row = response.data
      if (!row?.id) {
        throw new Error(response.message || 'Client not found')
      }
      return mapBackendToClient(row)
    },
    enabled: !!id,
    staleTime: 60_000,
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteRequest({ url: API_ENDPOINTS.ADMIN.CLIENT_DETAIL(id) })
    },
    onSuccess: () => {
      showSuccessToast('Client deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['admin-clients'] })
      queryClient.invalidateQueries({ queryKey: clientsQueryKeys.count })
    },
    onError: (error) => {
      displayError(error)
    },
  })
}
