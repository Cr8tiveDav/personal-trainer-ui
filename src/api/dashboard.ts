"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  RecentActivityResponse,
  SubscriptionCountResponse,
  TopTrainersResponse,
} from "./types/dashboard";
import { ApiEnvelope } from "./types";
import { RevenueApiResponse, RevenueData } from "./types/payment";

export function useLatestPayment() {
  return useQuery({
    queryKey: ["latest-payment"],
    queryFn: () =>
      getRequest<ApiEnvelope<RevenueData>>({
        url: API_ENDPOINTS.PAYMENTS.LIST,
      }).then((res) => ({
        ...res,
        data: res.data.latest_payment,
      })),
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ["recent-activity"],
    queryFn: () =>
      getRequest<RecentActivityResponse>({
        url: API_ENDPOINTS.ADMIN.ACTIVITIES,
      }),
  });
}

export function useRevenueSnapshot() {
  return useQuery({
    queryKey: ["revenue-snapshot"],
    queryFn: () =>
      getRequest<RevenueApiResponse>({
        url: API_ENDPOINTS.PAYMENTS.LIST,
      }),
  });
}
export function useTopTrainers() {
  return useQuery({
    queryKey: ["top-trainers"],
    queryFn: () =>
      getRequest<TopTrainersResponse>({
        url: API_ENDPOINTS.ADMIN.TOP_TRAINERS,
      }),
  });
}

export function useSubscriptionCount() {
  return useQuery({
    queryKey: ["subscription-count"],
    queryFn: () =>
      getRequest<SubscriptionCountResponse>({
        url: API_ENDPOINTS.DASHBOARD.SUBSCRIPTION_COUNT,
      }),
  });
}
