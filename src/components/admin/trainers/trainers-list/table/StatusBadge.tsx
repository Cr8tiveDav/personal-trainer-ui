import React from 'react';
import { cn } from '@/utils';

export type BadgeType = 'status' | 'specialty';

interface StatusBadgeProps {
  type: BadgeType;
  value: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type, value }) => {
  let badgeStyles = '';

  if (type === 'specialty') {
    badgeStyles =
      'bg-[#EDF4FD] text-primary border-none px-3 py-1 text-xs font-medium rounded-[9999px] capitalize';
  } else if (type === 'status') {
    switch (value.toLowerCase()) {
      case 'active':
      case 'approved':
        badgeStyles =
          'bg-[#ECFDF5] text-[#14561C] border-none px-3 py-1 text-xs font-medium rounded-[9999px]';
        break;
      case 'suspended':
        badgeStyles =
          'bg-[#FEF0EF] text-[#9C1E1C] border-none px-3 py-1 text-xs font-medium rounded-[9999px]';
        break;
      case 'pending':
        badgeStyles =
          'bg-[#F5A6231A] text-[#A86908] border-none px-3 py-1 text-xs font-medium rounded-[9999px]';
        break;
      case 'rejected':
        badgeStyles =
          'bg-red-50 text-[#9C1E1C] border-none px-3 py-1 text-xs font-medium rounded-[9999px]';
        break;
      default:
        badgeStyles =
          'bg-gray-50 text-gray-600 border-none px-3 py-1 text-xs font-medium rounded-[9999px]';
    }
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center', badgeStyles)}
    >
      {value}
    </span>
  );
};

export default StatusBadge;
