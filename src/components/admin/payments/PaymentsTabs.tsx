"use client";

import { useState } from "react";

import { EMPTY_STATE_IMAGE_PATHS } from "@/components/ui/EmptyState";
import EmptyPaymentState from "./EmptyPaymentState";
import PaymentsControls from "./PaymentsControls";
import WithdrawalRequestsTab from "./WithdrawalRequestsTab";
import type { PaymentTab } from "./types";

const emptyPaymentTabConfig: Partial<
  Record<
    PaymentTab,
    { imageSrc: string; imageAlt: string; title: string; description: string }
  >
> = {
  all_transactions: {
    imageSrc: EMPTY_STATE_IMAGE_PATHS.allTransactions,
    imageAlt: "No transactions",
    title: "No transactions yet",
    description:
      "All payment transactions will appear here once clients make purchases.",
  },
  income: {
    imageSrc: EMPTY_STATE_IMAGE_PATHS.income,
    imageAlt: "No income",
    title: "No income records yet",
    description:
      "Income from subscriptions and sessions will show up here when available.",
  },
};

const tabs: { label: string; value: PaymentTab }[] = [
  { label: "All Transactions", value: "all_transactions" },
  { label: "Income", value: "income" },
  { label: "Withdrawal Requests", value: "withdrawal_requests" },
];

const PaymentsTabs = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>("withdrawal_requests");
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");
  const [withdrawalPage, setWithdrawalPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setWithdrawalPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusValue(value);
    setWithdrawalPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-6 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className="shrink-0 border-b border-transparent px-1 pb-3 text-sm font-medium text-muted transition-colors hover:text-foreground data-[active=true]:border-foreground data-[active=true]:text-primary"
            data-active={activeTab === tab.value}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <PaymentsControls
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        statusValue={statusValue}
        onStatusChange={handleStatusChange}
      />

      {activeTab === "withdrawal_requests" ? (
        <WithdrawalRequestsTab
          currentPage={withdrawalPage}
          onPageChange={setWithdrawalPage}
          searchValue={searchValue}
          statusValue={statusValue}
        />
      ) : emptyPaymentTabConfig[activeTab] ? (
        <EmptyPaymentState {...emptyPaymentTabConfig[activeTab]!} />
      ) : null}
    </div>
  );
};

export default PaymentsTabs;
