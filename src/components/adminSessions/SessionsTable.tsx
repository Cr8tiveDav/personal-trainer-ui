'use client'

import { CalendarX, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Session } from './session'
import { SessionTableRow } from './SessionTableRow'

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
  onSelectCancel: (id: string) => void
}

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export function SessionsTable({
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
  onSelectCancel
}: TableProps) {
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
  const visiblePages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1)
  const isConfirmationQueue = variant === 'confirmation'
  const tableColSpan = isConfirmationQueue ? 7 : 7

  const getOverdueLabel = (session: Session, index: number) => {
    const mockOverdueById: Record<string, string> = {
      'S-0900': '2h',
      'S-0899': '26h',
      'S-0895': '48h',
      'S-0894': '52h',
    }

    return mockOverdueById[session.id] ?? `${Math.max(2, (currentPage - 1) * pageSize + index + 1) * 2}h`
  }

  const renderPerson = (person: Session['client'], fallbackClassName: string) => (
    <div className='flex items-center gap-2'>
      {'avatar' in person && person.avatar ? (
        <Image
          src={person.avatar}
          alt={person.name}
          width={32}
          height={32}
          className='h-8 w-8 rounded-full object-cover shrink-0 bg-gray-100'
        />
      ) : (
        <div className={`h-8 w-8 rounded-full font-semibold flex items-center justify-center shrink-0 uppercase text-[11px] ${fallbackClassName}`}>
          {person.name
            .split(' ')
            .map((part) => part.charAt(0))
            .join('')
            .slice(0, 2)}
        </div>
      )}
      <div>
        <p className='font-bold text-xs text-gray-900'>{person.name}</p>
        <p className='text-[10px] text-gray-500 font-medium uppercase'>{person.country}</p>
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
    <div className='w-full bg-white'>
      <div className='w-full overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold uppercase tracking-wider text-gray-500'>
              {isConfirmationQueue ? (
                <>
                  <th className='py-3.5 px-4 font-bold'>ID</th>
                  <th className='py-3.5 px-4 font-bold'>Client</th>
                  <th className='py-3.5 px-4 font-bold'>Trainer</th>
                  <th className='py-3.5 px-4 font-bold'>Scheduled</th>
                  <th className='py-3.5 px-4 font-bold'>Client Conf.</th>
                  <th className='py-3.5 px-4 font-bold'>Overdue</th>
                  <th className='py-3.5 px-4 font-bold text-right'>Actions</th>
                </>
              ) : (
                <>
                  <th className='py-3.5 px-4 font-bold'>ID</th>
                  <th className='py-3.5 px-4 font-bold'>Client</th>
                  <th className='py-3.5 px-4 font-bold'>Trainer</th>
                  <th className='py-3.5 px-4 font-bold'>Scheduled</th>
                  <th className='py-3.5 px-4 font-bold'>Duration</th>
                  <th className='py-3.5 px-4 font-bold'>Client Conf.</th>
                  <th className='py-3.5 px-4 font-bold text-right'>Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {isLoading ? (
              <tr>
                <td colSpan={tableColSpan} className='px-4 py-10 text-center text-xs font-medium text-gray-400'>
                  Loading sessions...
                </td>
              </tr>
            ) : sessions.length > 0 ? (
              sessions.map((session, index) => (
                isConfirmationQueue ? (
                  <tr key={session.id} className='border-b border-gray-100 hover:bg-gray-50/50 transition-colors text-xs text-[#111111]'>
                    <td className='py-5 px-4 text-xs font-medium text-gray-900'>
                      <span title={`#${session.id}`}>#{formatSessionId(session.id)}</span>
                    </td>
                    <td className='py-5 px-4'>{renderPerson(session.client, 'bg-[#0b4d8d]/10 text-[#0b4d8d]')}</td>
                    <td className='py-5 px-4'>{renderPerson(session.trainer, 'bg-gray-100 text-gray-500')}</td>
                    <td className='py-5 px-4 text-xs font-medium text-gray-700'>
                      {session.scheduled}
                    </td>
                    <td className='py-5 px-4'>
                      <span className={`inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded-full text-[11px] ${confStyle(session.clientConf)}`}>
                        {session.clientConf !== 'N/A' && <span className={`h-1.5 w-1.5 rounded-full ${dotStyle(session.clientConf)}`} />}
                        {session.clientConf}
                      </span>
                    </td>
                    <td className='py-5 px-4 text-xs font-medium text-gray-900'>{getOverdueLabel(session, index)}</td>
                    <td className='py-5 px-4 text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 p-0 text-gray-400 hover:text-gray-700 focus:ring-0 shadow-none hover:bg-gray-100/80 rounded-lg'
                          >
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align='end'
                          className='w-48 rounded-xl p-1.5 border border-gray-100 shadow-xl bg-white z-50'
                        >
                          <DropdownMenuItem
                            onClick={() => onForceConfirm?.(session)}
                            className='rounded-lg px-3 py-2 text-xs font-semibold text-white bg-[#0b4d8d] cursor-pointer focus:bg-[#0b4d8d] focus:text-white'
                          >
                            Force Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onMarkMissed?.(session.id)}
                            className='rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 focus:bg-gray-50'
                          >
                            Mark as Missed Session
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ) : (
                  <SessionTableRow
                    key={session.id}
                    session={session}
                    onViewDetails={onSelectDetails}
                    onReschedule={onSelectReschedule}
                    onCancel={onSelectCancel}
                  />
                )
              ))
            ) : (
              <tr>
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
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && totalSessions > 0 && (
        <div className='flex flex-col items-center gap-3 border-t border-gray-100 px-4 py-6'>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label='Previous page'
            >
              <ChevronLeft className='h-3.5 w-3.5' />
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                type='button'
                onClick={() => onPageChange(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors
                  ${currentPage === page
                    ? 'bg-[#0b4d8d] text-white'
                    : 'border border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            ))}

            {totalPages > 5 && (
              <span className='px-1 text-xs font-semibold text-gray-400'>...</span>
            )}

            <button
              type='button'
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className='flex h-9 w-9 items-center justify-center rounded-md border border-gray-100 bg-white text-gray-400 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label='Next page'
            >
              <ChevronRight className='h-3.5 w-3.5' />
            </button>
          </div>

          <p className='text-xs font-medium text-gray-500'>
            Showing {startResult}-{endResult} of {totalSessions} results
          </p>
        </div>
      )}
    </div>
  )
}
