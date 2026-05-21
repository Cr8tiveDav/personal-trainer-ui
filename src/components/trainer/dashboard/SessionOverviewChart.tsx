'use client'

import { ChartData } from './mock-data'

export function SessionOverviewChart({ data }: { data: ChartData[] }) {
  const maxSessions = Math.max(...data.map((d) => d.sessions))

  return (
    <div className='rounded-xl border border-gray-100 bg-white shadow-sm h-full'>
      <div className='border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>Session Overview</h3>
        <p className='text-xs text-gray-400 mt-0.5'>This week</p>
      </div>
      <div className='px-5 py-5'>
        <div className='flex items-end justify-between gap-2 h-[140px]'>
          {data.map((item) => {
            const heightPct = maxSessions > 0 ? (item.sessions / maxSessions) * 100 : 0
            return (
              <div key={item.day} className='flex flex-1 flex-col items-center gap-1.5'>
                <span className='text-xs font-semibold text-gray-700'>{item.sessions}</span>
                <div className='w-full rounded-t-md bg-primary/10 relative flex items-end' style={{ height: '100px' }}>
                  <div
                    className='w-full rounded-t-md bg-primary transition-all duration-500'
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className='text-xs text-gray-400'>{item.day}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
