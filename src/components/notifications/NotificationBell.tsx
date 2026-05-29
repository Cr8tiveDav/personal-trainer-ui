"use client";

import { useMemo, useState } from "react";
import { Bell } from "lucide-react";
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from "@/components/ui/EmptyState";
import { useNotificationSocket } from "@/hooks/use-notification-socket";
import { useNotifications } from "@/api/notifications";
import type { NotificationItem } from "@/api/types/notifications";
import { cn } from "@/utils";

const READ_NOTIFICATIONS_STORAGE_KEY = "fitcall:read-notification-ids";

type NotificationBellProps = {
  isOpen: boolean;
  onToggle: () => void;
  emptyDescription: string;
};

function formatNotificationTime(notification: NotificationItem) {
  const rawDate = notification.created_at || notification.sent_at;
  if (!rawDate) return "";

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function loadReadIds() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const rawValue = localStorage.getItem(READ_NOTIFICATIONS_STORAGE_KEY);
    const parsed = rawValue ? (JSON.parse(rawValue) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter(String) : []);
  } catch {
    return new Set<string>();
  }
}

function saveReadIds(readIds: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    READ_NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify(Array.from(readIds)),
  );
}

export function NotificationBell({
  isOpen,
  onToggle,
  emptyDescription,
}: NotificationBellProps) {
  const { data: notifications = [], isError, isLoading } = useNotifications();
  const [readIds, setReadIds] = useState<Set<string>>(loadReadIds);

  useNotificationSocket();

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !readIds.has(notification.id)).length,
    [notifications, readIds],
  );

  const markNotificationRead = (notificationId: string) => {
    setReadIds((current) => {
      const next = new Set(current);
      next.add(notificationId);
      saveReadIds(next);
      return next;
    });
  };

  const markAllRead = () => {
    setReadIds((current) => {
      const next = new Set(current);
      notifications.forEach((notification) => next.add(notification.id));
      saveReadIds(next);
      return next;
    });
  };

  return (
    <>
      <button
        type='button'
        onClick={onToggle}
        aria-label='Notifications'
        className='relative flex h-9 w-9 items-center justify-center rounded-[9999px] hover:bg-gray-100 transition-colors'
      >
        <Bell className='h-5 w-5 text-gray-500' />
        {unreadCount > 0 ? (
          <span className='absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white'>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen && (
        <div className='fixed md:absolute left-4 md:left-auto right-4 md:right-0 top-[75px] md:top-11 z-50 w-auto md:w-[400px] overflow-hidden rounded-[12px] border border-gray-100 bg-white shadow-lg'>
          <div className='flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4'>
            <div>
              <p className='text-base font-semibold text-gray-900'>
                Notifications
              </p>
              {unreadCount > 0 ? (
                <p className='mt-0.5 text-xs text-gray-500'>
                  {unreadCount} unread
                </p>
              ) : null}
            </div>
            {notifications.length > 0 ? (
              <button
                type='button'
                onClick={markAllRead}
                className='text-xs font-medium text-primary hover:underline'
              >
                Mark all read
              </button>
            ) : null}
          </div>

          {isLoading ? (
            <div className='px-5 py-8 text-center text-sm text-gray-500'>
              Loading notifications...
            </div>
          ) : isError ? (
            <div className='px-5 py-8 text-center text-sm text-red-500'>
              Could not load notifications.
            </div>
          ) : notifications.length > 0 ? (
            <div className='max-h-[360px] overflow-y-auto'>
              {notifications.map((notification) => {
                const isUnread = !readIds.has(notification.id);

                return (
                  <button
                    key={notification.id}
                    type='button'
                    onClick={() => markNotificationRead(notification.id)}
                    className={cn(
                      "flex w-full gap-3 border-b border-gray-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-gray-50",
                      isUnread && "bg-blue-50/60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        isUnread ? "bg-primary" : "bg-transparent",
                      )}
                    />
                    <span className='min-w-0 flex-1'>
                      <span className='block truncate text-sm font-semibold text-gray-900'>
                        {notification.title}
                      </span>
                      <span className='mt-1 block text-sm leading-5 text-gray-600'>
                        {notification.message}
                      </span>
                      <span className='mt-2 block text-xs text-gray-400'>
                        {formatNotificationTime(notification)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptyState
              imageSrc={EMPTY_STATE_IMAGE_PATHS.notification}
              imageAlt='No notifications'
              title='No notifications yet'
              description={emptyDescription}
              className='min-h-[280px] py-10 px-6 [&_img]:max-w-[220px] [&_h3]:text-base [&_p]:max-w-sm'
            />
          )}
        </div>
      )}
    </>
  );
}
