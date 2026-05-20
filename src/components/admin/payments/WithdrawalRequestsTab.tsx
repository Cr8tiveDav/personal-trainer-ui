"use client";

import { useMemo, useState } from "react";

import { withdrawalRequests } from "./data";
import PayoutDetailsSidebar from "./PayoutDetailsSidebar";
import WithdrawalPagination from "./WithdrawalPagination";
import WithdrawalRequestsTable from "./WithdrawalRequestsTable";
import type { WithdrawalRequest } from "./types";

const ITEMS_PER_PAGE = 5;

type WithdrawalRequestsTabProps = {
  searchValue: string;
  statusValue: string;
};

const WithdrawalRequestsTab = ({
  searchValue,
  statusValue,
}: WithdrawalRequestsTabProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] =
    useState<WithdrawalRequest | null>(null);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return withdrawalRequests.filter((request) => {
      const matchesStatus =
        statusValue === "all" || request.status === statusValue;

      const matchesSearch =
        !normalizedSearch ||
        request.receiverName.toLowerCase().includes(normalizedSearch) ||
        request.receiverEmail.toLowerCase().includes(normalizedSearch) ||
        request.transactionId.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [searchValue, statusValue]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedRequests = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, safeCurrentPage]);

  return (
    <div className="space-y-6">
      <WithdrawalRequestsTable
        requests={paginatedRequests}
        onSelectRequest={setSelectedRequest}
      />
      <WithdrawalPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <PayoutDetailsSidebar
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};

export default WithdrawalRequestsTab;
