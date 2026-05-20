'use client'

import { Session } from './session'
import { SessionTableRow } from './SessionTableRow'

interface TableProps {
  sessions: Session[]
  onSelectDetails: (id: string) => void
  onSelectReschedule: (id: string) => void
  onSelectCancel: (id: string) => void
}

export function SessionsTable({ sessions, onSelectDetails, onSelectReschedule, onSelectCancel }: TableProps) {
  return (
    <div className='w-full overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm'>
      <table className='w-full border-collapse text-left'>
        <thead>
          <tr className='border-b border-gray-100 bg-gray-50/70 text-[10px] font-bold uppercase tracking-wider text-gray-500'>
            <th className='py-3.5 px-4 font-bold'>ID</th>
            <th className='py-3.5 px-4 font-bold'>Client</th>
            <th className='py-3.5 px-4 font-bold'>Trainer</th>
            <th className='py-3.5 px-4 font-bold'>Type</th>
            <th className='py-3.5 px-4 font-bold'>Scheduled</th>
            <th className='py-3.5 px-4 font-bold'>Duration</th>
            <th className='py-3.5 px-4 font-bold'>Amount</th>
            <th className='py-3.5 px-4 font-bold'>Client Conf.</th>
            <th className='py-3.5 px-4 font-bold'>Trainer Conf.</th>
            <th className='py-3.5 px-4 font-bold'>State</th>
            <th className='py-3.5 px-4 font-bold text-right'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {sessions.map((session) => (
            <SessionTableRow
              key={session.id}
              session={session}
              onViewDetails={onSelectDetails}
              onReschedule={onSelectReschedule}
              onCancel={onSelectCancel}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}