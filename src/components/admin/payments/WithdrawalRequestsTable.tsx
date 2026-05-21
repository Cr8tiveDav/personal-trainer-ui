import type { KeyboardEvent } from "react";

import WithdrawalRequestMobileCard from "./WithdrawalRequestMobileCard";
import WithdrawalStatusBadge from "./WithdrawalStatusBadge";
import type { WithdrawalRequest } from "./types";
import { formatCurrency } from "./utils";

type WithdrawalRequestsTableProps = {
  requests: WithdrawalRequest[];
  onSelectRequest: (request: WithdrawalRequest) => void;
};

const WithdrawalRequestsTable = ({
  requests,
  onSelectRequest,
}: WithdrawalRequestsTableProps) => {
  const hasRequests = requests.length > 0;

  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
    request: WithdrawalRequest,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectRequest(request);
    }
  };

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-sm lg:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-b border-border bg-card text-xs font-semibold uppercase text-muted">
            <tr>
              <th className="min-w-32 px-5 py-4">Due Date</th>
              <th className="min-w-36 px-5 py-4">Transaction ID</th>
              <th className="min-w-64 px-5 py-4">Receiver</th>
              <th className="min-w-36 px-5 py-4">Status</th>
              <th className="min-w-36 px-5 py-4">Current Bal.</th>
              <th className="min-w-32 px-5 py-4 text-right">Amt. Req</th>
            </tr>
          </thead>
          <tbody>
            {hasRequests ? (
              requests.map((request) => (
                <tr
                  key={request.id}
                  aria-label={`Open payout details for ${request.receiverName}`}
                  onClick={() => onSelectRequest(request)}
                  onKeyDown={(event) => handleRowKeyDown(event, request)}
                  role="button"
                  tabIndex={0}
                  className="h-18.5 cursor-pointer border-b border-border transition-colors last:border-b-0 hover:bg-secondary/70 focus-visible:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  <td className="px-5 py-4 font-medium text-foreground">
                    {request.dueDate}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {request.transactionId}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">
                      {request.receiverName}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {request.receiverEmail}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <WithdrawalStatusBadge status={request.status} />
                  </td>
                  <td className="px-5 py-4 text-foreground">
                    {formatCurrency(request.currentBalance, { compact: true })}
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-foreground">
                    {formatCurrency(request.amountRequested, { compact: true })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <p className="font-medium text-foreground">
                    No withdrawal requests found
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 lg:hidden">
        {hasRequests ? (
          requests.map((request) => (
            <WithdrawalRequestMobileCard
              key={request.id}
              request={request}
              onClick={() => onSelectRequest(request)}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
            <p className="font-medium text-foreground">
              No withdrawal requests found
            </p>
            <p className="mt-2 text-sm text-muted">
              Try changing your search or status filter.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawalRequestsTable;
