import type { Session } from '@/components/adminSessions/session'
import type { MonthlyChartPoint } from '@/components/trainer/dashboard/types'

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

function parseScheduledDate(scheduled: string): Date | null {
  if (!scheduled || scheduled === '-') return null
  const parsed = new Date(scheduled)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function isCompletedState(state: Session['state']): boolean {
  const normalized = state.toLowerCase()
  return normalized === 'completed' || normalized === 'settled'
}

/** Monthly session counts for the current year (completed or upcoming). */
export function buildMonthlySessionChart(
  sessions: Session[],
  mode: 'completed' | 'upcoming',
): MonthlyChartPoint[] {
  const year = new Date().getFullYear()
  const counts = Array.from({ length: 12 }, () => 0)

  for (const session of sessions) {
    const date = parseScheduledDate(session.scheduled)
    if (!date || date.getFullYear() !== year) continue

    const completed = isCompletedState(session.state)
    if (mode === 'completed' && !completed) continue
    if (mode === 'upcoming' && completed) continue

    counts[date.getMonth()]++
  }

  return MONTH_LABELS.map((month, index) => ({
    month,
    value: counts[index],
  }))
}

export function countUniqueClients(sessions: Session[]): number {
  const names = new Set(
    sessions
      .map((s) => s.client.name.trim().toLowerCase())
      .filter(Boolean),
  )
  return names.size
}

export function countCompletedSessions(sessions: Session[]): number {
  return sessions.filter((s) => isCompletedState(s.state)).length
}

export function countUpcomingSessions(sessions: Session[]): number {
  return sessions.filter((s) => !isCompletedState(s.state)).length
}

export function averageRating(
  ratings: number[],
): { value: string; count: number } {
  if (ratings.length === 0) return { value: '0', count: 0 }
  const sum = ratings.reduce((a, b) => a + b, 0)
  return {
    value: (sum / ratings.length).toFixed(1),
    count: ratings.length,
  }
}
