import WithdrawalStatusBadge from "./WithdrawalStatusBadge";
import type { WithdrawalRequest } from "./types";
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "./utils";

type WithdrawalRequestMobileCardProps = {
  request: WithdrawalRequest;
  onClick: () => void;
};

const WithdrawalRequestMobileCard = ({
  request,
  onClick,
}: WithdrawalRequestMobileCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[8px] border border-border bg-card p-4 text-left shadow-sm transition-colors hover:bg-secondary/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-medium text-foreground">{request.receiverName}</p>
          <p className="mt-1 truncate text-xs text-muted">
            {request.receiverEmail}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <WithdrawalStatusBadge status={request.status} />
          <ChevronRight className="size-4 text-muted" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted">Due date</p>
          <p className="mt-1 text-foreground">{request.dueDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Amount</p>
          <p className="mt-1 font-medium text-foreground">
            {formatCurrency(request.amountRequested, { compact: true })}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Transaction ID</p>
          <p className="mt-1 text-foreground">{request.transactionId}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Balance</p>
          <p className="mt-1 text-foreground">
            {formatCurrency(request.currentBalance, { compact: true })}
          </p>
        </div>
      </div>
    </button>
  );
};

export default WithdrawalRequestMobileCard;
