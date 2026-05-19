'use client'

import { useQuery } from '@tanstack/react-query'
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from 'recharts'

interface ConversionData {
  consultations: number
  subscriptions: number
  drop_off: number
  conversion_rate: number
  trend: string
}

const EMPTY_DATA: ConversionData = {
  consultations: 100,
  subscriptions: 70,
  drop_off: 30,
  conversion_rate: 0,
  trend: '0% from last month',
}

async function fetchConversionData(): Promise<ConversionData> {
  const res = await fetch('/api/v1/analytics/conversion')
  if (!res.ok) throw new Error('Failed to fetch conversion data')
  const data = await res.json()
  return data.data
}

export function ConsultationConversion() {
  const { data } = useQuery({
    queryKey: ['consultation-conversion'],
    queryFn: fetchConversionData,
  })

  const stats = data ?? EMPTY_DATA

  const funnelData = [
    { value: stats.consultations, name: 'Consultations', fill: '#4f8ef7' },
    { value: stats.subscriptions, name: 'Subscriptions', fill: '#22c55e' },
    { value: stats.drop_off, name: 'Drop off', fill: '#f43f5e' },
  ]

  return (
    <div className='flex-1 rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
      <h2 className='text-xl font-bold text-foreground'>Consultation Conversion</h2>
      <p className='mt-1 text-sm text-muted'>Track how consultations turn into paid users.</p>

      <div className='mt-6 flex items-center gap-6'>
        <div className='flex-1'>
          <ResponsiveContainer width='100%' height={250}>
            <FunnelChart>
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0', fontSize: '12px' }}
              />
              <Funnel dataKey='value' data={funnelData} isAnimationActive lastShapeType='rectangle'>
                <LabelList
                  position='center'
                  fill='#fff'
                  stroke='none'
                  fontSize={12}
                  fontWeight={600}
                  dataKey='name'
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-gray-100 md:max-w-[200px] rounded-md flex flex-col gap-10 p-3'>
          <div>
            <p className='text-3xl font-bold text-foreground'>{stats.conversion_rate}%</p>
            <p className='text-sm  text-muted-foreground'>Conversation rate</p>
          </div>
          <p className='text-sm text-muted'>
            {stats.conversion_rate}% of consultations converted into subscriptions.
          </p>
          <p className='text-xs text-muted'>{stats.trend}</p>
        </div>
      </div>
    </div>
  )
}