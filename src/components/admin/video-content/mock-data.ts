export type VideoStatus = 'Approved' | 'Pending' | 'Missing'

export type VideoItem = {
  id: string
  title: string
  thumbnail?: string
  trainer: string
  trainerAvatar?: string
  duration: string
  status: VideoStatus
  uploadedAt: string
}

export type VideoDetail = {
  id: string
  title: string
  thumbnail?: string
  videoUrl?: string
  trainer: string
  trainerAvatar?: string
  trainerEmail: string
  duration: string
  status: VideoStatus
  uploadedAt: string
  description: string
}

export const mockVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Full Body HIIT Workout',
    trainer: 'Amara J.',
    duration: '45:00',
    status: 'Approved',
    uploadedAt: '6 May 2026',
  },
  {
    id: '2',
    title: 'Core Strength Fundamentals',
    trainer: 'Cara K.',
    duration: '30:00',
    status: 'Approved',
    uploadedAt: '2 May 2026',
  },
  {
    id: '3',
    title: 'Beginner Yoga Flow',
    trainer: 'Helen E.',
    duration: '60:00',
    status: 'Pending',
    uploadedAt: '28 Apr 2026',
  },
  {
    id: '4',
    title: 'Advanced Strength Training',
    trainer: 'Dani K.',
    duration: '50:00',
    status: 'Pending',
    uploadedAt: '20 Apr 2026',
  },
  {
    id: '5',
    title: 'Cardio Endurance Session',
    trainer: 'Sally V.',
    duration: '40:00',
    status: 'Missing',
    uploadedAt: '10 Apr 2026',
  },
  {
    id: '6',
    title: 'Mobility & Flexibility',
    trainer: 'Jade K.',
    duration: '35:00',
    status: 'Missing',
    uploadedAt: '1 Apr 2026',
  },
  {
    id: '7',
    title: 'Upper Body Blast',
    trainer: 'Jubril K.',
    duration: '25:00',
    status: 'Approved',
    uploadedAt: '15 Mar 2026',
  },
  {
    id: '8',
    title: 'Lower Body Sculpt',
    trainer: 'Murphy E.',
    duration: '38:00',
    status: 'Pending',
    uploadedAt: '5 Mar 2026',
  },
]

export const mockVideoDetail: VideoDetail = {
  id: '1',
  title: 'Full Body HIIT Workout',
  trainer: 'Amara Johnson',
  trainerEmail: 'amaraj@fitcall.com',
  duration: '45:00',
  status: 'Approved',
  uploadedAt: '6 May 2026',
  description:
    'A high-intensity interval training session designed to target the full body. This workout alternates between strength and cardio bursts to maximise calorie burn and muscle activation.',
}
