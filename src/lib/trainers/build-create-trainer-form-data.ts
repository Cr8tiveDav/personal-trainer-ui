import type { TrainerSpecialization } from '@/api/types/trainers'

/** Fields for POST /api/v1/trainers (multipart/form-data) */
export type CreateTrainerFormInput = {
  email: string
  name: string
  specializations: TrainerSpecialization[]
  years_of_experience: number
  bio?: string
  onboarding_status?: string
  display_picture?: File | null
}

/**
 * Builds multipart body for POST https://api.staging.fitcall.me/api/v1/trainers
 * @see API_ENDPOINTS.TRAINERS.CREATE
 */
export function buildCreateTrainerFormData(input: CreateTrainerFormInput): FormData {
  const body = new FormData()

  body.append('email', input.email)
  body.append('name', input.name)

  input.specializations.forEach((spec) => {
    body.append('specializations', spec)
  })

  if (input.bio?.trim()) {
    body.append('bio', input.bio.trim())
  }

  body.append('years_of_experience', String(input.years_of_experience))
  body.append('onboarding_status', input.onboarding_status ?? 'pending')

  if (input.display_picture && input.display_picture.size > 0) {
    body.append('display_picture', input.display_picture)
  }

  return body
}
