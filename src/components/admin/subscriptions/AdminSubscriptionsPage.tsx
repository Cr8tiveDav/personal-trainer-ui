"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReusableTabs, type TabItem } from "@/components/ui/ReusableTabs";
import {
  useAdminSubscriptionCounts,
  useAdminSubscriptions,
} from "@/api/subscriptions";
import type {
  AdminSubscription,
  AdminSubscriptionStatusFilter,
} from "@/api/types/subscriptions";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { SubscriptionsEmptyState } from "./SubscriptionsEmptyState";
import { SubscriptionsMobileCard } from "./SubscriptionsMobileCard";
import { SubscriptionsTableSkeleton } from "./SubscriptionsTableSkeleton";
import {
  formatPlatform,
  formatPlanName,
  formatSubscriptionCurrency,
  formatSubscriptionDate,
  getSubscriptionUsageLabel,
} from "./utils";

const PER_PAGE = 20;

const tabLabels: Record<AdminSubscriptionStatusFilter, string> = {
  all: "All subscriptions",
  active: "Active",
  cancelled: "Cancelled",
  expired: "Expired",
};

const tableColumns = [
  "Client",
  "Trainer",
  "Plan",
  "Platform",
  "Amount",
  "Status",
  "Usage",
  "Period",
] as const;

function getVisiblePages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, "ellipsis", total] as const;
  }

  if (current >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total] as const;
  }

  return [1, "ellipsis", current, "ellipsis", total] as const;
}

function getEmptyCopy(status: AdminSubscriptionStatusFilter) {
  if (status === "active") {
    return {
      title: "No active subscriptions",
      description: "Active client and trainer subscriptions will appear here.",
    };
  }

  if (status === "cancelled") {
    return {
      title: "No cancelled subscriptions",
      description: "Cancelled subscription records will appear here.",
    };
  }

  if (status === "expired") {
    return {
      title: "No expired subscriptions",
      description: "Expired subscription records will appear here.",
    };
  }

  return {
    title: "No subscriptions yet",
    description: "Created subscriptions will appear here once available.",
  };
}

