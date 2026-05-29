import type { AdminSubscription } from "@/api/types/subscriptions";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import {
  formatPlatform,
  formatPlanName,
  formatSubscriptionCurrency,
  formatSubscriptionDate,
  getSubscriptionUsageLabel,
} from "./utils";

type SubscriptionsMobileCardProps = {
  subscription: AdminSubscription;
};

export function SubscriptionsMobileCard({
  subscription,
}: SubscriptionsMobileCardProps) {
  return (
    <article className="rounded-[8px] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {subscription.client_name || "Unknown client"}
          </p>
          <p className="mt-1 truncate text-xs text-muted">
            {subscription.client_email || "-"}
          </p>
        </div>
        <SubscriptionStatusBadge status={subscription.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Detail label="Trainer" value={subscription.trainer_name || "-"} />
        <Detail label="Plan" value={formatPlanName(subscription.plan_type)} />
        <Detail label="Platform" value={formatPlatform(subscription.platform)} />
        <Detail
          label="Amount"
          value={formatSubscriptionCurrency(
            subscription.amount,
            subscription.currency,
          )}
        />
        <Detail label="Usage" value={getSubscriptionUsageLabel(subscription)} />
        <Detail
          label="Renews"
          value={formatSubscriptionDate(subscription.current_period_end)}
        />
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 truncate text-sm text-foreground">{value}</p>
    </div>
  );
}

