'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTrainerAction, getTrainersAction } from '@/actions/trainers'
import type { CreateTrainerInput } from '@/api/types/trainers'
import { UnauthorizedError } from '@/lib/http/errors'

export const trainerQueryKeys = {
  all: ['admin-trainers'] as const,
}

async function fetchTrainersWithAuth() {
  try {
    return await getTrainersAction()
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
      }
    }
    throw error
  }
}

export function useGetTrainers() {
  return useQuery({
    queryKey: trainerQueryKeys.all,
    queryFn: fetchTrainersWithAuth,
    staleTime: 60_000,
  })
}

export function useCreateTrainer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTrainerInput) => createTrainerAction(input),
    mutationKey: ['create-trainer'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all })
    },
  })
}
