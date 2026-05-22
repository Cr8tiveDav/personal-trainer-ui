"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  SessionsListResponse,
  SessionStatsResponse,
} from "./types/sessions";

export function useSessionsList() {
  return useQuery({
    queryKey: ["admin-sessions-list"],
    queryFn: () =>
      getRequest<SessionsListResponse>({
        url: API_ENDPOINTS.SESSIONS.LIST,
      }),
  });
}

export function useSessionStats() {
  return useQuery({
    queryKey: ["session-stats"],
    queryFn: () =>
      getRequest<SessionStatsResponse>({
        url: API_ENDPOINTS.SESSIONS.STATS,
      }),
  });
}

export function useTrainerSessions(trainerId: string) {
  return useQuery({
    queryKey: ["trainer-sessions", trainerId],
    queryFn: async () => {
      // Use query params to fetch sessions for this specific trainer
      const response = await getRequest<SessionsListResponse>({
        url: `${API_ENDPOINTS.SESSIONS.LIST}?trainer_id=${trainerId}`,
      });
      // Fallback in case response is missing data
      return Array.isArray(response.data) ? response.data : [];
    },
    enabled: !!trainerId,
    retry: false,
  });
}
