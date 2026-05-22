'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import StatCard from '../../analytics/StatCard'
import { useTrainerSessions } from '@/api/sessions'
import type { Session } from '@/components/adminSessions/session'
import { sessionRowVariants } from '@/components/adminSessions/SessionTableRow'
import { getTrainerSessionStats } from '@/lib/sessions/trainer-session-stats'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { TrainerSessionsTabSkeleton } from './TrainerSessionsTabSkeleton'

const getStateBadgeStyles = (state: Session['state']) => {
  switch (state) {
    case 'Completed':
    case 'Settled':
      return 'bg-[#ECFDF5] text-[#14561C]'
    case 'Scheduled':
    case 'Unconfirmed':
      return 'bg-[#EDF4FD] text-[#0b4d8d]'
    case 'Disputed':
      return 'bg-[#FEF6E1] text-[#A86908]'
    case 'Missed':
      return 'bg-[#FEF0EF] text-[#9C1E1C]'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

interface SessionsTabProps {
  trainerId: string
}

const SessionsTab = ({ trainerId }: SessionsTabProps) => {
  const { data: sessions = [], isLoading, isError } = useTrainerSessions(trainerId)

  const stats = useMemo(() => getTrainerSessionStats(sessions), [sessions])

  if (isLoading) {
    return <TrainerSessionsTabSkeleton />
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <StatCard
          title='Upcoming'
          value={stats.upcoming}
          icon='/images/admin-dashboard/icons/users-three.svg'
          variant='#E8F2FA'
        />
        <StatCard
          title='Completed'
          value={stats.completed}
          icon='/images/admin-dashboard/icons/check-circle.svg'
          variant='#ECFDF5'
        />
        <StatCard
          title='Rescheduled'
          value={stats.rescheduled}
          icon='/images/admin-dashboard/icons/arrow-counter-clockwise-yellow.svg'
          variant='#FEF9EC'
        />
        <StatCard
          title='Cancelled'
          value={stats.cancelled}
          icon='/images/admin-dashboard/icons/cancel.svg'
          variant='#FEF0EF'
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className='overflow-hidden rounded-xl border border-[#EBEBEB] bg-white'
      >
        <div className='border-b border-gray-100 p-6'>
          <h3 className='text-2xl font-medium text-muted-foreground'>All sessions</h3>
        </div>
        <div className='min-h-64 overflow-x-auto'>
          <table className='w-full min-w-[700px] border-collapse text-left'>
            <thead>
              <tr className='h-15 border-[0.5px] border-[#D1D1D1] bg-[#F5F5F5]'>
                <th className='px-6 py-4 text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Client
                </th>
                <th className='px-6 py-4 text-center text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Type
                </th>
                <th className='px-6 py-4 text-center text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Scheduled
                </th>
                <th className='px-6 py-4 text-center text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Duration
                </th>
                <th className='px-6 py-4 text-right text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-[0.5px] divide-[#D1D1D1]'>
              <AnimatePresence initial mode='sync'>
                {isError ? (
                  <motion.tr
                    key='error'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={5} className='px-6 py-8 text-center text-sm text-red-500'>
                      Failed to load sessions. Please try again.
                    </td>
                  </motion.tr>
                ) : sessions.length === 0 ? (
                  <motion.tr
                    key='empty'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={5} className='p-0'>
                      <EmptyState
                        imageSrc={EMPTY_STATE_IMAGE_PATHS.trainer}
                        imageAlt='No sessions'
                        title='No sessions found for this trainer'
                        description='Sessions will appear here once this trainer starts booking with clients.'
                        className='min-h-[280px] py-12'
                      />
                    </td>
                  </motion.tr>
                ) : (
                  sessions.map((session, index) => (
                    <motion.tr
                      key={session.id}
                      variants={sessionRowVariants}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      custom={index}
                      className='transition-colors hover:bg-gray-50'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          {session.client.avatar ? (
                            <Image
                              src={session.client.avatar}
                              alt={session.client.name}
                              width={32}
                              height={32}
                              className='h-8 w-8 shrink-0 rounded-full object-cover bg-gray-100'
                            />
                          ) : (
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b4d8d]/10 text-xs font-bold uppercase text-[#0b4d8d]'>
                              {session.client.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span className='text-sm font-medium text-gray-900'>
                              {session.client.name}
                            </span>
                            <p className='text-xs text-gray-400'>
                              {session.client.email ?? session.client.country}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-center text-sm text-gray-500'>
                        {session.type}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500'>
                        {session.scheduled}
                      </td>
                      <td className='px-6 py-4 text-center text-sm text-gray-500'>
                        {session.duration}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <span
                          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium capitalize ${getStateBadgeStyles(session.state)}`}
                        >
                          {session.state}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default SessionsTab
