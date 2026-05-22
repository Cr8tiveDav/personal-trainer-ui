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
      <div className='bg-white rounded-xl border border-[#EBEBEB] py-8 px-12'>
        <h3 className='text-2xl font-medium text-muted-foreground mb-2'>
          About
        </h3>
        <p className='text-sm text-muted leading-relaxed max-w-4xl'>
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
          icon={'/images/admin-dashboard/icons/users-three-gray.svg'}
        />
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-2xl border border-[#EBEBEB] overflow-hidden'>
        <div className='p-6 pb-5'>
          <h3 className='text-2xl font-medium text-muted-foreground'>
            Recent activity
          </h3>
        </div>
        <table className='w-full text-left'>
          <tbody className='divide-y divide-[#EBEBEB] border-t border-[#EBEBEB]'>
            {/* Item 1 */}
            <tr className='hover:bg-gray-50 transition-colors'>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                    <Image
                      src='/images/admin-dashboard/icons/check-circle.svg'
                      alt='Check'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className='text-[15px] text-[#333333] font-medium'>
                    Completed HIIT session with Mia Tanaka
                  </span>
                </div>
              </td>
              <td className='px-6 py-4 text-right'>
                <span className='text-[13px] text-[#737373]'>2h ago</span>
              </td>
            </tr>

            {/* Item 2 */}
            <tr className='hover:bg-gray-50 transition-colors'>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                    <Image
                      src='/images/admin-dashboard/icons/calendar.svg'
                      alt='Calendar'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className='text-[15px] text-[#333333] font-medium'>
                    New session booked by Olivia Stone
                  </span>
                </div>
              </td>
              <td className='px-6 py-4 text-right'>
                <span className='text-[13px] text-[#737373]'>Yesterday</span>
              </td>
            </tr>

            {/* Item 3 */}
            <tr className='hover:bg-gray-50 transition-colors'>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                    <Image
                      src='/images/admin-dashboard/icons/star.svg'
                      alt='Star'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className='text-[15px] text-[#333333] font-medium'>
                    Received a 5★ review from Jordan Reed
                  </span>
                </div>
              </td>
              <td className='px-6 py-4 text-right'>
                <span className='text-[13px] text-[#737373]'>2d ago</span>
              </td>
            </tr>

            {/* Item 4 */}
            <tr className='hover:bg-gray-50 transition-colors'>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center'>
                    <Image
                      src='/images/admin-dashboard/icons/arrow-counter-clockwise.svg'
                      alt='Refresh'
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className='text-[15px] text-[#333333] font-medium'>
                    Rescheduled session with Layla Ibrahim
                  </span>
                </div>
              </td>
              <td className='px-6 py-4 text-right'>
                <span className='text-[13px] text-[#737373]'>3d ago</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewTab;
