'use client'

import Link from 'next/link'
import { useRecentActivity } from '@/api/dashboard'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { ActivityRow } from './ActivityRow'

export function RecentActivity() {
  const { data: response } = useRecentActivity()
  const list = response?.data ?? []

  return (
    <div className='flex-1 rounded-xl border border-gray-100 bg-white p-5 shadow-sm h-full'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-base font-semibold text-gray-900'>Recent activity</h2>
        <Link
          href='/admin/sessions'
          className='text-sm font-medium text-primary hover:underline'
        >
          View all
        </Link>
      </div>

      {list.length === 0 ? (
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.recentActivity}
          imageAlt='No recent activity'
          title='No recent activity yet'
          description='Session bookings and updates will show up here once clients start training.'
        />
      ) : (
        <div className='divide-y divide-gray-50'>
          {list.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  )
}
