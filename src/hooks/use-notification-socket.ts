"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  notificationsQueryKey,
  normalizeNotifications,
  upsertNotification,
} from "@/api/notifications";
import type {
  NotificationItem,
  NotificationsResponse,
} from "@/api/types/notifications";
import { ensureValidAccessToken } from "@/lib/http";

const SOCKET_RECONNECT_INITIAL_MS = 1_500;
const SOCKET_RECONNECT_MAX_MS = 30_000;

function isNotificationSocketEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS_WS !== "false";
}

function normalizeNotificationWsBase(url: string) {
  return url.replace(/\/$/, "").replace(/\/api\/v1$/, "");
}

function getDefaultNotificationWsUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  const wsBaseUrl = normalizeNotificationWsBase(apiUrl).replace(/^http/, "ws");

  return `${wsBaseUrl}/api/v1/notifications/ws`;
}

function getNotificationWsUrl() {
  if (!isNotificationSocketEnabled()) return null;

  return (
    process.env.NEXT_PUBLIC_NOTIFICATION_WS_URL?.trim() ||
    getDefaultNotificationWsUrl()
  );
}

function buildSocketUrl(url: string, token: string) {
  const socketUrl = new URL(url);
  socketUrl.searchParams.set("token", token);

  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    socketUrl.protocol === "ws:"
  ) {
    socketUrl.protocol = "wss:";
  }

  return socketUrl.toString();
}

function parseSocketNotification(rawMessage: string) {
  try {
    const parsed = JSON.parse(rawMessage) as NotificationsResponse | NotificationItem;
    const payload = "data" in parsed ? parsed.data : parsed;

    return normalizeNotifications(payload)[0] ?? null;
  } catch {
    return null;
  }
}

export function useNotificationSocket(enabled = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const wsUrl = getNotificationWsUrl();
    if (!wsUrl) return;

    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectDelay = SOCKET_RECONNECT_INITIAL_MS;
    let disposed = false;

    const clearReconnectTimer = () => {
      if (!reconnectTimer) return;
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    };

    const scheduleReconnect = () => {
      if (disposed || reconnectTimer) return;

      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        void connect();
      }, reconnectDelay);

      reconnectDelay = Math.min(reconnectDelay * 2, SOCKET_RECONNECT_MAX_MS);
    };

    const connect = async () => {
      const token = await ensureValidAccessToken();
      if (disposed || !token) return;

      socket = new WebSocket(buildSocketUrl(wsUrl, token));

      socket.onopen = () => {
        reconnectDelay = SOCKET_RECONNECT_INITIAL_MS;
      };

      socket.onmessage = (event) => {
        const notification = parseSocketNotification(String(event.data));
        if (!notification) return;

        queryClient.setQueryData<NotificationItem[]>(
          notificationsQueryKey,
          (current) => upsertNotification(current, notification),
        );
        void queryClient.invalidateQueries({ queryKey: notificationsQueryKey });

        toast(notification.title, {
          description: notification.message,
        });
      };

      socket.onerror = () => {
        socket?.close();
      };

      socket.onclose = () => {
        socket = null;
        scheduleReconnect();
      };
    };

    void connect();

    return () => {
      disposed = true;
      clearReconnectTimer();
      socket?.close();
      socket = null;
    };
  }, [enabled, queryClient]);
}

