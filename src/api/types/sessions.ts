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

export type SessionsListResponse = ApiEnvelope<unknown[]>;
export type SessionStatsResponse = ApiEnvelope<SessionStats>;
