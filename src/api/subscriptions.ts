"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  AdminSubscriptionStatus,
  AdminSubscriptionStatusFilter,
  AdminSubscriptionsMeta,
  AdminSubscriptionsResponse,
} from "./types/subscriptions";

const DEFAULT_META: AdminSubscriptionsMeta = {
  page: 1,
  page_size: 20,
  total: 0,
};

export const adminSubscriptionsQueryKeys = {
  list: (
    status: AdminSubscriptionStatusFilter,
    page: number,
    limit: number,
  ) => ["admin-subscriptions", status, page, limit] as const,
  count: (status: AdminSubscriptionStatusFilter) =>
    ["admin-subscriptions-count", status] as const,
};

function buildAdminSubscriptionsUrl(
  status: AdminSubscriptionStatusFilter,
  page: number,
  limit: number,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status !== "all") {
    params.set("status", status);
  }

  return `${API_ENDPOINTS.SUBSCRIPTIONS.ADMIN_LIST}?${params.toString()}`;
}

function normalizeAdminSubscriptionsResponse(
  response: AdminSubscriptionsResponse,
) {
  return {
    subscriptions: Array.isArray(response.data) ? response.data : [],
    meta: response.meta ?? DEFAULT_META,
  };
}

export function useAdminSubscriptions(
  status: AdminSubscriptionStatusFilter,
  page: number,
  limit = 20,
) {
  return useQuery({
    queryKey: adminSubscriptionsQueryKeys.list(status, page, limit),
    queryFn: async () => {
      const response = await getRequest<AdminSubscriptionsResponse>({
        url: buildAdminSubscriptionsUrl(status, page, limit),
      });

      return normalizeAdminSubscriptionsResponse(response);
    },
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
  });
}

export function useAdminSubscriptionCounts() {
  const statuses: AdminSubscriptionStatusFilter[] = [
    "all",
    "active",
    "cancelled",
    "expired",
  ];

  const queries = useQueries({
    queries: statuses.map((status) => ({
      queryKey: adminSubscriptionsQueryKeys.count(status),
      queryFn: async () => {
        const response = await getRequest<AdminSubscriptionsResponse>({
          url: buildAdminSubscriptionsUrl(status, 1, 1),
        });
        return normalizeAdminSubscriptionsResponse(response).meta.total;
      },
      staleTime: 60_000,
    })),
  });

  return {
    counts: {
      all: queries[0].data,
      active: queries[1].data,
      cancelled: queries[2].data,
      expired: queries[3].data,
    },
    isLoading: queries.some((query) => query.isLoading),
  };
}

export type { AdminSubscriptionStatus };

