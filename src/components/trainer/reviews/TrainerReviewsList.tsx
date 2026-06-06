'use client';

import { Star } from 'lucide-react';
import type { Review } from '@/components/trainer/dashboard/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[12px] border border-gray-100 bg-white p-5 ">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {review.clientAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.clientAvatar}
              alt={review.clientName}
              className="h-9 w-9 shrink-0 rounded-[9999px] object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9999px] bg-primary text-xs font-semibold text-white">
              {review.clientName.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {review.clientName}
            </p>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <p className="shrink-0 text-xs text-gray-400">{review.date}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        {review.comment}
      </p>
    </article>
  );
}

type TrainerReviewsListProps = {
  reviews: Review[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
};

export function TrainerReviewsList({
  reviews,
  isLoading,
  isError,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: TrainerReviewsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-[12px]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[12px] border border-gray-100 bg-white p-8 text-center text-sm text-red-500">
        Could not load reviews. Please try again.
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-[12px] border border-gray-100 bg-white ">
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.reviews}
          imageAlt="No reviews"
          title="No reviews yet"
          description="Client feedback and ratings will show up here after completed sessions."
          className="min-h-[280px] py-12"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {hasNextPage && onLoadMore ? (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className="min-w-36"
          >
            {isFetchingNextPage ? 'Loading…' : 'Load more'}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
