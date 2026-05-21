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
