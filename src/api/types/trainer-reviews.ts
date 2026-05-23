import type { ApiEnvelope } from './index';

export type TrainerReviewRow = {
  id?: string;
  rating?: number;
  comment?: string;
  review?: string;
  text?: string;
  created_at?: string;
  date?: string;
  client?: { name?: string; avatar?: string; avatar_url?: string };
  client_name?: string;
  reviewer_name?: string;
};

export type TrainerReviewsListMeta = {
  next_cursor?: string | null;
  cursor?: string | null;
  has_more?: boolean;
  limit?: number;
};

export type TrainerReviewsListResponse = ApiEnvelope<TrainerReviewRow[]> & {
  meta?: TrainerReviewsListMeta;
  next_cursor?: string | null;
};
