import type { Trainer } from '@/components/admin/trainers/types'
import { API_ENDPOINTS } from '@/api/api-endpoints'
import type {
  BackendTrainerResponse,
  CreateTrainerInput,
  CreatedTrainer,
} from '@/api/types/trainers'
import type { TrainerResponse } from '@/components/admin/trainers/types'
import { apiGetData, apiRequest } from '@/lib/http/server'
import { mapBackendToFrontend } from '@/lib/trainers/map-trainer'
import { toCreateTrainerFormData } from '@/lib/trainers/to-create-trainer-form-data'
import { ApiError } from '@/lib/http/errors'

function buildTrainerListResponse(trainers: BackendTrainerResponse[]): TrainerResponse {
  const mappedTrainers: Trainer[] = trainers.map(mapBackendToFrontend)

  return {
    data: mappedTrainers,
    counts: {
      all: mappedTrainers.length,
      active: mappedTrainers.filter((t) => t.status.toLowerCase() === 'active').length,
      pending: mappedTrainers.filter((t) => t.status.toLowerCase() === 'pending').length,
      suspended: mappedTrainers.filter((t) => t.status.toLowerCase() === 'suspended').length,
    },
    pagination: { totalItems: mappedTrainers.length },
  }
}

export async function getAllTrainers(): Promise<TrainerResponse> {
  const trainers = await apiGetData<BackendTrainerResponse[]>(
    API_ENDPOINTS.TRAINERS.LIST,
    { method: 'GET', cache: 'no-store' }
  )

  return buildTrainerListResponse(Array.isArray(trainers) ? trainers : [])
}

export async function createTrainer(input: CreateTrainerInput): Promise<CreatedTrainer> {
  const { response, body } = await apiRequest<CreatedTrainer>(
    API_ENDPOINTS.TRAINERS.CREATE,
    {
      method: 'POST',
      body: toCreateTrainerFormData(input),
    }
  )

  if (!response.ok) {
    if (body.message?.includes('trainer created but credentials email failed')) {
      return body.data
    }
    throw new ApiError(
      body.message || 'Failed to create trainer',
      response.status,
      body
    )
  }

  return body.data
}
