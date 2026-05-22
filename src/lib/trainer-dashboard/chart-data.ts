import type { Session } from '@/components/adminSessions/session'
import type { ChartData } from '@/components/trainer/dashboard/types'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

function parseScheduledDate(scheduled: string): Date | null {
  if (!scheduled || scheduled === '-') return null
  const parsed = new Date(scheduled)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

/** Sessions per weekday for the current calendar week (from API session list). */
export function buildWeeklySessionChart(sessions: Session[]): ChartData[] {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(now.getDate() - now.getDay())

  const counts = Array.from({ length: 7 }, () => 0)

  for (const session of sessions) {
    const date = parseScheduledDate(session.scheduled)
    if (!date) continue
    if (date < startOfWeek) continue
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 7)
    if (date >= endOfWeek) continue
    counts[date.getDay()]++
  }

  return WEEKDAY_LABELS.map((day, index) => ({
    day,
    sessions: counts[index],
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
