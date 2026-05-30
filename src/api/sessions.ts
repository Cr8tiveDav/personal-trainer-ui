"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, putRequest } from "~/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type { Session } from "@/components/adminSessions/session";
import { mapBackendSessionsResponse } from "@/lib/sessions/map-session";
import { displayError, showSuccessToast } from "@/lib/utils";
import type {
  SessionsListResponse,
  SessionStatsResponse,
} from "./types/sessions";

export const adminSessionsQueryKey = ["admin-sessions"] as const;

const ADMIN_SESSIONS_PAGE = 1;
const ADMIN_SESSIONS_LIMIT = 100;
const TRAINER_SESSIONS_PAGE = 1;
const TRAINER_SESSIONS_LIMIT = 10;

type RescheduleSessionInput = {
  sessionId: string;
  scheduledStart: string;
  scheduledEnd: string;
  displayScheduled: string;
};

type RescheduleSessionPayload = {
  scheduled_start: string;
  scheduled_end: string;
};

async function fetchAdminSessions(): Promise<Session[]> {
  const response = await getRequest<SessionsListResponse>({
    url: `${API_ENDPOINTS.ADMIN.SESSIONS}?page=${ADMIN_SESSIONS_PAGE}&limit=${ADMIN_SESSIONS_LIMIT}`,
  });
  return mapBackendSessionsResponse(response);
}

/** Admin sessions list — direct backend call via axios (not Next.js BFF). */
export function useAdminSessions() {
  return useQuery({
    queryKey: adminSessionsQueryKey,
    queryFn: fetchAdminSessions,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 15_000,
  });
}

export function useSessionStats() {
  return useQuery({
    queryKey: ["session-stats"],
    queryFn: () =>
      getRequest<SessionStatsResponse>({
        url: API_ENDPOINTS.ADMIN.SESSIONS_STATS,
      }),
    staleTime: 60_000,
  });
}

export function useRescheduleSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      scheduledStart,
      scheduledEnd,
    }: RescheduleSessionInput) =>
      putRequest<unknown, RescheduleSessionPayload>({
        url: API_ENDPOINTS.ADMIN.SESSION_RESCHEDULE(sessionId),
        payload: {
          scheduled_start: scheduledStart,
          scheduled_end: scheduledEnd,
        },
      }),
    mutationKey: ["reschedule-session"],
    async onMutate(input) {
      await queryClient.cancelQueries({ queryKey: adminSessionsQueryKey });
      const previousSessions =
        queryClient.getQueryData<Session[]>(adminSessionsQueryKey);

      queryClient.setQueryData<Session[]>(adminSessionsQueryKey, (current) =>
        current?.map((session) =>
          session.id === input.sessionId
            ? {
                ...session,
                scheduled: input.displayScheduled,
                state: "Scheduled",
                sortTimestamp: new Date(input.scheduledStart).getTime(),
              }
            : session,
        ),
      );

      return { previousSessions };
    },
    onError(error, _input, context) {
      if (context?.previousSessions) {
        queryClient.setQueryData(adminSessionsQueryKey, context.previousSessions);
      }
      displayError(error, "Could not reschedule session");
    },
    onSuccess() {
      showSuccessToast("Session rescheduled");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: adminSessionsQueryKey });
    },
  });
}

/** Sessions for a trainer — GET /trainers/sessions?trainer_id=&page=&limit= */
export function useTrainerSessions(trainerId: string) {
  return useQuery({
    queryKey: ["trainer-sessions", trainerId],
    queryFn: async () => {
      const params = new URLSearchParams({
        trainer_id: trainerId,
        page: String(TRAINER_SESSIONS_PAGE),
        limit: String(TRAINER_SESSIONS_LIMIT),
      });
      const response = await getRequest<SessionsListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.TRAINER_SESSIONS}?${params}`,
      });
      return mapBackendSessionsResponse(response);
    },
    enabled: !!trainerId,
    staleTime: 30_000,
    retry: false,
  });
}

export function useClientSessions(clientId: string) {
  return useQuery({
    queryKey: ["client-sessions", clientId],
    queryFn: async () => {
      const response = await getRequest<SessionsListResponse>({
        url: `${API_ENDPOINTS.ADMIN.SESSIONS}?page=1&limit=100`,
      });
      const all = mapBackendSessionsResponse(response);
      return all.filter((s) => s.clientId === clientId)  // ← filter here
    },
    enabled: !!clientId,
    staleTime: 30_000,
  });
}
