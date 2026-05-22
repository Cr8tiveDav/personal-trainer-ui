export type VideoStatus = 'Approved' | 'Pending' | 'Missing'

export type VideoItem = {
  id: string
  title: string
  thumbnail?: string
  trainer: string
  trainerSpecialty: string
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
  trainerSpecialty: string
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
    trainer: 'Marcus Reed',
    trainerSpecialty: 'Strength & Conditioning',
    duration: '01:24',
    status: 'Approved',
    uploadedAt: '6 May 2026',
  },
  {
    id: '2',
    title: 'Core Strength Fundamentals',
    trainer: 'Olivia Stone',
    trainerSpecialty: 'Yoga & Mobility',
    duration: '01:48',
    status: 'Approved',
    uploadedAt: '2 May 2026',
  },
  {
    id: '3',
    title: 'Beginner Yoga Flow',
    trainer: 'Daniel Cruz',
    trainerSpecialty: 'HIIT & Cardio',
    duration: '01:20',
    status: 'Pending',
    uploadedAt: '28 Apr 2026',
  },
  {
    id: '4',
    title: 'Advanced Strength Training',
    trainer: 'Hana Sato',
    trainerSpecialty: 'Pilates',
    duration: '01:50',
    status: 'Approved',
    uploadedAt: '20 Apr 2026',
  },
  {
    id: '5',
    title: 'Cardio Endurance Session',
    trainer: 'Noah Bennett',
    trainerSpecialty: 'Endurance Coaching',
    duration: '-',
    status: 'Missing',
    uploadedAt: '10 Apr 2026',
  },
  {
    id: '6',
    title: 'Mobility & Flexibility',
    trainer: 'Aisha Smith',
    trainerSpecialty: 'Weight Loss & Nutrition',
    duration: '01:32',
    status: 'Approved',
    uploadedAt: '1 Apr 2026',
  },
  {
    id: '7',
    title: 'Upper Body Blast',
    trainer: 'Jubril K.',
    trainerSpecialty: 'Strength Training',
    duration: '01:15',
    status: 'Approved',
    uploadedAt: '15 Mar 2026',
  },
  {
    id: '8',
    title: 'Lower Body Sculpt',
    trainer: 'Murphy E.',
    trainerSpecialty: 'Functional Fitness',
    duration: '01:38',
    status: 'Pending',
    uploadedAt: '5 Mar 2026',
  },
]

export const mockVideoDetail: VideoDetail = {
  id: '1',
  title: 'Intro - Strength Coaching',
  trainer: 'Marcus Reed',
  trainerSpecialty: 'Strength & Conditioning',
  trainerEmail: 'marcusr@fitcall.com',
  duration: '01:24',
  status: 'Approved',
  uploadedAt: 'April 12, 2026',
  description:
    'A high-intensity interval training session designed to target the full body. This workout alternates between strength and cardio bursts to maximise calorie burn and muscle activation.',
}
