import type { AdminSubscriptionStatus } from "@/api/types/subscriptions";
import { cn } from "@/utils";

type SubscriptionStatusBadgeProps = {
  status: AdminSubscriptionStatus | string;
};

const statusStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-100",
  expired: "bg-amber-50 text-amber-700 ring-amber-100",
};

export function SubscriptionStatusBadge({
  status,
}: SubscriptionStatusBadgeProps) {
  const normalized = status.toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[9999px] px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset",
        statusStyles[normalized] ?? "bg-gray-50 text-gray-700 ring-gray-100",
      )}
    >
      {normalized || "unknown"}
    </span>
  );
}

