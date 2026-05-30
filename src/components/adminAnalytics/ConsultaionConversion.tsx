'use client'

import { useConsultationConversion } from '@/api/analytics'
import type { ConversionData } from '@/api/types/analytics'
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from 'recharts'

const EMPTY_DATA: ConversionData = {
  consultations: 100,
  subscriptions: 70,
  drop_off: 30,
  conversion_rate: 0,
  trend: '0% from last month',
}

export function ConsultationConversion() {
  const { data: response } = useConsultationConversion()
  const stats = response?.data ?? EMPTY_DATA

  const funnelData = [
    { value: stats.consultations, name: 'Consultations', fill: '#4f8ef7' },
    { value: stats.subscriptions, name: 'Subscriptions', fill: '#22c55e' },
    { value: stats.drop_off, name: 'Drop off', fill: '#f43f5e' },
  ]

  return (
    <div className='flex-1 rounded-[12px] p-6 rounded-[12px] border border-[#E4E2E9] bg-white'>
      <h2 className='text-xl font-bold text-foreground'>Consultation Conversion</h2>
      <p className='mt-1 text-sm text-muted'>Track how consultations turn into paid users.</p>

      <div className='mt-6 flex flex-col md:flex-row items-center gap-6'>
        <div className='w-full md:flex-1'>
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

        <div className='w-full md:max-w-[200px] bg-gray-100 rounded-[6px] flex flex-col gap-10 p-3'>
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
