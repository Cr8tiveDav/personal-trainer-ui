'use client';

import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useTrainerById } from '@/api/trainers';
import ProfileHeader from './ProfileHeader';
import QuickDetails from './QuickDetails';
import TrainerTabs from './TrainerTabs';
import OverviewTab from './tabs/OverviewTab';
import SessionsTab from './tabs/SessionsTab';
// import EarningsTab from './tabs/EarningsTab';
import AvailabilityTab from './tabs/AvailabilityTab';
import { TrainerMediaTab } from './tabs/MediaTabs';
import { TrainerDetailsSkeleton } from './TrainerDetailsSkeleton';

export type TabType =
  | 'overview'
  | 'sessions'
  | 'earnings'
  | 'media'
  | 'availability';

const TAB_FROM_QUERY: Record<string, TabType> = {
  overview: 'overview',
  sessions: 'sessions',
  // earnings: 'earnings',
  media: 'media',
  availability: 'availability',
};

const TrainerDetailsClient = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const [userTab, setUserTab] = useState<TabType | null>(null);

  const { data, isLoading, isError } = useTrainerById(id);

  const tabParam = searchParams.get('tab');
  const queryTab =
    tabParam && TAB_FROM_QUERY[tabParam] ? TAB_FROM_QUERY[tabParam] : null;
  const activeTab = userTab ?? queryTab ?? 'overview';

  if (isLoading) {
    return <TrainerDetailsSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className='w-full p-8 text-center'>
        <p className='text-red-500 mb-4'>Failed to load trainer details.</p>
        <button
          onClick={() => router.push('/admin/trainers')}
          className='text-primary hover:underline'
        >
          Return to Trainers
        </button>
      </div>
    );
  }

  const trainer = data.data;

  return (
    <div className='w-full mx-auto space-y-6 px-4 pb-12'>
      <button
        onClick={() => router.push('/admin/trainers')}
        className='flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors'
      >
        <ChevronLeft className='w-4 h-4 mr-1' />
        Back to Trainers
      </button>

      <div className='flex flex-col lg:flex-row gap-6 w-full'>
        <div className='flex-1 lg:w-2/3'>
          <ProfileHeader trainer={trainer} />
        </div>

        <div className='w-full lg:w-1/3'>
          <QuickDetails trainer={trainer} />
        </div>
      </div>

      <div className='w-full mt-8'>
        <TrainerTabs activeTab={activeTab} onTabChange={setUserTab} />

        <div className='mt-6'>
          {activeTab === 'overview' && <OverviewTab trainer={trainer} />}
          {activeTab === 'sessions' && <SessionsTab trainerId={trainer.id} />}
          {/* {activeTab === 'earnings' && <EarningsTab trainerId={trainer.id} />} */}
          {activeTab === 'media' && (
            <TrainerMediaTab
              trainerId={trainer.id}
              trainerName={trainer.name}
              trainerSpecialty={trainer.specialty}
            />
          )}
          {activeTab === 'availability' && (
            <AvailabilityTab
              trainerId={trainer.id}
              enabled={activeTab === 'availability'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsClient;
