'use client'

import { CalendarX, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Session } from './session'
import { SessionTableRow } from './SessionTableRow'
import { SessionTableSkeleton } from './SessionTableSkeleton'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'

interface TableProps {
  sessions: Session[]
  variant?: 'all' | 'confirmation' | 'missed' | 'manual'
  isError?: boolean
  isLoading?: boolean
  isFiltered?: boolean
  currentPage: number
  pageSize: number
  totalSessions: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectDetails: (id: string) => void
  onSelectReschedule: (id: string) => void
  /** Re-triggers row entrance when filters or tab change */
  listKey?: string
}

type SessionsTableBodyProps = Omit<TableProps, 'listKey'>

const imageEmptyStates: Partial<
  Record<
    NonNullable<TableProps['variant']>,
    {
      imageSrc: string
      imageAlt: string
      title: string
      description: string
    }
  >
> = {
  manual: {
    imageSrc: EMPTY_STATE_IMAGE_PATHS.manualEntry,
    imageAlt: 'No manual sessions',
    title: 'No manual sessions yet.',
    description: 'Manually logged sessions will appear here after you add them.',
  },
  confirmation: {
    imageSrc: EMPTY_STATE_IMAGE_PATHS.confirmationQueue,
    imageAlt: 'No sessions needing confirmation',
    title: 'No sessions need confirmation.',
    description: 'Sessions requiring admin review will appear here.',
  },
  missed: {
    imageSrc: EMPTY_STATE_IMAGE_PATHS.missedSessions,
    imageAlt: 'No missed sessions',
    title: 'No missed sessions yet.',
    description: 'Missed sessions will appear here when they are reported.',
  },
}

function SessionsTableBody({
  sessions,
  variant = 'all',
  isError = false,
  isLoading = false,
  isFiltered = false,
  currentPage,
  pageSize,
  totalSessions,
  totalPages,
  onPageChange,
  onSelectDetails,
  onSelectReschedule,
}: SessionsTableBodyProps) {
  const emptyMessage = isFiltered
    ? 'No matching sessions found.'
    : isError && variant !== 'manual'
      ? 'Sessions could not be loaded.'
      : variant === 'manual'
        ? 'No manual sessions yet.'
        : 'No sessions available yet.'
  const emptyDescription = isFiltered
    ? 'Try adjusting your search or trainer filter to find a session.'
    : variant === 'manual'
      ? 'Manually logged sessions will appear here after you add them.'
      : 'Sessions booked by clients will appear here once they are available.'
  const imageEmptyState = !isFiltered ? imageEmptyStates[variant] : undefined
  const startResult = totalSessions === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endResult = Math.min(currentPage * pageSize, totalSessions)
  const maxVisiblePages = 5
  const halfVisiblePages = Math.floor(maxVisiblePages / 2)
  const pageWindowStart = Math.max(
    1,
    Math.min(currentPage - halfVisiblePages, totalPages - maxVisiblePages + 1),
  )
  const visiblePages = Array.from(
    { length: Math.min(totalPages, maxVisiblePages) },
    (_, index) => pageWindowStart + index,
  )
  const tableColSpan = 10
  const rowsAnimationKey = `page-${currentPage}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className='w-full bg-white'
    >
      <div className='w-full overflow-x-auto'>
        <table className='w-full min-w-[1120px] border-collapse text-left'>
          <thead>
            <tr className='border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold uppercase tracking-wider text-gray-500'>
              <th className='px-4 py-3.5 font-bold'>ID</th>
              <th className='px-4 py-3.5 font-bold'>Client</th>
              <th className='px-4 py-3.5 font-bold'>Trainer</th>
              <th className='px-4 py-3.5 font-bold'>Type</th>
              <th className='px-4 py-3.5 font-bold'>Scheduled</th>
              <th className='px-4 py-3.5 font-bold'>Duration</th>
              <th className='px-4 py-3.5 font-bold'>Amount</th>
              <th className='px-4 py-3.5 font-bold'>Client Conf.</th>
              <th className='px-4 py-3.5 font-bold'>State</th>
              <th className='px-4 py-3.5 text-right font-bold'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {isLoading ? (
              <SessionTableSkeleton />
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
                      colSpan={tableColSpan}
                      className='px-4 py-10 text-center text-xs font-medium text-red-500'
                    >
                      Sessions could not be loaded. Please try again.
                    </td>
                  </motion.tr>
                ) : sessions.length > 0 ? (
                  sessions.map((session, index) => (
                      <SessionTableRow
                        key={session.id}
                        session={session}
                        index={index}
                        onViewDetails={onSelectDetails}
                        onReschedule={onSelectReschedule}
                      />
                  ))
                ) : (
                  <motion.tr
                    key='empty'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <td colSpan={tableColSpan} className='p-0'>
                      {imageEmptyState ? (
                        <EmptyState
                          imageSrc={imageEmptyState.imageSrc}
                          imageAlt={imageEmptyState.imageAlt}
                          title={imageEmptyState.title}
                          description={imageEmptyState.description}
                          className='min-h-[280px] py-12'
                        />
                      ) : (
                        <div className='mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-10 text-center text-xs font-medium text-gray-400'>
                          <span className='flex h-12 w-12 items-center justify-center rounded-[9999px] bg-gray-50 text-gray-400'>
                            <CalendarX className='h-5 w-5' />
                          </span>
                          <p className='mt-3 text-sm font-bold text-gray-900'>{emptyMessage}</p>
                          <p className='mt-1 text-xs font-medium leading-relaxed text-gray-400'>
                            {emptyDescription}
                          </p>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && totalSessions > 0 && (
        <motion.div className='flex flex-col items-center gap-3 border-t border-gray-100 px-4 py-6'>
          <div className='flex items-center gap-3'>
            <motion.button
              type='button'
              whileTap={{ scale: 0.95 }}
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className='flex h-9 w-9 items-center justify-center rounded-[6px] border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label='Previous page'
            >
              <ChevronLeft className='h-3.5 w-3.5' />
            </motion.button>

            {visiblePages.map((page) => {
              const isActive = currentPage === page
              return (
                <motion.button
                  key={page}
                  type='button'
                  layout
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(page)}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-[6px] text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'border border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId='sessions-table-page'
                      className='absolute inset-0 rounded-[6px] bg-[#0b4d8d]'
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className='relative z-10'>{page}</span>
                </motion.button>
              )
            })}

            {totalPages > 5 && (
              <span className='px-1 text-xs font-semibold text-gray-400'>...</span>
            )}

            <motion.button
              type='button'
              whileTap={{ scale: 0.95 }}
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className='flex h-9 w-9 items-center justify-center rounded-[6px] border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label='Next page'
            >
              <ChevronRight className='h-3.5 w-3.5' />
            </motion.button>
          </div>

          <AnimatePresence mode='wait'>
            <motion.p
              key={`${startResult}-${endResult}-${totalSessions}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='text-xs font-medium text-gray-500'
            >
              Showing {startResult}-{endResult} of {totalSessions} results
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}

export function SessionsTable({
  listKey = 'default',
  ...props
}: TableProps) {
  return <SessionsTableBody key={listKey} {...props} />
}
