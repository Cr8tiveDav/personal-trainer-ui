'use client';

import React from 'react';
import FilterTabs from './FilterTabs';
import { Search } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import SortDropdown from './SortDropdown';
import { TabType } from '../TrainersList';

interface FilterControlsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  counts: { all: number; active: number; pending: number; suspended: number };
}

const FilterControls = ({ activeTab, setActiveTab, counts }: FilterControlsProps) => {
  return (
    <section className='w-full flex flex-col items-start gap-6'>
      <FilterTabs
        counts={counts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className='flex flex-col md:flex-row md:items-center gap-4 md:gap-11.5 w-full'>
        <div className='w-full h-10 flex md:flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2'>
          <Search className='h-4 w-4 shrink-0 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name or email'
            className='flex-1 w-full text-sm text-gray-700 outline-none placeholder:text-[#D1D1D1] bg-transparent'
          />
        </div>
        <div className='flex items-center gap-4'>
          <FilterDropdown />
          <SortDropdown />
        </div>
      </div>
    </section>
  );
};

export default FilterControls;
