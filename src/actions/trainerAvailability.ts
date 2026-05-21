'use server'

import { cookies } from 'next/headers'

const BASE_URL = process.env.API_URL

if (!BASE_URL) {
  console.warn('API_URL environment variable is not set')
}

export interface AvailabilitySlot {
  day_of_week: number
  start_time: string
  end_time: string
  timezone: string
}

export async function getTrainerAvailability(): Promise<AvailabilitySlot[]> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token || !BASE_URL) return []

  try {
    const res = await fetch(`${BASE_URL}/trainers/me/availability`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

export async function saveTrainerAvailability(slots: AvailabilitySlot[]) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token || !BASE_URL) return { success: false, error: 'Not authenticated' }

  try {
    const res = await fetch(`${BASE_URL}/trainers/me/availability`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ availability: slots }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { success: false, error: err.message || 'Failed to save availability' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'Network error' }
  }
}
