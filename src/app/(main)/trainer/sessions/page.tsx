'use client'

import Link from 'next/link'
import {
  useCurrentTrainerId,
  useMyTrainerSessions,
} from '@/api/trainer-dashboard'
import { AllSessionsTable } from '@/components/trainer/dashboard/AllSessionsTable'
import { TrainerSessionsPageSkeleton } from '@/components/trainer/dashboard/TrainerSessionsPageSkeleton'
import { mapToTrainerSession } from '@/lib/trainer-dashboard/map-dashboard-session'

function TrainerSessionsContent() {
  const { data: trainerId, isLoading: idLoading } = useCurrentTrainerId()
  const {
    data: sessions = [],
    isLoading: sessionsLoading,
    isError: sessionsError,
  } = useMyTrainerSessions()

  const tableSessions = sessions.map(mapToTrainerSession)

  if (idLoading) {
    return <TrainerSessionsPageSkeleton />
  }

  if (!trainerId) {
    return (
      <div className="rounded-[12px] border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
        Could not resolve your trainer profile. Please{' '}
        <Link href="/trainers/login" className="text-primary hover:underline">
          sign in again
        </Link>
        .
      </div>
    )
  }

  return (
    <div className="px-10 py-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Sessions</h1>
        <p className="mt-1 text-sm text-gray-500">
          All your booked and completed sessions with clients.
        </p>
      </div>
      <AllSessionsTable
        sessions={tableSessions}
        isLoading={sessionsLoading && sessions.length === 0}
        isError={sessionsError}
      />
    </div>
  )
}

export default function TrainerSessionsPage() {
  return <TrainerSessionsContent />
}
