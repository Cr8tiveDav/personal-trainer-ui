'use client';

import Link from 'next/link';
import { useRevenueSnapshot } from '@/api/dashboard';

import { PaymentIcon } from '@/components/icons';
import { RevenueData } from '@/api/types/payment';

const EMPTY_REVENUE: RevenueData = {
  revenue: {
    total: 0,
    subscriptions: 0,
    one_time_sessions: 0,
    trial_conversions: 0,
  },
  latest_payment: {
    id: '',
    client_name: '',
    client_email: '',
    plan_type: '',
    plan_id: '',
    amount: 0,
    currency: '',
    status: '',
    created_at: '',
  },
};

interface ProgressRowProps {
  label: string;
  amount: number;
  percentage: number;
}

function ProgressRow({ label, amount, percentage }: ProgressRowProps) {
  return (
    <div className='mb-4'>
      <div className='mb-1 flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='text-sm font-medium text-gray-700'>
          ${amount.toLocaleString()}
        </p>
      </div>
      <div className='h-1.5 w-full overflow-hidden rounded-[9999px] bg-gray-100'>
        <div
          className='h-full rounded-[9999px] bg-green-500 transition-all duration-500'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function RevenueSnapshot() {
  const { data: response } = useRevenueSnapshot();

  const revenue =
    response?.data?.revenue ?? EMPTY_REVENUE.revenue;

  const total = revenue.total || 1; 

  return (
    <div className='rounded-[12px] border border-[#E4E2E9] bg-white p-5'>
      <h2 className='mb-3 text-[20px] font-semibold text-muted-foreground'>
        Revenue snapshot
      </h2>

      <p className='mb-5 text-3xl font-bold text-muted-foreground'>
        ${revenue.total.toLocaleString()}
      </p>

      <ProgressRow
        label='Subscriptions'
        amount={revenue.subscriptions}
        percentage={(revenue.subscriptions / total) * 100}
      />

      <ProgressRow
        label='One-time sessions'
        amount={revenue.one_time_sessions}
        percentage={(revenue.one_time_sessions / total) * 100}
      />

      <ProgressRow
        label='Trial conversions'
        amount={revenue.trial_conversions}
        percentage={(revenue.trial_conversions / total) * 100}
      />

      <Link
        href='/admin/payments'
        className='flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#F7F7F7] border border-[#EBEBEB] py-3.75 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary'
      >
        <PaymentIcon className='h-4 w-4' />
        Open Payments
      </Link>
    </div>
  );
}