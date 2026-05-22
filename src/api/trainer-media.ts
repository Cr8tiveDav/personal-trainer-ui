'use client'

import type { AxiosProgressEvent } from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteRequest,
  getBlobRequest,
  getRequest,
  uploadRequest,
} from '~/lib/http'
import { displayError, showSuccessToast } from '~/lib/utils'
import { API_ENDPOINTS } from './api-endpoints'
import type { ApiEnvelope } from './types/index'

export type TrainerGalleryImage = {
  id: string
  image_url: string
  position: number
}

export type TrainerVideoMeta = {
  url: string
  status: 'Approved' | 'Pending' | 'Missing'
}

export const trainerMediaQueryKeys = {
  images: (trainerId: string) => ['trainer-images', trainerId] as const,
  video: (trainerId: string) => ['trainer-video', trainerId] as const,
}


export async function fetchTrainerImages(
  trainerId: string,
): Promise<TrainerGalleryImage[]> {
  const response = await getRequest<ApiEnvelope<TrainerGalleryImage[]>>({
    url: API_ENDPOINTS.TRAINERS.IMAGES(trainerId),
  })
  const data = response?.data
  return Array.isArray(data) ? data : []
}

export async function uploadTrainerImages(
  trainerId: string,
  files: File[],
  onUploadProgress?: (event: AxiosProgressEvent) => void,
) {
  const formData = new FormData()
  files.forEach((file) => formData.append('images', file))

  return uploadRequest({
    url: API_ENDPOINTS.TRAINERS.IMAGES(trainerId),
    payload: formData,
    onUploadProgress,
  })
}

export async function deleteTrainerImage(trainerId: string, imageId: string) {
  return deleteRequest({
    url: API_ENDPOINTS.TRAINERS.IMAGE(trainerId, imageId),
  })
}

export async function uploadTrainerVideo(
  trainerId: string,
  file: File,
  onUploadProgress?: (event: AxiosProgressEvent) => void,
) {
  const formData = new FormData()
  formData.append('video', file)

  return uploadRequest({
    url: API_ENDPOINTS.TRAINERS.INTRO_VIDEO(trainerId),
    payload: formData,
    onUploadProgress,
  })
}

export async function deleteTrainerVideo(trainerId: string) {
  return deleteRequest({ url: API_ENDPOINTS.TRAINERS.INTRO_VIDEO(trainerId) })
}

export async function fetchTrainerVideoBlobUrl(
  trainerId: string,
): Promise<string | null> {
  try {
    const blob = await getBlobRequest({
      url: API_ENDPOINTS.TRAINERS.INTRO_VIDEO_STREAM(trainerId),
    })
    return URL.createObjectURL(blob)
  } catch {
    return null
  }
}

export async function fetchTrainerVideoMeta(
  trainerId: string,
): Promise<TrainerVideoMeta | null> {
  const blobUrl = await fetchTrainerVideoBlobUrl(trainerId)
  if (!blobUrl) return null

  return {
    url: blobUrl,
    status: 'Approved',
  }
}

export function useTrainerImages(trainerId: string) {
  return useQuery({
    queryKey: trainerMediaQueryKeys.images(trainerId),
    queryFn: () => fetchTrainerImages(trainerId),
    enabled: !!trainerId,
    staleTime: 30_000,
  })
}

export function useTrainerVideo(trainerId: string) {
  return useQuery({
    queryKey: trainerMediaQueryKeys.video(trainerId),
    queryFn: () => fetchTrainerVideoMeta(trainerId),
    enabled: !!trainerId,
    staleTime: 30_000,
  })
}

export type MediaUploadInput = {
  files: File[]
  onProgress?: (percent: number) => void
}

export type VideoUploadInput = {
  file: File
  onProgress?: (percent: number) => void
}

function progressFromEvent(event: AxiosProgressEvent) {
  if (!event.total) return 0
  return Math.min(100, Math.round((event.loaded * 100) / event.total))
}

export function useUploadTrainerImages(trainerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ files, onProgress }: MediaUploadInput) =>
      uploadTrainerImages(trainerId, files, (event) => {
        onProgress?.(progressFromEvent(event))
      }),
    onSuccess: () => {
      showSuccessToast('Images uploaded successfully')
      queryClient.invalidateQueries({
        queryKey: trainerMediaQueryKeys.images(trainerId),
      })
    },
    onError: (error) => displayError(error, 'Failed to upload images'),
  })
}

export function useDeleteTrainerImage(trainerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (imageId: string) => deleteTrainerImage(trainerId, imageId),
    onSuccess: () => {
      showSuccessToast('Image removed')
      queryClient.invalidateQueries({
        queryKey: trainerMediaQueryKeys.images(trainerId),
      })
    },
    onError: (error) => displayError(error, 'Failed to remove image'),
  })
}

export function useUploadTrainerVideo(trainerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ file, onProgress }: VideoUploadInput) =>
      uploadTrainerVideo(trainerId, file, (event) => {
        onProgress?.(progressFromEvent(event))
      }),
    onSuccess: async () => {
      showSuccessToast('Video uploaded successfully')
      await queryClient.invalidateQueries({
        queryKey: trainerMediaQueryKeys.video(trainerId),
      })
    },
    onError: (error) => displayError(error, 'Failed to upload video'),
  })
}

export function useDeleteTrainerVideo(trainerId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteTrainerVideo(trainerId),
    onSuccess: () => {
      showSuccessToast('Video removed')
      queryClient.invalidateQueries({
        queryKey: trainerMediaQueryKeys.video(trainerId),
      })
    },
    onError: (error) => displayError(error, 'Failed to remove video'),
  })
}
