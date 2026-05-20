import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const FilterDropdown = () => {
  return (
    <Button
      size='sm'
      variant='outline'
      className='w-21.5 h-9.5 min-h-0 mt-0 flex gap-4 py-2 px-3 text-muted-foreground bg-white text-xs font-medium border-[0.5px] border-[#CBD5E155] rounded-[8px] cursor-pointer'
    >
      <Image
        src='/images/admin-dashboard/icons/funnel.svg'
        alt='Filter'
        width={16}
        height={16}
        sizes='16px'
      />
      Filter
    </Button>
  );
};

export default FilterDropdown;
