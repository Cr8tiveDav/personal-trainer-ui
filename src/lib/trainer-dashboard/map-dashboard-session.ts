import type { Session } from '@/components/adminSessions/session'
import type {
  SessionStatus,
  TrainerSession,
  UpcomingSession,
} from '@/components/trainer/dashboard/types'

function splitScheduled(scheduled: string): { date: string; time: string } {
  if (!scheduled || scheduled === '-') {
    return { date: '—', time: '—' }
  }

  const commaIndex = scheduled.indexOf(',')
  if (commaIndex === -1) {
    return { date: scheduled, time: '—' }
  }

  const date = scheduled.slice(0, commaIndex).trim()
  const time = scheduled.slice(commaIndex + 1).trim()
  return { date, time: time || '—' }
}

function mapSessionStatus(state: Session['state']): SessionStatus {
  const normalized = state.toLowerCase()
  if (normalized === 'completed' || normalized === 'settled') {
    return 'Completed'
  }
  if (normalized === 'missed' || normalized === 'disputed') {
    return 'Cancelled'
  }
  return 'Upcoming'
}

export function mapToTrainerSession(session: Session): TrainerSession {
  const { date, time } = splitScheduled(session.scheduled)

  return {
    id: session.id,
    clientName: session.client.name,
    clientAvatar: session.client.avatar,
    date,
    time,
    type: session.type,
    status: mapSessionStatus(session.state),
    duration: session.duration === '-' ? '—' : session.duration,
  }
}

export function mapToUpcomingSession(session: TrainerSession): UpcomingSession {
  return {
    id: session.id,
    clientName: session.clientName,
    clientAvatar: session.clientAvatar,
    date: session.date,
    time: session.time,
    type: session.type,
  }
}

export function mapSessionsForDashboard(sessions: Session[]) {
  const rows = sessions.map(mapToTrainerSession)
  const upcoming = rows
    .filter((s) => s.status === 'Upcoming')
    .slice(0, 5)
    .map(mapToUpcomingSession)

  return { sessions: rows, upcoming }
}
