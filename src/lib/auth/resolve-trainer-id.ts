import { getRequest } from '~/lib/http'
import { API_ENDPOINTS } from '@/api/api-endpoints'
import type { TrainersListResponse } from '@/api/types/trainers'
import { siteConfig } from '@/config/site'
import { setToken } from '@/lib/get-token'
import {
  getStoredTrainerId,
  getTrainerProfileFromCookie,
} from '@/lib/auth/trainer-profile'

/** Resolve trainer UUID for the logged-in trainer (cookie, JWT, or list by email). */
export async function resolveTrainerId(): Promise<string | null> {
  const stored = getStoredTrainerId()
  if (stored) return stored

  const profile = getTrainerProfileFromCookie()
  if (!profile?.email) return null

  try {
    const response = await getRequest<TrainersListResponse>({
      url: API_ENDPOINTS.TRAINERS.LIST,
    })
    const trainers = Array.isArray(response.data) ? response.data : []
    const email = profile.email.trim().toLowerCase()
    const match = trainers.find(
      (t) => (t.email ?? '').trim().toLowerCase() === email,
    )
    const trainerId = match?.id ?? null

    if (trainerId) {
      setToken(
        siteConfig.cookieNames.user_profile,
        JSON.stringify({
          ...profile,
          trainer_id: trainerId,
        }),
      )
    }

    return trainerId
  } catch {
    return null
  }
}
