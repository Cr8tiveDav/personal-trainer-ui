'use client'

import { format } from 'date-fns'
import Link from 'next/link'
import {
  CalendarDays,
  Users,
  DollarSign,
  Dumbbell,
  Star,
} from 'lucide-react'
import {
  useCurrentTrainerId,
  useMyTrainerEarnings,
  useMyTrainerProfile,
  useMyTrainerReviews,
  useMyTrainerSessions,
} from '@/api/trainer-dashboard'
import { getTrainerProfileFromCookie } from '@/lib/auth/trainer-profile'
import {
  buildWeeklySessionChart,
  countUniqueClients,
} from '@/lib/trainer-dashboard/chart-data'
import { mapSessionsForDashboard } from '@/lib/trainer-dashboard/map-dashboard-session'
import { TrainerStatCard } from './TrainerStatCard'
import { AllSessionsTable } from './AllSessionsTable'
import { SessionOverviewChart } from './SessionOverviewChart'
import { UpcomingSessions } from './UpcomingSessions'
import { RecentReviews } from './RecentReviews'
import { SetAvailability } from './SetAvailability'
import { TrainerDashboardSkeleton } from './TrainerDashboardSkeleton'

export function TrainerDashboardClient() {
  const today = format(new Date(), 'EEEE, MMMM d')
  const profile = getTrainerProfileFromCookie()

  const { data: trainerId, isLoading: idLoading } = useCurrentTrainerId()
  const { data: trainerRes, isLoading: profileLoading } = useMyTrainerProfile()
  const {
    data: sessions = [],
    isLoading: sessionsLoading,
    isError: sessionsError,
  } = useMyTrainerSessions()
  const { data: earnings, isLoading: earningsLoading } = useMyTrainerEarnings()
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useMyTrainerReviews()

  const isLoading =
    idLoading ||
    ((profileLoading || sessionsLoading) && sessions.length === 0)

  if (isLoading) {
    return <TrainerDashboardSkeleton />
  }

  if (!trainerId) {
    return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500'>
        Could not resolve your trainer profile. Please sign out and log in
        again.
      </div>
    )
  }

  const trainer = trainerRes?.data
  const displayName =
    trainer?.name?.trim() ||
    profile?.name?.trim() ||
    'Trainer'
  const firstName = displayName.split(/\s+/)[0] || displayName

  const { sessions: tableSessions, upcoming } = mapSessionsForDashboard(sessions)
  const chartData = buildWeeklySessionChart(sessions)
  const upcomingCount = tableSessions.filter((s) => s.status === 'Upcoming').length
  const revenueDisplay =
    earnings?.summary?.thisMonth?.amount?.trim() ||
    (earningsLoading ? '—' : '$0')

  const statCards = [
    {
      title: 'Total Sessions',
      value: sessions.length,
      icon: CalendarDays,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Upcoming Sessions',
      value: upcomingCount,
      icon: Dumbbell,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      title: 'Revenue Earned',
      value: revenueDisplay,
      icon: DollarSign,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      title: 'Active Clients',
      value: countUniqueClients(sessions),
      icon: Users,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      title: 'Total Reviews',
      value: trainer?.totalReviews ?? (reviewsError ? 0 : reviews.length),
      icon: Star,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
  ]

  return (
    <div className='space-y-6 pb-6'>
      <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-xl font-bold text-gray-900'>
            Welcome back, {firstName} 👋
          </h1>
          <p className='mt-0.5 text-sm text-gray-500'>
            Here&apos;s what&apos;s happening with your sessions today.
          </p>
        </div>
        <div className='flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm'>
          <CalendarDays className='h-4 w-4 text-gray-400' />
          <span>{today}</span>
        </div>
      </div>

      <div className='mb-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
        {statCards.map((card) => (
          <TrainerStatCard key={card.title} {...card} />
        ))}
      </div>

      {sessionsError && (
        <div className='rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600'>
          Could not load sessions. Other dashboard data may be incomplete.
        </div>
      )}

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='flex flex-col gap-6 lg:col-span-2'>
          <AllSessionsTable sessions={tableSessions} />

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <SessionOverviewChart data={chartData} />
            <UpcomingSessions sessions={upcoming} />
          </div>

          <RecentReviews
            reviews={reviewsError ? [] : reviews}
            isLoading={reviewsLoading && !reviewsError}
          />
        </div>

        <div className='lg:col-span-1'>
          <SetAvailability />
        </div>
      </div>

      <p className='text-center text-xs text-gray-400'>
        <Link href='/trainer/sessions' className='text-primary hover:underline'>
          View all sessions
        </Link>
      </p>
    </div>
  )
}
