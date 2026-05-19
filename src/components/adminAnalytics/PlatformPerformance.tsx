'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { ChevronDown } from 'lucide-react'

type Period = 'Weekly' | 'Monthly' | 'Yearly'

interface ChartDataPoint {
    label: string
    subscriptions: number
    sessions_booked: number
    sessions_completed: number
}

const EMPTY_DATA: ChartDataPoint[] = [
    { label: 'Week 1', subscriptions: 0, sessions_booked: 0, sessions_completed: 0 },
    { label: 'Week 2', subscriptions: 0, sessions_booked: 0, sessions_completed: 0 },
    { label: 'Week 3', subscriptions: 0, sessions_booked: 0, sessions_completed: 0 },
    { label: 'Week 4', subscriptions: 0, sessions_booked: 0, sessions_completed: 0 },
]

async function fetchChartData(period: Period): Promise<ChartDataPoint[]> {
    const res = await fetch(`/api/v1/analytics/performance?period=${period.toLowerCase()}`)
    if (!res.ok) throw new Error('Failed to fetch chart data')
    const data = await res.json()
    return data.data
}

export function PlatformPerformance() {
    const [period, setPeriod] = useState<Period>('Monthly')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const { data } = useQuery({
        queryKey: ['platform-performance', period],
        queryFn: () => fetchChartData(period),
    })

    const chartData = data ?? EMPTY_DATA

    return (
        <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
            <div className='mb-6 flex items-start justify-between'>
                <div>
                    <h2 className='text-xl font-bold text-foreground'>Platform Performance</h2>
                    <p className='mt-1 text-sm text-muted font-meduim'>
                        Track growth across sessions, subscriptions, and revenue.
                    </p>
                </div>

                <div className='relative'>
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className='flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-50 transition-colors'
                    >
                        {period}
                        <ChevronDown className='h-4 w-4' />
                    </button>
                    {dropdownOpen && (
                        <div className='absolute right-0 top-10 z-10 w-[130px] rounded-lg border border-gray-100 bg-white shadow-lg'>
                            {(['Weekly', 'Monthly', 'Yearly'] as Period[]).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => { setPeriod(p); setDropdownOpen(false) }}
                                    className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${period === p ? 'font-semibold text-primary' : 'text-muted-foreground'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ResponsiveContainer width='100%' height={350}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <Legend
                        iconType='circle'
                        iconSize={8}
                        verticalAlign='top'
                        wrapperStyle={{ fontSize: '13px', paddingBottom: '24px' }}
                    />
                    <Line
                        type='monotone'
                        dataKey='subscriptions'
                        name='Subscription'
                        stroke='#22c55e'
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#22c55e' }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type='monotone'
                        dataKey='sessions_booked'
                        name='Sessions Booked'
                        stroke='#1e3a5f'
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#1e3a5f' }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type='monotone'
                        dataKey='sessions_completed'
                        name='Sessions Completed'
                        stroke='#a855f7'
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#a855f7' }}
                        activeDot={{ r: 6 }}
                    />
                    <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' vertical={false} />
                    <XAxis
                        dataKey='label'
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => v.toLocaleString()}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0', fontSize: '12px' }}
                    />


                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}