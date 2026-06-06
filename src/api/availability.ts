"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest, patchRequest, deleteRequest } from "~/lib/http";
import { displayError, showSuccessToast } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  AvailabilitySlot,
  SetAvailabilityPayload,
  TrainerAvailabilityResponse,
} from "./types/availability";

export const availabilityQueryKeys = {
  byTrainer: (trainerId: string) => ["trainer-availability", trainerId] as const,
  me: ["trainer-availability", "me"] as const,
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

/** GET /trainers/me/availability — authenticated trainer */
export function useMyTrainerAvailability(enabled = true) {
  return useQuery({
    queryKey: availabilityQueryKeys.me,
    queryFn: async () => {
      const response = await getRequest<any>({
        url: API_ENDPOINTS.TRAINERS.ME_AVAILABILITY,
      });
      const slots = normalizeAvailability(response);
      let isAvailable = slots.length > 0;
      if (response?.data && typeof response.data === 'object' && 'is_available' in response.data) {
        isAvailable = response.data.is_available as boolean;
      }
      return { slots, isAvailable, rawResponse: response };
    },
    enabled,
    staleTime: 60_000,
    retry: false,
  });
}

/** POST /trainers/me/availability — update own schedule */
export function useUpdateMyTrainerAvailability() {
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
    mutationKey: ["update-my-trainer-availability"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.me,
      });
      showSuccessToast("Availability updated");
    },
    onError(error) {
      displayError(error);
    },
  });
}

/** POST /trainers/me/availability — initial save for own schedule */
export function useSetMyTrainerAvailability() {
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
    mutationKey: ["set-my-trainer-availability"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.me,
      });
      showSuccessToast("Availability saved!");
    },
    onError(error) {
      displayError(error);
    },
  });
}

/** GET /trainers/{id}/availability — admin / by id */
export function useTrainerAvailabilityById(trainerId: string, enabled = true) {
  return useQuery({
    queryKey: availabilityQueryKeys.byTrainer(trainerId),
    queryFn: async () => {
      const response = await getRequest<any>({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY(trainerId),
      });
      const slots = normalizeAvailability(response);
      let isAvailable = slots.length > 0;
      if (response?.data && typeof response.data === 'object' && 'is_available' in response.data) {
        isAvailable = response.data.is_available as boolean;
      }
      return { slots, isAvailable, rawResponse: response };
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

/** PATCH /trainers/me/availability/toggle — toggle global availability */
export function useToggleMyTrainerAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isAvailable: boolean) => {
      const { data } = await patchRequest<
        { data: any; message: string; code: string },
        { is_available: boolean }
      >({
        url: API_ENDPOINTS.TRAINERS.ME_AVAILABILITY_TOGGLE,
        payload: { is_available: isAvailable },
      });
      return data;
    },
    mutationKey: ["toggle-my-trainer-availability"],
    onSuccess(data, isAvailable) {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.me,
      });
      showSuccessToast(isAvailable ? "Availability status on" : "Availability status off");
    },
    onError(error) {
      displayError(error);
    },
  });
}

/** PATCH /trainers/{id}/availability/toggle — toggle global availability */
export function useToggleTrainerAvailabilityById(trainerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isAvailable: boolean) => {
      const { data } = await patchRequest<
        { data: any; message: string; code: string },
        { is_available: boolean }
      >({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY_TOGGLE(trainerId),
        payload: { is_available: isAvailable },
      });
      return data;
    },
    mutationKey: ["toggle-trainer-availability", trainerId],
    onSuccess(data, isAvailable) {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.byTrainer(trainerId),
      });
      showSuccessToast(isAvailable ? "Availability status on" : "Availability status off");
    },
    onError(error) {
      displayError(error);
    },
  });
}

export type { AvailabilitySlot };

/** DELETE /trainers/me/availability/{slot_id} — remove a specific slot */
export function useDeleteMyTrainerAvailabilitySlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      const { data } = await deleteRequest<any>({
        url: API_ENDPOINTS.TRAINERS.ME_AVAILABILITY_SLOT(slotId),
      });
      return data;
    },
    mutationKey: ["delete-my-trainer-availability-slot"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.me,
      });
      showSuccessToast("Availability removed");
    },
    onError(error) {
      displayError(error);
    },
  });
}

/** DELETE /trainers/{id}/availability/{slot_id} — remove a specific slot */
export function useDeleteTrainerAvailabilitySlotById(trainerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      const { data } = await deleteRequest<any>({
        url: API_ENDPOINTS.TRAINERS.AVAILABILITY_SLOT(trainerId, slotId),
      });
      return data;
    },
    mutationKey: ["delete-trainer-availability-slot", trainerId],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: availabilityQueryKeys.byTrainer(trainerId),
      });
      showSuccessToast("Availability removed");
    },
    onError(error) {
      displayError(error);
    },
  });
}
