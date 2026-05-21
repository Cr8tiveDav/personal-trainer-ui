import type { CreateTrainerInput } from '@/api/types/trainers'

export function toCreateTrainerFormData(input: CreateTrainerInput): FormData {
  const body = new FormData()

  body.append('email', input.email)
  body.append('name', input.name)

  input.specializations.forEach((spec) => {
    body.append('specializations', spec)
  })

  input.training_styles?.forEach((style) => {
    body.append('training_styles', style)
  })

  const benefits = input.benefits?.filter(
    (b) => b.title.trim() && b.subtext.trim()
  )
  if (benefits?.length) {
    body.append('benefits', JSON.stringify(benefits))
  }

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
