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

export interface DiscoveryBooking {
  id: string
  name?: string
  email?: string
  client_timezone?: string
  selected_datetime?: string
  selectedDatetime?: string
  contact_mode?: string
  created_at?: string
  phone_number?: string
  reschedule_count?: number
  user_id?: string
  meeting_id?: string
  meeting_link?: string
  zoom_meeting_id?: string
  zoom_meeting_link?: string
  client_name?: string
  client_email?: string
  trainer_name?: string
  trainer_email?: string
  scheduled_at?: string
  status: string
  timezone?: string
  clientName?: string
  clientEmail?: string
  trainerName?: string
  trainerEmail?: string
  bookingTime?: string
  date?: string
  client?: {
    name?: string
    email?: string
    first_name?: string
    last_name?: string
    firstName?: string
    lastName?: string
  }
  trainer?: {
    name?: string
    email?: string
    first_name?: string
    last_name?: string
    firstName?: string
    lastName?: string
  }
  booking_time?: string
}

export type DiscoveryBookingsListResponse = ApiEnvelope<
  DiscoveryBooking[] | { bookings?: DiscoveryBooking[]; items?: DiscoveryBooking[] }
>

