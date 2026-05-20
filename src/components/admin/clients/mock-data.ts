export type ClientStatus = 'Active' | 'Paused' | 'Inactive'
export type PlanType = 'Monthly' | 'One Time'

export type Client = {
  id: string
  name: string
  email: string
  avatar?: string
  trainer: string
  trainerEmail: string
  plan: PlanType
  sessions: number | null
  lastSession: string
  status: ClientStatus
}

export type SessionStatus = 'Completed' | 'Upcoming' | 'Rescheduled' | 'Cancelled'

export type ClientSession = {
  id: string
  client: string
  clientAvatar?: string
  type: string
  date: string
  status: SessionStatus
}

export type ClientDetail = {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  banner?: string
  age: number
  gender: string
  status: ClientStatus
  about: string
  totalSessions: number
  earnings: number
  rating: number
  activeClients: number
  recentActivity: {
    id: string
    type: 'completed' | 'booked' | 'review' | 'rescheduled'
    text: string
    time: string
  }[]
  sessionStats: {
    upcoming: number
    completed: number
    rescheduled: number
    cancelled: number
  }
  sessions: ClientSession[]
}

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Amara J.',
    email: 'amaraj@fitc...',
    trainer: 'Amara J.',
    trainerEmail: 'amaraj@fitc...',
    plan: 'Monthly',
    sessions: 146,
    lastSession: '6 May 2026',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Cara K.',
    email: 'carak@fitc...',
    trainer: 'Cara K.',
    trainerEmail: 'carak@fitc...',
    plan: 'Monthly',
    sessions: 100,
    lastSession: '2 May 2025',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Helen E.',
    email: 'ehenry@fitc...',
    trainer: 'Helen E.',
    trainerEmail: 'ehenry@fitc...',
    plan: 'Monthly',
    sessions: 20,
    lastSession: '15 Dec 2024',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Dani K.',
    email: 'dani@fitc...',
    trainer: 'Dani K.',
    trainerEmail: 'dani@fitc...',
    plan: 'Monthly',
    sessions: 12,
    lastSession: '4 Sept 2024',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Sally V.',
    email: 'sallv@fitc...',
    trainer: 'Sally V.',
    trainerEmail: 'sallv@fitc...',
    plan: 'One Time',
    sessions: 0,
    lastSession: '12 Aug 2024',
    status: 'Paused',
  },
  {
    id: '6',
    name: 'Jade K.',
    email: 'kjade@fitc...',
    trainer: 'Jade K.',
    trainerEmail: 'kjade@fitc...',
    plan: 'One Time',
    sessions: null,
    lastSession: '30 Jun 2024',
    status: 'Paused',
  },
  {
    id: '7',
    name: 'Jubril K.',
    email: 'jubk@fitc...',
    trainer: 'Jubril K.',
    trainerEmail: 'jubk@fitc...',
    plan: 'Monthly',
    sessions: 10,
    lastSession: '21 Mar 2024',
    status: 'Active',
  },
  {
    id: '8',
    name: 'Murphy E.',
    email: 'edmurp@fitc...',
    trainer: 'Murphy E.',
    trainerEmail: 'edmurp@fitc...',
    plan: 'One Time',
    sessions: 46,
    lastSession: '9 Nov 2023',
    status: 'Active',
  },
  {
    id: '9',
    name: 'Ebube A.',
    email: 'eddy@fitc...',
    trainer: 'Ebube A.',
    trainerEmail: 'eddy@fitc...',
    plan: 'Monthly',
    sessions: 122,
    lastSession: '9 Nov 2023',
    status: 'Paused',
  },
  {
    id: '10',
    name: 'Chioma A.',
    email: 'chilove@fitc...',
    trainer: 'Chioma A.',
    trainerEmail: 'chilove@fitc...',
    plan: 'Monthly',
    sessions: 29,
    lastSession: '9 Nov 2023',
    status: 'Active',
  },
]

export const mockClientDetail: ClientDetail = {
  id: '2',
  name: 'Cara Kelvin',
  email: 'carak@gmail.com',
  phone: '+234 813 492 4042',
  avatar: '/images/admin/clients/cara-kelvin-avatar.png',
  banner: '/images/admin/clients/cara-kelvin-banner.png',
  age: 24,
  gender: 'Female',
  status: 'Active',
  about:
    "I help you stay consistent with your workouts, even on the days you don't feel like showing up. Whether your goal is weight loss, muscle gain, or just getting back into shape, I'll guide you through structured sessions and keep you accountable every step of the way.",
  totalSessions: 142,
  earnings: 11820,
  rating: 4.7,
  activeClients: 14,
  recentActivity: [
    {
      id: '1',
      type: 'completed',
      text: 'Completed HIIT session with Mia Tanaka',
      time: '2h ago',
    },
    {
      id: '2',
      type: 'booked',
      text: 'New session booked by Olivia Stone',
      time: 'Yesterday',
    },
    {
      id: '3',
      type: 'review',
      text: 'Received a 5★ review from Jordan Reed',
      time: '2d ago',
    },
    {
      id: '4',
      type: 'rescheduled',
      text: 'Rescheduled session with Layla Ibrahim',
      time: '3d ago',
    },
  ],
  sessionStats: {
    upcoming: 2,
    completed: 40,
    rescheduled: 2,
    cancelled: 4,
  },
  sessions: [
    { id: 's1', client: 'Amara J.', type: '1:1 Strength', date: '2025-05-12 09:00', status: 'Completed' },
    { id: 's2', client: 'Cara K.', type: '1:1 Strength', date: '2025-05-12 09:00', status: 'Upcoming' },
    { id: 's3', client: 'Helen E.', type: '1:1 Strength', date: '2025-05-12 09:00', status: 'Completed' },
    { id: 's4', client: 'Dani K.', type: '1:1 Strength', date: '2025-05-12 09:00', status: 'Rescheduled' },
    { id: 's5', client: 'Sally V.', type: '1:1 Strength', date: '2025-05-12 09:00', status: 'Cancelled' },
  ],
}
