import { TrainerSession } from './mock-data'
import { SessionStatusBadge } from './SessionStatusBadge'

export function AllSessionsTable({ sessions }: { sessions: TrainerSession[] }) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>All Sessions</h3>
        <button className='text-xs font-medium text-primary hover:underline'>View all</button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-100 bg-gray-50'>
              <th scope='col' className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Client</th>
              <th scope='col' className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Date</th>
              <th scope='col' className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Time</th>
              <th scope='col' className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Type</th>
              <th scope='col' className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Duration</th>
              <th scope='col' className='px-5 py-3 text-left text-xs font-medium text-gray-500'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {sessions.map((session) => (
              <tr key={session.id} className='hover:bg-gray-50/50 transition-colors'>
                <td className='px-5 py-3.5'>
                  <div className='flex items-center gap-2.5'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white'>
                      {session.clientName.charAt(0)}
                    </div>
                    <span className='text-sm font-medium text-gray-900'>{session.clientName}</span>
                  </div>
                </td>
                <td className='px-5 py-3.5 text-sm text-gray-600'>{session.date}</td>
                <td className='px-5 py-3.5 text-sm text-gray-600'>{session.time}</td>
                <td className='px-5 py-3.5 text-sm text-gray-600'>{session.type}</td>
                <td className='px-5 py-3.5 text-sm text-gray-600'>{session.duration}</td>
                <td className='px-5 py-3.5'>
                  <SessionStatusBadge status={session.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
