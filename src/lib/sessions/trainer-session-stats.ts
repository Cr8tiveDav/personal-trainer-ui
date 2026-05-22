import type { Session } from '@/components/adminSessions/session'

export type TrainerSessionStats = {
  upcoming: number
  completed: number
  rescheduled: number
  cancelled: number
}

export function getTrainerSessionStats(sessions: Session[]): TrainerSessionStats {
  return sessions.reduce<TrainerSessionStats>(
    (acc, session) => {
      const state = session.state.toLowerCase()

      if (state === 'scheduled' || state === 'unconfirmed') {
        acc.upcoming++
      } else if (state === 'completed' || state === 'settled') {
        acc.completed++
      } else if (state === 'missed' || state === 'disputed') {
        acc.cancelled++
      }

      return acc
    },
    { upcoming: 0, completed: 0, rescheduled: 0, cancelled: 0 },
  )
}
