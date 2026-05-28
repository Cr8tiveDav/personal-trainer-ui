export const categories = [
  'All',
  'Strength',
  'Yoga & Flexibility',
  'HIIT & Fat Loss',
  'Pilates & Core',
  'Mobility & Recovery',
  'Strength & Conditioning',
  'Cardio & Endurance',
  'Mind & Body',
] as const

export type Category = string

export type Trainer = {
  id?: string
  name: string
  sessions: number
  specialties: string[]
  image?: string | null
  rating?: number
  categories: Category[]
}


