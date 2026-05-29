import React, { Suspense } from 'react';
import TrainerDetailsClient from '@/components/admin/trainers/trainer-details/TrainerDetailsClient';
import { TrainerDetailsSkeleton } from '@/components/admin/trainers/trainer-details/TrainerDetailsSkeleton';

export default function TrainerDetailsPage() {
  return (
    <Suspense fallback={<TrainerDetailsSkeleton />}>
      <TrainerDetailsClient />
    </Suspense>
  );
}
