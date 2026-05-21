"use server";

import {
  createTrainerFromFormData,
  getAllTrainers,
} from "@/lib/services/trainers";
import type {
  CreatedTrainer,
  TrainerResponse,
} from "@/components/admin/trainers/types";

export async function getTrainersAction(): Promise<TrainerResponse> {
  return getAllTrainers();
}

/**
 * POST multipart/form-data to https://api.staging.fitcall.me/api/v1/trainers
 * FormData must include: email, name, specializations (×N), years_of_experience, etc.
 */
export async function createTrainerAction(
  formData: FormData,
): Promise<CreatedTrainer> {
  return createTrainerFromFormData(formData);
}
