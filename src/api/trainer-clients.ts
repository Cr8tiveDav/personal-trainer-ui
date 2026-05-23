'use client'

import { useQuery } from '@tanstack/react-query'
import { getRequest } from '~/lib/http'
import { API_ENDPOINTS } from './api-endpoints'
import { mapBackendToTrainerClient } from '@/lib/trainer-clients/map-trainer-client'
import type {
  BackendTrainerClientResponse,
  TrainerClientsListMeta,
  TrainerClientsListResponse,
} from './types/trainer-clients'
import type { TrainerClient } from '@/components/trainer/clients/types'

const DEFAULT_META: TrainerClientsListMeta = {
  page: 1,
  per_page: 10,
  total_pages: 1,
  total_count: 0,
}

export const trainerClientsQueryKeys = {
  list: (page: number, limit: number) =>
    ['trainer-me-clients', page, limit] as const,
}

function isBackendTrainerClient(
  value: unknown,
): value is BackendTrainerClientResponse {
  if (!value || typeof value !== 'object') return false
  const row = value as BackendTrainerClientResponse
  return typeof row.client_id === 'string'
}

function normalizeTrainerClientsList(
  response: TrainerClientsListResponse,
  limit: number,
): { clients: TrainerClient[]; meta: TrainerClientsListMeta } {
  const rows = Array.isArray(response.data) ? response.data : []
  const meta = response.meta ?? DEFAULT_META

  const perPage = meta.per_page ?? meta.limit ?? limit
  const totalCount = meta.total_count ?? rows.length
  const totalPages =
    meta.total_pages ??
    (totalCount > 0 ? Math.max(1, Math.ceil(totalCount / perPage)) : 0)

  return {
    clients: rows.filter(isBackendTrainerClient).map(mapBackendToTrainerClient),
    meta: {
      page: meta.page ?? 1,
      per_page: perPage,
      total_pages: totalPages,
      total_count: totalCount,
      next: meta.next,
    },
  }
}

export function useMyTrainerClients(page: number, limit = 10) {
  return useQuery({
    queryKey: trainerClientsQueryKeys.list(page, limit),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      })
      const response = await getRequest<TrainerClientsListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.ME_CLIENTS}?${params.toString()}`,
      })
      return normalizeTrainerClientsList(response, limit)
    },
    staleTime: 60_000,
  })
}
