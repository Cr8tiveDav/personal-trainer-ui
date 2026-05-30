import type { ApiEnvelope } from "./index";

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  status: string;
  idempotency_key?: string;
  retry_count?: number;
  sent_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export type NotificationsPayload =
  | NotificationItem
  | NotificationItem[]
  | {
      items?: NotificationItem[];
      notifications?: NotificationItem[];
    };

export type NotificationsResponse = ApiEnvelope<NotificationsPayload>;

