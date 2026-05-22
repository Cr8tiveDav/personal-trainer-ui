import { Session } from '@/components/adminSessions/session'
import { mapBackendSessionsResponse } from './mapper'

const isSession = (value: unknown): value is Session => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const session = value as Partial<Session>
  return (
    typeof session.id === 'string' &&
    typeof session.scheduled === 'string' &&
    typeof session.duration === 'string' &&
    !!session.client &&
    !!session.trainer
  )
}

export async function fetchAdminSessionsClient(): Promise<Session[]> {
  const res = await fetch('/api/admin/sessions?page=1&limit=100')
  if (!res.ok) throw new Error('Failed to fetch admin sessions')
  const data = await res.json()
  if (Array.isArray(data.data) && data.data.every(isSession)) return data.data

  return mapBackendSessionsResponse(data)
}
