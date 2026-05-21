"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTrainerAction, getTrainersAction } from "@/actions/trainers";
import { buildCreateTrainerFormData } from "@/lib/trainers/build-create-trainer-form-data";
import type { CreateTrainerFormInput } from "@/lib/trainers/build-create-trainer-form-data";
import { UnauthorizedError } from "@/lib/http/errors";

/** React Query cache keys only — HTTP create is POST /api/v1/trainers */
export const trainerQueryKeys = {
  all: ["admin-trainers"] as const,
};

async function fetchTrainersWithAuth() {
  try {
    return await getTrainersAction();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }
    throw error;
  }
}

export function useGetTrainers() {
  return useQuery({
    queryKey: trainerQueryKeys.all,
    queryFn: fetchTrainersWithAuth,
    staleTime: 60_000,
  });
}

export function useCreateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTrainerFormInput) => {
      const formData = buildCreateTrainerFormData(input);
      return createTrainerAction(formData);
    },
    mutationKey: ["create-trainer"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
    },
  });
}

export type { CreateTrainerFormInput };
