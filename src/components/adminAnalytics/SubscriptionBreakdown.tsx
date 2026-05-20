'use client'

import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface SubscriptionPlan {
    name: string
    users: number
    percentage: number
    color: string
}

interface SubscriptionData {
    total: number
    plans: SubscriptionPlan[]
    note: string
}

const EMPTY_DATA: SubscriptionData = {
    total: 0,
    plans: [
        { name: 'Casual', users: 1, percentage: 0, color: '#22c55e' },
        { name: 'Committed', users: 1, percentage: 0, color: '#4f8ef7' },
        { name: 'Consistent', users: 1, percentage: 0, color: '#a855f7' },
    ],
    
    note: 'No subscription data yet.',
}

async function fetchSubscriptionData(): Promise<SubscriptionData> {
    const res = await fetch('/api/v1/analytics/subscriptions')
    if (!res.ok) throw new Error('Failed to fetch subscription data')
    const data = await res.json()
    return data.data
}

export function SubscriptionBreakdown() {
    const { data } = useQuery({
        queryKey: ['subscription-breakdown'],
        queryFn: fetchSubscriptionData,
    })

    const stats = data ?? EMPTY_DATA

    return (
        <div className='flex-1 rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-foreground'>Subscription Breakdown</h2>
            <p className='mt-1 text-sm text-muted'>Distribution across subscription plans.</p>

            <div className='mt-6 flex items-center gap-6'>
                <div className='relative flex shrink-0 items-center justify-center'>
                    <ResponsiveContainer width={160} height={160}>
                        <PieChart>
                            <Pie
                                data={stats.plans}
                                cx='50%'
                                cy='50%'
                                innerRadius={50}
                                outerRadius={75}
                                dataKey='users'
                                strokeWidth={2}
                            >
                                {stats.plans.map((plan, index) => (
                                    <Cell key={index} fill={plan.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0', fontSize: '12px' }}
                                formatter={(value) => [`${value} users`]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='absolute flex flex-col items-center'>
                        <p className='text-xl font-bold text-foreground'>{stats.total}</p>
                        <p className='text-xs text-muted'>Total</p>
                    </div>
                </div>

                <div className='flex-1 space-y-3'>
                    {stats.plans.map((plan) => (
                        <div key={plan.name} className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='h-2.5 w-2.5 rounded-full' style={{ backgroundColor: plan.color }} />
                                <p className='text-sm text-muted-foreground'>{plan.name}</p>
                            </div>
                            <p className='text-sm font-medium text-foreground'>
                                {plan.users} users ({plan.percentage}%)
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-6 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3'>
                <p className='text-xs text-muted-foreground'>{stats.note}</p>
            </div>
        </div>
    )
}