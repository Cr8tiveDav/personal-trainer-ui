export type TrainerStatus = 'Active' | 'Suspended' | 'Pending';
export type TrainerAvailability = 'Available' | 'Offline' | 'Busy';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  specialty: string;
  status: TrainerStatus;
  sessions: number | null;
  earnings: number;
  availability: TrainerAvailability;
  dateAdded: string;
  // Editable fields from PATCH /trainers/{id}
  bio?: string;
  years_of_experience?: number;
  specializations?: string[];
  training_styles?: string[];
  intro_video_url?: string;
  onboarding_status?: string;
}

export interface EditTrainerPayload {
  specializations?: string[];
  training_styles?: string[];
  bio?: string;
  years_of_experience?: number;
  intro_video_url?: string;
  display_picture?: string;
  onboarding_status?: string;
}

export interface BackendTrainerResponse {
  id: string;
  user_id: string;
  specializations: string[];
  training_styles: string[];
  benefits: Record<string, unknown>[];
  bio: string;
  years_of_experience: number;
  intro_video_url: string;
  display_picture: string;
  onboarding_status: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export type TabType = 'all' | 'active' | 'pending' | 'suspended';

export interface TrainerResponse {
  data: Trainer[];
  counts: { all: number; active: number; pending: number; suspended: number };
  pagination: { totalItems: number };
}
