import React from 'react';
import { Trainer } from '../types';
import StatusBadge from '../trainers-list/table/StatusBadge';

interface QuickDetailsProps {
  trainer: Trainer;
}

const QuickDetails: React.FC<QuickDetailsProps> = ({ trainer }) => {
  return (
    <div className='w-full h-full bg-white rounded-2xl border border-[#EBEBEB] py-6 px-4 flex flex-col'>
      <h2 className='text-[22px] font-bold text-gray-900 mb-4'>Details</h2>
      <hr className='border-[#EBEBEB] mb-8' />

      <div className='flex flex-col gap-6.5 flex-1'>
        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-gray-500'>Specialty</span>
          <span className='text-[15px] capitalize font-medium text-gray-900'>
            {trainer.specialty}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-gray-500'>Experience</span>
          <span className='text-[15px] font-medium text-gray-900'>
            {trainer.yearsOfExperience}{' '}
            {trainer.yearsOfExperience === 1 ? 'year' : 'years'}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-gray-500'>Gender</span>
          <span className='text-[15px] capitalize font-medium text-gray-900'>
            {trainer.gender ?? '—'}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-gray-500'>Joined</span>
          <span className='text-[15px] font-medium text-gray-900'>
            {trainer.dateAdded}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-[15px] text-gray-500'>Status</span>
          <StatusBadge type='status' value={trainer.status} />
        </div>
      </div>
    </div>
  );
};

export default QuickDetails;
