'use client';

import {
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Client } from './types';
import { ClientTableRow } from './ClientTableRow';
import { ClientTableSkeleton } from './ClientTableSkeleton';
import { ClientsEmptyState } from './ClientsEmptyState';
import type { ClientTab } from './ClientFilterTabs';

const TABLE_COLUMNS = [
  'CLIENT',
  'SESSIONS',
  'JOINED',
  'STATUS',
  'ACTIONS',
] as const;

function getVisiblePages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5, '...'] as const;
  }
  if (current >= total - 2) {
    return ['...', total - 4, total - 3, total - 2, total - 1, total] as const;
  }
  return ['...', current - 1, current, current + 1, '...'] as const;
}

type ClientsTableProps = {
  clients?: Client[];
  activeTab: ClientTab;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  listKey?: string;
  listTotalCount: number;
  displayPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ClientsTable({
  clients,
  activeTab,
  searchQuery,
  onSearchChange,
  isLoading,
  isFetching = false,
  isError,
  listKey = 'default',
  listTotalCount,
  displayPage,
  totalPages,
  onPageChange,
}: ClientsTableProps) {
  const perPage = 10;
  const rangeStart = listTotalCount === 0 ? 0 : (displayPage - 1) * perPage + 1;
  const rangeEnd =
    listTotalCount === 0 ? 0 : Math.min(displayPage * perPage, listTotalCount);

  const resultsLabel =
    listTotalCount === 0
      ? 'Showing 0 results'
      : `Showing ${rangeStart}–${rangeEnd} of ${listTotalCount} results`;

  const visiblePages = getVisiblePages(displayPage, Math.max(totalPages, 1));

  const showEmpty =
    !isLoading &&
    !isError &&
    listTotalCount === 0 &&
    (clients?.length ?? 0) === 0;

  const emptyTitle =
    searchQuery.trim() !== ''
      ? 'No clients match your search'
      : activeTab === 'Inactive'
        ? 'No inactive clients'
        : activeTab === 'Active'
          ? 'No active clients'
          : activeTab === 'Paused'
            ? 'No paused clients'
            : 'No clients yet';

  const emptyDescription =
    searchQuery.trim() !== ''
      ? 'Try a different name or email, or clear the search.'
      : activeTab !== 'All'
        ? 'Switch tabs or check back when client activity changes.'
        : 'Clients will appear here once they register on the platform.';

  const showTableContent = !showEmpty;

  return (
    <>
      <div className='flex flex-col gap-4 border-b border-gray-100 px-6 py-4 md:flex-row md:items-center md:gap-11.5'>
        <div className='w-full h-10 flex md:flex-1 items-center gap-2 rounded-[8px] border border-gray-200 px-3 py-2'>
          <Search className='h-4 w-4 shrink-0 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name or email'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='flex-1 w-full text-sm text-gray-700 outline-none placeholder:text-[#D1D1D1] bg-transparent'
          />
        </div>
        {/* <div className='flex items-center gap-4'>
          <button
            type='button'
            className='flex items-center gap-2 rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'
          >
            <Filter className='h-4 w-4' />
            Filter
          </button>
          <button
            type='button'
            className='flex items-center gap-2 rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'
          >
            <ArrowUpDown className='h-4 w-4' />
            Sort
          </button>
        </div> */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full ${isFetching ? 'opacity-90' : ''}`}
      >
        {isLoading ? (
          <div className='min-h-50 overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b border-gray-100'>
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col}
                      className='px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ClientTableSkeleton />
              </tbody>
            </table>
          </div>
        ) : isError ? (
          <div className='px-6 py-16 text-center text-sm text-red-500'>
            Failed to load clients. Please try again.
          </div>
        ) : showEmpty ? (
          <ClientsEmptyState
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : (
          <div className='min-h-50 overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              <thead>
                <tr className='border-b border-gray-100'>
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col}
                      className='px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400'
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence key={listKey} initial mode='sync'>
                  {clients?.map((client, index) => (
                    <ClientTableRow
                      key={client.id}
                      client={client}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {showTableContent && (
          <div className='flex flex-col-reverse items-center justify-center gap-4 border-t border-gray-100 px-6 py-4'>
            <AnimatePresence mode='wait'>
              <motion.p
                key={resultsLabel}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='text-sm text-gray-400'
              >
                {isLoading ? 'Loading clients…' : resultsLabel}
              </motion.p>
            </AnimatePresence>

            {listTotalCount > perPage && (
              <div className='flex items-center gap-1'>
                <motion.button
                  type='button'
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(displayPage - 1)}
                  disabled={displayPage <= 1 || isLoading}
                  className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label='Previous page'
                >
                  <ChevronLeft className='h-4 w-4' />
                </motion.button>

                {visiblePages.map((item, index) => {
                  if (item === '...') {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-gray-500'
                      >
                        …
                      </span>
                    );
                  }
                  const pageNumber = item as number;
                  const isActive = displayPage === pageNumber;
                  return (
                    <motion.button
                      key={pageNumber}
                      type='button'
                      layout
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onPageChange(pageNumber)}
                      disabled={isLoading}
                      className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId='client-table-page'
                          className='absolute inset-0 rounded-[6px] bg-primary'
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className='relative z-10'>{pageNumber}</span>
                    </motion.button>
                  );
                })}

                <motion.button
                  type='button'
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(displayPage + 1)}
                  disabled={displayPage >= totalPages || isLoading}
                  className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label='Next page'
                >
                  <ChevronRight className='h-4 w-4' />
                </motion.button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
}
