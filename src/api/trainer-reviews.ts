'use client'

import { useQuery } from '@tanstack/react-query'
import { getRequest } from '~/lib/http'
import { API_ENDPOINTS } from './api-endpoints'
import type { ApiEnvelope } from './types/index'
import type { Review } from '@/components/trainer/dashboard/types'

type TrainerReviewRow = {
  id?: string
  rating?: number
  comment?: string
  review?: string
  text?: string
  created_at?: string
  date?: string
  client?: { name?: string; avatar?: string; avatar_url?: string }
  client_name?: string
  reviewer_name?: string
}

function formatReviewDate(value: string | undefined): string {
  if (!value?.trim()) return '—'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function mapReview(row: TrainerReviewRow, index: number): Review | null {
  const id = row.id ?? `review-${index}`
  const rating =
    typeof row.rating === 'number' && Number.isFinite(row.rating)
      ? row.rating
      : 0
  const comment =
    row.comment?.trim() ||
    row.review?.trim() ||
    row.text?.trim() ||
    ''
  const clientName =
    row.client?.name?.trim() ||
    row.client_name?.trim() ||
    row.reviewer_name?.trim() ||
    'Client'

  if (!comment && rating === 0) return null

  return {
    id,
    clientName,
    clientAvatar: row.client?.avatar_url ?? row.client?.avatar,
    rating,
    comment: comment || '—',
    date: formatReviewDate(row.created_at ?? row.date),
  }
}

function normalizeReviews(payload: unknown): Review[] {
  const response = payload as ApiEnvelope<unknown> & { data?: unknown }
  const data = response?.data ?? payload
  const list = Array.isArray(data)
    ? data
    : Array.isArray((data as { reviews?: unknown })?.reviews)
      ? (data as { reviews: TrainerReviewRow[] }).reviews
      : Array.isArray((data as { items?: unknown })?.items)
        ? (data as { items: TrainerReviewRow[] }).items
        : []

  return list
    .map((row, index) => mapReview(row as TrainerReviewRow, index))
    .filter((r): r is Review => r !== null)
}

/** GET /trainers/{id}/reviews */
export function useTrainerReviews(trainerId: string) {
  return useQuery({
    queryKey: ['trainer-reviews', trainerId],
    queryFn: async () => {
      const response = await getRequest<ApiEnvelope<TrainerReviewRow[]>>({
        url: API_ENDPOINTS.TRAINERS.REVIEWS(trainerId),
      })
      return normalizeReviews(response)
    },
    enabled: !!trainerId,
    staleTime: 60_000,
    retry: false,
  })
}
