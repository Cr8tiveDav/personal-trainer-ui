'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useClientSessions } from '@/api/sessions'
import type { Session } from '@/components/adminSessions/session'
import { sessionRowVariants } from '@/components/adminSessions/SessionTableRow'
import { getTrainerSessionStats } from '@/lib/sessions/trainer-session-stats'
import { TrainerSessionsTabSkeleton } from '@/components/admin/trainers/trainer-details/tabs/TrainerSessionsTabSkeleton'
import StatCard from '@/components/admin/trainers/analytics/StatCard'
import { isValidImageSrc } from '@/lib/utils'

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

interface ClientSessionsTabProps {
  clientId: string
}

export function ClientSessionsTab({ clientId }: ClientSessionsTabProps) {
  const { data: sessions = [], isLoading, isError } = useClientSessions(clientId)

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
        className='overflow-hidden rounded-[12px] border border-[#EBEBEB] bg-white'
      >
        <div className='border-b border-gray-100 p-6'>
          <h3 className='text-2xl font-medium text-muted-foreground'>
            Sessions with trainers
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            All booked sessions for this client and their assigned trainers.
          </p>
        </div>
        <div className='min-h-64 overflow-x-auto'>
          <table className='w-full min-w-[760px] border-collapse text-left'>
            <thead>
              <tr className='h-15 border-[0.5px] border-[#D1D1D1] bg-[#F5F5F5]'>
                <th className='px-6 py-4 text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Trainer
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
                <th className='px-6 py-4 text-center text-xs font-normal uppercase tracking-wider text-gray-500'>
                  Client conf.
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
                    <td colSpan={6} className='px-6 py-8 text-center text-sm text-red-500'>
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
                    <td colSpan={6} className='px-6 py-8 text-center text-sm text-gray-500'>
                      No sessions found for this client.
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
                          {session.trainer.avatar && isValidImageSrc(session.trainer.avatar) ? (
                            <Image
                              src={session.trainer.avatar}
                              alt={session.trainer.name}
                              width={32}
                              height={32}
                              className='h-8 w-8 shrink-0 rounded-[9999px] object-cover bg-gray-100'
                            />
                          ) : (
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-[9999px] bg-purple-50 text-xs font-bold uppercase text-purple-600'>
                              {session.trainer.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span className='text-sm font-medium text-gray-900'>
                              {session.trainer.name}
                            </span>
                            <p className='text-xs text-gray-400'>{session.trainer.country}</p>
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
                      <td className='px-6 py-4 text-center text-sm text-gray-500'>
                        {session.clientConf}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <span
                          className={`inline-flex items-center justify-center rounded-[9999px] px-3 py-1 text-xs font-medium capitalize ${getStateBadgeStyles(session.state)}`}
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
