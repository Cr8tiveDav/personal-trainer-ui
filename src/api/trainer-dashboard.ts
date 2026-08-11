'use client'

import { useQuery } from '@tanstack/react-query'
import { getStoredTrainerId } from '@/lib/auth/trainer-profile'
import { resolveTrainerId } from '@/lib/auth/resolve-trainer-id'
import { useTrainerSessions } from './sessions'
import { useTrainerReviews, useTrainerReviewsInfinite } from './trainer-reviews'
import { useMyTrainerClients } from './trainer-clients'

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
