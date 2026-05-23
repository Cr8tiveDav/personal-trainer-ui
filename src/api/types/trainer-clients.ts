import type { ApiEnvelope } from './index'

export interface BackendTrainerClientResponse {
  client_id: string
  client_name: string
  client_email: string
  client_avatar?: string | null
  client_gender?: string | null
  client_fitness_goals?: string[]
  client_fitness_level?: string | null
  total_bookings: number
  last_booking_date?: string | null
}

export interface TrainerClientsListMeta {
  page: number
  per_page?: number
  limit?: number
  total_pages: number
  total_count: number
  next?: string | null
}

export type TrainerClientsListResponse = ApiEnvelope<
  BackendTrainerClientResponse[]
> & {
  meta?: TrainerClientsListMeta
}
