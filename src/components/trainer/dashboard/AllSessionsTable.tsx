import Link from 'next/link'
import { MoreVertical } from 'lucide-react'
import type { TrainerSession } from './types'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { cn } from '@/utils'

const GOAL_STYLES: Record<TrainerSession['goalVariant'], string> = {
  green: 'bg-emerald-50 text-emerald-700',
  purple: 'bg-purple-50 text-purple-700',
  orange: 'bg-orange-50 text-orange-700',
  gray: 'bg-gray-100 text-gray-600',
}

type AllSessionsTableProps = {
  sessions: TrainerSession[]
  isLoading?: boolean
  isError?: boolean
  className?: string
}

export function AllSessionsTable({
  sessions,
  isLoading = false,
  isError = false,
  className,
}: AllSessionsTableProps) {
  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white shadow-sm',
        className,
      )}
    >
      <div className='flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>All sessions</h3>
        <Link
          href='/trainer/sessions'
          className='text-xs font-medium text-primary hover:underline'
        >
          View all →
        </Link>
      </div>

      <div className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
      {isLoading ? (
        <div className='flex flex-1 items-center justify-center px-5 py-12 text-center text-sm text-gray-400'>
          Loading sessions…
        </div>
      ) : isError ? (
        <div className='flex flex-1 items-center justify-center px-5 py-8 text-center text-sm text-red-500'>
          Could not load sessions. Please try again.
        </div>
      ) : sessions.length === 0 ? (
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.sessions}
          imageAlt='No sessions'
          title='No sessions yet'
          description='Your booked sessions with clients will appear here once scheduling begins.'
          className='flex-1 py-10'
        />
      ) : (
        <div className='divide-y divide-gray-50'>
          {sessions.map((session) => (
            <div
              key={session.id}
              className='grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto]'
            >
              <div className='flex min-w-0 items-center gap-3'>
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white'>
                  {session.clientName.charAt(0)}
                </div>
                <div className='min-w-0'>
                  <p className='truncate text-sm font-semibold text-gray-900'>
                    {session.clientName}
                  </p>
                  <p className='truncate text-xs text-gray-400'>{session.location}</p>
                </div>
              </div>

              <div className='hidden sm:block'>
                <p className='text-[10px] font-medium uppercase tracking-wide text-gray-400'>
                  Next Session
                </p>
                <p className='mt-0.5 text-xs text-gray-700'>{session.nextSession}</p>
              </div>

              <div className='hidden sm:block'>
                <p className='text-[10px] font-medium uppercase tracking-wide text-gray-400'>
                  Goal
                </p>
                <span
                  className={cn(
                    'mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                    GOAL_STYLES[session.goalVariant],
                  )}
                >
                  {session.goal}
                </span>
              </div>

              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50'
                aria-label='Session options'
              >
                <MoreVertical className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
