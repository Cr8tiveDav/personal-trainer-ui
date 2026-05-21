'use client';

import React from 'react';
import { cn } from '@/utils';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

interface ReusableTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  className?: string;
}

export function ReusableTabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className,
}: ReusableTabsProps<T>) {
  return (
    <div className={cn('w-full border-b border-[#CBD5E1]', className)}>
      <div
        className='flex gap-2.5 w-full overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mb-[1px]'
        role='tablist'
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role='tab'
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative py-3 px-4 text-sm transition-all duration-300 outline-none border-b',
                isActive
                  ? 'text-primary border-[#2272AD]'
                  : 'text-[#5C5C5C] border-transparent hover:text-primary/80'
              )}
            >
              <div
                className={cn(
                  'flex items-center transition-all duration-300',
                  isActive ? 'font-semibold' : 'font-medium'
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className='ml-1 text-xs opacity-80'>({tab.count})</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
