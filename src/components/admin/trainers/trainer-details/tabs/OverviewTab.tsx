'use client';

import { Trainer } from '../../types';
import StatCard from '../../analytics/StatCard';
import { useTrainerSessions } from '@/api/sessions';
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState';

interface OverviewTabProps {
  trainer: Trainer;
}

const OverviewTab = ({ trainer }: OverviewTabProps) => {
  const { data: sessions = [], isLoading: sessionsLoading } = useTrainerSessions(
    trainer.id,
  );

  const sessionCount = sessionsLoading
    ? '—'
    : sessions.length > 0
      ? sessions.length
      : (trainer.sessions ?? 0);

  const earningsDisplay =
    trainer.earnings > 0
      ? `$${trainer.earnings.toLocaleString()}`
      : '$0';

  return (
    <div className='flex flex-col gap-8'>
           {/* About Section */}
      <div className='w-full bg-white rounded-[12px] border border-[#EBEBEB] py-8 px-6 md:px-12'>
        <h3 className='text-2xl font-medium text-muted-foreground mb-2'>
          About
        </h3>
        <p className='w-full text-sm text-muted leading-relaxed break-words whitespace-pre-line'>
          {trainer.bio}
        </p>
      </div>


      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <StatCard
          title='Sessions'
          value={sessionCount}
          icon='/images/admin-dashboard/icons/barbell.svg'
        />

        <StatCard
          title='Earnings'
          value={earningsDisplay}
          icon='/images/admin-dashboard/icons/currency-dollar.svg'
        />

        <StatCard
          title='Active clients'
          value={0}
          icon={'/images/admin-dashboard/icons/users-three-gray.svg'}
        />
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-[16px] border border-[#EBEBEB] overflow-hidden'>
        <div className='p-6 pb-5'>
          <h3 className='text-2xl font-medium text-muted-foreground'>
            Recent activity
          </h3>
        </div>
        <div className='border-t border-[#EBEBEB]'>
          <EmptyState
            imageSrc={EMPTY_STATE_IMAGE_PATHS.income}
            imageAlt='No recent activity'
            title='No recent activity yet'
            description='Session bookings and updates will show up here once this trainer starts working with clients.'
            className='min-h-[220px] py-10'
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
