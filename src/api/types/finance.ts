import type { ApiEnvelope } from "./index";

export interface Payout {
  id: string;
  date: string;
  sessions: number;
  type: string;
  amount: string;
  status: string;
}

export interface EarningsData {
  chartData: Array<{ name: string; earnings: number }>;
  summary: {
    thisWeek: { amount: string; sessions: number };
    thisMonth: { amount: string; sessions: number };
    pendingPayout: { amount: string; schedule: string };
  };
  recentPayouts: Payout[];
}

export type EarningsResponse = ApiEnvelope<EarningsData>;
