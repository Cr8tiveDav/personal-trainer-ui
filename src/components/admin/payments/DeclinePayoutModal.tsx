"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { XCircle } from "lucide-react";

import type { WithdrawalRequest } from "./types";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { formatCurrency } from "./utils";

const declineReasons = [
  "Incorrect bank details",
  "Insufficient payout balance",
  "Suspicious activity",
  "Duplicate payout request",
  "Compliance review required",
];

type DeclinePayoutModalProps = {
  onConfirm?: (
    request: WithdrawalRequest,
    reason: string,
    note?: string,
  ) => void;
  onOpenChange?: (isOpen: boolean) => void;
  request: WithdrawalRequest;
  trigger?: (openModal: () => void) => ReactNode;
};

const DeclinePayoutModal = ({
  onConfirm,
  onOpenChange,
  request,
  trigger,
}: DeclinePayoutModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const resetForm = useCallback(() => {
    setReason("");
    setNote("");
  }, []);
  const openModal = useCallback(() => {
    resetForm();
    setIsOpen(true);
  }, [resetForm]);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    resetForm();
  }, [resetForm]);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal, isOpen]);

  const handleConfirm = () => {
    if (!reason) {
      return;
    }

    onConfirm?.(request, reason, note.trim() || undefined);
    closeModal();
  };

  return (
    <>
      {trigger ? (
        trigger(openModal)
      ) : (
        <button
          type="button"
          onClick={openModal}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground"
        >
          Decline
        </button>
      )}
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="decline-payout-title"
          className="fixed inset-0 z-60 grid place-items-center bg-black/40 p-4"
        >
          <div className="w-full max-w-xl rounded-lg bg-card p-5 shadow-xl sm:p-6">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[hsl(var(--error)/0.12)] text-[hsl(var(--error))]">
              <XCircle className="size-7" />
            </div>
            <h3
              id="decline-payout-title"
              className="mt-5 text-center text-lg font-semibold text-foreground"
            >
              Decline Payout
            </h3>
            <p className="mx-auto mt-2 max-w-md text-center text-sm leading-6 text-muted">
              You are about to decline a payout of{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(request.amountRequested)}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {request.receiverName}
              </span>
              . Please tell the user why.
            </p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-foreground">
                  Reason for decline
                </span>
                <select
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/10"
                >
                  <option value="">Select a reason</option>
                  {declineReasons.map((declineReason) => (
                    <option key={declineReason} value={declineReason}>
                      {declineReason}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">
                  Additional note (optional)
                </span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Reason for decline"
                  className="mt-2 min-h-28 w-full resize-none rounded-md border border-border bg-card px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/10"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 min-w-40 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!reason}
                className="inline-flex h-11 min-w-40 items-center justify-center rounded-md bg-[hsl(var(--error))] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Decline Payout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeclinePayoutModal;
