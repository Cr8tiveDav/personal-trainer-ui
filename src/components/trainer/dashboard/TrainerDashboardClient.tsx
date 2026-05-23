"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import {
  useCurrentTrainerId,
  useMyTrainerProfile,
  useMyTrainerReviews,
  useMyTrainerSessions,
} from "@/api/trainer-dashboard";
import { getTrainerProfileFromCookie } from "@/lib/auth/trainer-profile";
import {
  averageRating,
  countCompletedSessions,
  countUniqueClients,
  countUpcomingSessions,
} from "@/lib/trainer-dashboard/chart-data";
import { mapSessionsForDashboard } from "@/lib/trainer-dashboard/map-dashboard-session";
import { TrainerStatCard } from "./TrainerStatCard";
import { AllSessionsTable } from "./AllSessionsTable";
import { SessionOverviewChart } from "./SessionOverviewChart";
import { UpcomingSessions } from "./UpcomingSessions";
import { RecentReviews } from "./RecentReviews";
import { DashboardAvailability } from "./DashboardAvailability";
import { TrainerDashboardSkeleton } from "./TrainerDashboardSkeleton";

export function TrainerDashboardClient() {
  const profile = getTrainerProfileFromCookie();

  const { data: trainerId, isLoading: idLoading } = useCurrentTrainerId();
  const { data: trainerRes, isLoading: profileLoading } = useMyTrainerProfile();
  const {
    data: sessions = [],
    isLoading: sessionsLoading,
    isError: sessionsError,
  } = useMyTrainerSessions();
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useMyTrainerReviews({ limit: 20 });

  const isLoading =
    idLoading || ((profileLoading || sessionsLoading) && sessions.length === 0);

  const todayLabel = format(new Date(), "EEEE, MMMM d, yyyy");

  const { sessions: tableSessions, upcoming } = useMemo(
    () => mapSessionsForDashboard(sessions),
    [sessions],
  );

  const reviewStats = useMemo(
    () => averageRating(reviews.map((r) => r.rating)),
    [reviews],
  );

  if (isLoading) {
    return <TrainerDashboardSkeleton />;
  }

  if (!trainerId) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
        Could not resolve your trainer profile. Please sign out and log in
        again.
      </div>
    );
  }

  const trainer = trainerRes?.data;
  const displayName =
    trainer?.name?.trim() || profile?.name?.trim() || "Trainer";
  const firstName = displayName.split(/\s+/)[0] || displayName;

  const clientCount = countUniqueClients(sessions);
  const upcomingCount = countUpcomingSessions(sessions);
  const completedCount = countCompletedSessions(sessions);

  return (
    <div className=" space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back, {firstName}
        </h1>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm"
        >
          <CalendarDays className="h-4 w-4 text-gray-400" />
          {todayLabel}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-4 xl:items-stretch">
        <div className="flex h-full min-h-0 flex-col xl:col-span-3">
          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
            <TrainerStatCard
              title="Total Clients (MAY)"
              value={clientCount}
              subtext="+12% from last week"
            />
            <TrainerStatCard
              title="Upcoming Sessions"
              value={upcomingCount}
              subtext="+2 from last week"
            />
            <TrainerStatCard
              title="Completed Sessions"
              value={completedCount}
              subtext="+8 from last week"
            />
            <TrainerStatCard
              title="Total Reviews"
              value={reviewStats.value}
              stars={Number(reviewStats.value)}
              reviewCount={reviewStats.count}
            />
          </div>

          <div className="my-2.5 grid flex-1 grid-cols-1 gap-2.5 xl:grid-cols-12 xl:items-stretch">
            <div className="flex h-full min-h-[520px] flex-col gap-2.5 xl:col-span-7 xl:min-h-[620px]">
              <div className="min-h-0 flex-1">
                <AllSessionsTable
                  sessions={tableSessions}
                  isLoading={sessionsLoading && sessions.length === 0}
                  isError={sessionsError}
                  className="h-full"
                />
              </div>
              <div className="min-h-0 flex-1">
                <SessionOverviewChart sessions={sessions} className="h-full" />
              </div>
            </div>

            <div className="flex h-full min-h-[520px] flex-col gap-2.5 xl:col-span-5 xl:min-h-[620px]">
              <div className="min-h-0 flex-1">
                <UpcomingSessions sessions={upcoming} className="h-full" />
              </div>
              <div className="min-h-0 flex-1">
                <RecentReviews
                  reviews={reviews}
                  isLoading={reviewsLoading && !reviewsError}
                  isError={reviewsError}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex h-full min-h-0 flex-col">
          <DashboardAvailability className="h-full min-h-0 flex-1" />
        </div>
      </div>
    </div>
  );
}
