"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { WithdrawalRequest } from "./types";
import { useBodyScrollLock } from "./useBodyScrollLock";

type ApprovePayoutModalProps = {
  onOpenChange?: (isOpen: boolean) => void;
  request: WithdrawalRequest;
  trigger?: (openModal: () => void) => ReactNode;
};

const ApprovePayoutModal = ({
  onOpenChange,
  request,
  trigger,
}: ApprovePayoutModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

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
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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
          <div className="w-full max-w-sm rounded-lg bg-card p-6 shadow-xl">
            <h3
              id="approve-payout-title"
              className="text-base font-semibold text-foreground"
            >
              Approve payout?
            </h3>
            <p className="mt-2 text-sm text-muted">
              This will approve {request.receiverName}&apos;s payout request.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-border px-4 py-2 text-sm text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ApprovePayoutModal;
