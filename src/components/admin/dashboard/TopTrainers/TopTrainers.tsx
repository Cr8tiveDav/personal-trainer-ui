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
  const list = response?.data ?? [];

  return (
    <div className='flex-1 rounded-[12px] border border-[#E4E2E9] bg-white p-5 h-full'>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-muted-foreground'>
          Top trainers this month
        </h2>
        <Link
          href='/admin/trainers'
          className='text-base font-medium text-primary hover:underline'
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
        <div className='divide-y divide-gray-50'>
          {list.map((trainer) => (
            <TrainerRow key={trainer.rank} trainer={trainer} />
          ))}
        </div>
      )}
    </div>
  );
}
