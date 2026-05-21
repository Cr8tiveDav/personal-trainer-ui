export type PayoutStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "declined";

export type PaymentTab = "all_transactions" | "income" | "withdrawal_requests";

export type PaymentSummary = {
  id: string;
  label: string;
  value: string;
  helperText: string;
  helperTone?: "positive" | "neutral" | "warning";
};

export type WithdrawalRequest = {
  id: string;
  dueDate: string;
  transactionId: string;
  receiverName: string;
  receiverEmail: string;
  status: PayoutStatus;
  currentBalance: number;
  amountRequested: number;
  transactionDate?: string;
  totalFee?: number;
  description?: string;
  declineNote?: string;
  declineReason?: string;
  receiverDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
};
