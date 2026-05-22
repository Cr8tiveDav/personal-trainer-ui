import type { ApiEnvelope } from "./index";

export interface StatsData {
  total_clients: { value: number; trend: number; is_up: boolean };
  active_subscriptions: { value: number; trend: number; is_up: boolean };
  trial_users: { value: number; trend: number; is_up: boolean };
  total_trainers: { value: number; trend: number; is_up: boolean };
}

export interface Payment {
  client_name: string;
  plan: string;
  amount: number;
  duration: string;
}

export interface Activity {
  id: string;
  client_name: string;
  plan_type: string;
  trainer_name: string;
  timestamp: string;
  duration: string;
  amount: number;
  status: "completed" | "unconfirmed" | "settled" | "disputed";
}

export interface RevenueBreakdownItem {
  amount: number;
  percentage: number;
}

export interface RevenueData {
  total_revenue: number;
  breakdown: {
    subscriptions: RevenueBreakdownItem;
    one_time: RevenueBreakdownItem;
    trials: RevenueBreakdownItem;
  };
  payouts_due: number;
}

export interface TopTrainer {
  rank: number;
  initial: string;
  name: string;
  rating: number;
  total_sessions: number;
  trend: "up" | "down" | "neutral";
}

export type DashboardStatsResponse = ApiEnvelope<StatsData>;
export type LatestPaymentResponse = ApiEnvelope<Payment | null>;
export type RecentActivityResponse = ApiEnvelope<Activity[]>;
export type RevenueSnapshotResponse = ApiEnvelope<RevenueData>;
export type TopTrainersResponse = ApiEnvelope<TopTrainer[]>;
