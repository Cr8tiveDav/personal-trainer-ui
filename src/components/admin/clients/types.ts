export type ClientStatus = 'Active' | 'Paused' | 'Inactive'
export type PlanType = 'Monthly' | 'One Time'

export type Client = {
  id: string
  name: string
  email: string
  displayInitial: string
  avatar?: string
  sessions: number
  joinedAt: string
  revenue: number
  status: ClientStatus
  trainer?: string
  trainerEmail?: string
  plan?: PlanType
  lastSession?: string
}
