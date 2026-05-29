"use client";

import { useState } from "react";

import { EMPTY_STATE_IMAGE_PATHS } from "@/components/ui/EmptyState";
import EmptyPaymentState from "./EmptyPaymentState";
import PaymentsControls from "./PaymentsControls";

const PaymentsTabs = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("all");

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-lg font-semibold text-foreground">
          All Transactions
        </h3>
      </div>

      <PaymentsControls
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        statusValue={statusValue}
        onStatusChange={setStatusValue}
      />

      <EmptyPaymentState
        imageSrc={EMPTY_STATE_IMAGE_PATHS.allTransactions}
        imageAlt="No transactions"
        title="No transactions yet"
        description="All payment transactions will appear here once clients make purchases."
      />
    </div>
  );
};

export default PaymentsTabs;
