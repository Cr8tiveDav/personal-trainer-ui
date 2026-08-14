export type TrainerStatus = 'Active' | 'Suspended' | 'Pending' | 'Rejected';
export type TrainerAvailability = 'Available' | 'Offline' | 'Busy';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  avatarUrl?: string;
  specialty: string;
  specializations: string[];
  trainingStyles: string[];
  bio: string;
  introVideoUrl: string;
  displayPictureUrl: string;
  onboardingStatus: string;
  status: TrainerStatus;
  sessions: number | null;
  earnings: number;
  availability: TrainerAvailability;
  dateAdded: string;
  averageRating?: number;
  totalReviews?: number;
  yearsOfExperience?: number;
  whatsappNumber?: string;
  appleId?: string;
  messengerHandle?: string;
}

export type {
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

export type { TrainersListMeta } from '@/api/types/trainers';
