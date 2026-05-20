import { Button } from '@/components/ui/button';
import React from 'react';

const ExportButton = () => {
  return (
    <Button
      size='lg'
      variant='outline'
      className='h-12 w-32.5 py-3 px-4.5 text-base text-muted-foreground font-semibold border border-[#A3A3A3] rounded-md cursor-pointer'
    >
      Export CSV
    </Button>
  );
};

export default ExportButton;
