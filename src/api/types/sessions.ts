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

export interface BackendSession {
  id: string;
  clientName?: string;
  client_name?: string;
  type: string;
  date: string;
  status: string;
}

export type SessionsListResponse = ApiEnvelope<BackendSession[]>;
export type SessionStatsResponse = ApiEnvelope<SessionStats>;
