import Cookies from 'universal-cookie'
import { siteConfig } from '@/config/site'
import { getToken } from '@/lib/get-token'

export type StoredTrainerProfile = {
  name: string
  email: string
  avatar_url?: string | null
  trainer_id?: string
}

const cookies = new Cookies()

export function getTrainerProfileFromCookie(): StoredTrainerProfile | null {
  if (typeof window === 'undefined') return null

  const raw = cookies.get(siteConfig.cookieNames.user_profile)
  if (!raw || typeof raw !== 'string') return null

  try {
    const parsed = JSON.parse(raw) as StoredTrainerProfile & { id?: string }
    return {
      name: parsed.name ?? '',
      email: parsed.email ?? '',
      avatar_url: parsed.avatar_url ?? null,
      trainer_id: parsed.trainer_id ?? parsed.id,
    }
  } catch {
    return null
  }
}

function getTrainerIdFromAccessToken(): string | null {
  const token = getToken()
  if (!token) return null

  try {
    const segment = token.split('.')[1]
    if (!segment) return null
    const payload = JSON.parse(atob(segment)) as Record<string, unknown>
    const id =
      payload.trainer_id ??
      payload.trainerId ??
      payload.trainer_uuid ??
      payload.sub
    return typeof id === 'string' && id.trim() ? id : null
  } catch {
    return null
  }
}

export function getStoredTrainerId(): string | null {
  const profile = getTrainerProfileFromCookie()
  return profile?.trainer_id ?? getTrainerIdFromAccessToken() ?? null
}
