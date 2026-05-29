"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  AnalyticsSummaryResponse,
  ConsultationConversionResponse,
  PlatformPerformanceResponse,
  SubscriptionBreakdownResponse,
} from "./types/analytics";

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ["analytics-stats"],
    queryFn: () =>
      getRequest<AnalyticsSummaryResponse>({
        url: API_ENDPOINTS.ANALYTICS.SUMMARY,
      }),
  });
}

export function useSubscriptionBreakdown() {
  return useQuery({
    queryKey: ["subscription-breakdown"],
    queryFn: () =>
      getRequest<SubscriptionBreakdownResponse>({
        url: API_ENDPOINTS.ANALYTICS.SUBSCRIPTIONS,
      }),
  });
}

export function useConsultationConversion() {
  return useQuery({
    queryKey: ["consultation-conversion"],
    queryFn: () =>
      getRequest<ConsultationConversionResponse>({
        url: API_ENDPOINTS.ANALYTICS.CONVERSION,
      }),
  });
}

export function usePlatformPerformance(period: string) {
  return useQuery({
    queryKey: ["platform-performance", period],
    queryFn: () =>
      getRequest<PlatformPerformanceResponse>({
        url: API_ENDPOINTS.ANALYTICS.PERFORMANCE(period.toLowerCase()),
      }),
  });
}
