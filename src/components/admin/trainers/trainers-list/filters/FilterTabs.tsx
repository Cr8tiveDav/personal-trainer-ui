'use client';

import { TabType } from '../../types';
import { ReusableTabs, TabItem } from '@/components/ui/ReusableTabs';

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

const FilterTabs = ({ counts, activeTab, setActiveTab }: FilterTabsProps) => {
  const tabs: TabItem<TabType>[] = [
    { id: 'all', label: 'All trainers', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'suspended', label: 'Suspended', count: counts.suspended },
  ];

  return (
    <ReusableTabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
};

export default FilterTabs;
