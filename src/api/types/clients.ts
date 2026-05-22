import type { ApiEnvelope } from './index'

export interface AdminUserTrainerCountData {
  total_clients: number
  total_approved_trainers: number
}

export type AdminUserTrainerCountResponse = ApiEnvelope<AdminUserTrainerCountData>

export interface BackendClientResponse {
  id: string
  name: string
  email: string
  is_active: boolean
  joined_at: string
  sessions_booked: number
  revenue: number
}

export interface ClientsListMeta {
  page: number
  per_page: number
  total_pages: number
  total_count: number
  next?: string | null
}

export type AdminClientsListResponse = ApiEnvelope<BackendClientResponse[]> & {
  meta?: ClientsListMeta
}

export type AdminClientDetailResponse = ApiEnvelope<BackendClientResponse>
