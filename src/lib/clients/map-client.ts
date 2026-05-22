import type { BackendClientResponse } from '@/api/types/clients'
import type { Client, ClientStatus } from '@/components/admin/clients/mock-data'

function formatDate(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function displayName(name: string, email: string): string {
  const trimmed = name.trim()
  if (trimmed) return trimmed
  const local = email.split('@')[0]?.trim()
  return local || email || '—'
}

function displayInitial(name: string, email: string): string {
  const source = name.trim() || email.trim()
  return source.charAt(0).toUpperCase() || '?'
}

export function mapBackendToClient(row: BackendClientResponse): Client {
  const name = displayName(row.name, row.email)
  const status: ClientStatus = row.is_active ? 'Active' : 'Inactive'

  return {
    id: row.id,
    name,
    email: row.email.trim() || '—',
    displayInitial: displayInitial(row.name, row.email),
    sessions: row.sessions_booked ?? 0,
    joinedAt: formatDate(row.joined_at),
    revenue: row.revenue ?? 0,
    status,
  }
}
