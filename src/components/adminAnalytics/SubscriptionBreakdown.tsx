'use client'

import { useSubscriptionBreakdown } from '@/api/analytics'
import type { SubscriptionData } from '@/api/types/analytics'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const EMPTY_DATA: SubscriptionData = {
    total: 0,
    plans: [
        { name: 'Casual', users: 1, percentage: 0, color: '#22c55e' },
        { name: 'Committed', users: 1, percentage: 0, color: '#4f8ef7' },
        { name: 'Consistent', users: 1, percentage: 0, color: '#a855f7' },
    ],
    note: 'No subscription data yet.',
}

export function SubscriptionBreakdown() {
    const { data: response } = useSubscriptionBreakdown()
    const subscriptionData = response?.data ?? EMPTY_DATA

    return (
        <div className='rounded-[12px] border border-gray-100 bg-white p-5 shadow-sm'>
            <h2 className='mb-1 text-base font-semibold text-gray-900'>Subscription Breakdown</h2>
            <p className='mb-6 text-sm text-gray-400'>{subscriptionData.total} active subscribers</p>

            <div className='flex flex-col items-center gap-6 md:flex-row'>
                <div className='h-[200px] w-[200px]'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie
                                data={subscriptionData.plans}
                                cx='50%'
                                cy='50%'
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey='users'
                            >
                                {subscriptionData.plans.map((plan) => (
                                    <Cell key={plan.name} fill={plan.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className='flex-1 space-y-3'>
                    {subscriptionData.plans.map((plan) => (
                        <div key={plan.name} className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span
                                    className='h-3 w-3 rounded-[9999px]'
                                    style={{ backgroundColor: plan.color }}
                                />
                                <span className='text-sm text-gray-600'>{plan.name}</span>
                            </div>
                            <div className='text-right'>
                                <span className='text-sm font-semibold text-gray-900'>
                                    {plan.users} users
                                </span>
                                <span className='ml-2 text-xs text-gray-400'>
                                    {plan.percentage}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className='mt-4 text-xs text-gray-400'>{subscriptionData.note}</p>
        </div>
    )
}
