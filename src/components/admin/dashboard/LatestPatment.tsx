'use client'

import { useLatestPayment } from '@/api/dashboard'

export function LatestPayment() {
  const { data: response } = useLatestPayment()
  const payment = response?.data

  return (
    <div className='mt-4 rounded-xl border border-[#E4E2E9] p-5'>
      <h2 className='mb-4 text-base font-semibold text-gray-900'>Latest payment</h2>
      {!payment ? (
        <p className='text-sm text-gray-400'>No payments yet</p>
      ) : (
        <div className='flex items-center gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600'>
            {payment.client_name.charAt(0)}
          </div>
          <div>
            <p className='text-sm font-medium text-gray-900'>{payment.client_name}</p>
            <p className='text-xs text-gray-400'>
              {payment.plan} · ${payment.amount} · {payment.duration}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
