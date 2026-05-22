import type { ApiEnvelope } from "./index";

export interface AnalyticsStats {
  revenue_generated: { value: string; trend: string };
  avg_sessions_per_user: { value: number };
  session_completion_rate: { value: string };
  consultation_conversion: { value: string };
}

export interface SubscriptionPlan {
  name: string;
  users: number;
  percentage: number;
  color: string;
}

export interface SubscriptionData {
  total: number;
  plans: SubscriptionPlan[];
  note: string;
}

export interface ConversionData {
  consultations: number;
  subscriptions: number;
  drop_off: number;
  conversion_rate: number;
  trend: string;
}

export interface ChartDataPoint {
  label: string;
  subscriptions: number;
  sessions_booked: number;
  sessions_completed: number;
}

export type AnalyticsSummaryResponse = ApiEnvelope<AnalyticsStats>;
export type SubscriptionBreakdownResponse = ApiEnvelope<SubscriptionData>;
export type ConsultationConversionResponse = ApiEnvelope<ConversionData>;
export type PlatformPerformanceResponse = ApiEnvelope<ChartDataPoint[]>;
