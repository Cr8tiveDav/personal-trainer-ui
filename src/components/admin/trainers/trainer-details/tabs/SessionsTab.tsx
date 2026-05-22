import React, { useMemo } from 'react';
import Image from 'next/image';
import StatCard from '../../analytics/StatCard';
import { useTrainerSessions } from '@/api/sessions';
import { BackendSession } from '@/api/types/sessions';

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

interface SessionsTabProps {
  trainerId: string;
}

const SessionsTab: React.FC<SessionsTabProps> = ({ trainerId }) => {
  const {
    data: apiSessions,
    isLoading,
    isError,
  } = useTrainerSessions(trainerId);

  // Use empty array if API returns error or no data
  const sessions = isError || !apiSessions ? [] : apiSessions;

  const stats = useMemo(() => {
    const defaultStats = {
      upcoming: 0,
      completed: 0,
      rescheduled: 0,
      cancelled: 0,
    };
    if (!sessions || !Array.isArray(sessions)) return defaultStats;

    return sessions.reduce((acc, session: BackendSession) => {
      const status = session.status?.toLowerCase() || '';
      if (status === 'upcoming') acc.upcoming++;
      if (status === 'completed') acc.completed++;
      if (status === 'rescheduled') acc.rescheduled++;
      if (status === 'cancelled') acc.cancelled++;
      return acc;
    }, defaultStats);
  }, [sessions]);

  if (isLoading) {
    return (
      <div className='w-full h-48 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  const sessionsList = Array.isArray(sessions) ? sessions : [];

  return (
    <div className='flex flex-col gap-8'>
      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard
          title='Upcoming'
          value={stats.upcoming}
          icon={'/images/admin-dashboard/icons/users-three.svg'}
          variant='#E8F2FA'
        />

        <StatCard
          title='Completed'
          value={stats.completed}
          icon={'/images/admin-dashboard/icons/check-circle.svg'}
          variant='#ECFDF5'
        />

        <StatCard
          title='Rescheduled'
          value={stats.rescheduled}
          icon={
            '/images/admin-dashboard/icons/arrow-counter-clockwise-yellow.svg'
          }
          variant='#FEF9EC'
        />

        <StatCard
          title='Cancelled'
          value={stats.cancelled}
          icon={'/images/admin-dashboard/icons/cancel.svg'}
          variant='#FEF0EF'
        />
      </div>

      {/* All Sessions Table */}
      <div className='bg-white rounded-xl border border-[#EBEBEB] overflow-hidden'>
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
              {sessionsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className='py-8 text-center text-gray-500'>
                    No sessions found.
                  </td>
                </tr>
              ) : (
                sessionsList.map((session: BackendSession) => {
                  const clientName =
                    session.clientName ||
                    session.client_name ||
                    'Unknown Client';
                  return (
                    <tr
                      key={session.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='py-4 px-6'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-500 relative shrink-0'>
                            {getAvatarImage(clientName) ? (
                              <Image
                                src={getAvatarImage(clientName)}
                                alt={clientName}
                                layout='fill'
                                objectFit='cover'
                              />
                            ) : (
                              clientName.charAt(0).toUpperCase()
                            )}
                          </div>
                          <span className='text-sm font-medium text-gray-900'>
                            {clientName}
                          </span>
                        </div>
                      </td>
                      <td className='py-4 px-6 text-sm text-gray-500 text-center'>
                        {session.type || 'N/A'}
                      </td>
                      <td className='py-4 px-6 text-sm text-gray-500 text-center whitespace-nowrap'>
                        {session.date || 'N/A'}
                      </td>
                      <td className='py-4 px-6 text-right'>
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeStyles(
                            session.status || 'unknown'
                          )}`}
                        >
                          {session.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionsTab;
