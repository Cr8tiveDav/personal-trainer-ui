export const TRAINER_SPECIALIZATIONS = [
  'yoga',
  'speed',
  'cardio',
  'endurance',
  'strength',
] as const

export const TRAINER_ONBOARDING_STATUSES = ['pending', 'approved'] as const

export type TrainerSpecialization = (typeof TRAINER_SPECIALIZATIONS)[number]
export type TrainerOnboardingStatus = (typeof TRAINER_ONBOARDING_STATUSES)[number]

export interface TrainerBenefitInput {
  title: string
  subtext: string
}

export interface CreateTrainerInput {
  email: string
  name: string
  specializations: TrainerSpecialization[]
  training_styles?: string[]
  benefits?: TrainerBenefitInput[]
  bio?: string
  years_of_experience: number
  onboarding_status?: TrainerOnboardingStatus
  display_picture?: File | null
}

export interface ApiNullableString {
  String: string
  Valid: boolean
}

export interface TrainerBenefit {
  id: string
  title: string
  subtext: string
  position: number
}

export interface BackendTrainerResponse {
  id: string
  user_id: string
  specializations: string[]
  training_styles: string[]
  benefits?: TrainerBenefit[]
  bio: string | null
  years_of_experience: number
  intro_video_url: string | null
  display_picture: string | null
  onboarding_status: string
  average_rating: number | ApiNullableString | null
  total_reviews: number
  created_at: string
  updated_at: string
}

export type CreatedTrainer = BackendTrainerResponse

export interface ApiEnvelope<T> {
  status: string
  code: string
  message: string
  data: T
}

export type BackendTrainersListResponse = ApiEnvelope<BackendTrainerResponse[]>
