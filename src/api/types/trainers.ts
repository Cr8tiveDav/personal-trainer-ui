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
  name: string;
  email: string | null;
  specializations: string[];
  training_styles: string[];
  // benefits?: TrainerBenefit[];
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

export type BackendTrainersListResponse = ApiEnvelope<BackendTrainerResponse[]>;
export type TrainersListResponse = ApiEnvelope<BackendTrainerResponse[]>;
export type TrainerDetailResponse = ApiEnvelope<BackendTrainerResponse>;
export type CreateTrainerResponse = ApiEnvelope<BackendTrainerResponse>;
