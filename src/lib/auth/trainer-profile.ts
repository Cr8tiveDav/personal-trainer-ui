import Cookies from 'universal-cookie'
import { siteConfig } from '@/config/site'
import { getToken, setToken } from '@/lib/get-token'

export type StoredTrainerProfile = {
  name: string
  email: string
  avatar_url?: string | null
  trainer_id?: string
}

const cookies = new Cookies()

function parseProfileValue(raw: unknown): StoredTrainerProfile | null {
  if (!raw) return null

  try {
    const parsed =
      typeof raw === 'string' ? (JSON.parse(raw) as StoredTrainerProfile) : raw

    if (!parsed || typeof parsed !== 'object') return null

    const profile = parsed as StoredTrainerProfile
    return {
      name: profile.name ?? '',
      email: profile.email ?? '',
      avatar_url: profile.avatar_url ?? null,
      trainer_id: profile.trainer_id,
    }
  } catch {
    return null
  }
}

function decodeAccessTokenPayload(): Record<string, unknown> | null {
  const token = getToken()
  if (!token) return null

  try {
    const segment = token.split('.')[1]
    if (!segment) return null
    return JSON.parse(atob(segment)) as Record<string, unknown>
  } catch {
    return null
  }
}

export function getTrainerProfileFromCookie(): StoredTrainerProfile | null {
  if (typeof window === 'undefined') return null

  const raw = cookies.get(siteConfig.cookieNames.user_profile)
  return parseProfileValue(raw)
}

function getUserIdFromAccessToken(): string | null {
  const payload = decodeAccessTokenPayload()
  const sub = payload?.sub
  return typeof sub === 'string' && sub.trim() ? sub : null
}

function getTrainerIdFromAccessToken(): string | null {
  const payload = decodeAccessTokenPayload()
  if (!payload) return null

  const id =
    payload.trainer_id ?? payload.trainerId ?? payload.trainer_uuid
  return typeof id === 'string' && id.trim() ? id : null
}

function readTrainerIdCookie(): string | null {
  const raw = cookies.get(siteConfig.cookieNames.trainer_id)
  if (typeof raw === 'string' && raw.trim()) return raw.trim()
  return null
}

/** Persist trainer UUID for API paths (not the auth user id). */
export function persistTrainerId(trainerId: string, maxAgeSeconds = 7 * 24 * 60 * 60) {
  if (!trainerId.trim()) return
  setToken(siteConfig.cookieNames.trainer_id, trainerId.trim(), maxAgeSeconds)
}

function isAuthUserId(id: string): boolean {
  const userId = getUserIdFromAccessToken()
  return Boolean(userId && id === userId)
}

/** Trainer UUID for API paths — never the auth user id (`sub`). */
export function getStoredTrainerId(): string | null {
  const fromCookie = readTrainerIdCookie()
  if (fromCookie && !isAuthUserId(fromCookie)) return fromCookie

  const profile = getTrainerProfileFromCookie()
  let trainerId = profile?.trainer_id ?? getTrainerIdFromAccessToken() ?? null

  if (trainerId && isAuthUserId(trainerId)) {
    trainerId = null
  }

  return trainerId
}
