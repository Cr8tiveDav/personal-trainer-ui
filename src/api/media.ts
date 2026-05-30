"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRequest, uploadRequest, deleteRequest } from "~/lib/http";
import { displayError, showSuccessToast } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type { ApiEnvelope } from "./types/index";
import type { MediaItem, MediaListParams } from "./types/media";

export type { MediaItem, MediaListParams };

export const mediaQueryKeys = {
  list: (params?: MediaListParams) => ["media-list", params] as const,
  detail: (id: string) => ["media-detail", id] as const,
};

export async function fetchMediaList(params?: MediaListParams): Promise<MediaItem[]> {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.set("type", params.type);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  const query = searchParams.toString();
  const url = query
    ? `${API_ENDPOINTS.MEDIA.LIST}?${query}`
    : API_ENDPOINTS.MEDIA.LIST;

  const response = await getRequest<ApiEnvelope<MediaItem[]>>({ url });
  const data = response?.data;
  return Array.isArray(data) ? data : [];
}

export async function uploadMedia(
  file: File,
  meta: { title: string; media_type: "image" | "video"; category?: string; description?: string },
  onUploadProgress?: (percent: number) => void,
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", meta.title);
  formData.append("media_type", meta.media_type);
  if (meta.category) formData.append("category", meta.category);
  if (meta.description) formData.append("description", meta.description);

  const url = meta.media_type === "video"
    ? API_ENDPOINTS.MEDIA.UPLOAD_VIDEO
    : API_ENDPOINTS.MEDIA.UPLOAD_IMAGE;

  return uploadRequest({
    url,
    payload: formData,
    onUploadProgress: (event) => {
      if (!event.total) return;
      onUploadProgress?.(Math.min(100, Math.round((event.loaded * 100) / event.total)));
    },
    timeout: 0,
  });
}

export async function fetchMediaDetail(id: string): Promise<MediaItem> {
  const response = await getRequest<ApiEnvelope<MediaItem>>({
    url: `${API_ENDPOINTS.MEDIA.LIST}/${id}`,
  });
  return response.data;
}

export async function deleteMedia(id: string) {
  return deleteRequest({ url: API_ENDPOINTS.MEDIA.DELETE_MEDIA(id) });
}
export function useMediaList(params?: MediaListParams) {
  return useQuery({
    queryKey: mediaQueryKeys.list(params),
    queryFn: () => fetchMediaList(params),
    staleTime: 30_000,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      meta,
      onProgress,
    }: {
      file: File;
      meta: { title: string; media_type: "image" | "video"; category?: string; description?: string };
      onProgress?: (percent: number) => void;
    }) => uploadMedia(file, meta, onProgress),
    onSuccess: () => {
      showSuccessToast("Media uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["media-list"] });
    },
    onError: (error) => displayError(error, "Failed to upload media"),
  });
}

export function useMediaDetail(id: string) {
  return useQuery({
    queryKey: mediaQueryKeys.detail(id),
    queryFn: () => fetchMediaDetail(id),
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => {
      showSuccessToast("Media removed");
      queryClient.invalidateQueries({ queryKey: ["media-list"] });
    },
    onError: (error) => displayError(error, "Failed to remove media"),
  });
}