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
  TrainersListMeta,
  TrainersListResponse,
  UpdateTrainerPayload,
  UpdateTrainerResponse,
} from './types/trainers';
import type { Trainer, TrainerResponse } from '@/components/admin/trainers/types';
import { buildCreateTrainerFormData } from '@/lib/trainers/build-create-trainer-form-data';
import type { CreateTrainerFormInput } from '@/lib/trainers/build-create-trainer-form-data';
import {
  buildUpdateTrainerFormData,
  type UpdateTrainerFormInput,
} from '@/lib/trainers/build-update-trainer-form-data';
import { mapBackendToFrontend } from '@/lib/trainers/map-trainer';

export type AdminTrainersFilters = {
  onboardingStatus?: string;
};

const DEFAULT_META: TrainersListMeta = {
  page: 1,
  per_page: 10,
  total_pages: 1,
  total_count: 0,
};

export const trainerQueryKeys = {
  all: ['admin-trainers'] as const,
  list: (page: number, perPage: number, onboardingStatus?: string) =>
    ['admin-trainers', page, perPage, onboardingStatus] as const,
  summary: (onboardingStatus?: string) =>
    ['admin-trainers', 'summary', onboardingStatus] as const,
  detail: (id: string) => ['trainer', id] as const,
};

function isBackendTrainer(value: unknown): value is BackendTrainerResponse {
  if (!value || typeof value !== 'object') return false;
  const row = value as BackendTrainerResponse;
  return typeof row.id === 'string';
}

function normalizeTrainersList(response: TrainersListResponse): {
  trainers: Trainer[];
  meta: TrainersListMeta;
} {
  const rows = Array.isArray(response.data) ? response.data : [];
  const meta = response.meta ?? DEFAULT_META;

  const perPage = meta.per_page ?? 10;
  const totalCount = meta.total_count ?? rows.length;
  const totalPages =
    meta.total_pages ??
    (totalCount > 0 ? Math.max(1, Math.ceil(totalCount / perPage)) : 0);

  return {
    trainers: rows.filter(isBackendTrainer).map(mapBackendToFrontend),
    meta: {
      page: meta.page ?? 1,
      per_page: perPage,
      total_pages: totalPages,
      total_count: totalCount,
      next: meta.next,
    },
  };
}

export function useAdminTrainers(
  page: number,
  perPage = 10,
  filters?: AdminTrainersFilters,
  options?: { enabled?: boolean },
) {
  const onboardingStatus = filters?.onboardingStatus;

  return useQuery({
    queryKey: trainerQueryKeys.list(page, perPage, onboardingStatus),
    enabled: options?.enabled ?? true,
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
      });
      if (onboardingStatus) {
        params.set('onboarding_status', onboardingStatus);
      }
      const response = await getRequest<TrainersListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.LIST}?${params.toString()}`,
      });
      return normalizeTrainersList(response);
    },
    staleTime: 60_000,
  });
}

export function useAdminTrainersSummary(onboardingStatus?: string) {
  return useQuery({
    queryKey: trainerQueryKeys.summary(onboardingStatus),
    queryFn: async () => {
      const params = new URLSearchParams({ page: '1', per_page: '1' });
      if (onboardingStatus) {
        params.set('onboarding_status', onboardingStatus);
      }
      const response = await getRequest<TrainersListResponse>({
        url: `${API_ENDPOINTS.TRAINERS.LIST}?${params.toString()}`,
      });
      return response.meta?.total_count ?? 0;
    },
    staleTime: 60_000,
  });
}

export function useTrainerStatusCounts() {
  const all = useAdminTrainersSummary();
  const approved = useAdminTrainersSummary('approved');
  const pending = useAdminTrainersSummary('pending');
  const suspended = useAdminTrainersSummary('suspended');

  const isLoading =
    all.isLoading ||
    approved.isLoading ||
    pending.isLoading ||
    suspended.isLoading;

  const counts = {
    all: all.data ?? 0,
    active: approved.data ?? 0,
    pending: pending.data ?? 0,
    suspended: suspended.data ?? 0,
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
            response.message || 'Trainer updated but response was invalid',
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
          response.data?.message || 'Trainer updated but response was invalid',
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
          response.message || 'Trainer created but response had no id',
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
      const { data } = await postRequest<{ message?: string }, { email: string }>(
        {
          url: API_ENDPOINTS.TRAINERS.RESEND_SETUP,
          payload: { email },
        },
      );
      return data;
    },
    mutationKey: ['resend-trainer-setup'],
    onSuccess(data) {
      showSuccessToast(
        data?.message ?? 'Account setup link resent to the trainer.',
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
    mutationFn: (id: string) =>
      deleteRequest({
        url: API_ENDPOINTS.TRAINERS.DETAIL(id),
      }),
    mutationKey: ['delete-trainer'],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: trainerQueryKeys.all });
      showSuccessToast('Trainer deleted');
    },
    onError(error) {
      displayError(error);
    },
  });
}

export function useSetPassword() {
  return useMutation({
    mutationFn: (payload: { token: string; new_password: string }) =>
      postRequest<{ message: string }, { token: string; new_password: string }>({
        url: API_ENDPOINTS.TRAINERS.SET_PASSWORD,
        payload,
      }),
    mutationKey: ['set-password'],
  });
}

export type { CreateTrainerFormInput };
