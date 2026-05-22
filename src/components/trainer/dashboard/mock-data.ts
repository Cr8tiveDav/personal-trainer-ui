export type SessionStatus = 'Completed' | 'Upcoming' | 'Cancelled'
export type SessionType = 'Strength Training' | 'Cardio' | 'Yoga' | 'HIIT' | 'Pilates' | 'Endurance'

export interface TrainerSession {
  id: string
  clientName: string
  clientAvatar?: string
  date: string
  time: string
  type: SessionType
  status: SessionStatus
  duration: string
}

export interface UpcomingSession {
  id: string
  clientName: string
  clientAvatar?: string
  date: string
  time: string
  type: SessionType
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

export const mockSessions: TrainerSession[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    date: 'May 20, 2026',
    time: '9:00 AM',
    type: 'Strength Training',
    status: 'Completed',
    duration: '60 min',
  },
  {
    id: '2',
    clientName: 'James Carter',
    date: 'May 20, 2026',
    time: '11:00 AM',
    type: 'Cardio',
    status: 'Completed',
    duration: '45 min',
  },
  {
    id: '3',
    clientName: 'Amara Osei',
    date: 'May 21, 2026',
    time: '8:00 AM',
    type: 'HIIT',
    status: 'Upcoming',
    duration: '30 min',
  },
  {
    id: '4',
    clientName: 'Lena Fischer',
    date: 'May 21, 2026',
    time: '10:30 AM',
    type: 'Yoga',
    status: 'Upcoming',
    duration: '60 min',
  },
  {
    id: '5',
    clientName: 'Marcus Green',
    date: 'May 19, 2026',
    time: '2:00 PM',
    type: 'Pilates',
    status: 'Cancelled',
    duration: '45 min',
  },
  {
    id: '6',
    clientName: 'Priya Sharma',
    date: 'May 22, 2026',
    time: '7:00 AM',
    type: 'Endurance',
    status: 'Upcoming',
    duration: '60 min',
  },
  {
    id: '7',
    clientName: 'Tom Nguyen',
    date: 'May 18, 2026',
    time: '4:00 PM',
    type: 'Strength Training',
    status: 'Completed',
    duration: '60 min',
  },
  {
    id: '8',
    clientName: 'Olivia Brooks',
    date: 'May 17, 2026',
    time: '6:00 PM',
    type: 'Cardio',
    status: 'Completed',
    duration: '45 min',
  },
]

export const mockUpcomingSessions: UpcomingSession[] = [
  {
    id: '3',
    clientName: 'Amara Osei',
    date: 'May 21, 2026',
    time: '8:00 AM',
    type: 'HIIT',
  },
  {
    id: '4',
    clientName: 'Lena Fischer',
    date: 'May 21, 2026',
    time: '10:30 AM',
    type: 'Yoga',
  },
  {
    id: '6',
    clientName: 'Priya Sharma',
    date: 'May 22, 2026',
    time: '7:00 AM',
    type: 'Endurance',
  },
]

export const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing trainer! Really pushed me beyond my limits in the best way possible.',
    date: 'May 20, 2026',
  },
  {
    id: '2',
    clientName: 'James Carter',
    rating: 4,
    comment: 'Great session, very focused and professional. Will book again.',
    date: 'May 19, 2026',
  },
  {
    id: '3',
    clientName: 'Tom Nguyen',
    rating: 5,
    comment: 'Best fitness session I\'ve had. The workout plan was tailored perfectly.',
    date: 'May 18, 2026',
  },
]

export const mockChartData: ChartData[] = [
  { day: 'Mon', sessions: 4 },
  { day: 'Tue', sessions: 6 },
  { day: 'Wed', sessions: 3 },
  { day: 'Thu', sessions: 7 },
  { day: 'Fri', sessions: 5 },
  { day: 'Sat', sessions: 8 },
  { day: 'Sun', sessions: 2 },
]

export const mockStats = {
  totalSessions: 124,
  upcomingSessions: 3,
  revenueEarned: '$4,820',
  activeClients: 18,
  totalReviews: 47,
}
