'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getRequest } from '~/lib/http';
import { API_ENDPOINTS } from './api-endpoints';
import type {
  TrainerReviewRow,
  TrainerReviewsListResponse,
} from './types/trainer-reviews';
import type { Review } from '@/components/trainer/dashboard/types';

const DEFAULT_LIMIT = 20;

function formatReviewDate(value: string | undefined): string {
  if (!value?.trim()) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function mapReview(row: TrainerReviewRow, index: number): Review | null {
  const id = row.id ?? `review-${index}`;
  const rating =
    typeof row.rating === 'number' && Number.isFinite(row.rating)
      ? row.rating
      : 0;
  const comment =
    row.comment?.trim() || row.review?.trim() || row.text?.trim() || '';
  const clientName =
    row.client?.name?.trim() ||
    row.client_name?.trim() ||
    row.reviewer_name?.trim() ||
    'Client';

  if (!comment && rating === 0) return null;

  return {
    id,
    clientName,
    clientAvatar: row.client?.avatar_url ?? row.client?.avatar,
    rating,
    comment: comment || '—',
    date: formatReviewDate(row.created_at ?? row.date),
  };
}

function extractReviewRows(payload: unknown): TrainerReviewRow[] {
  const response = payload as TrainerReviewsListResponse;
  const data = response?.data ?? payload;
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const nested = data as {
      reviews?: TrainerReviewRow[];
      items?: TrainerReviewRow[];
    };
    if (Array.isArray(nested.reviews)) return nested.reviews;
    if (Array.isArray(nested.items)) return nested.items;
  }
  return [];
}

function extractNextCursor(payload: unknown): string | undefined {
  const response = payload as TrainerReviewsListResponse;
  const meta = response?.meta;
  const cursor =
    meta?.next_cursor ??
    meta?.cursor ??
    response?.next_cursor ??
    (response as { next?: string })?.next;

  if (typeof cursor === 'string' && cursor.trim()) return cursor.trim();
  if (meta?.has_more === false) return undefined;
  return undefined;
}

export function normalizeTrainerReviewsPage(payload: unknown): {
  reviews: Review[];
  nextCursor?: string;
} {
  const rows = extractReviewRows(payload);
  const reviews = rows
    .map((row, index) => mapReview(row, index))
    .filter((r): r is Review => r !== null);

  return {
    reviews,
    nextCursor: extractNextCursor(payload),
  };
}

async function fetchTrainerReviews(
  trainerId: string,
  options: { limit?: number; cursor?: string } = {},
) {
  const limit = options.limit ?? DEFAULT_LIMIT;
  const params = new URLSearchParams({ limit: String(limit) });
  if (options.cursor) {
    params.set('cursor', options.cursor);
  }

  const response = await getRequest<TrainerReviewsListResponse>({
    url: `${API_ENDPOINTS.TRAINERS.REVIEWS(trainerId)}?${params.toString()}`,
  });

  return normalizeTrainerReviewsPage(response);
}

/** GET /trainers/{id}/reviews — first page (cursor pagination). */
export function useTrainerReviews(
  trainerId: string,
  options?: { limit?: number; enabled?: boolean },
) {
  const limit = options?.limit ?? DEFAULT_LIMIT;

  return useQuery({
    queryKey: ['trainer-reviews', trainerId, limit],
    queryFn: () => fetchTrainerReviews(trainerId, { limit }),
    select: (page) => page.reviews,
    enabled: (options?.enabled ?? true) && !!trainerId,
    staleTime: 60_000,
    retry: false,
  });
}

/** GET /trainers/{id}/reviews — cursor pages for full reviews list. */
export function useTrainerReviewsInfinite(
  trainerId: string,
  limit = DEFAULT_LIMIT,
) {
  return useInfiniteQuery({
    queryKey: ['trainer-reviews', trainerId, 'infinite', limit],
    queryFn: ({ pageParam }) =>
      fetchTrainerReviews(trainerId, {
        limit,
        cursor: pageParam as string | undefined,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!trainerId,
    staleTime: 60_000,
    retry: false,
  });
}
