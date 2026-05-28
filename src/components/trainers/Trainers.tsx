'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import SectionHeader from '../ui/SectionHeader';
import CategoryFilter from './TrainersCatergory';
import TrainerCard from './TrainersCard';
import { Category } from './trianers';
import type { Trainer as LocalTrainer } from './trianers';
import { useGetApprovedTrainers } from '@/api/trainers';
import type { BackendTrainerResponse } from '@/api/types/trainers';

const PER_PAGE = 6;

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

function mapApiTrainerToLocal(
  apiTrainer: BackendTrainerResponse
): LocalTrainer {
  const specs = apiTrainer.specializations || [];

  const capitalizedSpecs = specs.map((spec: string) => {
    return spec
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  });

  const finalSpecialties =
    capitalizedSpecs.length > 0 ? capitalizedSpecs : ['Strength'];

  return {
    id: apiTrainer.id,
    name: apiTrainer.name || 'Trainer',
    sessions: 0,
    specialties: finalSpecialties,
    image: apiTrainer.display_picture || null,
    categories: finalSpecialties,
  };
}

const TrainerSection = () => {
  const { data: apiTrainers, isLoading } = useGetApprovedTrainers();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [page, setPage] = useState(1);

  const trainerList = useMemo(() => {
    return (apiTrainers || []).map(mapApiTrainerToLocal);
  }, [apiTrainers]);

  const activeCategories = useMemo(() => {
    const specsSet = new Set<string>();
    trainerList.forEach((t) => {
      t.categories.forEach((cat) => {
        specsSet.add(cat);
      });
    });
    return ['All', ...Array.from(specsSet)];
  }, [trainerList]);

  const filtered = useMemo(() => {
    return activeCategory === 'All' || !activeCategories.includes(activeCategory)
      ? trainerList
      : trainerList.filter((t) => t.categories.includes(activeCategory));
  }, [activeCategory, activeCategories, trainerList]);

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  const displayPage = totalCount === 0 ? 1 : Math.min(page, totalPages);
  const paginatedFiltered = filtered.slice(
    (displayPage - 1) * PER_PAGE,
    displayPage * PER_PAGE
  );

  const rangeStart = totalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1;
  const rangeEnd =
    totalCount === 0 ? 0 : Math.min(displayPage * PER_PAGE, totalCount);
  const resultsLabel =
    totalCount === 0
      ? 'Showing 0 results'
      : `Showing ${rangeStart}–${rangeEnd} of ${totalCount} results`;

  const visiblePages = getVisiblePages(displayPage, totalPages);
  const showPagination = totalCount > PER_PAGE;

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages || next === displayPage) return;
    setPage(next);
  };

  return (
    <section className='w-full pb-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='md:[&_h2]:text-5xl lg:[&_p]:text-lg'>
          <SectionHeader
            badge='Trainer'
            title='Meet your trainer.'
            description='Certified coaches, real session schedules. Filter by specialty or by what you want to achieve.'
            align='center'
            className='mx-auto mb-12 max-w-xl md:mb-20'
          />
        </div>

        <CategoryFilter
          categories={activeCategories}
          active={activeCategory}
          onChange={handleCategoryChange}
        />

        {isLoading ? (
          <div className='flex min-h-[200px] items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
          </div>
        ) : filtered.length === 0 ? (
          <div className='flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-200'>
            <p className='text-sm text-gray-400'>
              No trainers found for this category.
            </p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3'>
              {paginatedFiltered.map((trainer, index) => (
                <TrainerCard
                  key={trainer.id || `${trainer.name}-${index}`}
                  trainer={trainer}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row'
            >
              <AnimatePresence mode='wait'>
                <motion.p
                  key={resultsLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='text-sm text-gray-500'
                >
                  {isLoading ? 'Loading trainers…' : resultsLabel}
                </motion.p>
              </AnimatePresence>

              {showPagination && (
                <div className='flex items-center gap-2'>
                  <motion.button
                    type='button'
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(displayPage - 1)}
                    disabled={displayPage <= 1 || isLoading}
                    className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                    aria-label='Previous page'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </motion.button>

                  {visiblePages.map((item, index) => {
                    if (item === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-gray-400'
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
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={isLoading}
                        className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] font-medium transition-colors ${
                          isActive
                            ? 'text-white font-semibold'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId='trainer-grid-page'
                            className='absolute inset-0 rounded-[6px] bg-[#0d2b45]'
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
                    onClick={() => handlePageChange(displayPage + 1)}
                    disabled={displayPage >= totalPages || isLoading}
                    className='flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[6px] border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                    aria-label='Next page'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrainerSection;
