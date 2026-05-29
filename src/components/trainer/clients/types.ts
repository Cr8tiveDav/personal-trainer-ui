export interface TrainerClient {
  id: string
  name: string
  email: string
  avatarUrl?: string
  gender?: string
  goals: string
  fitnessLevel: string
  totalBookings: number
  lastBookingDate: string
}
