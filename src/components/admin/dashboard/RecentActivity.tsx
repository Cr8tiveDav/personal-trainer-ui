'use client';

import Link from 'next/link';
import { useRecentActivity } from '@/api/dashboard';
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState';
import { ActivityRow } from './ActivityRow';

export function RecentActivity() {
  const { data: response, isPending, isSuccess } = useRecentActivity();
  const activities = isSuccess ? (response?.data?.items ?? []) : [];
  return (
    <div className='flex-1 rounded-[12px] border border-[#E4E2E9] bg-white p-5 h-full'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-[24px] font-semibold text-gray-900'>
          Recent activity
        </h2>
        <Link
          href='/admin/sessions'
          className='text-base font-semibold text-primary hover:underline'
        >
          View all
        </Link>
      </div>

      {isPending ? (
        <div className='divide-y divide-[#EBEBEB]'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='flex items-center gap-4 py-4 animate-pulse'>
              <div className='h-10 w-10 shrink-0 rounded-[9999px] bg-gray-200' />
              <div className='flex-1 min-w-0'>
                <div className='h-4 w-40 bg-gray-200 rounded' />
                <div className='h-3 w-20 bg-gray-200 rounded mt-2' />
              </div>
              <div className='h-6.5 w-16 bg-gray-200 rounded-[9999px]' />
            </div>
          ))}
        </div>
      ) : isSuccess && activities.length === 0 ? (
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.recentActivity}
          imageAlt='No recent activity'
          title='No recent activity yet'
          description='Session bookings and updates will show up here once clients start training.'
        />
      ) : (
        <div className='divide-y divide-[#EBEBEB]'>
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
