import type { Trainer } from '@/components/admin/trainers/types'
import { API_ENDPOINTS } from '@/api/api-endpoints'
import type {
  BackendTrainerResponse,
  CreatedTrainer,
} from '@/api/types/trainers'
import type { TrainerResponse } from '@/components/admin/trainers/types'
import type { ApiEnvelope } from '@/api/types/index'
import { apiGetData } from '@/lib/http/server'
import { mapBackendToFrontend } from '@/lib/trainers/map-trainer'
import { ApiError, UnauthorizedError } from '@/lib/http/errors'
import { authenticatedFetch, getAccessToken } from '@/lib/services/auth-session'
import { apiUrl } from '@/lib/api/config'

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

/**
 * Admin-only: POST multipart/form-data to /api/v1/trainers
 * Full URL: {API_URL}/trainers e.g. https://api.staging.fitcall.me/api/v1/trainers
 */
export async function createTrainerFromFormData(
  formData: FormData,
): Promise<CreatedTrainer> {
  const token = await getAccessToken()
  if (!token) {
    throw new UnauthorizedError(
      'No active session. Log in as admin before creating a trainer.',
    )
  }

  const path = API_ENDPOINTS.TRAINERS.CREATE
  const response = await authenticatedFetch(path, {
    method: 'POST',
    body: formData,
  })

  const body = (await response.json().catch(() => ({}))) as ApiEnvelope<CreatedTrainer>

  if (response.status === 401) {
    throw new UnauthorizedError(
      body.message || 'Session expired or invalid. Please log in again.',
    )
  }

  if (!response.ok) {
    if (body.message?.includes('trainer created but credentials email failed')) {
      return body.data
    }
    throw new ApiError(
      body.message || `Failed to create trainer (${response.status})`,
      response.status,
      body,
    )
  }

  if (!body.data?.id) {
    throw new ApiError(
      body.message || 'Trainer created but response had no id',
      response.status,
      body,
    )
  }

  return body.data
}

/** @deprecated Use createTrainerFromFormData — POST /trainers expects multipart FormData */
export async function createTrainer(
  formData: FormData,
): Promise<CreatedTrainer> {
  return createTrainerFromFormData(formData)
}

export function getTrainersCreateUrl(): string {
  return apiUrl(API_ENDPOINTS.TRAINERS.CREATE)
}
