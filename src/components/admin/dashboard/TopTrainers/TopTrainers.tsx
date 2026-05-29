'use client';

import Link from 'next/link';
import { useTopTrainers } from '@/api/dashboard';
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState';
import { TrainerRow } from './TrainerRow';

export function TopTrainers() {
  const { data: response } = useTopTrainers();
  
  const rawList = response?.data?.top_trainers ?? [];
  
  // Sort by average rating (descending) then booking count (descending)
  const sortedList = [...rawList].sort((a, b) => {
    const ratingDiff = (b.average_rating ?? 0) - (a.average_rating ?? 0);
    if (ratingDiff !== 0) return ratingDiff;
    return (b.booking_count ?? 0) - (a.booking_count ?? 0);
  });

  const list = sortedList.map((trainer, index) => {
    const initials = trainer.gender
      ? trainer.gender.charAt(0).toUpperCase()
      : (trainer.name ? trainer.name.charAt(0).toUpperCase() : '');

    return {
      rank: index + 1,
      name: trainer.name || '',
      initial: initials,
      rating: trainer.average_rating ?? 0,
      total_sessions: trainer.booking_count ?? 0,
      trend: (index === 0 || index === 1 ? 'up' : 'neutral') as 'up' | 'down' | 'neutral',
    };
  });

  return (
    <div className='flex-1 rounded-[12px] border border-[#E4E2E9] bg-white p-5 h-full'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-[24px] font-semibold text-gray-900'>
          Top trainers this month
        </h2>
        <Link
          href='/admin/trainers'
          className='text-base font-semibold text-primary hover:underline'
        >
          View all
        </Link>
      </div>

      {list.length === 0 ? (
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.topTrainer}
          imageAlt='No top trainers'
          title='No trainer rankings yet'
          description='Top performers will appear here once trainers complete sessions this month.'
        />
      ) : (
        <div className='divide-y divide-[#EBEBEB]'>
          {list.map((trainer) => (
            <TrainerRow key={trainer.rank} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
}
