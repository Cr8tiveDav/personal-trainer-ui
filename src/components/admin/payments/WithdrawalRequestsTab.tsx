"use client";

import { useMemo, useState } from "react";

import { withdrawalRequests } from "./data";
import PayoutDetailsSidebar from "./PayoutDetailsSidebar";
import WithdrawalPagination from "./WithdrawalPagination";
import WithdrawalRequestsTable from "./WithdrawalRequestsTable";
import type { WithdrawalRequest } from "./types";

const ITEMS_PER_PAGE = 5;

type WithdrawalRequestsTabProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  searchValue: string;
  statusValue: string;
};

const WithdrawalRequestsTab = ({
  currentPage,
  onPageChange,
  searchValue,
  statusValue,
}: WithdrawalRequestsTabProps) => {
  const [requests, setRequests] =
    useState<WithdrawalRequest[]>(withdrawalRequests);
  const [approvedRequestIds, setApprovedRequestIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [declinedRequestIds, setDeclinedRequestIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusValue === "all" || request.status === statusValue;

      const matchesSearch =
        !normalizedSearch ||
        request.receiverName.toLowerCase().includes(normalizedSearch) ||
        request.receiverEmail.toLowerCase().includes(normalizedSearch) ||
        request.transactionId.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [requests, searchValue, statusValue]);

  const selectedRequest = useMemo(
    () => requests.find((request) => request.id === selectedRequestId) ?? null,
    [requests, selectedRequestId],
  );

  const handleApproveRequest = (request: WithdrawalRequest) => {
    setRequests((currentRequests) =>
      currentRequests.map((currentRequest) =>
        currentRequest.id === request.id
          ? { ...currentRequest, status: "completed" }
          : currentRequest,
      ),
    );
    setApprovedRequestIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(request.id);
      return nextIds;
    });
  };

  const handleDeclineRequest = (
    request: WithdrawalRequest,
    reason: string,
    note?: string,
  ) => {
    setRequests((currentRequests) =>
      currentRequests.map((currentRequest) =>
        currentRequest.id === request.id
          ? {
              ...currentRequest,
              declineNote: note,
              declineReason: reason,
              status: "declined",
            }
          : currentRequest,
      ),
    );
    setDeclinedRequestIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(request.id);
      return nextIds;
    });
  };

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const paginatedRequests = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, safeCurrentPage]);

  return (
    <div className="space-y-6">
      <WithdrawalRequestsTable
        requests={paginatedRequests}
        onSelectRequest={(request) => setSelectedRequestId(request.id)}
      />
      <WithdrawalPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <PayoutDetailsSidebar
        isApprovalSuccess={
          selectedRequest ? approvedRequestIds.has(selectedRequest.id) : false
        }
        isDeclineSuccess={
          selectedRequest ? declinedRequestIds.has(selectedRequest.id) : false
        }
        onApprove={handleApproveRequest}
        onDecline={handleDeclineRequest}
        request={selectedRequest}
        onClose={() => setSelectedRequestId(null)}
      />
    </div>
  );
};

export default WithdrawalRequestsTab;
