"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

import type { WithdrawalRequest } from "./types";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { formatCurrency } from "./utils";

type ApprovePayoutModalProps = {
  onConfirm?: (request: WithdrawalRequest) => void;
  onOpenChange?: (isOpen: boolean) => void;
  request: WithdrawalRequest;
  trigger?: (openModal: () => void) => ReactNode;
};

const ApprovePayoutModal = ({
  onConfirm,
  onOpenChange,
  request,
  trigger,
}: ApprovePayoutModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm?.(request);
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
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Approve
        </button>
      )}
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="approve-payout-title"
          className="fixed inset-0 z-60 grid place-items-center bg-black/40 p-4"
        >
          <div className="w-full max-w-xl rounded-lg bg-card p-6 text-center shadow-xl">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))]">
              <CheckCircle2 className="size-7" />
            </div>
            <h3
              id="approve-payout-title"
              className="mt-5 text-lg font-semibold text-foreground"
            >
              Approve this payout?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              You are approving{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(request.amountRequested)}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {request.receiverName}
              </span>{" "}
              ({request.receiverDetails?.bankName ?? "Bank of HNG"} •{" "}
              {request.receiverDetails?.accountNumber ?? "1234567890"}).
              <br />
              This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 border-t border-border pt-5 sm:flex-row">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 min-w-40 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-foreground"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex h-11 min-w-40 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                Yes Approve
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ApprovePayoutModal;
