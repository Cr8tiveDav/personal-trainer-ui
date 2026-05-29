import type { ApiEnvelope } from "./index";

export interface Payment {
  client_name: string;
  plan: string;
  amount: number;
  duration: string;
}

export interface ActivityActor {
  user_id: string;
  name: string;
}

export interface ActivityTrainer {
  trainer_id: string;
  user_id: string;
  name: string;
}

export interface Activity {
  id: string;
  type: string;
  occurred_at: string;
  target_id: string;
  target_type: string;
  actor: ActivityActor;
  trainer: ActivityTrainer;
  event_time?: string;
  extra?: string;
  summary: string;
  duration?: string;
  amount?: number;
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
  id: string;
  user_id: string;
  name: string;
  email: string;
  specializations: string[];
  training_styles: string[];
  benefits: Array<{
    id: string;
    title: string;
    subtext: string;
    position: number;
  }>;
  bio: string;
  years_of_experience: number;
  intro_video_url: string;
  display_picture: string;
  gender: string;
  phone_number: string;
  onboarding_status: string;
  average_rating: number;
  total_reviews: number;
  booking_count: number;
  created_at: string;
  updated_at: string;
}

export type LatestPaymentResponse = ApiEnvelope<Payment | null>;
export type RecentActivityResponse = ApiEnvelope<{ items: Activity[] }>;
export type RevenueSnapshotResponse = ApiEnvelope<RevenueData>;
export type TopTrainersResponse = ApiEnvelope<{ top_trainers: TopTrainer[] }>;
export type SubscriptionCountResponse = ApiEnvelope<{
  active_subscriptions: number;
}>;
