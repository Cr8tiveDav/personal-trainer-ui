import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequest, putRequest, postRequest, deleteRequest } from '@/lib/http';
import { API_ENDPOINTS } from './api-endpoints';
import { displayError, showSuccessToast } from '@/lib/utils';

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
}

export interface AdminSettings {
  default_session_duration_min: number;
  max_trainers_displayed: number;
  require_video_before_listing: boolean;
  auto_assign_trainer: boolean;
  categories: AdminCategory[];
}

export interface AdminSettingsUpdatePayload {
  default_session_duration_min?: number;
  max_trainers_displayed?: number;
  require_video_before_listing?: boolean;
  auto_assign_trainer?: boolean;
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const response = await getRequest<{ data: AdminSettings }>({
        url: API_ENDPOINTS.ADMIN.SETTINGS,
      });
      return response.data;
    },
  });
}

export function useUpdateAdminSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AdminSettingsUpdatePayload) => {
      const response = await putRequest<{ data: AdminSettings }, AdminSettingsUpdatePayload>({
        url: API_ENDPOINTS.ADMIN.SETTINGS,
        payload: data,
      });
      return response.data;
    },
    onSuccess: () => {
      showSuccessToast('Settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (error) => {
      displayError(error);
    },
  });
}

export function useCreateAdminCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; slug?: string }) => {
      const response = await postRequest<{ data: AdminCategory }, { name: string; slug?: string }>({
        url: API_ENDPOINTS.ADMIN.CATEGORIES,
        payload: data,
      });
      return response.data;
    },
    onSuccess: () => {
      showSuccessToast('Category added successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (error) => {
      displayError(error);
    },
  });
}

export function useDeleteAdminCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteRequest({
        url: API_ENDPOINTS.ADMIN.CATEGORY_DETAIL(id),
      });
    },
    onSuccess: () => {
      showSuccessToast('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: (error) => {
      displayError(error);
    },
  });
}
