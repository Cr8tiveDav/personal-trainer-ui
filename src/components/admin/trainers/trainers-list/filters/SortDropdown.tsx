import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const SortDropdown = () => {
  return (
    <Button
      size='sm'
      variant='outline'
      className='w-20.25 h-9.5 min-h-0 mt-0 flex gap-4 py-2 px-3 text-muted-foreground bg-white text-xs font-medium border-[0.5px] border-[#CBD5E155] rounded-[8px] cursor-pointer'
    >
      <Image
        src='/images/admin-dashboard/icons/arrows-down-up.svg'
        alt='Sort'
        width={16}
        height={16}
        sizes='16px'
      />
      Sort
    </Button>
  );
};

export default SortDropdown;
