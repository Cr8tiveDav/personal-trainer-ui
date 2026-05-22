'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '~/lib/http'
import { displayError, showSuccessToast } from '~/lib/utils'
import { API_ENDPOINTS } from './api-endpoints'
import type {
  DiscoverySlot,
  DiscoverySlotPayload,
  DiscoverySlotResponse,
  DiscoverySlotsListResponse,
} from './types/discovery-slots'

export const discoverySlotsQueryKeys = {
  all: ['discovery-slots'] as const,
}

function isDiscoverySlot(value: unknown): value is DiscoverySlot {
  if (!value || typeof value !== 'object') return false
  const slot = value as DiscoverySlot
  return (
    typeof slot.id === 'string' &&
    typeof slot.day_of_week === 'number' &&
    typeof slot.start_time === 'string' &&
    typeof slot.end_time === 'string'
  )
}

function normalizeDiscoverySlotsList(
  response: DiscoverySlotsListResponse,
): DiscoverySlot[] {
  const { data } = response

  if (Array.isArray(data)) {
    return data.filter(isDiscoverySlot)
  }

  if (data && typeof data === 'object') {
    const nested =
      'slots' in data && Array.isArray(data.slots)
        ? data.slots
        : 'discovery_slots' in data && Array.isArray(data.discovery_slots)
          ? data.discovery_slots
          : null

    if (nested) {
      return nested.filter(isDiscoverySlot)
    }
  }

  return []
}

function normalizeDiscoverySlot(
  response: DiscoverySlotResponse,
): DiscoverySlot | null {
  const { data } = response
  return isDiscoverySlot(data) ? data : null
}

export function useDiscoverySlots() {
  return useQuery({
    queryKey: discoverySlotsQueryKeys.all,
    queryFn: async () => {
      const response = await getRequest<DiscoverySlotsListResponse>({
        url: API_ENDPOINTS.DISCOVERY_SLOTS.LIST,
      })
      return normalizeDiscoverySlotsList(response)
    },
    staleTime: 30_000,
  })
}

export function useCreateDiscoverySlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: DiscoverySlotPayload) => {
      const response = await postRequest<
        DiscoverySlotResponse,
        DiscoverySlotPayload
      >({
        url: API_ENDPOINTS.DISCOVERY_SLOTS.LIST,
        payload,
      })
      return normalizeDiscoverySlot(response.data)
    },
    mutationKey: ['create-discovery-slot'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: discoverySlotsQueryKeys.all })
      showSuccessToast('Discovery slot created')
    },
    onError(error) {
      displayError(error)
    },
  })
}

export function useUpdateDiscoverySlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string
      payload: DiscoverySlotPayload
    }) => {
      const response = await putRequest<DiscoverySlotResponse, DiscoverySlotPayload>(
        {
          url: API_ENDPOINTS.DISCOVERY_SLOTS.DETAIL(id),
          payload,
        },
      )
      return normalizeDiscoverySlot(response)
    },
    mutationKey: ['update-discovery-slot'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: discoverySlotsQueryKeys.all })
      showSuccessToast('Discovery slot updated')
    },
    onError(error) {
      displayError(error)
    },
  })
}

export function useDeleteDiscoverySlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      deleteRequest({
        url: API_ENDPOINTS.DISCOVERY_SLOTS.DETAIL(id),
      }),
    mutationKey: ['delete-discovery-slot'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: discoverySlotsQueryKeys.all })
      showSuccessToast('Discovery slot deleted')
    },
    onError(error) {
      displayError(error)
    },
  })
}

export type { DiscoverySlot, DiscoverySlotPayload }
