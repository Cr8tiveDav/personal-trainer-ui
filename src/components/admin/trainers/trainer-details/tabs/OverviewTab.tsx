import React from 'react';
import Image from 'next/image';
import { Trainer } from '../../types';
import StatCard from '../../analytics/StatCard';

interface OverviewTabProps {
  trainer: Trainer;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ trainer }) => {
  return (
    <div className='flex flex-col gap-8'>
      {/* About Section */}
      <div className='bg-white rounded-xl border border-[#EBEBEB] py-8 px-12'>
        <h3 className='text-2xl font-medium text-muted-foreground mb-2'>
          About
        </h3>
        <p className='text-sm text-muted leading-relaxed max-w-4xl'>
          {trainer.bio}
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard
          title='Sessions'
          value={0}
          icon={'/images/admin-dashboard/icons/barbell.svg'}
        />

        <StatCard
          title='Earnings'
          value='$0'
          icon={'/images/admin-dashboard/icons/currency-dollar.svg'}
        />

        <StatCard
          title='Ratings'
          value='0'
          icon={'/images/admin-dashboard/icons/star-gray.svg'}
        />

        <StatCard
          title='Active clients'
          value={0}
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
            <tr>
              <td colSpan={2} className='py-8 text-center text-gray-500'>
                No recent activity found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewTab;
