'use client'

import { useQuery } from '@tanstack/react-query'
import { resolveTrainerId } from '@/lib/auth/resolve-trainer-id'
import { useTrainerSessions } from './sessions'
import { useTrainerById } from './trainers'
import { useTrainerEarnings } from './finance'
import { useTrainerReviews } from './trainer-reviews'

export function useCurrentTrainerId() {
  return useQuery({
    queryKey: ['current-trainer-id'],
    queryFn: resolveTrainerId,
    staleTime: 60_000,
  })
}

export function useMyTrainerProfile() {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerById(trainerId ?? '')
}

export function useMyTrainerSessions() {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerSessions(trainerId ?? '')
}

export function useMyTrainerEarnings() {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerEarnings(trainerId ?? '')
}

export function useMyTrainerReviews() {
  const { data: trainerId } = useCurrentTrainerId()
  return useTrainerReviews(trainerId ?? '')
}
