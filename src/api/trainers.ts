'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRequest,
  getRequest,
  patchFormRequest,
  patchRequest,
  postRequest,
  uploadRequest,
} from '~/lib/http';
import { displayError, showSuccessToast } from '~/lib/utils';
import { API_ENDPOINTS } from './api-endpoints';
import type {
  BackendTrainerResponse,
  CreateTrainerResponse,
  TrainerDetailResponse,
  TrainersListResponse,
  UpdateTrainerPayload,
  UpdateTrainerResponse,
} from './types/trainers';
import type {
  TrainerResponse,
} from '@/components/admin/trainers/types';
import { buildCreateTrainerFormData } from '@/lib/trainers/build-create-trainer-form-data';
import type { CreateTrainerFormInput } from '@/lib/trainers/build-create-trainer-form-data';
import {
  buildUpdateTrainerFormData,
  type UpdateTrainerFormInput,
} from '@/lib/trainers/build-update-trainer-form-data';
import { mapBackendToFrontend } from '@/lib/trainers/map-trainer';

export type AdminTrainersFilters = {
  onboardingStatus?: string;
  searchQuery?: string;
};



export const trainerQueryKeys = {
  all: ['admin-trainers'] as const,
  list: (
    page: number,
    perPage: number,
    onboardingStatus?: string,
    searchQuery?: string,
  ) => ['admin-trainers', page, perPage, onboardingStatus, searchQuery] as const,
  summary: (onboardingStatus?: string) =>
    ['admin-trainers', 'summary', onboardingStatus] as const,
  detail: (id: string) => ['trainer', id] as const,
};

function isBackendTrainer(value: unknown): value is BackendTrainerResponse {
  if (!value || typeof value !== 'object') return false;
  const row = value as BackendTrainerResponse;
  return typeof row.id === 'string';
}


export function useAdminTrainers(
  page: number,
  perPage = 10,
  filters?: AdminTrainersFilters,
  options?: { enabled?: boolean },
) {
  const onboardingStatus = filters?.onboardingStatus;
  const searchQuery = filters?.searchQuery;

  return useQuery({
    queryKey: trainerQueryKeys.list(page, perPage, onboardingStatus, searchQuery),
    enabled: options?.enabled ?? true,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const response = await getRequest<TrainersListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.LIST}?limit=100`,
      });
      const allTrainers = Array.isArray(response.data) ? response.data : [];

      // Filter based on onboardingStatus and searchQuery
      const filtered = allTrainers.filter((t) => {
        if (onboardingStatus) {
          const status = t.onboarding_status?.toLowerCase();
          if (onboardingStatus === 'approved') {
            if (status !== 'approved' && status !== 'active') return false;
          } else {
            if (status !== onboardingStatus) return false;
          }
        }

        if (searchQuery) {
          const query = searchQuery.trim().toLowerCase();
          const name = (t.name ?? '').toLowerCase();
          const email = (t.email ?? '').toLowerCase();
          if (!name.includes(query) && !email.includes(query)) return false;
        }

        return true;
      });

      // Paginate locally
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedTrainers = filtered
        .slice(start, end)
        .filter(isBackendTrainer)
        .map(mapBackendToFrontend);

      return {
        trainers: paginatedTrainers,
        meta: {
          page,
          per_page: perPage,
          total_pages: Math.ceil(filtered.length / perPage),
          total_count: filtered.length,
        },
      };
    },
    staleTime: 60_000,
  });
}

export function useAdminTrainersSummary(onboardingStatus?: string) {
  return useQuery({
    queryKey: trainerQueryKeys.summary(onboardingStatus),
    queryFn: async () => {
      const response = await getRequest<TrainersListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.LIST}?limit=100`,
      });
      const allTrainers = Array.isArray(response.data) ? response.data : [];

      const filtered = allTrainers.filter((t) => {
        if (!onboardingStatus) return true;
        const status = t.onboarding_status?.toLowerCase();
        if (onboardingStatus === 'approved') {
          return status === 'approved' || status === 'active';
        }
        return status === onboardingStatus;
      });

      return filtered.length;
    },
    staleTime: 60_000,
  });
}

