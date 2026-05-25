import { TrendingUp, Activity, ArrowUp } from 'lucide-react'

interface InsightCardProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
}

function InsightCard({ icon, iconBg, title, description }: InsightCardProps) {
  return (
    <div className='flex flex-1 gap-4 rounded-[16px] border border-gray-100 bg-gray-100 p-2 lg:p-8'>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className='text-base font-semibold text-foreground'>{title}</p>
        <p className='mt-1 text-xs text-muted'>{description}</p>
      </div>
    </div>
  )
}

export function PerformanceInsights() {
  return (
    <div className='rounded-[8px] border border-gray-100 bg-white p-4 lg:p-8'>
      <h2 className='text-xl font-bold text-foreground'>Performance Insights</h2>
      <p className='mt-1 text-sm text-muted'>Key observations from platform activity.</p>

      <div className='mt-4  gap-4 grid md:grid-cols-2 lg:grid-cols-3'>
        <InsightCard
          icon={<TrendingUp className='h-5 w-5 text-green-500' />}
          iconBg='bg-green-50'
          title='55% of consultations converted to subscriptions'
          description='First guided sessions are driving most paid conversions.'
        />
        <InsightCard
          icon={<Activity className='h-5 w-5 text-blue-500' />}
          iconBg='bg-blue-50'
          title='Committed is the highest-performing plan'
          description='More than half of active subscribers currently prefer this plan.'
        />
        <InsightCard
          icon={<ArrowUp className='h-5 w-5 text-orange-500' />}
          iconBg='bg-orange-50'
          title='29% of single-session users upgraded'
          description='Most upgrades happened within 7 days after session with trainer'
        />
      </div>
    </div>
  )
}