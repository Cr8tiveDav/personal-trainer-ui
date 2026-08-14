import React from 'react';
import { Trainer } from '../types';
import StatusBadge from '../trainers-list/table/StatusBadge';

interface QuickDetailsProps {
  trainer: Trainer;
}

const QuickDetails: React.FC<QuickDetailsProps> = ({ trainer }) => {
  return (
    <div className='w-full lg:h-88 bg-white rounded-[16px] border border-[#EBEBEB] py-6 px-4 flex flex-col'>
      <h2 className='text-[22px] font-bold text-gray-900 mb-4 shrink-0'>Details</h2>
      <hr className='border-[#EBEBEB] mb-8 shrink-0' />

      <div className='flex flex-col gap-6.5 flex-1 overflow-y-auto pr-1'>
        <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Specialty</span>
          <span className='text-[15px] capitalize font-medium text-gray-900 text-right break-words'>
            {trainer.specialty}
          </span>
        </div>

        <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Experience</span>
          <span className='text-[15px] font-medium text-gray-900 text-right'>
            {trainer.yearsOfExperience ?? 0}{' '}
            {trainer.yearsOfExperience === 1 ? 'year' : 'years'}
          </span>
        </div>

        <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Gender</span>
          <span className='text-[15px] capitalize font-medium text-gray-900 text-right'>
            {trainer.gender ?? '—'}
          </span>
        </div>

{trainer.appleId && (

  <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Apple ID</span>
          <span className='text-[15px] font-medium text-gray-900 text-right'>
            {trainer.appleId}
          </span>
        </div>
        )}

        {trainer.messengerHandle && (

          <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Messanger</span>
          <span className='text-[15px] font-medium text-gray-900 text-right'>
            {trainer.messengerHandle}
          </span>
        </div>
        )}

        {trainer.whatsappNumber && (
          <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Whatsapp</span>
          <span className='text-[15px] font-medium text-gray-900 text-right'>
            {trainer.whatsappNumber}
          </span>
        </div>
        )}

        <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Joined</span>
          <span className='text-[15px] font-medium text-gray-900 text-right'>
            {trainer.dateAdded}
          </span>
        </div>

        <div className='flex items-start justify-between gap-4'>
          <span className='text-[15px] text-gray-500 shrink-0'>Status</span>
          <div className='shrink-0'>
            <StatusBadge type='status' value={trainer.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickDetails;
