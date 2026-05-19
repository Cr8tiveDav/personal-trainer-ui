'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Activity, ActivityRow } from './ActivityRow'


async function fetchRecentActivity(): Promise<Activity[]> {
  const res = await fetch('/api/v1/sessions/recent')
  if (!res.ok) throw new Error('Failed to fetch activity')
  const data = await res.json()
  return data.data
}

export function RecentActivity() {
  const { data: activities } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: fetchRecentActivity,
  })

  const list = activities ?? []

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
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <p className='text-sm text-gray-400'>No recent activity yet</p>
        </div>
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