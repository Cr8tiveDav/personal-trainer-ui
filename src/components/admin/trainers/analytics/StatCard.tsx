import Image from 'next/image';
import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string | React.ReactNode;
  variant?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  variant,
  className = '',
}: StatCardProps) => {
  return (
    <div
      className={`flex flex-col justify-between gap-2 rounded-[12px] border border-[#EBEBEB] bg-white p-5 ${className}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-[9999px] ${!variant ? 'bg-gray-50' : ''}`}
        style={variant ? { backgroundColor: variant } : undefined}
      >
        {typeof icon === 'string' ? (
          <Image
            src={icon}
            alt={title}
            width={20}
            height={20}
            className='h-5 w-5 object-contain'
          />
        ) : (
          icon
        )}
      </div>

      <h3 className='text-3xl font-bold text-gray-900'>{value}</h3>
      <p className='text-xs font-medium text-gray-500'>{title}</p>
    </div>
  );
};

export default StatCard;
