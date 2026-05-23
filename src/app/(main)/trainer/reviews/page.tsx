'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import {
  useCurrentTrainerId,
  useMyTrainerReviewsInfinite,
} from '@/api/trainer-dashboard';
import { TrainerReviewsList } from '@/components/trainer/reviews/TrainerReviewsList';

export default function TrainerReviewsPage() {
  const { data: trainerId, isLoading: idLoading } = useCurrentTrainerId();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMyTrainerReviewsInfinite(20);

  const reviews = useMemo(
    () => data?.pages.flatMap((page) => page.reviews) ?? [],
    [data?.pages],
  );

  if (idLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (!trainerId) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
        Please{' '}
        <Link href="/trainers/login" className="text-primary hover:underline">
          sign in
        </Link>{' '}
        to view reviews.
      </div>
    );
  }

  return (
    <div className="space-y-6 px-10 py-6">
      <h1 className="text-xl font-bold text-gray-900">Reviews</h1>
      <TrainerReviewsList
        reviews={reviews}
        isLoading={isLoading}
        isError={isError}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </div>
  );
}
