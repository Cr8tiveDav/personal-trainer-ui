import type {
  BackendTrainerResponse,
  Trainer,
  TrainerAvailability,
  TrainerStatus,
} from '@/components/admin/trainers/types'

/** Go sql.NullString-style rating from the API */
type NullableString = { String: string; Valid: boolean }

function parseAverageRating(
  rating: BackendTrainerResponse['average_rating']
): number {
  if (rating == null) return 0
  if (typeof rating === 'number') return rating
  const nullable = rating as NullableString
  if (nullable.Valid && nullable.String) {
    const parsed = parseFloat(nullable.String)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function displayName(trainer: BackendTrainerResponse): string {
  const bio = trainer.bio?.trim()
  if (bio) {
    const short = bio.length > 40 ? `${bio.slice(0, 40)}…` : bio
    return short
  }
  return `Trainer ${trainer.id.slice(0, 8)}`
}

export function mapBackendToFrontend(backendTrainer: BackendTrainerResponse): Trainer {
  let status: TrainerStatus = 'Pending'
  const onboarding = backendTrainer.onboarding_status?.toLowerCase()
  if (onboarding === 'active' || onboarding === 'approved') status = 'Active'
  else if (onboarding === 'suspended') status = 'Suspended'

  const date = backendTrainer.created_at
    ? new Date(backendTrainer.created_at)
    : new Date()
  const dateAdded = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const rating = parseAverageRating(backendTrainer.average_rating)

  return {
    id: backendTrainer.id,
    name: displayName(backendTrainer),
    email: backendTrainer.user_id,
    avatarUrl:
      backendTrainer.display_picture ??
      `https://i.pravatar.cc/150?u=${backendTrainer.id}`,
    specialty: backendTrainer.specializations?.[0] ?? 'General',
    status,
    sessions: null,
    earnings: 0,
    availability: 'Offline' as TrainerAvailability,
    dateAdded,
    averageRating: rating,
    totalReviews: backendTrainer.total_reviews ?? 0,
    yearsOfExperience: backendTrainer.years_of_experience ?? 0,
  }
}
