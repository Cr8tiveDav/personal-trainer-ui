export interface Session {
  id: string;
  client: { name: string; avatar?: string; country: string };
  trainer: { name: string; avatar?: string; country: string };
  type: "Monthly" | "Free Trial" | "One Time";
  scheduled: string;
  duration: string;
  amount: number;
  clientConf: "Yes" | "Pending" | "N/A";
  trainerConf: "Yes" | "Pending" | "N/A";
  state:
    | "Completed"
    | "Unconfirmed"
    | "Scheduled"
    | "Settled"
    | "Disputed"
    | "Missed";
  forceConfirmation?: {
    behalf: "client" | "trainer" | "both";
    reason: string;
    notes?: string;
    confirmedAt: string;
  };
}
