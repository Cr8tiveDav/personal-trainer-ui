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

export type Category = (typeof categories)[number]

export type Trainer = {
  name: string
  sessions: number
  specialties: string[]
  image: string
  rating?: number
  categories: Category[]
}

export const trainers: Trainer[] = [
  {
    name: 'Tobi Adeyemi',
    sessions: 24,
    specialties: ['Strength', 'Mobility & Recovery'],
    image: '/images/landing-page/tra1.jpg',
    categories: ['Strength', 'Mobility & Recovery'],
  },
  {
    name: 'John Mathew',
    sessions: 24,
    specialties: ['Strength', 'Mobility & Recovery'],
    image: '/images/landing-page/tra2.png',
    categories: ['Strength', 'Strength & Conditioning'],
  },
  {
    name: 'Isreal Dennis',
    sessions: 24,
    specialties: ['Strength', 'Yoga & Flexibility'],
    image: '/images/landing-page/tra3.jpg',
    categories: ['Strength', 'Yoga & Flexibility'],
  },
  {
    name: 'Ayobami Gabriel',
    sessions: 24,
    specialties: [
      'Pilates & Core',
      'Mobility & Recovery',
      'Yoga & Flexibility',
    ],
    image: '/images/landing-page/tra4.jpg',
    categories: ['Pilates & Core', 'Mobility & Recovery', 'Yoga & Flexibility'],
  },
  {
    name: 'Bakare Samuel',
    sessions: 24,
    specialties: ['Strength', 'Mobility & Recovery'],
    image: '/images/landing-page/tra5.jpg',
    categories: ['Strength', 'Mobility & Recovery'],
  },
  {
    name: 'James Gray',
    sessions: 24,
    specialties: ['Strength', 'Mobility & Recovery'],
    image: '/images/landing-page/tra6.jpg',
    categories: ['Strength', 'Mobility & Recovery'],
  },
]
