import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AddTrainerButton = () => {
  return (
    <Button
      asChild
      size='lg'
      variant='default'
      className='w-39.25 text-white text-base font-semibold rounded-[6px] cursor-pointer'
    >
      <Link href='/admin/trainers/new'>
        <Image
          src='/images/admin-dashboard/icons/plus.svg'
          alt='Add Trainer'
          width={15}
          height={15}
          sizes='15px'
          className='mr-2'
        />
        Add Trainer
      </Link>
    </Button>
  );
};

export default AddTrainerButton;
