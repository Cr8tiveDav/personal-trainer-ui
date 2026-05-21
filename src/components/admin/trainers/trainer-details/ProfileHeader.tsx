import React from 'react';
import Image from 'next/image';
import { Trainer } from '../types';
import { cn } from '@/utils';

interface ProfileHeaderProps {
  trainer: Trainer;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ trainer }) => {
  return (
    <div className='w-full h-[352px] bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col relative'>
      {/* Cover Image */}
      <div className='h-44 w-full bg-[url("/images/trainer/cover-placeholder.svg")] bg-cover bg-center bg-[#1a2b3c] relative flex items-end pb-4 pl-[220px]'>
        {/* Name and Badge */}
        <div className='flex items-center gap-3 z-10'>
          <h1 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>
            {trainer.name}
          </h1>
          <div className='flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white shadow-sm'>
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                trainer.availability === 'Available'
                  ? 'bg-[#14561C]'
                  : 'bg-gray-400'
              )}
            />
            <span className='text-[11px] font-semibold text-[#14561C]'>
              {trainer.availability}
            </span>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className='absolute top-28.75 left-8 z-20'>
        <div className='h-[170px] w-[170px] rounded-full border-[6px] border-white overflow-hidden bg-gray-200 flex items-center justify-center shadow-sm'>
          {trainer.avatarUrl ? (
            <Image
              src={trainer.avatarUrl}
              alt={trainer.name}
              width={170}
              height={170}
              className='h-full w-full object-cover'
            />
          ) : (
            <span className='text-5xl font-bold text-gray-500'>
              {trainer.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className='pl-[220px] pr-8 pt-6 flex flex-col md:flex-row md:items-start justify-between gap-4'>
        <div className='flex flex-col gap-3.5'>
          <div className='flex items-center text-[13px] text-gray-500 gap-3'>
            <Image
              src='/images/admin-dashboard/icons/envelope.svg'
              alt='Email'
              width={16}
              height={16}
            />
            <span>
              {trainer.email !== 'N/A' ? trainer.email : 'amaraj@fitcallme.com'}
            </span>
          </div>
          <div className='flex items-center text-[13px] text-gray-500 gap-3'>
            <Image
              src='/images/admin-dashboard/icons/phone-call.svg'
              alt='Phone'
              width={16}
              height={16}
            />
            <span>{'+234 813 492 4042'}</span>
          </div>

          <div className='flex items-center mt-1 gap-2.5'>
            <Image
              src='/images/admin-dashboard/icons/star.svg'
              alt='Star'
              width={16}
              height={16}
            />
            <span className='text-[13px] font-medium text-gray-500'>
              4.7 ratings
            </span>
          </div>
        </div>

        <div className='mt-2 md:mt-0 flex-shrink-0'>
          <button className='flex items-center justify-center gap-2 w-34.25 h-12 px-4.5 py-3 bg-[#F5F5F5] border border-[#A3A3A3] rounded-lg text-[13px] font-semibold text-gray-900 hover:bg-gray-50 transition-colors'>
            <Image
              src='/images/admin-dashboard/icons/messenger-logo.svg'
              alt='Message'
              width={16}
              height={16}
            />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
