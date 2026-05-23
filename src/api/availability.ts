"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest } from "~/lib/http";
import { displayError, showSuccessToast } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  AvailabilitySlot,
  SetAvailabilityPayload,
  TrainerAvailabilityResponse,
} from "./types/availability";

export const availabilityQueryKeys = {
  byTrainer: (trainerId: string) => ["trainer-availability", trainerId] as const,
};

function normalizeAvailability(
  response: TrainerAvailabilityResponse,
): AvailabilitySlot[] {
  const { data } = response;

  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object" &&
    "availability" in data &&
    Array.isArray((data as { availability: AvailabilitySlot[] }).availability)
  ) {
    return (data as { availability: AvailabilitySlot[] }).availability;
  }

  return [];
}

/** GET /trainers/{id}/availability */
export function useTrainerAvailabilityById(trainerId: string, enabled = true) {
  return useQuery({
    queryKey: availabilityQueryKeys.byTrainer(trainerId),
    queryFn: async () => {
      const response = await getRequest<TrainerAvailabilityResponse>({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY(trainerId),
      });
      return normalizeAvailability(response);
    },
    enabled: !!trainerId && enabled,
    staleTime: 60_000,
  });
}

/** POST /trainers/{id}/availability — update existing schedule */
export function useUpdateTrainerAvailabilityById(trainerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (availability: AvailabilitySlot[]) => {
      const { data } = await postRequest<
        TrainerAvailabilityResponse,
        SetAvailabilityPayload
      >({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY(trainerId),
        payload: { availability },
      });
      return data;
    },
    mutationKey: ["update-trainer-availability", trainerId],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.byTrainer(trainerId),
      });
      showSuccessToast("Availability updated");
    },
    onError(error) {
      displayError(error);
    },
  });
}

/** POST /trainers/{id}/availability — initial save */
export function useSetTrainerAvailabilityById(trainerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (availability: AvailabilitySlot[]) => {
      const { data } = await postRequest<
        TrainerAvailabilityResponse,
        SetAvailabilityPayload
      >({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY(trainerId),
        payload: { availability },
      });
      return data;
    },
    mutationKey: ["set-trainer-availability", trainerId],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.byTrainer(trainerId),
      });
      showSuccessToast("Availability saved!");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export type { AvailabilitySlot };
