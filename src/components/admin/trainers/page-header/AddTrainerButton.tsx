import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AddTrainerButton = () => {
  return (
    <Link
      href='/admin/trainers/new'>
      <Button
        size='lg'
        variant='default'
        className='h-12 w-39.25 py-3 px-4.5 text-white text-base font-semibold  rounded-md cursor-pointer'
      >
        <Image
          src='/images/admin-dashboard/icons/plus.svg'
          alt='Add Trainer'
          width={15}
          height={15}
          sizes='15px'
          className='mr-2'
        />
        Add Trainer
      </Button>
    </Link>
  );
};

export default AddTrainerButton;
