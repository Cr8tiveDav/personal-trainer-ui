"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  DashboardStatsResponse,
  LatestPaymentResponse,
  RecentActivityResponse,
  RevenueSnapshotResponse,
  TopTrainersResponse,
} from "./types/dashboard";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () =>
      getRequest<DashboardStatsResponse>({
        url: API_ENDPOINTS.DASHBOARD.STATS,
      }),
  });
}

export function useLatestPayment() {
  return useQuery({
    queryKey: ["latest-payment"],
    queryFn: () =>
      getRequest<LatestPaymentResponse>({
        url: API_ENDPOINTS.PAYMENTS.LATEST,
      }),
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ["recent-activity"],
    queryFn: () =>
      getRequest<RecentActivityResponse>({
        url: API_ENDPOINTS.SESSIONS.RECENT,
      }),
  });
}

export function useRevenueSnapshot() {
  return useQuery({
    queryKey: ["revenue-snapshot"],
    queryFn: () =>
      getRequest<RevenueSnapshotResponse>({
        url: API_ENDPOINTS.FINANCE.SUMMARY,
      }),
  });
}

export function useTopTrainers() {
  return useQuery({
    queryKey: ["top-trainers"],
    queryFn: () =>
      getRequest<TopTrainersResponse>({
        url: API_ENDPOINTS.TRAINERS.RANKINGS,
      }),
  });
}
