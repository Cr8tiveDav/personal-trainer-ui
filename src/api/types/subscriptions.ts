import type { ApiEnvelope } from "./index";

export type AdminSubscriptionStatus = "active" | "cancelled" | "expired";

export type AdminSubscriptionStatusFilter = AdminSubscriptionStatus | "all";

export interface AdminSubscription {
  id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  trainer_id: string;
  trainer_name: string;
  trainer_email: string;
  plan_type: string;
  amount: number;
  currency: string;
  status: AdminSubscriptionStatus | string;
  platform: string;
  sessions_per_month: number;
  sessions_used_this_month?: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  cancelled_at?: string | null;
}

export interface AdminSubscriptionsMeta {
  page: number;
  page_size: number;
  total: number;
}

export type AdminSubscriptionsResponse = ApiEnvelope<AdminSubscription[]> & {
  meta?: AdminSubscriptionsMeta;
};

