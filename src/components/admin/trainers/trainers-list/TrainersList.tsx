'use client';

import React, { useMemo, useState } from 'react';
import { TabType } from '../types';
import FilterControls from './filters/FilterControls';
import TrainerTable from './table/TrainerTable';
import { useGetTrainers } from '@/api/trainers';

const defaultCounts = { all: 0, active: 0, pending: 0, suspended: 0 };

const TrainersList = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError } = useGetTrainers();

  const trainers = data?.data;
  const counts = data?.counts ?? defaultCounts;

  const filteredTrainers = useMemo(() => {
    if (!trainers) return undefined;

    let list =
      activeTab === 'all'
        ? trainers
        : trainers.filter(
            (trainer) => (trainer.status ?? '').toLowerCase() === activeTab
          );

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      list = list.filter((trainer) => {
        const name = (trainer.name ?? '').toLowerCase();
        const email = (trainer.email ?? '').toLowerCase();

        return name.includes(query) || email.includes(query);
      });
    }

    return list;
  }, [trainers, activeTab, searchQuery]);
  return (
    <div className='flex flex-col rounded-3xl border border-[#CBD5E1] bg-white'>
      <div className='py-6 px-4'>
        <FilterControls
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <TrainerTable
        trainers={filteredTrainers}
        isLoading={isLoading}
        isError={isError}
        listKey={`${activeTab}-${searchQuery}`}
      />
    </div>
  );
};

export default TrainersList;
