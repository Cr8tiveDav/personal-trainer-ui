'use client';

import React, { useState } from 'react';
import TrainerTableRow from './TrainerTableRow';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabType } from '../TrainersList';
import { Trainer } from './mockData';

interface TrainerTableProps {
  trainers?: Trainer[];
  isLoading: boolean;
  isError: boolean;
  totalItems: number;
}

const TrainerTable = ({ trainers, isLoading, isError, totalItems }: TrainerTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const totalPages = Math.max(1, Math.ceil((trainers?.length || 0) / limit));

  // Ensure current page is within bounds when switching tabs
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

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
      return ['...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='w-full'>
      <div className='overflow-x-auto min-h-[400px]'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='border-b border-gray-200 bg-gray-50/50'>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Trainer
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Specialty
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Sessions
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Earnings
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Availability
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                Date Added
              </th>
              <th className='py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className='py-12 text-center text-sm text-gray-500'>
                  Loading trainers...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={8} className='py-12 text-center text-sm text-red-500'>
                  Error loading trainers. Please try again.
                </td>
              </tr>
            ) : trainers?.length === 0 ? (
              <tr>
                <td colSpan={8} className='py-12 text-center text-sm text-gray-500'>
                  No trainers found.
                </td>
              </tr>
            ) : (
              currentTrainers?.map((trainer) => (
                <TrainerTableRow key={trainer.id} trainer={trainer} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className='flex flex-col items-center justify-center py-6 border-t border-gray-200'>
        <div className='flex items-center gap-1 md:gap-3'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>

          {visiblePages.map((item, index) => {
            if (item === '...') {
              return (
                <span key={`ellipsis-${index}`} className='flex h-9 w-9 items-center justify-center text-gray-500'>
                  ...
                </span>
              );
            }
            return (
              <button
                key={item}
                onClick={() => setCurrentPage(item as number)}
                className={`flex h-9 w-9 items-center justify-center rounded-md font-medium transition-colors ${
                  currentPage === item
                    ? 'bg-[#0F4F80] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
        <p className='text-sm text-gray-500 mt-4'>
          Showing {trainers?.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, trainers?.length || 0)} of {trainers?.length || 0} results
        </p>
      </div>
    </div>
  );
};

export default TrainerTable;
