import React from 'react';
import { Trainer } from '../types';
import StatusBadge from '../trainers-list/table/StatusBadge';

interface QuickDetailsProps {
  trainer: Trainer;
}

const QuickDetails: React.FC<QuickDetailsProps> = ({ trainer }) => {
  return (
    <div className='w-full h-full bg-white rounded-xl border border-gray-100 p-6 flex flex-col'>
      <h2 className='text-lg font-semibold text-gray-900 mb-6'>Details</h2>

      <div className='flex flex-col gap-5 flex-1'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Specialty</span>
          <span className='text-sm capitalize font-medium text-gray-900'>
            {trainer.specialty}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Experience</span>
          <span className='text-sm font-medium text-gray-900'>
            {trainer.years_of_experience != null
              ? `${trainer.years_of_experience} yr${trainer.years_of_experience !== 1 ? 's' : ''}`
              : 'N/A'}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Joined</span>
          <span className='text-sm font-medium text-gray-900'>
            {trainer.dateAdded}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Status</span>
          <StatusBadge type="status" value={trainer.status} />
        </div>
      </div>
    </div>
  );
};

export default QuickDetails;
