import React from 'react';
import Image from 'next/image';
import { Trainer } from '../../types';
import StatCard from '../../analytics/StatCard';

interface OverviewTabProps {
  trainer: Trainer;
}

const OverviewTab: React.FC<OverviewTabProps> = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* About Section */}
      <div className='bg-white rounded-xl border border-gray-100 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>About</h3>
        <p className='text-sm text-gray-600 leading-relaxed max-w-4xl'>
          I help you stay consistent with your workouts, even on the days you
          don&apos;t feel like showing up. Whether your goal is weight loss,
          muscle gain, or just getting back into shape, I&apos;ll guide you
          through structured sessions and keep you accountable every step of the
          way.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard
          title='Sessions'
          value={142}
          icon={'/images/admin-dashboard/icons/barbell.svg'}
        />

        <StatCard
          title='Earnings'
          value='$11,820'
          icon={'/images/admin-dashboard/icons/currency-dollar.svg'}
        />

        <StatCard
          title='Ratings'
          value='4.7'
          icon={'/images/admin-dashboard/icons/star-gray.svg'}
        />

        <StatCard
          title='Active clients'
          value={14}
          icon={'/images/admin-dashboard/icons/users-three.svg'}
        />
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-xl border border-gray-100 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Recent activity
        </h3>
        <div className='flex flex-col gap-4'>
          {/* Item 1 */}
          <div className='flex items-center justify-between border-b border-gray-50 pb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                <Image
                  src='/images/admin-dashboard/icons/check-circle.svg'
                  alt='Check'
                  width={20}
                  height={20}
                />
              </div>
              <span className='text-sm text-gray-800 font-medium'>
                Completed HIIT session with Mia Tanska
              </span>
            </div>
            <span className='text-xs text-gray-400'>2h ago</span>
          </div>

          {/* Item 2 */}
          <div className='flex items-center justify-between border-b border-gray-50 pb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                <Image
                  src='/images/admin-dashboard/icons/calendar.svg'
                  alt='Calendar'
                  width={20}
                  height={20}
                />
              </div>
              <span className='text-sm text-gray-800 font-medium'>
                New session booked by Olivia Stone
              </span>
            </div>
            <span className='text-xs text-gray-400'>Yesterday</span>
          </div>

          {/* Item 3 */}
          <div className='flex items-center justify-between border-b border-gray-50 pb-4'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full  flex items-center justify-center'>
                <Image
                  src='/images/admin-dashboard/icons/star.svg'
                  alt='Star'
                  width={20}
                  height={20}
                />
              </div>
              <span className='text-sm text-gray-800 font-medium'>
                Received a 5★ review from Jordan Reed
              </span>
            </div>
            <span className='text-xs text-gray-400'>2d ago</span>
          </div>

          {/* Item 4 */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                <Image
                  src='/images/admin-dashboard/icons/arrow-counter-clockwise.svg'
                  alt='Refresh'
                  width={20}
                  height={20}
                />
              </div>
              <span className='text-sm text-gray-800 font-medium'>
                Rescheduled session with Layla Ibrahim
              </span>
            </div>
            <span className='text-xs text-gray-400'>3d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
