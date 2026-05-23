export type SessionStatus = 'Completed' | 'Upcoming' | 'Cancelled'

export type SessionType =
  | 'Strength Training'
  | 'Cardio'
  | 'Yoga'
  | 'HIIT'
  | 'Pilates'
  | 'Endurance'
  | 'Monthly'
  | 'Free Trial'
  | 'One Time'

export interface TrainerSession {
  id: string
  clientName: string
  clientAvatar?: string
  date: string
  time: string
  type: string
  status: SessionStatus
  duration: string
}

export interface UpcomingSession {
  id: string
  clientName: string
  clientAvatar?: string
  date: string
  time: string
  type: string
}

export interface Review {
  id: string
  clientName: string
  clientAvatar?: string
  rating: number
  comment: string
  date: string
}

export interface ChartData {
  day: string
  sessions: number
}
