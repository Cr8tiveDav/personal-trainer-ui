"use client";

import { useState } from "react";

import EmptyPaymentState from "./EmptyPaymentState";
import PaymentsControls from "./PaymentsControls";
import WithdrawalRequestsTab from "./WithdrawalRequestsTab";
import type { PaymentTab } from "./types";

const tabs: { label: string; value: PaymentTab }[] = [
  { label: "All Transactions", value: "all_transactions" },
  { label: "Income", value: "income" },
  { label: "Withdrawal Requests", value: "withdrawal_requests" },
];

const PaymentsTabs = () => {
  const [activeTab, setActiveTab] = useState<PaymentTab>("withdrawal_requests");
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");

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
        onSearchChange={setSearchValue}
        statusValue={statusValue}
        onStatusChange={setStatusValue}
      />

      {activeTab === "withdrawal_requests" ? (
        <WithdrawalRequestsTab
          key={`${searchValue}-${statusValue}`}
          searchValue={searchValue}
          statusValue={statusValue}
        />
      ) : (
        <EmptyPaymentState title="No payment records yet" />
      )}
    </div>
  );
};

export default PaymentsTabs;
