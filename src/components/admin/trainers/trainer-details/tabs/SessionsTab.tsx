import React from 'react';
import Image from 'next/image';
import StatCard from '../../analytics/StatCard';

const mockSessions = [
  {
    id: '1',
    clientName: 'Amara J.',
    type: '1:1 Strength',
    date: '2025-05-12 09:00',
    status: 'Completed',
  },
  {
    id: '2',
    clientName: 'Cara K.',
    type: '1:1 Strength',
    date: '2025-05-12 09:00',
    status: 'upcoming',
  },
  {
    id: '3',
    clientName: 'Helen E.',
    type: '1:1 Strength',
    date: '2025-05-12 09:00',
    status: 'Completed',
  },
  {
    id: '4',
    clientName: 'Dani K.',
    type: '1:1 Strength',
    date: '2025-05-12 09:00',
    status: 'rescheduled',
  },
  {
    id: '5',
    clientName: 'Sally V.',
    type: '1:1 Strength',
    date: '2025-05-12 09:00',
    status: 'cancelled',
  },
];

const getStatusBadgeStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-[#ECFDF5] text-[#14561C]';
    case 'upcoming':
      return 'bg-[#EDF4FD] text-[#0b4d8d]';
    case 'rescheduled':
      return 'bg-[#FEF6E1] text-[#A86908]';
    case 'cancelled':
      return 'bg-[#FEF0EF] text-[#9C1E1C]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getAvatarImage = (name: string) => {
  switch (name) {
    case 'Amara J.':
      return '/images/about-us/team1.svg';
    case 'Cara K.':
      return '/images/about-us/team2.svg';
    case 'Helen E.':
      return '/images/about-us/team3.svg';
    case 'Dani K.':
      return '/images/about-us/team4.svg';
    case 'Sally V.':
      return '/images/about-us/team1.svg';
    default:
      return '';
  }
};

const SessionsTab = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard
          title='Upcoming'
          value={2}
          icon={'/images/admin-dashboard/icons/users-three.svg'}
          variant='#E8F2FA'
        />

        <StatCard
          title='Completed'
          value={40}
          icon={'/images/admin-dashboard/icons/check-circle.svg'}
          variant='#ECFDF5'
        />

        <StatCard
          title='Rescheduled'
          value={2}
          icon={
            '/images/admin-dashboard/icons/arrow-counter-clockwise-yellow.svg'
          }
          variant='#FEF9EC'
        />

        <StatCard
          title='Cancelled'
          value={4}
          icon={'/images/admin-dashboard/icons/cancel.svg'}
          variant='#FEF0EF'
        />
      </div>

      {/* All Sessions Table */}
      <div className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
        <div className='p-6 border-b border-gray-100'>
          <h3 className='text-2xl font-medium text-muted-foreground'>
            All sessions
          </h3>
        </div>
        <div className='overflow-x-auto min-h-64'>
          <table className='w-full text-left border-collapse min-w-175'>
            <thead>
              <tr className='bg-[#F5F5F5] h-15 border-[0.5px] border-[#D1D1D1]'>
                <th className='py-4 px-6 text-xs font-normal text-gray-500 uppercase tracking-wider'>
                  Client
                </th>
                <th className='py-4 px-6 text-xs font-normal text-gray-500 uppercase tracking-wider text-center'>
                  Type
                </th>
                <th className='py-4 px-6 text-xs font-normal text-gray-500 uppercase tracking-wider text-center'>
                  Date
                </th>
                <th className='py-4 px-6 text-xs font-normal text-gray-500 uppercase tracking-wider text-right'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-[0.5px] divide-[#D1D1D1]'>
              {mockSessions.map((session) => (
                <tr
                  key={session.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='py-4 px-6'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-500 relative'>
                        {getAvatarImage(session.clientName) ? (
                          <Image
                            src={getAvatarImage(session.clientName)}
                            alt={session.clientName}
                            layout='fill'
                            objectFit='cover'
                          />
                        ) : (
                          session.clientName.charAt(0)
                        )}
                      </div>
                      <span className='text-sm font-medium text-gray-900'>
                        {session.clientName}
                      </span>
                    </div>
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-500 text-center'>
                    {session.type}
                  </td>
                  <td className='py-4 px-6 text-sm text-gray-500 text-center whitespace-nowrap'>
                    {session.date}
                  </td>
                  <td className='py-4 px-6 text-right'>
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeStyles(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionsTab;
