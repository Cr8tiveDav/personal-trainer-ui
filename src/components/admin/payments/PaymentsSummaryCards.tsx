import { ChevronDown, Download, Files } from "lucide-react";

import { paymentSummaries } from "./data";
import type { PaymentSummary } from "./types";

const helperToneClass: Record<
  NonNullable<PaymentSummary["helperTone"]>,
  string
> = {
  neutral: "text-muted",
  positive: "text-[hsl(var(--success))]",
  warning: "text-[hsl(var(--warning))]",
};

const PaymentsSummaryCards = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm"
        >
          <span className="inline-flex gap-0.5">
            <span className="h-4 w-1.5 rounded-sm bg-[#008751]" />
            <span className="h-4 w-1.5 rounded-sm bg-white ring-1 ring-border" />
            <span className="h-4 w-1.5 rounded-sm bg-[#008751]" />
          </span>
          NGN
          <ChevronDown className="size-4 text-muted" />
        </button>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm"
        >
          <Download className="size-4" />
          Download Report
        </button>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm"
        >
          <Files className="size-4" />
          Process All Pending
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {paymentSummaries.map((summary) => (
          <article
            key={summary.id}
            className="min-h-35.5 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm"
          >
            <p className="text-sm font-medium text-foreground">
              {summary.label}
            </p>
            <p className="mt-5 text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
              {summary.value}
            </p>
            <p
              className={`mt-2 text-xs ${
                helperToneClass[summary.helperTone ?? "neutral"]
              }`}
            >
              {summary.helperText}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PaymentsSummaryCards;
