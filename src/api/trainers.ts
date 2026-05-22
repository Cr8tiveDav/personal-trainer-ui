"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequest,
  getRequest,
  patchFormRequest,
  patchRequest,
  uploadRequest,
} from "~/lib/http";
import { displayError, showSuccessToast } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  BackendTrainerResponse,
  CreateTrainerResponse,
  TrainerDetailResponse,
  TrainersListResponse,
  UpdateTrainerPayload,
  UpdateTrainerResponse,
} from "./types/trainers";
import type { Trainer, TrainerResponse } from "@/components/admin/trainers/types";
import { buildCreateTrainerFormData } from "@/lib/trainers/build-create-trainer-form-data";
import type { CreateTrainerFormInput } from "@/lib/trainers/build-create-trainer-form-data";
import {
  buildUpdateTrainerFormData,
  type UpdateTrainerFormInput,
} from "@/lib/trainers/build-update-trainer-form-data";
import { mapBackendToFrontend } from "@/lib/trainers/map-trainer";

export const trainerQueryKeys = {
  all: ["admin-trainers"] as const,
  detail: (id: string) => ["trainer", id] as const,
};

function buildTrainerListResponse(
  trainers: BackendTrainerResponse[],
): TrainerResponse {
  const mappedTrainers: Trainer[] = trainers.map(mapBackendToFrontend);

  return {
    data: mappedTrainers,
    counts: {
      all: mappedTrainers.length,
      active: mappedTrainers.filter((t) => t.status.toLowerCase() === "active")
        .length,
      pending: mappedTrainers.filter(
        (t) => t.status.toLowerCase() === "pending",
      ).length,
      suspended: mappedTrainers.filter(
        (t) => t.status.toLowerCase() === "suspended",
      ).length,
    },
    pagination: { totalItems: mappedTrainers.length },
  };
}

export function useGetTrainers() {
  return useQuery({
    queryKey: trainerQueryKeys.all,
    queryFn: async () => {
      const response = await getRequest<TrainersListResponse>({
        url: API_ENDPOINTS.TRAINERS.LIST,
      });
      const trainers = Array.isArray(response.data) ? response.data : [];
      return buildTrainerListResponse(trainers);
    },
    staleTime: 60_000,
  });
}

export function useTrainerById(id: string) {
  return useQuery({
    queryKey: trainerQueryKeys.detail(id),
    queryFn: async () => {
      const response = await getRequest<TrainerDetailResponse>({
        url: API_ENDPOINTS.TRAINERS.DETAIL(id),
      });
      return { data: mapBackendToFrontend(response.data) };
    },
    enabled: !!id,
  });
}

export function useUpdateTrainer(trainerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateTrainerFormInput) => {
      const hasNewPicture =
        input.display_picture_file && input.display_picture_file.size > 0;

      if (hasNewPicture) {
        const formData = buildUpdateTrainerFormData(input);
        const response = await patchFormRequest<UpdateTrainerResponse>({
          url: API_ENDPOINTS.TRAINERS.DETAIL(trainerId),
          payload: formData,
        });

        if (!response.data?.id) {
          throw new Error(
            response.message || "Trainer updated but response was invalid",
          );
        }

        return response.data;
      }

      const { display_picture_file: _file, ...payload } = input;
      const response = await patchRequest<
        UpdateTrainerResponse,
        UpdateTrainerPayload
      >({
        url: API_ENDPOINTS.TRAINERS.DETAIL(trainerId),
        payload,
      });

      const updated = response.data?.data;
      if (!updated?.id) {
        throw new Error(
          response.data?.message || "Trainer updated but response was invalid",
        );
      }

      return updated;
    },
    mutationKey: ["update-trainer", trainerId],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: trainerQueryKeys.detail(trainerId),
      });
      showSuccessToast("Trainer updated");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useCreateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTrainerFormInput) => {
      const formData = buildCreateTrainerFormData(input);
      const response = await uploadRequest<CreateTrainerResponse, FormData>({
        url: API_ENDPOINTS.TRAINERS.CREATE,
        payload: formData,
      });

      if (!response.data?.id) {
        throw new Error(
          response.message || "Trainer created but response had no id",
        );
      }

      return response.data;
    },
    mutationKey: ["create-trainer"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useDeleteTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteRequest({
        url: API_ENDPOINTS.TRAINERS.DETAIL(id),
      }),
    mutationKey: ["delete-trainer"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
      showSuccessToast("Trainer deleted");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export type { CreateTrainerFormInput };
