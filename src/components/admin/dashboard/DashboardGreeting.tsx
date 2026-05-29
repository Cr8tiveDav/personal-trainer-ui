'use client';

import { format } from 'date-fns';
import { useAdminSessions } from '@/api/sessions';
import { useTrainerStatusCounts } from '@/api/trainers';

export function DashboardGreeting() {
  const today = format(new Date(), 'EEEE, MMMM d');
  const { data: sessions } = useAdminSessions();
  const { counts } = useTrainerStatusCounts();

  const sessionCount = sessions?.length ?? 0;
  const awaitingCount = counts.pending ?? 0;

  const sessionLabel = sessionCount === 1 ? 'session' : 'sessions';
  const trainerLabel = awaitingCount === 1 ? 'trainer' : 'trainers';

  return (
    <div className='mb-6 rounded-[8px] border border-[#E4E2E9] bg-white'>
      <div className='flex flex-col gap-2 p-5'>
        <p className='w-[151px] flex justify-center rounded-[8px] bg-[#F5F5F5] p-1.5 text-sm text-muted-foreground'>
          {today}
        </p>
        <h1 className='text-xl font-semibold text-gray-900'>
          Your platform is up & running smoothly
        </h1>
        <p className='text-base text-[#1C1C1C]'>
          {sessionCount} {sessionLabel} · {awaitingCount} pending{' '}
          {trainerLabel}{' '}
        </p>
      </div>
    </div>
  );
}
