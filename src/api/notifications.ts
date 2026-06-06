"use client";

import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  NotificationItem,
  NotificationsPayload,
  NotificationsResponse,
} from "./types/notifications";
import { getRequest } from "@/lib/http";

export const notificationsQueryKey = ["notifications"] as const;
const NOTIFICATIONS_REFETCH_INTERVAL_MS = 30_000;

function isNotificationItem(value: unknown): value is NotificationItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "message" in value
  );
}

export function normalizeNotifications(
  payload: NotificationsPayload | null | undefined,
): NotificationItem[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload.filter(isNotificationItem);
  if (isNotificationItem(payload)) return [payload];
  if (Array.isArray(payload.items)) return payload.items.filter(isNotificationItem);
  if (Array.isArray(payload.notifications)) {
    return payload.notifications.filter(isNotificationItem);
  }
  return [];
}

export function upsertNotification(
  notifications: NotificationItem[] | undefined,
  notification: NotificationItem,
) {
  const existing = notifications ?? [];
  const withoutCurrent = existing.filter((item) => item.id !== notification.id);

  return [notification, ...withoutCurrent].sort((left, right) => {
    const leftTime = new Date(left.created_at || left.sent_at || 0).getTime();
    const rightTime = new Date(right.created_at || right.sent_at || 0).getTime();

    return rightTime - leftTime;
  });
}

export async function fetchNotifications() {
  const response = await getRequest<NotificationsResponse>({
    url: API_ENDPOINTS.NOTIFICATIONS.LIST,
  });

  return normalizeNotifications(response.data);
}

export function useNotifications() {
  return useQuery({
    queryKey: notificationsQueryKey,
    queryFn: fetchNotifications,
    staleTime: 30_000,
    refetchInterval: NOTIFICATIONS_REFETCH_INTERVAL_MS,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

