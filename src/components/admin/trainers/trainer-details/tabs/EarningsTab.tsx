import React, { useMemo } from 'react';
import StatCard from '../../analytics/StatCard';
import { useTrainerSessions } from '@/api/sessions';
import { useTrainerEarnings } from '@/api/finance';
import { getTrainerSessionStats } from '@/lib/sessions/trainer-session-stats';
import { Payout } from '@/api/types/finance';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsTabProps {
  trainerId: string;
}

const emptyEarningsData = {
  chartData: [],
  summary: {
    thisWeek: { amount: '$0', sessions: 0 },
    thisMonth: { amount: '$0', sessions: 0 },
    pendingPayout: { amount: '$0', schedule: 'N/A' },
  },
  recentPayouts: [],
};

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-3 border border-gray-100 shadow-sm rounded-lg'>
        <p className='text-sm font-medium text-gray-900'>{label}</p>
        <p className='text-sm text-primary font-semibold'>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const EarningsTab: React.FC<EarningsTabProps> = ({ trainerId }) => {
  const {
    data: apiSessions,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
  } = useTrainerSessions(trainerId);
  const {
    data: apiEarningsData,
    isLoading: isLoadingEarnings,
    isError: isErrorEarnings,
  } = useTrainerEarnings(trainerId);

  const sessions = isErrorSessions || !apiSessions ? [] : apiSessions;
  const earnings =
    isErrorEarnings || !apiEarningsData ? emptyEarningsData : apiEarningsData;

  const stats = useMemo(() => getTrainerSessionStats(sessions), [sessions]);

  const isLoading = isLoadingSessions || isLoadingEarnings;

  if (isLoading) {
    return (
      <div className='w-full h-48 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Top Session Stats Grid (Reused from SessionsTab) */}
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

      {/* Middle Grid: Earnings Chart & Summary Metrics */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {/* Earnings Chart */}
        <div className='lg:col-span-2 bg-white rounded-xl border border-[#EBEBEB] p-6 flex flex-col'>
          <div className='flex justify-between items-start mb-8'>
            <div>
              <h3 className='text-xs text-gray-500 mb-1'>Earnings over time</h3>
              <div className='text-2xl font-semibold text-gray-900'>
                {earnings.chartData.length > 0 ? '$11,820' : '$0'}
              </div>
              <div className='text-xs text-[#14561C] flex items-center gap-1 mt-1'>
                <span>{earnings.chartData.length > 0 ? '+12.4%' : '+0%'} vs last period</span>
              </div>
            </div>
            <select className='text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-600 outline-none cursor-pointer'>
              <option>Last 12 month</option>
              <option>Last 6 month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className='h-[200px] w-full mt-auto'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={earnings.chartData}>
                <XAxis
                  dataKey='name'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  dy={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type='monotone'
                  dataKey='earnings'
                  stroke='#4582C4'
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, fill: '#4582C4', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className='flex flex-col gap-4'>
          <div className='bg-white rounded-xl border border-[#EBEBEB] p-6 flex-1 flex flex-col justify-center'>
            <h4 className='text-xs text-gray-500 mb-2'>This week</h4>
            <div className='text-lg font-semibold text-gray-900 mb-1'>
              {earnings.summary.thisWeek.amount}
            </div>
            <div className='text-xs text-gray-400'>
              {earnings.summary.thisWeek.sessions} sessions
            </div>
          </div>

          <div className='bg-white rounded-xl border border-[#EBEBEB] p-6 flex-1 flex flex-col justify-center'>
            <h4 className='text-xs text-gray-500 mb-2'>This Month</h4>
            <div className='text-lg font-semibold text-gray-900 mb-1'>
              {earnings.summary.thisMonth.amount}
            </div>
            <div className='text-xs text-gray-400'>
              {earnings.summary.thisMonth.sessions} sessions
            </div>
          </div>

          <div className='bg-white rounded-xl border border-[#EBEBEB] p-6 flex-1 flex flex-col justify-center'>
            <h4 className='text-xs text-gray-500 mb-2'>Pending payout</h4>
            <div className='text-lg font-semibold text-gray-900 mb-1'>
              {earnings.summary.pendingPayout.amount}
            </div>
            <div className='text-xs text-gray-400'>
              {earnings.summary.pendingPayout.schedule}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payouts Table */}
      <div className='bg-white rounded-xl border border-[#EBEBEB] overflow-hidden'>
        <div className='p-6 border-b border-gray-100'>
          <h3 className='text-2xl font-medium text-muted-foreground'>
            Recent payouts
          </h3>
        </div>
        <div className='overflow-x-auto min-h-64'>
          <table className='w-full text-left border-collapse min-w-[800px]'>
            <thead>
              <tr className='bg-[#F5F5F5] h-15 border-[0.5px] border-[#D1D1D1]'>
                <th className='py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                  DATE
                </th>
                <th className='py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center'>
                  SESSIONS
                </th>
                <th className='py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center'>
                  TYPE
                </th>
                <th className='py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right'>
                  AMOUNT
                </th>
                <th className='py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right'>
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-[0.5px] divide-[#EBEBEB]'>
              {earnings.recentPayouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className='py-8 text-center text-gray-500'>
                    No recent payouts found.
                  </td>
                </tr>
              ) : (
                earnings.recentPayouts.map((payout: Payout) => (
                  <tr
                    key={payout.id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='py-4 px-6 text-sm text-gray-500'>
                      {payout.date}
                    </td>
                    <td className='py-4 px-6 text-sm text-gray-500 text-center'>
                      {payout.sessions}
                    </td>
                    <td className='py-4 px-6 text-sm text-gray-500 text-center'>
                      {payout.type}
                    </td>
                    <td className='py-4 px-6 text-sm text-gray-900 font-medium text-right'>
                      {payout.amount}
                    </td>
                    <td className='py-4 px-6 text-right'>
                      <span className='inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium capitalize bg-[#ECFDF5] text-[#14561C]'>
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsTab;
