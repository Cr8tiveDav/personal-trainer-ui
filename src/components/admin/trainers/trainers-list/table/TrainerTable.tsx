'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TrainerTableRow from './TrainerTableRow';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Trainer } from '../../types';
import TrainerTableSkeleton from './TrainerTableSkeleton';

interface TrainerTableProps {
  trainers?: Trainer[];
  isLoading: boolean;
  isError: boolean;
  /** Changes when filters change — re-triggers row entrance animation */
  listKey?: string;
}

const TrainerTable = ({
  trainers,
  isLoading,
  isError,
  listKey = 'default',
}: TrainerTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const totalPages = Math.max(1, Math.ceil((trainers?.length || 0) / limit));
  const rowsAnimationKey = `${listKey}-page-${currentPage}`;

  useEffect(() => {
    setCurrentPage(1);
  }, [listKey]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentTrainers = trainers?.slice(startIndex, endIndex);

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...'];
    }
    if (currentPage >= totalPages - 2) {
      return [
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
  };

  const visiblePages = getVisiblePages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className='w-full'
    >
      <div className='overflow-x-auto min-h-100'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-[#F5F5F5] h-15 border-b border-gray-200'>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Trainer
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Specialty
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Status
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Sessions
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Earnings
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Availability
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap'>
                Date Added
              </th>
              <th className='py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TrainerTableSkeleton />
            ) : (
              <AnimatePresence key={rowsAnimationKey} initial mode='sync'>
                {isError ? (
                  <motion.tr
                    key='error'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td
                      colSpan={8}
                      className='py-12 text-center text-sm text-red-500'
                    >
                      Error loading trainers. Please try again.
                    </td>
                  </motion.tr>
                ) : trainers?.length === 0 ? (
                  <motion.tr
                    key='empty'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <td
                      colSpan={8}
                      className='py-12 text-center text-sm text-gray-500'
                    >
                      No trainers found.
                    </td>
                  </motion.tr>
                ) : (
                  currentTrainers?.map((trainer, index) => (
                    <TrainerTableRow
                      key={trainer.id}
                      trainer={trainer}
                      index={index}
                    />
                  ))
                )}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      <motion.div
        className='flex flex-col items-center justify-center py-6 border-t border-gray-200'
      >
        <div className='flex items-center gap-1 md:gap-3'>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors'
          >
            <ChevronLeft className='h-4 w-4' />
          </motion.button>

          {visiblePages.map((item, index) => {
            if (item === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className='flex h-9 w-9 items-center justify-center text-gray-500'
                >
                  ...
                </span>
              );
            }
            const page = item as number;
            const isActive = currentPage === page;
            return (
              <motion.button
                key={item}
                layout
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-md font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId='trainer-table-page'
                    className='absolute inset-0 rounded-md bg-[#0F4F80]'
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className='relative z-10'>{item}</span>
              </motion.button>
            );
          })}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors'
          >
            <ChevronRight className='h-4 w-4' />
          </motion.button>
        </div>
        <AnimatePresence mode='wait'>
          <motion.p
            key={`${startIndex}-${trainers?.length}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='text-sm text-gray-500 mt-4'
          >
            Showing {trainers?.length === 0 ? 0 : startIndex + 1}-
            {Math.min(endIndex, trainers?.length || 0)} of {trainers?.length || 0}{' '}
            results
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TrainerTable;
