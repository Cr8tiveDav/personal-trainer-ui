export type ClientStatus = 'Active' | 'Pending' | 'Suspended'

export interface TrainerClient {
  id: string
  name: string
  email: string
  goal: string
  sessionsCompleted: number
  nextSession: string
  joinedAt: string
  status: ClientStatus
}

export const mockClients: TrainerClient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@gmail.com',
    goal: 'Strength Training',
    sessionsCompleted: 12,
    nextSession: 'May 21, 2026',
    joinedAt: 'Jan 10, 2026',
    status: 'Active',
  },
  {
    id: '2',
    name: 'James Carter',
    email: 'jamescarter@gmail.com',
    goal: 'Cardio & Endurance',
    sessionsCompleted: 8,
    nextSession: 'May 23, 2026',
    joinedAt: 'Feb 4, 2026',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Amara Osei',
    email: 'amara.osei@gmail.com',
    goal: 'HIIT & Weight Loss',
    sessionsCompleted: 3,
    nextSession: 'May 21, 2026',
    joinedAt: 'Apr 15, 2026',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Lena Fischer',
    email: 'lena.f@gmail.com',
    goal: 'Yoga & Flexibility',
    sessionsCompleted: 0,
    nextSession: 'May 21, 2026',
    joinedAt: 'May 10, 2026',
    status: 'Pending',
  },
  {
    id: '5',
    name: 'Marcus Green',
    email: 'marcusgreen@gmail.com',
    goal: 'Pilates',
    sessionsCompleted: 5,
    nextSession: '—',
    joinedAt: 'Mar 22, 2026',
    status: 'Suspended',
  },
  {
    id: '6',
    name: 'Priya Sharma',
    email: 'priya.s@gmail.com',
    goal: 'Endurance Training',
    sessionsCompleted: 7,
    nextSession: 'May 22, 2026',
    joinedAt: 'Feb 18, 2026',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Tom Nguyen',
    email: 'tom.nguyen@gmail.com',
    goal: 'Strength Training',
    sessionsCompleted: 15,
    nextSession: 'May 25, 2026',
    joinedAt: 'Nov 5, 2025',
    status: 'Active',
  },
  {
    id: '8',
    name: 'Olivia Brooks',
    email: 'olivia.b@gmail.com',
    goal: 'Cardio',
    sessionsCompleted: 2,
    nextSession: '—',
    joinedAt: 'May 1, 2026',
    status: 'Pending',
  },
]
