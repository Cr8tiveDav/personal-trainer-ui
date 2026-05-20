'use client';

import { TabType } from '../../types';

interface TrainerCounts {
  all: number;
  active: number;
  pending: number;
  suspended: number;
}

interface FilterTabsProps {
  counts: TrainerCounts;
  activeTab: TabType;
  setActiveTab: (tabId: TabType) => void;
}

interface TabItem {
  id: string;
  label: string;
  count: number;
}

const FilterTabs = ({ counts, activeTab, setActiveTab }: FilterTabsProps) => {
  const tabs: TabItem[] = [
    { id: 'all', label: 'All trainers', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'suspended', label: 'Suspended', count: counts.suspended },
  ];

  return (
    <div className='w-full border-b border-[#CBD5E1]'>
      <div
        className='flex gap-2.5 w-full overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mb-[1px]'
        role='tablist'
        aria-label='Trainer status filters'
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role='tab'
              aria-selected={isActive}
              aria-controls={`trainer-panel-${tab.id}`}
              id={`trainer-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
                relative py-3 px-4 text-sm transition-all duration-300 outline-none
                border-b
                ${
                  isActive
                    ? 'text-primary border-[#2272AD]'
                    : 'text-[#5C5C5C] border-transparent hover:text-primary/80'
                }
              `}
            >
              <div
                className={`flex items-center transition-all duration-300 ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                <span>{tab.label}</span>
                <span className='ml-1 text-xs opacity-80'>({tab.count})</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterTabs;
