import type { AdminSubscription } from "@/api/types/subscriptions";

export function formatSubscriptionCurrency(amount: number, currency: string) {
  const currencyCode = currency || "USD";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toLocaleString()}`;
  }
}

export function formatSubscriptionDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatPlanName(planType: string) {
  if (!planType) return "Unknown plan";

  return planType
    .split(/[_-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatPlatform(platform: string) {
  if (!platform) return "Unknown";
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

export function getSubscriptionUsageLabel(subscription: AdminSubscription) {
  const used = subscription.sessions_used_this_month ?? 0;
  const included = subscription.sessions_per_month;

  if (!included) return `${used} used`;

  return `${used}/${included} sessions`;
}

