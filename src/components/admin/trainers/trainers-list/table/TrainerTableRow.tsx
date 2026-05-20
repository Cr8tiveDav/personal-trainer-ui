import React from 'react';
import Image from 'next/image';
import StatusBadge from './StatusBadge';
import { Trainer } from '../../types';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/utils';

import { useRouter } from 'next/navigation';

interface TrainerTableRowProps {
  trainer: Trainer;
}

const TrainerTableRow: React.FC<TrainerTableRowProps> = ({ trainer }) => {
  const router = useRouter();

  // Determine availability dot color
  let availabilityColor = 'bg-[#D9D9D9]';
  if (trainer.availability === 'Available') availabilityColor = 'bg-[#14561C]';
  if (trainer.availability === 'Busy') availabilityColor = 'bg-[#A86908]';

  return (
    <tr 
      onClick={() => router.push(`/admin/trainers/${trainer.id}`)}
      className='border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer'
    >
      <td className='py-4 px-6'>
        <div className='flex items-center gap-3'>
          {trainer.avatarUrl ? (
            <Image
              src={trainer.avatarUrl}
              alt={trainer.name}
              width={40}
              height={40}
              className='rounded-full h-10 w-10 object-cover'
            />
          ) : (
            <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium'>
              {trainer.name.charAt(0)}
            </div>
          )}
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-gray-900'>
              {trainer.name}
            </span>
            <span className='text-xs text-gray-500'>{trainer.email}</span>
          </div>
        </div>
      </td>
      <td className='py-4 px-6'>
        <StatusBadge type='specialty' value={trainer.specialty} />
      </td>
      <td className='py-4 px-6'>
        <StatusBadge type='status' value={trainer.status} />
      </td>
      <td className='py-4 px-6'>
        <span className='text-sm text-gray-600 font-medium'>
          {trainer.sessions !== null ? trainer.sessions : '-'}
        </span>
      </td>
      <td className='py-4 px-6'>
        <span className='text-sm text-gray-900 font-medium'>
          ${trainer.earnings.toLocaleString()}
        </span>
      </td>
      <td className='py-4 px-6'>
        <div className='flex items-center gap-2'>
          <div className={cn('h-2 w-2 rounded-full', availabilityColor)} />
          <span
            className={cn('text-sm font-medium', {
              'text-[#14561C]': trainer.availability === 'Available',
              'text-[#5C5C5C]': trainer.availability === 'Offline',
              'text-[#A86908]': trainer.availability === 'Busy',
            })}
          >
            {trainer.availability}
          </span>
        </div>
      </td>
      <td className='py-4 px-6'>
        <span className='text-sm text-gray-500'>{trainer.dateAdded}</span>
      </td>
      <td className='py-4 px-6'>
        <button className='p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors cursor-pointer outline-none'>
          <MoreVertical className='h-4 w-4' />
        </button>
      </td>
    </tr>
  );
};

export default TrainerTableRow;
