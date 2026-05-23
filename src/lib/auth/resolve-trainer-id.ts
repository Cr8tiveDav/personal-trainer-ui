import {
  getStoredTrainerId,
  getTrainerProfileFromCookie,
} from '@/lib/auth/trainer-profile'

/** Trainer UUID from login cookies/JWT — never calls admin list endpoints. */
export async function resolveTrainerId(): Promise<string | null> {
  const stored = getStoredTrainerId()
  if (stored) return stored

  const profile = getTrainerProfileFromCookie()
  return profile?.trainer_id ?? null
}
