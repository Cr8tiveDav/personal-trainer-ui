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

function formatNextSession(scheduled: string): string {
  if (!scheduled || scheduled === '-') return '—'
  const parsed = new Date(scheduled)
  if (Number.isNaN(parsed.getTime())) return scheduled
  return parsed.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function mapSessionStatus(state: Session['state']): SessionStatus {
  const normalized = state.toLowerCase()
  if (normalized === 'completed' || normalized === 'settled') {
    return 'Completed'
  }
  if (normalized === 'cancelled' || normalized === 'missed' || normalized === 'disputed') {
    return 'Cancelled'
  }
  return 'Upcoming'
}

function mapGoal(type: string): {
  goal: string
  goalVariant: TrainerSession['goalVariant']
} {
  const lower = type.toLowerCase()
  if (lower.includes('strength') || lower.includes('hiit')) {
    return { goal: 'Strength', goalVariant: 'orange' }
  }
  if (lower.includes('cardio') || lower.includes('endurance')) {
    return { goal: 'Weight Loss', goalVariant: 'green' }
  }
  if (lower.includes('yoga') || lower.includes('pilates') || lower.includes('monthly')) {
    return { goal: 'Muscle Gain', goalVariant: 'purple' }
  }
  return { goal: type || 'General Fitness', goalVariant: 'gray' }
}

function formatLocation(country: string): string {
  if (!country || country === 'N/A') return '—'
  return country.includes(',') ? country : `UK, ${country}`
}

function parseUpcomingDateParts(dateStr: string): { monthLabel: string; dateLabel: string } {
  const parsed = new Date(dateStr)
  if (Number.isNaN(parsed.getTime())) {
    return { monthLabel: '—', dateLabel: '—' }
  }
  return {
    monthLabel: parsed.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    dateLabel: String(parsed.getDate()),
  }
}

const PLATFORMS = ['zoom', 'whatsapp', 'meet', 'in-app'] as const

function pickPlatform(id: string): UpcomingSession['platform'] {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return PLATFORMS[hash % PLATFORMS.length]
}

export function mapToTrainerSession(session: Session): TrainerSession {
  const { date, time } = splitScheduled(session.scheduled)
  const { goal, goalVariant } = mapGoal(session.type)

  return {
    id: session.id,
    clientName: session.client.name,
    clientAvatar: session.client.avatar,
    location: formatLocation(session.client.country),
    nextSession: formatNextSession(session.scheduled),
    goal,
    goalVariant,
    date,
    time,
    type: session.type,
    status: mapSessionStatus(session.state),
    duration: session.duration === '-' ? '—' : session.duration,
  }
}

export function mapToUpcomingSession(session: TrainerSession): UpcomingSession {
  const { monthLabel, dateLabel } = parseUpcomingDateParts(session.date)
  const platform = pickPlatform(session.id)
  const platformLabels: Record<UpcomingSession['platform'], string> = {
    zoom: 'Video Call',
    whatsapp: 'Video Call',
    meet: 'Video Call',
    'in-app': 'Video Call',
  }

  return {
    id: session.id,
    clientName: session.clientName,
    clientAvatar: session.clientAvatar,
    monthLabel,
    dateLabel,
    timeRange: session.time.includes('—') ? session.time : session.time,
    platform,
    platformLabel: platformLabels[platform],
  }
}

export function mapSessionsForDashboard(sessions: Session[]) {
  const rows = sessions.map(mapToTrainerSession)
  const upcoming = rows
    .filter((s) => s.status === 'Upcoming')
    .slice(0, 5)
    .map(mapToUpcomingSession)

  return { sessions: rows.slice(0, 5), upcoming }
}
