import { UpcomingSession } from './mock-data'
import { CalendarDays, Clock } from 'lucide-react'

export function UpcomingSessions({ sessions }: { sessions: UpcomingSession[] }) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>Upcoming Sessions</h3>
        <button className='text-xs font-medium text-primary hover:underline'>View all</button>
      </div>
      <div className='divide-y divide-gray-50'>
        {sessions.map((session) => (
          <div key={session.id} className='flex items-center gap-3 px-5 py-3.5'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white'>
              {session.clientName.charAt(0)}
            </div>
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium text-gray-900 truncate'>{session.clientName}</p>
              <p className='text-xs text-gray-400 truncate'>{session.type}</p>
            </div>
            <div className='shrink-0 text-right'>
              <div className='flex items-center gap-1 text-xs text-gray-500'>
                <CalendarDays className='h-3 w-3' />
                {session.date}
              </div>
              <div className='flex items-center justify-end gap-1 text-xs text-gray-400 mt-0.5'>
                <Clock className='h-3 w-3' />
                {session.time}
              </div>
            </div>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className='px-5 py-8 text-center text-sm text-gray-400'>No upcoming sessions</div>
        )}
      </div>
    </div>
  )
}
