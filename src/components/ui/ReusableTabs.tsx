'use client';

import { motion } from 'motion/react';
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
  /** Unique id when multiple tab bars exist on one page */
  layoutId?: string;
}

export function ReusableTabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className,
  layoutId = 'reusable-tab-indicator',
}: ReusableTabsProps<T>) {
  return (
    <div className={cn('w-full border-b border-[#CBD5E1]', className)}>
      <div
        className='flex gap-2.5 w-full overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mb-px'
        role='tablist'
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              role='tab'
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'relative py-3 px-4 -mb-px text-sm outline-none border-b-2 border-transparent',
                isActive
                  ? 'text-primary'
                  : 'text-[#5C5C5C] hover:text-primary/80'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  className='absolute inset-x-0 bottom-0 h-0.5 bg-[#2272AD] rounded-full'
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <div
                className={cn(
                  'relative z-10 flex items-center transition-colors duration-200',
                  isActive ? 'font-semibold' : 'font-medium'
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <motion.span
                    key={tab.count}
                    initial={{ opacity: 0.6, scale: 0.92 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className='ml-1 text-xs'
                  >
                    ({tab.count})
                  </motion.span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
