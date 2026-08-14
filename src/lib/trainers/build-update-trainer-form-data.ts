import type { UpdateTrainerPayload } from '@/api/types/trainers'

export type UpdateTrainerFormInput = UpdateTrainerPayload & {
  display_picture_file?: File | null
}

/**
 * Multipart body for PATCH /trainers/{id} when uploading a new display picture.
 */
export function buildUpdateTrainerFormData(
  input: UpdateTrainerFormInput,
): FormData {
  const body = new FormData()

  input.specializations?.forEach((spec) => {
    body.append('specializations', spec)
  })

  input.training_styles?.forEach((style) => {
    body.append('training_styles', style)
  })

  if (input.bio !== undefined) {
    body.append('bio', input.bio)
  }

  if (input.years_of_experience !== undefined) {
    body.append('years_of_experience', String(input.years_of_experience))
  }

  if (input.intro_video_url !== undefined) {
    body.append('intro_video_url', input.intro_video_url)
  }

  if (input.onboarding_status !== undefined) {
    body.append('onboarding_status', input.onboarding_status)
  }

  if (input.whatsapp_number !== undefined) {
    body.append('whatsapp_number', input.whatsapp_number ?? '')
  }

  if (input.apple_id !== undefined) {
    body.append('apple_id', input.apple_id ?? '')
  }

  if (input.messenger_handle !== undefined) {
    body.append('messenger_handle', input.messenger_handle ?? '')
  }

  if (input.display_picture_file && input.display_picture_file.size > 0) {
    body.append('display_picture', input.display_picture_file)
  } else if (input.display_picture) {
    body.append('display_picture', input.display_picture)
  }

  return body
}
