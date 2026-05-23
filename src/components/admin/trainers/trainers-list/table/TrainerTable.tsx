"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import TrainerTableRow from "./TrainerTableRow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Trainer } from "../../types";
import TrainerTableSkeleton from "./TrainerTableSkeleton";
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from "@/components/ui/EmptyState";

const PER_PAGE = 10;

function getVisiblePages(current: number, total: number) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5, "..."] as const;
  }
  if (current >= total - 2) {
    return ["...", total - 4, total - 3, total - 2, total - 1, total] as const;
  }
  return ["...", current - 1, current, current + 1, "..."] as const;
}

interface TrainerTableProps {
  trainers?: Trainer[];
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  /** Changes when filters change — re-triggers row entrance animation */
  listKey?: string;
  listTotalCount: number;
  displayPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function TrainerTableBody({
  trainers,
  isLoading,
  isError,
  listKey,
  listTotalCount,
  displayPage,
  totalPages,
  onPageChange,
}: Omit<TrainerTableProps, "isFetching">) {
  const rangeStart =
    listTotalCount === 0 ? 0 : (displayPage - 1) * PER_PAGE + 1;
  const rangeEnd =
    listTotalCount === 0 ? 0 : Math.min(displayPage * PER_PAGE, listTotalCount);

  const resultsLabel =
    listTotalCount === 0
      ? "Showing 0 results"
      : `Showing ${rangeStart}–${rangeEnd} of ${listTotalCount} results`;

  const visiblePages = getVisiblePages(displayPage, totalPages);
  const showPagination = listTotalCount > PER_PAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="overflow-x-auto min-h-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F5F5] h-15 border-b border-gray-200">
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Trainer
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Specialty
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Sessions
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Earnings
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Availability
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider whitespace-nowrap">
                Date Added
              </th>
              <th className="py-4 px-6 text-xs font-normal text-[#0F172A] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TrainerTableSkeleton />
            ) : (
              <AnimatePresence key={listKey} initial mode="sync">
                {isError ? (
                  <motion.tr
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td
                      colSpan={8}
                      className="py-12 text-center text-sm text-red-500"
                    >
                      Error loading trainers. Please try again.
                    </td>
                  </motion.tr>
                ) : trainers?.length === 0 ? (
                  <motion.tr
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <td colSpan={8} className="p-0">
                      <EmptyState
                        imageSrc={EMPTY_STATE_IMAGE_PATHS.trainer}
                        imageAlt="No trainers"
                        title="No trainers found"
                        description="Trainers will appear here once they are added to the platform."
                        className="min-h-[280px] py-12"
                      />
                    </td>
                  </motion.tr>
                ) : (
                  trainers?.map((trainer, index) => (
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

      <motion.div className="flex flex-col items-center justify-center border-t border-gray-200 py-6 sm:flex-row sm:justify-between sm:px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={resultsLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-gray-500"
          >
            {isLoading ? "Loading trainers…" : resultsLabel}
          </motion.p>
        </AnimatePresence>

        {showPagination && (
          <div className="mt-4 flex items-center gap-1 md:mt-0 md:gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(displayPage - 1)}
              disabled={displayPage <= 1 || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>

            {visiblePages.map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-9 items-center justify-center text-gray-500"
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
                  type="button"
                  layout
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(pageNumber)}
                  disabled={isLoading}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-md font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="trainer-table-page"
                      className="absolute inset-0 rounded-md bg-[#0F4F80]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{pageNumber}</span>
                </motion.button>
              );
            })}

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(displayPage + 1)}
              disabled={displayPage >= totalPages || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

const TrainerTable = ({
  trainers,
  isLoading,
  isFetching = false,
  isError,
  listKey = "default",
  listTotalCount,
  displayPage,
  totalPages,
  onPageChange,
}: TrainerTableProps) => {
  void isFetching;

  return (
    <TrainerTableBody
      key={listKey}
      trainers={trainers}
      isLoading={isLoading}
      isError={isError}
      listKey={listKey}
      listTotalCount={listTotalCount}
      displayPage={displayPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default TrainerTable;
