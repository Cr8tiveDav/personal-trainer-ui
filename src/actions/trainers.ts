'use server'

import { createTrainer, getAllTrainers } from '@/lib/services/trainers'
import type { CreatedTrainer, TrainerResponse } from '@/components/admin/trainers/types'
import type { CreateTrainerInput } from '@/api/types/trainers'

export async function getTrainersAction(): Promise<TrainerResponse> {
  return getAllTrainers()
}

export async function createTrainerAction(
  input: CreateTrainerInput
): Promise<CreatedTrainer> {
  return createTrainer(input)
}
