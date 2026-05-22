import type { ApiEnvelope } from './index'

export interface DiscoverySlot {
  id: string
  day_of_week: number
  start_time: string
  end_time: string
  timezone: string
  is_active: boolean
}

export interface DiscoverySlotPayload {
  day_of_week: number
  start_time: string
  end_time: string
  timezone: string
  is_active: boolean
}

export type DiscoverySlotsListResponse = ApiEnvelope<
  DiscoverySlot[] | { slots?: DiscoverySlot[]; discovery_slots?: DiscoverySlot[] }
>

export type DiscoverySlotResponse = ApiEnvelope<DiscoverySlot>
