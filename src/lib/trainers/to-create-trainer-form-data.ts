import type { CreateTrainerInput } from '@/api/types/trainers'

export function toCreateTrainerFormData(input: CreateTrainerInput): FormData {
  const body = new FormData()

  body.append('email', input.email)
  body.append('name', input.name)
  body.append('phone_number', input.phone_number)
  body.append('gender', input.gender)

  input.specializations.forEach((spec) => {
    body.append('specializations', spec)
  })

  if (input.bio?.trim()) {
    body.append('bio', input.bio.trim())
  }

  body.append('years_of_experience', String(input.years_of_experience))
  body.append('onboarding_status', 'pending')

  if (input.display_picture && input.display_picture.size > 0) {
    body.append('display_picture', input.display_picture)
  }

  return body
}