export function useTrainerStatusCounts() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-trainers-summary-counts'],
    queryFn: async () => {
      const response = await getRequest<TrainersListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.LIST}?limit=100`,
      });
      return Array.isArray(response.data) ? response.data : [];
    },
    staleTime: 60_000,
  });

  const trainers = data ?? [];

  const counts = {
    all: trainers.length,
    active: trainers.filter((t) => {
      const status = t.onboarding_status?.toLowerCase();
      return status === 'active' || status === 'approved';
    }).length,
    pending: trainers.filter((t) => t.onboarding_status?.toLowerCase() === 'pending').length,
    suspended: trainers.filter((t) => t.onboarding_status?.toLowerCase() === 'suspended').length,
  };

  return { counts, isLoading };
}



/** @deprecated Prefer useAdminTrainers for lists and useTrainerStatusCounts for tab/stats counts. */
export function useGetTrainers() {
  const { counts, isLoading } = useTrainerStatusCounts();

  const data: TrainerResponse | undefined = isLoading
    ? undefined
    : {
        data: [],
        counts,
        pagination: { totalItems: counts.all },
      };

  return { data, isLoading, isError: false, isFetching: isLoading };
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
            response.message || 'Trainer updated but response was invalid'
          );
        }

        return response.data;
      }

      const { display_picture_file, ...payload } = input;
      void display_picture_file;
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
          response.data?.message || 'Trainer updated but response was invalid'
        );
      }

      return updated;
    },
    mutationKey: ['update-trainer', trainerId],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: trainerQueryKeys.detail(trainerId),
      });
      showSuccessToast('Trainer updated');
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
          response.message || 'Trainer created but response had no id'
        );
      }

      return response.data;
    },
    mutationKey: ['create-trainer'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
      showSuccessToast('Trainer created — credentials emailed.');
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useResendTrainerSetup() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await postRequest<
        { message?: string },
        { email: string }
      >({
        url: API_ENDPOINTS.TRAINERS.RESEND_SETUP,
        payload: { email },
      });
      return data;
    },
    mutationKey: ['resend-trainer-setup'],
    onSuccess(data) {
      showSuccessToast(
        data?.message ?? 'Account setup link resent to the trainer.'
      );
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useDeleteTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        // Deactivate user account via DELETE request
        await deleteRequest({
          url: API_ENDPOINTS.TRAINERS.DETAIL(id),
        });
      } catch (error: any) {
        // If the backend returns a 409 Conflict indicating that the trainer
        // is already deactivated, we catch the error and proceed to sync
        // the onboarding status to 'suspended' to self-heal the out-of-sync DB state.
        const status = error?.response?.status;
        const msg = error?.response?.data?.message || error?.message || '';
        const isAlreadyDeactivated =
          status === 409 || msg.toLowerCase().includes('already deactivated');

        if (!isAlreadyDeactivated) {
          throw error;
        }
      }

      // 2. Sync onboarding_status to 'suspended' using PATCH request
      await patchRequest<UpdateTrainerResponse, UpdateTrainerPayload>({
        url: API_ENDPOINTS.TRAINERS.DETAIL(id),
        payload: { onboarding_status: 'suspended' },
      });
    },
    mutationKey: ['delete-trainer'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
      showSuccessToast('Trainer deactivated');
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useSetPassword() {
  return useMutation({
    mutationFn: (payload: { token: string; new_password: string }) =>
      postRequest<{ message: string }, { token: string; new_password: string }>(
        {
          url: API_ENDPOINTS.TRAINERS.SET_PASSWORD,
          payload,
        }
      ),
    mutationKey: ['set-password'],
  });
}

export function useGetApprovedTrainers() {
  return useQuery({
    queryKey: ['approved-trainers'] as const,
    queryFn: async () => {
      const response = await getRequest<TrainersListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.LIST}?onboarding_status=approved&limit=100`,
      });
      return Array.isArray(response.data) ? response.data : [];
    },
  });
}

export type { CreateTrainerFormInput };
