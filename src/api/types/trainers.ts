export const TRAINER_SPECIALIZATIONS = [
  'yoga',
  'speed',
  'cardio',
  'endurance',
  'strength',
] as const;

export type TrainerSpecialization = (typeof TRAINER_SPECIALIZATIONS)[number];

export interface CreateTrainerInput {
  email: string;
  name: string;
  phone_number: string;
  gender: string;
  specializations: TrainerSpecialization[];
  years_of_experience: number;
  bio?: string;
  display_picture?: File | null;
}

export interface ApiNullableString {
  String: string;
  Valid: boolean;
}

export interface TrainerBenefit {
  id: string;
  title: string;
  subtext: string;
  position: number;
}

export interface BackendTrainerResponse {
  id: string;
  user_id: string;
  name?: string;
  email?: string | null;
  phone_number?: string | null;
  gender?: string | null;
  specializations: string[];
  training_styles: string[];
  benefits?: TrainerBenefit[];
  bio: string | null;
  years_of_experience: number;
  intro_video_url: string | null;
  display_picture: string | null;
  onboarding_status: string;
  average_rating: number | ApiNullableString | null;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export type CreatedTrainer = BackendTrainerResponse;

import type { ApiEnvelope } from './index';

export interface TrainersListMeta {
  page: number;
  per_page: number;
  total_pages: number;
  total_count: number;
  next?: string | null;
}

export type BackendTrainersListResponse = ApiEnvelope<
  BackendTrainerResponse[]
> & {
  meta?: TrainersListMeta;
};
export type TrainersListResponse = BackendTrainersListResponse;
export type TrainerDetailResponse = ApiEnvelope<BackendTrainerResponse>;
export type CreateTrainerResponse = ApiEnvelope<BackendTrainerResponse>;

export const TRAINER_ONBOARDING_STATUSES = [
  'pending',
  'approved',
  'rejected',
  'suspended',
] as const;

export type TrainerOnboardingStatus =
  (typeof TRAINER_ONBOARDING_STATUSES)[number];

/** PATCH /trainers/{id} */
export interface UpdateTrainerPayload {
  specializations?: string[];
  training_styles?: string[];
  bio?: string;
  years_of_experience?: number;
  intro_video_url?: string;
  display_picture?: string;
  onboarding_status?: string;
}

export type UpdateTrainerResponse = ApiEnvelope<BackendTrainerResponse>;
