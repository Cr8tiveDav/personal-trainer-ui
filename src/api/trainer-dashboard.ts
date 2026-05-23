'use client'

import { useQuery } from '@tanstack/react-query'
import { getRequest } from '~/lib/http'
import { getStoredTrainerId } from '@/lib/auth/trainer-profile'
import { resolveTrainerId } from '@/lib/auth/resolve-trainer-id'
import { mapBackendToFrontend } from '@/lib/trainers/map-trainer'
import { API_ENDPOINTS } from './api-endpoints'
import { useTrainerSessions } from './sessions'
import { useTrainerReviews, useTrainerReviewsInfinite } from './trainer-reviews'
import { useMyTrainerClients } from './trainer-clients'
import type { TrainerDetailResponse } from './types/trainers'

export { useMyTrainerClients }

export function useCurrentTrainerId() {
  const cachedId = typeof window !== 'undefined' ? getStoredTrainerId() : null

  return useQuery({
    queryKey: ['current-trainer-id'],
    queryFn: resolveTrainerId,
    initialData: cachedId ?? undefined,
    staleTime: 60_000,
  })
}

export function useMyTrainerProfile() {
  return useQuery({
    queryKey: ['trainer-me-profile'],
    queryFn: async () => {
      const response = await getRequest<TrainerDetailResponse>({
        url: API_ENDPOINTS.TRAINERS.ME,
      })
      return { data: mapBackendToFrontend(response.data) }
    },
    staleTime: 60_000,
    retry: false,
  })
}

export function useMyTrainerSessions() {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerSessions(trainerId ?? '')
}

export function useMyTrainerReviews(options?: { limit?: number }) {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerReviews(trainerId ?? '', options)
}

export function useMyTrainerReviewsInfinite(limit = 20) {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerReviewsInfinite(trainerId ?? '', limit)
}
