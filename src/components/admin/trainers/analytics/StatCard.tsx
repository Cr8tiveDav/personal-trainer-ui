import Image from 'next/image';
import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  variant: string;
}

const StatCard = ({ title, value, icon, variant }: StatCardProps) => {
  return (
    <div className='flex flex-col gap-2 rounded-[8px] border border-[#EBEBEB] bg-white p-4'>
      <div
        className='flex h-10 w-10 items-center justify-center rounded-full'
        style={{ backgroundColor: variant }}
      >
        <Image
          src={icon}
          alt={title}
          width={20}
          sizes='20px'
          height={20}
          className='h-5 w-5'
        />
      </div>
      <h3 className='text-2xl font-semibold text-muted-foreground'>{value}</h3>
      <p className='text-xs leading-relaxed text-muted md:text-base'>{title}</p>
    </div>
  );
};

export default StatCard;
