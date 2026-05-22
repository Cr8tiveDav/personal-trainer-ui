"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest, putRequest } from "~/lib/http";
import { displayError, showSuccessToast } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  AvailabilitySlot,
  SetAvailabilityPayload,
  TrainerAvailabilityResponse,
} from "./types/availability";

export const availabilityQueryKeys = {
  me: ["trainer-availability"] as const,
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

export function useTrainerAvailability() {
  return useQuery({
    queryKey: availabilityQueryKeys.me,
    queryFn: async () => {
      const response = await getRequest<TrainerAvailabilityResponse>({
        url: API_ENDPOINTS.TRAINERS.ME_AVAILABILITY,
      });
      return normalizeAvailability(response);
    },
    staleTime: 60_000,
  });
}

export function useTrainerAvailabilityById(trainerId: string, enabled = true) {
  return useQuery({
    queryKey: ["trainer-availability", trainerId] as const,
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

export function useSetTrainerAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (availability: AvailabilitySlot[]) => {
      const { data } = await postRequest<
        TrainerAvailabilityResponse,
        SetAvailabilityPayload
      >({
        url: API_ENDPOINTS.TRAINERS.ME_AVAILABILITY,
        payload: { availability },
      });
      return data;
    },
    mutationKey: ["set-trainer-availability"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: availabilityQueryKeys.me });
      showSuccessToast("Availability saved!");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useUpdateTrainerAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (availability: AvailabilitySlot[]) =>
      putRequest<TrainerAvailabilityResponse, SetAvailabilityPayload>({
        url: API_ENDPOINTS.TRAINERS.ME_AVAILABILITY,
        payload: { availability },
      }),
    mutationKey: ["update-trainer-availability"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: availabilityQueryKeys.me });
      showSuccessToast("Availability updated");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useUpdateTrainerAvailabilityById(trainerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (availability: AvailabilitySlot[]) =>
      putRequest<TrainerAvailabilityResponse, SetAvailabilityPayload>({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY(trainerId),
        payload: { availability },
      }),
    mutationKey: ["update-trainer-availability", trainerId],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["trainer-availability", trainerId],
      });
      showSuccessToast("Availability updated");
    },
    onError(error) {
      displayError(error);
    },
  });
}

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
        queryKey: ["trainer-availability", trainerId],
      });
      showSuccessToast("Availability saved!");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export type { AvailabilitySlot };
