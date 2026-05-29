"use client";

import { useAdminUserTrainerCount } from "@/api/clients";
import { useSubscriptionCount } from "@/api/dashboard";
import { StatCard } from "./StatCard";

export function StatCardsSection() {
  const { data: countData } = useAdminUserTrainerCount();
  const { data: subData } = useSubscriptionCount();

  const totalClients = countData?.data?.total_clients ?? 0;

  const totalTrainers = countData?.data?.total_approved_trainers ?? 0;

  const activeSubscriptions =
    subData?.data?.active_subscriptions ??
    0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Total Clients" value={totalClients} />

      <StatCard
        title="Active Subscription"
        value={activeSubscriptions}
      />

      <StatCard title="Total Trainers" value={totalTrainers} />
    </div>
  );
}
