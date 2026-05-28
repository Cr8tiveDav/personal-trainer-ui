// =========================
// Revenue Summary
// =========================
export interface Revenue {
  total: number;
  subscriptions: number;
  one_time_sessions: number;
  trial_conversions: number;
}

// =========================
// Latest Payment
// =========================
export interface LatestPayment {
  id: string;
  client_name: string;
  client_email: string;
  plan_type: string;
  plan_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string; // ISO date string
}

// =========================
// API Response Data
// =========================
export interface RevenueData {
  revenue: Revenue;
  latest_payment: LatestPayment;
}

// =========================
// Full API Response
// =========================
export interface RevenueApiResponse {
  message: string;
  code: string;
  data: RevenueData;
  meta: string | null;
}