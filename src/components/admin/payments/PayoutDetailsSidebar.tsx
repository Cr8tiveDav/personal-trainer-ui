"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

import ApprovePayoutModal from "./ApprovePayoutModal";
import DeclinePayoutModal from "./DeclinePayoutModal";
import WithdrawalStatusBadge from "./WithdrawalStatusBadge";
import type { WithdrawalRequest } from "./types";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { formatCurrency } from "./utils";

type PayoutDetailsSidebarProps = {
  isApprovalSuccess?: boolean;
  isDeclineSuccess?: boolean;
  onApprove: (request: WithdrawalRequest) => void;
  onDecline: (request: WithdrawalRequest, reason: string, note?: string) => void;
  request: WithdrawalRequest | null;
  onClose: () => void;
};

const PayoutDetailsSidebar = ({
  isApprovalSuccess = false,
  isDeclineSuccess = false,
  onApprove,
  onDecline,
  request,
  onClose,
}: PayoutDetailsSidebarProps) => {
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);

  useBodyScrollLock(Boolean(request));

  useEffect(() => {
    if (!request) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isNestedModalOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isNestedModalOpen, onClose, request]);

  if (!request) {
    return null;
  }

  const amount = request.amountRequested;
  const totalFee = request.totalFee ?? 0;
  const receiverGets = amount - totalFee;
  const receiverDetails = request.receiverDetails ?? {
    accountName: request.receiverName.toUpperCase(),
    accountNumber: "1234567890",
    bankName: "Bank of HNG",
  };

  const transactionRows = [
    {
      label: "Status",
      value: <WithdrawalStatusBadge status={request.status} />,
    },
    {
      label: "Amount",
      value: formatCurrency(amount),
    },
    {
      label: "Total Fee",
      value: formatCurrency(totalFee),
    },
    {
      label: "Receiver gets",
      value: formatCurrency(receiverGets),
    },
    {
      label: "Date",
      value: request.transactionDate ?? request.dueDate,
    },
    {
      label: "Transactional ID",
      value: (
        <span className="font-medium text-primary underline underline-offset-2">
          {request.transactionId}
        </span>
      ),
    },
    {
      label: "Description",
      value: request.description ?? "-",
    },
  ];

  const receiverRows = [
    { label: "Account name", value: receiverDetails.accountName },
    { label: "Account number", value: receiverDetails.accountNumber },
    { label: "Bank name", value: receiverDetails.bankName },
  ];
  const canActOnPayout =
    request.status !== "completed" && request.status !== "declined";

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close payout details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/25 backdrop-blur-[1px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="payout-sidebar-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-118.5 flex-col overflow-y-auto bg-card px-4 py-5 shadow-2xl sm:px-6 sm:py-6"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
          <h2
            id="payout-sidebar-title"
            className="text-xl font-semibold text-foreground"
          >
            Payout
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-border"
            aria-label="Close payout details"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 py-6">
          <p className="text-3xl font-semibold text-foreground sm:text-4xl">
            {formatCurrency(amount)}
          </p>
          <div className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground">
            <span className="inline-flex gap-0.5">
              <span className="h-4 w-1.5 rounded-sm bg-[#008751]" />
              <span className="h-4 w-1.5 rounded-sm bg-white ring-1 ring-border" />
              <span className="h-4 w-1.5 rounded-sm bg-[#008751]" />
            </span>
            NGN
          </div>
        </div>

        {canActOnPayout ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ApprovePayoutModal
              onConfirm={onApprove}
              onOpenChange={setIsNestedModalOpen}
              request={request}
              trigger={(openModal) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  <Check className="size-5" />
                  Approve Payout
                </button>
              )}
            />
            <DeclinePayoutModal
              onConfirm={onDecline}
              onOpenChange={setIsNestedModalOpen}
              request={request}
              trigger={(openModal) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#EAF4FC] px-4 text-sm font-semibold text-primary"
                >
                  <X className="size-5" />
                  Decline Payout
                </button>
              )}
            />
          </div>
        ) : null}

        {isApprovalSuccess ? (
          <div
            role="status"
            className="mt-4 flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-[hsl(var(--success))]"
          >
            <Check className="size-5" />
            This payout has been approved
          </div>
        ) : null}

        {isDeclineSuccess ? (
          <div
            role="status"
            className="mt-4 rounded-md border border-border bg-card px-4 py-3 text-sm"
          >
            <div className="flex items-center gap-3 font-medium text-[hsl(var(--error))]">
              <X className="size-5" />
              This payout was declined
            </div>
            {request.declineReason ? (
              <p className="mt-2 text-xs text-muted">
                Reason: {request.declineReason}
              </p>
            ) : null}
          </div>
        ) : null}

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-foreground">Transaction</h3>
          <div className="mt-4 space-y-5 rounded-lg bg-secondary/70 p-4">
            {transactionRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] items-start gap-4 text-sm"
              >
                <p className="text-muted">{row.label}</p>
                <div className="min-w-0 wrap-break-word text-right font-medium text-foreground">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-foreground">
            Receiver details
          </h3>
          <div className="mt-4 space-y-5 rounded-lg bg-secondary/70 p-4">
            {receiverRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] items-start gap-4 text-sm"
              >
                <p className="text-muted">{row.label}</p>
                <p className="min-w-0 wrap-break-words text-right font-medium text-foreground">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default PayoutDetailsSidebar;
