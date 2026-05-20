'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Trainer, TabType, TrainerResponse } from '../types';
import FilterControls from './filters/FilterControls';
import TrainerTable from './table/TrainerTable';

async function fetchTrainers(status: string): Promise<TrainerResponse> {
  const res = await fetch(`/api/admin/trainers?status=${status}`);
  if (!res.ok) {
    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    throw new Error('Failed to fetch trainers');
  }
  return res.json();
}

const TrainersList = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-trainers', activeTab],
    queryFn: () => fetchTrainers(activeTab),
  });

  const defaultCounts = { all: 0, active: 0, pending: 0, suspended: 0 };
  const counts = data?.counts || defaultCounts;

  return (
    <div className='flex flex-col rounded-3xl border border-[#CBD5E1] bg-white'>
      {/* Top section: Filters, Search, Tabs */}
      <div className='py-6 px-4'>
        <FilterControls
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />
      </div>

      {/* Table section */}
      <TrainerTable
        trainers={data?.data}
        isLoading={isLoading}
        isError={isError}
        totalItems={data?.pagination?.totalItems || 0}
      />
    </div>
  );
};

export default TrainersList;
