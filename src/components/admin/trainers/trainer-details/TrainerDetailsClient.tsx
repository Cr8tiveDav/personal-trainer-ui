'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import QuickDetails from './QuickDetails';
import TrainerTabs from './TrainerTabs';
import OverviewTab from './tabs/OverviewTab';
import SessionsTab from './tabs/SessionsTab';

import AvailabilityTab from './tabs/AvailabilityTab';

export type TabType =
  | 'overview'
  | 'sessions'
  | 'earnings'
  | 'media'
  | 'availability';

const fetchTrainer = async (id: string) => {
  const response = await fetch(`/api/admin/trainers/${id}`);
  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    throw new Error('Failed to fetch trainer');
  }
  return response.json();
};

const TrainerDetailsClient = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['trainer', id],
    queryFn: () => fetchTrainer(id),
  });

  if (isLoading) {
    return (
      <div className='w-full h-64 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-primary'></div>
      </div>
    );
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
      {/* Breadcrumb / Back button */}
      <button
        onClick={() => router.push('/admin/trainers')}
        className='flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors'
      >
        <ChevronLeft className='w-4 h-4 mr-1' />
        Back to Trainers
      </button>

      {/* Top Section: Profile and Details */}
      <div className='flex flex-col lg:flex-row gap-6 w-full'>
        {/* Profile Header takes up approx 2/3 */}
        <div className='flex-1 lg:w-2/3'>
          <ProfileHeader trainer={trainer} />
        </div>

        {/* Quick Details takes up approx 1/3 */}
        <div className='w-full lg:w-1/3'>
          <QuickDetails trainer={trainer} />
        </div>
      </div>

      {/* Tabs Section */}
      <div className='w-full mt-8'>
        <TrainerTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className='mt-6'>
          {activeTab === 'overview' && <OverviewTab trainer={trainer} />}
          {activeTab === 'sessions' && <SessionsTab />}
          {activeTab === 'earnings' && (
            <div className='py-8 text-center text-gray-500'>
              Earnings tab content coming soon.
            </div>
          )}
          {activeTab === 'media' && (
            <div className='py-8 text-center text-gray-500'>
              Media tab content coming soon.
            </div>
          )}
          {activeTab === 'availability' && <AvailabilityTab />}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsClient;
