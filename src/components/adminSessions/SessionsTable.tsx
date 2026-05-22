'use client'

import { CalendarX, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Session } from './session'
import { SessionTableRow, sessionRowVariants } from './SessionTableRow'
import { SessionTableSkeleton } from './SessionTableSkeleton'

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
  onForceConfirm?: (session: Session) => void
  onMarkMissed?: (id: string) => void
  onSelectDetails: (id: string) => void
  onSelectReschedule: (id: string) => void
  /** Re-triggers row entrance when filters or tab change */
  listKey?: string
}

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

type SessionsTableBodyProps = Omit<TableProps, 'listKey'>

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
  onForceConfirm,
  onMarkMissed,
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
  const isConfirmationQueue = variant === 'confirmation'
  const tableColSpan = 7
  const rowsAnimationKey = `page-${currentPage}`

  const renderPerson = (person: Session['client'], fallbackClassName: string) => (
    <div className='flex items-center gap-2'>
      {'avatar' in person && person.avatar ? (
        <Image
          src={person.avatar}
          alt={person.name}
          width={32}
          height={32}
          className='h-8 w-8 shrink-0 rounded-full bg-gray-100 object-cover'
        />
      ) : (
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold uppercase ${fallbackClassName}`}
        >
          {person.name
            .split(' ')
            .map((part) => part.charAt(0))
            .join('')
            .slice(0, 2)}
        </div>
      )}
      <div>
        <p className='text-xs font-bold text-gray-900'>{person.name}</p>
        <p className='text-[10px] font-medium uppercase text-gray-500'>{person.country}</p>
      </div>
    </div>
  )

  const confStyle = (val: string) => {
    if (val === 'Yes') return 'bg-[#e7f6ec] text-[#0f973d]'
    if (val === 'Pending') return 'bg-gray-50 text-gray-500'
    return 'bg-[#f2f4f7] text-gray-400'
  }

  const dotStyle = (val: string) => {
    if (val === 'Yes') return 'bg-[#0f973d]'
    if (val === 'Pending') return 'bg-gray-500'
    return ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className='w-full bg-white'
    >
      <div className='w-full overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold uppercase tracking-wider text-gray-500'>
              {isConfirmationQueue ? (
                <>
                  <th className='px-4 py-3.5 font-bold'>ID</th>
                  <th className='px-4 py-3.5 font-bold'>Client</th>
                  <th className='px-4 py-3.5 font-bold'>Trainer</th>
                  <th className='px-4 py-3.5 font-bold'>Scheduled</th>
                  <th className='px-4 py-3.5 font-bold'>Client Conf.</th>
                  <th className='px-4 py-3.5 font-bold'>Overdue</th>
                  <th className='px-4 py-3.5 text-right font-bold'>Actions</th>
                </>
              ) : (
                <>
                  <th className='px-4 py-3.5 font-bold'>ID</th>
                  <th className='px-4 py-3.5 font-bold'>Client</th>
                  <th className='px-4 py-3.5 font-bold'>Trainer</th>
                  <th className='px-4 py-3.5 font-bold'>Scheduled</th>
                  <th className='px-4 py-3.5 font-bold'>Duration</th>
                  <th className='px-4 py-3.5 font-bold'>Client Conf.</th>
                  <th className='px-4 py-3.5 text-right font-bold'>Actions</th>
                </>
              )}
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
                  sessions.map((session, index) =>
                    isConfirmationQueue ? (
                      <motion.tr
                        key={session.id}
                        variants={sessionRowVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        custom={index}
                        className='border-b border-gray-100 text-xs text-[#111111] transition-colors hover:bg-gray-50/50'
                      >
                        <td className='px-4 py-5 text-xs font-medium text-gray-900'>
                          <span title={`#${session.id}`}>#{formatSessionId(session.id)}</span>
                        </td>
                        <td className='px-4 py-5'>
                          {renderPerson(session.client, 'bg-[#0b4d8d]/10 text-[#0b4d8d]')}
                        </td>
                        <td className='px-4 py-5'>
                          {renderPerson(session.trainer, 'bg-gray-100 text-gray-500')}
                        </td>
                        <td className='px-4 py-5 text-xs font-medium text-gray-700'>
                          {session.scheduled}
                        </td>
                        <td className='px-4 py-5'>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${confStyle(session.clientConf)}`}
                          >
                            {session.clientConf !== 'N/A' && (
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${dotStyle(session.clientConf)}`}
                              />
                            )}
                            {session.clientConf}
                          </span>
                        </td>
                        <td className='px-4 py-5 text-xs font-medium text-gray-400'>-</td>
                        <td className='px-4 py-5 text-right'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant='ghost'
                                className='h-8 w-8 rounded-lg p-0 text-gray-400 shadow-none hover:bg-gray-100/80 hover:text-gray-700 focus:ring-0'
                              >
                                <MoreVertical className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align='end'
                              className='z-50 w-48 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl'
                            >
                              <DropdownMenuItem
                                onClick={() => onForceConfirm?.(session)}
                                className='cursor-pointer rounded-lg bg-[#0b4d8d] px-3 py-2 text-xs font-semibold text-white focus:bg-[#0b4d8d] focus:text-white'
                              >
                                Force Confirm
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onMarkMissed?.(session.id)}
                                className='cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 focus:bg-gray-50'
                              >
                                Mark as Missed Session
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ) : (
                      <SessionTableRow
                        key={session.id}
                        session={session}
                        index={index}
                        onViewDetails={onSelectDetails}
                        onReschedule={onSelectReschedule}
                      />
                    ),
                  )
                ) : (
                  <motion.tr
                    key='empty'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <td colSpan={tableColSpan} className='px-4 py-10 text-center text-xs font-medium text-gray-400'>
                      <div className='mx-auto flex max-w-sm flex-col items-center justify-center py-8 text-center'>
                        <span className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400'>
                          <CalendarX className='h-5 w-5' />
                        </span>
                        <p className='mt-3 text-sm font-bold text-gray-900'>{emptyMessage}</p>
                        <p className='mt-1 text-xs font-medium leading-relaxed text-gray-400'>
                          {emptyDescription}
                        </p>
                      </div>
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
              className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
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
                  className={`relative flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'border border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId='sessions-table-page'
                      className='absolute inset-0 rounded-md bg-[#0b4d8d]'
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
              className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
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
