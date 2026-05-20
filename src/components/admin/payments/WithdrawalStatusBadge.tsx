import type { PayoutStatus } from "./types";

const statusConfig: Record<PayoutStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Pending",
      className:
        "bg-[hsl(var(--warning)/0.18)] text-[hsl(var(--warning))]",
    },
    in_progress: {
      label: "In Progress",
      className:
        "bg-[hsl(var(--warning)/0.18)] text-[hsl(var(--warning))]",
    },
    completed: {
      label: "Completed",
      className: "bg-[hsl(var(--success)/0.16)] text-[hsl(var(--success))]",
    },
    on_hold: {
      label: "On Hold",
      className:
        "bg-[hsl(var(--warning)/0.18)] text-[hsl(var(--warning))]",
    },
    declined: {
      label: "Declined",
      className: "bg-[hsl(var(--error)/0.12)] text-[hsl(var(--error))]",
    },
  };

type WithdrawalStatusBadgeProps = {
  status: PayoutStatus;
};

const WithdrawalStatusBadge = ({ status }: WithdrawalStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex min-w-24 justify-center rounded-md px-3 py-1.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default WithdrawalStatusBadge;
