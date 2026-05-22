import type {
  BackendTrainerResponse,
  Trainer,
  TrainerAvailability,
  TrainerStatus,
} from '@/components/admin/trainers/types';

/** Go sql.NullString-style rating from the API */
type NullableString = { String: string; Valid: boolean };

function parseAverageRating(
  rating: BackendTrainerResponse['average_rating']
): number {
  if (rating == null) return 0;
  if (typeof rating === 'number') return rating;
  const nullable = rating as NullableString;
  if (nullable.Valid && nullable.String) {
    const parsed = parseFloat(nullable.String);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function displayName(trainer: BackendTrainerResponse): string {
  const bio = trainer.bio?.trim();
  if (bio) {
    const short = bio.length > 40 ? `${bio.slice(0, 40)}…` : bio;
    return short;
  }
  return `Trainer ${trainer.id.slice(0, 8)}`;
}

function formatList(items: string[]) {
  //  Return empty string if the array has no items
  if (!items || items.length === 0) return '';

  // If there's only 1 item, no joining is needed
  if (items.length === 1) return items[0];

  // Separate the very last item from the rest of the array
  const lastItem = items[items.length - 1];
  const remainingItems = items.slice(0, -1);

  // Join the first items with a comma, then snap the "&" onto the last one
  return remainingItems.join(', ') + ' & ' + lastItem;
}

export function mapBackendToFrontend(
  backendTrainer: BackendTrainerResponse
): Trainer {
  let status: TrainerStatus = 'Pending';
  const onboarding = backendTrainer.onboarding_status?.toLowerCase();
  if (onboarding === 'active' || onboarding === 'approved') status = 'Active';
  else if (onboarding === 'suspended') status = 'Suspended';

  const date = backendTrainer.created_at
    ? new Date(backendTrainer.created_at)
    : new Date();
  const dateAdded = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const rating = parseAverageRating(backendTrainer.average_rating);

  return {
    id: backendTrainer.id,
    name: backendTrainer.name,
    email: backendTrainer.email ?? 'N/A',
    bio: backendTrainer.bio ?? 'No bio available.',
    avatarUrl:
      backendTrainer.display_picture ??
      `https://i.pravatar.cc/150?u=${backendTrainer.id}`,
    specialty: formatList(backendTrainer.specializations) ?? 'General',
    status,
    sessions: null,
    earnings: 0,
    availability: 'Offline' as TrainerAvailability,
    dateAdded,
    averageRating: rating,
    totalReviews: backendTrainer.total_reviews ?? 0,
    yearsOfExperience: backendTrainer.years_of_experience ?? 0,
  };
}
