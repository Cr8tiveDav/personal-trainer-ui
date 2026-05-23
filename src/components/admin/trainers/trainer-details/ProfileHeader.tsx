import React from 'react';
import Image from 'next/image';
import { Trainer } from '../types';
import { cn } from '@/utils';

interface ProfileHeaderProps {
  trainer: Trainer;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ trainer }) => {
  return (
    <div className='w-full min-h-88 md:h-88 pb-6 md:pb-0 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col relative'>
      {/* Cover Image */}
      <div className='h-44 w-full bg-[url("/images/trainer/cover-placeholder.svg")] bg-cover bg-center bg-[#1a2b3c] relative flex items-end pb-4 pl-32.5 md:pl-55'>
        {/* Name and Badge */}
        <div className='flex flex-wrap items-center gap-2 md:gap-3 z-10 pr-4'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight'>
            {trainer.name}
          </h1>
          <div
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1 rounded-[6px] border',
              trainer.availability === 'Available'
                ? 'border-[#2EA83A] bg-[#ECFDF5]'
                : 'border-[#A3A3A3] bg-[#F5F5F5]'
            )}
          >
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                trainer.availability === 'Available'
                  ? 'bg-[#14561C]'
                  : 'bg-gray-400'
              )}
            />
            <span
              className={cn(
                'text-xs font-normal',
                trainer.availability === 'Available'
                  ? 'text-[#1E7829]'
                  : 'text-[#5C5C5C]'
              )}
            >
              {trainer.availability}
            </span>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className='absolute top-28.75 left-4 md:left-8 z-20'>
        <div className='h-25 w-25 md:h-42.5 md:w-42.5 rounded-full border-[3px] border-[#EBEBEB] overflow-hidden bg-gray-200 flex items-center justify-center'>
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
      <div className='pl-4 md:pl-55 pr-4 md:pr-8 pt-12 md:pt-6 flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-4'>
        <div className='flex flex-col gap-3 md:gap-3.5'>
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
            <span>{trainer.phoneNumber ?? '—'}</span>
          </div>
        </div>

        {/* <div className='mt-0 md:mt-0 shrink-0 w-full md:w-auto'>
          <button className='flex items-center justify-center gap-2 w-full md:w-34.25 h-12 px-4.5 py-3 bg-[#F5F5F5] border border-[#A3A3A3] rounded-lg text-[13px] font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer'>
            <Image
              src='/images/admin-dashboard/icons/messenger-logo.svg'
              alt='Message'
              width={16}
              height={16}
            />
            Message
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileHeader;
