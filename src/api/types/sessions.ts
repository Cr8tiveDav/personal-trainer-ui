import type { ApiEnvelope } from "./index";

export interface SessionStats {
  total_sessions: number;
  total_sessions_change: string;
  need_confirmation: number;
  open_disputes: number;
  trial_paid_rate: string;
  trial_paid_rate_change: string;
  no_show_rate: string;
  no_show_rate_change: string;
}

// api/types/sessions.ts
export interface BackendSession {
  id: string
  session_id: string
  client_id: string        
  client_name: string
  client_email: string
  trainer_id: string
  trainer_name: string
  trainer_email: string
  booking_status: string
  scheduled_start: string
  scheduled_end: string
  session_platform: string
  timezone: string
  zoom_meeting_link?: string
}

export type SessionsListResponse = ApiEnvelope<BackendSession[]>;
export type SessionStatsResponse = ApiEnvelope<SessionStats>;
