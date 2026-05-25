'use client';

import Link from 'next/link';
import { useRevenueSnapshot } from '@/api/dashboard';
import type { RevenueData } from '@/api/types/dashboard';
import { CreditCard } from 'lucide-react';
import { PaymentIcon } from '@/components/icons';

const EMPTY_REVENUE: RevenueData = {
  total_revenue: 0,
  breakdown: {
    subscriptions: { amount: 0, percentage: 0 },
    one_time: { amount: 0, percentage: 0 },
    trials: { amount: 0, percentage: 0 },
  },
  payouts_due: 0,
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
      <div className='h-1.5 w-full overflow-scroll rounded-[9999px] bg-gray-100'>
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
  const revenue = response?.data ?? EMPTY_REVENUE;

  return (
    <div className='rounded-[12px] border border-[#E4E2E9] bg-white p-5'>
      <h2 className='mb-3 text-[20px] font-semibold text-muted-foreground'>
        Revenue snapshot
      </h2>

      <p className='mb-5 text-3xl font-bold text-muted-foreground'>
        ${revenue.total_revenue.toLocaleString()}
      </p>

      <ProgressRow
        label='Subscriptions'
        amount={revenue.breakdown.subscriptions.amount}
        percentage={revenue.breakdown.subscriptions.percentage}
      />
      <ProgressRow
        label='One-time sessions'
        amount={revenue.breakdown.one_time.amount}
        percentage={revenue.breakdown.one_time.percentage}
      />
      <ProgressRow
        label='Trial conversions'
        amount={revenue.breakdown.trials.amount}
        percentage={revenue.breakdown.trials.percentage}
      />

      <div className='my-4 rounded-[12px] bg-[#F7F7F7] p-4 text-center'>
        <p className='text-sm text-muted font-normal'>Payouts due</p>
        <p className='text-xl font-bold text-gray-900'>
          ${revenue.payouts_due.toLocaleString()}
        </p>
      </div>

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