export function AdminSubscriptionsPage() {
  const [activeTab, setActiveTab] =
    useState<AdminSubscriptionStatusFilter>("all");
  const [page, setPage] = useState(1);

  const { counts, isLoading: countsLoading } = useAdminSubscriptionCounts();
  const { data, isError, isFetching, isLoading } = useAdminSubscriptions(
    activeTab,
    page,
    PER_PAGE,
  );

  const subscriptions = data?.subscriptions ?? [];
  const totalCount = data?.meta.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE) || 1);
  const displayPage = totalCount === 0 ? 1 : Math.min(page, totalPages);
  const rangeStart = totalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1;
  const rangeEnd =
    totalCount === 0 ? 0 : Math.min(displayPage * PER_PAGE, totalCount);
  const emptyCopy = getEmptyCopy(activeTab);
  const visiblePages = getVisiblePages(displayPage, totalPages);
  const showSkeleton = isLoading && data === undefined;
  const showEmpty =
    !showSkeleton && !isError && totalCount === 0 && subscriptions.length === 0;

  const tabs = useMemo<TabItem<AdminSubscriptionStatusFilter>[]>(() => {
    const display = (value?: number) => (countsLoading ? undefined : value);

    return [
      { id: "all", label: tabLabels.all, count: display(counts.all) },
      { id: "active", label: tabLabels.active, count: display(counts.active) },
      {
        id: "cancelled",
        label: tabLabels.cancelled,
        count: display(counts.cancelled),
      },
      { id: "expired", label: tabLabels.expired, count: display(counts.expired) },
    ];
  }, [counts, countsLoading]);

  function handleTabChange(tab: AdminSubscriptionStatusFilter) {
    setActiveTab(tab);
    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === displayPage) {
      return;
    }

    setPage(nextPage);
  }

  return (
    <section className="w-full space-y-6 px-4 pb-6 lg:px-10">
      <div>
        <p className="text-sm font-medium text-muted">Finance</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">
          Subscriptions
        </h1>
      </div>

      <div className="rounded-[8px] border border-border bg-card shadow-sm">
        <div className="px-6 pt-5">
          <ReusableTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            layoutId="admin-subscriptions-tabs"
          />
        </div>

        {isError ? (
          <div className="px-6 py-16 text-center text-sm text-red-500">
            Failed to load subscriptions. Please try again.
          </div>
        ) : showEmpty ? (
          <SubscriptionsEmptyState {...emptyCopy} />
        ) : (
          <>
            <div className="hidden min-h-80 overflow-x-auto lg:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {tableColumns.map((column) => (
                      <th
                        key={column}
                        className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={isFetching && !showSkeleton ? "opacity-80" : ""}>
                  {showSkeleton ? (
                    <SubscriptionsTableSkeleton />
                  ) : (
                    subscriptions.map((subscription) => (
                      <SubscriptionTableRow
                        key={subscription.id}
                        subscription={subscription}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 px-4 py-4 lg:hidden">
              {showSkeleton
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-40 animate-pulse rounded-[8px] border border-border bg-gray-50"
                    />
                  ))
                : subscriptions.map((subscription) => (
                    <SubscriptionsMobileCard
                      key={subscription.id}
                      subscription={subscription}
                    />
                  ))}
            </div>

            <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 md:flex-row">
              <p className="text-sm text-gray-400">
                {showSkeleton
                  ? "Loading subscriptions..."
                  : `Showing ${rangeStart}-${rangeEnd} of ${totalCount} results`}
              </p>

              {totalCount > PER_PAGE && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handlePageChange(displayPage - 1)}
                    disabled={displayPage <= 1 || showSkeleton}
                    className="flex size-9 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  {visiblePages.map((item, index) =>
                    item === "ellipsis" ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex size-9 items-center justify-center text-gray-500"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePageChange(item)}
                        disabled={showSkeleton}
                        className="size-9 rounded-[6px] border border-gray-200 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        data-active={displayPage === item}
                      >
                        {item}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() => handlePageChange(displayPage + 1)}
                    disabled={displayPage >= totalPages || showSkeleton}
                    className="flex size-9 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function SubscriptionTableRow({
  subscription,
}: {
  subscription: AdminSubscription;
}) {
  return (
    <tr className="border-b border-gray-100 last:border-b-0 hover:bg-secondary/70">
      <td className="min-w-64 px-5 py-4">
        <p className="font-medium text-foreground">
          {subscription.client_name || "Unknown client"}
        </p>
        <p className="mt-1 text-xs text-muted">
          {subscription.client_email || "-"}
        </p>
      </td>
      <td className="min-w-64 px-5 py-4">
        <p className="font-medium text-foreground">
          {subscription.trainer_name || "Unknown trainer"}
        </p>
        <p className="mt-1 text-xs text-muted">
          {subscription.trainer_email || "-"}
        </p>
      </td>
      <td className="min-w-36 px-5 py-4 text-foreground">
        {formatPlanName(subscription.plan_type)}
      </td>
      <td className="min-w-28 px-5 py-4 text-foreground">
        {formatPlatform(subscription.platform)}
      </td>
      <td className="min-w-32 px-5 py-4 font-medium text-foreground">
        {formatSubscriptionCurrency(subscription.amount, subscription.currency)}
      </td>
      <td className="min-w-28 px-5 py-4">
        <SubscriptionStatusBadge status={subscription.status} />
      </td>
      <td className="min-w-36 px-5 py-4 text-foreground">
        {getSubscriptionUsageLabel(subscription)}
      </td>
      <td className="min-w-56 px-5 py-4 text-foreground">
        <p>
          {formatSubscriptionDate(subscription.current_period_start)} -{" "}
          {formatSubscriptionDate(subscription.current_period_end)}
        </p>
        {subscription.cancelled_at ? (
          <p className="mt-1 text-xs text-muted">
            Cancelled {formatSubscriptionDate(subscription.cancelled_at)}
          </p>
        ) : (
          <p className="mt-1 text-xs text-muted">
            Created {formatSubscriptionDate(subscription.created_at)}
          </p>
        )}
      </td>
    </tr>
  );
}

