import { format } from 'date-fns'
import type { BackendTrainerClientResponse } from '@/api/types/trainer-clients'
import type { TrainerClient } from '@/components/trainer/clients/types'
import { isValidImageSrc } from '@/lib/utils'

function formatGoals(goals: string[] | undefined): string {
  if (!goals?.length) return '—'
  if (goals.length === 1) return goals[0]
  return goals.join(', ')
}

function formatLastBooking(value: string | null | undefined): string {
  if (!value?.trim()) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return format(date, 'MMM d, yyyy')
}

function formatFitnessLevel(value: string | null | undefined): string {
  const raw = value?.trim()
  if (!raw) return '—'
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
}

export function mapBackendToTrainerClient(
  row: BackendTrainerClientResponse,
): TrainerClient {
  return {
    id: row.client_id,
    name: row.client_name?.trim() || 'Unknown client',
    email: row.client_email?.trim() || '—',
    avatarUrl: isValidImageSrc(row.client_avatar?.trim()) ? row.client_avatar?.trim() : undefined,
    gender: row.client_gender?.trim() || undefined,
    goals: formatGoals(row.client_fitness_goals),
    fitnessLevel: formatFitnessLevel(row.client_fitness_level),
    totalBookings: row.total_bookings ?? 0,
    lastBookingDate: formatLastBooking(row.last_booking_date),
  }
}
