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
  averageRating?: number;
  totalReviews?: number;
  yearsOfExperience?: number;
}

export type {
  TrainerBenefitInput,
  CreateTrainerInput,
  CreatedTrainer,
  BackendTrainerResponse,
  BackendTrainersListResponse,
  ApiNullableString,
  TrainerBenefit,
} from '@/api/types/trainers';

export type TabType = 'all' | 'active' | 'pending' | 'suspended';

export interface TrainerResponse {
  data: Trainer[];
  counts: { all: number; active: number; pending: number; suspended: number };
  pagination: { totalItems: number };
}
