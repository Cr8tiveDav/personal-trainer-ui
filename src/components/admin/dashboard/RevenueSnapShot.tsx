'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { CreditCard } from 'lucide-react'

interface RevenueBreakdownItem {
  amount: number
  percentage: number
}

interface RevenueData {
  total_revenue: number
  breakdown: {
    subscriptions: RevenueBreakdownItem
    one_time: RevenueBreakdownItem
    trials: RevenueBreakdownItem
  }
  payouts_due: number
}

const EMPTY_REVENUE: RevenueData = {
  total_revenue: 0,
  breakdown: {
    subscriptions: { amount: 0, percentage: 0 },
    one_time: { amount: 0, percentage: 0 },
    trials: { amount: 0, percentage: 0 },
  },
  payouts_due: 0,
}

async function fetchRevenue(): Promise<RevenueData> {
  const res = await fetch('/api/v1/finance/summary')
  if (!res.ok) throw new Error('Failed to fetch revenue')
  const data = await res.json()
  return data.data
}

interface ProgressRowProps {
  label: string
  amount: number
  percentage: number
}

function ProgressRow({ label, amount, percentage }: ProgressRowProps) {
  return (
    <div className='mb-4'>
      <div className='mb-1 flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='text-sm font-medium text-gray-700'>${amount.toLocaleString()}</p>
      </div>
      <div className='h-1.5 w-full overflow-scroll rounded-full bg-gray-100'>
        <div
          className='h-full rounded-full bg-green-500 transition-all duration-500'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function RevenueSnapshot() {
  const { data } = useQuery({
    queryKey: ['revenue-snapshot'],
    queryFn: fetchRevenue,
  })

  const revenue = data ?? EMPTY_REVENUE

  return (
    <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
      <h2 className='mb-3 text-base font-semibold text-gray-900'>Revenue snapshot</h2>

      <p className='mb-5 text-3xl font-bold text-gray-900'>
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

      <div className='my-4 rounded-lg bg-gray-50 p-4 text-center'>
        <p className='text-xs text-gray-400'>Payouts due</p>
        <p className='text-xl font-bold text-gray-900'>
          ${revenue.payouts_due.toLocaleString()}
        </p>
      </div>

      <Link
        href='/admin/payments'
        className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary'
      >
        <CreditCard className='h-4 w-4' />
        Open Payments
      </Link>
    </div>
  )
}