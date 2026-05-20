import React from 'react';

import TrainersList from '@/components/admin/trainers/trainers-list/TrainersList';
import TrainersPageHeader from '@/components/admin/trainers/page-header/TrainersPageHeader';
import StatsGrid from '@/components/admin/trainers/analytics/StatsGrid';


const page = () => {
  return (
    <div className='w-full max-w-350 mx-auto space-y-6 px-4 pb-6'>
      <TrainersPageHeader/>
      <StatsGrid/>
      <TrainersList />
    </div>
  );
};

export default page;
