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
      className={`flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 ${className}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full mb-4 ${!variant ? 'bg-gray-50' : ''}`}
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
      <div>
        <h3 className='text-2xl font-bold text-gray-900'>{value}</h3>
        <p className='text-xs font-medium text-gray-500'>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
