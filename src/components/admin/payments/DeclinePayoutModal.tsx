"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { WithdrawalRequest } from "./types";
import { useBodyScrollLock } from "./useBodyScrollLock";

type DeclinePayoutModalProps = {
  request: WithdrawalRequest;
  trigger?: (openModal: () => void) => ReactNode;
};

const DeclinePayoutModal = ({ request, trigger }: DeclinePayoutModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  useBodyScrollLock(isOpen);

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
          <div className="w-full max-w-sm rounded-lg bg-card p-6 shadow-xl">
            <h3
              id="decline-payout-title"
              className="text-base font-semibold text-foreground"
            >
              Decline payout?
            </h3>
            <p className="mt-2 text-sm text-muted">
              This will decline {request.receiverName}&apos;s payout request.
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
                className="rounded-md bg-[hsl(var(--error))] px-4 py-2 text-sm font-medium text-white"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeclinePayoutModal;
