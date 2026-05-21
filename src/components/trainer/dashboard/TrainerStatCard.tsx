import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

interface TrainerStatCardProps {
  title: string
  value: string | number
  trend?: number
  isUp?: boolean
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export function TrainerStatCard({ title, value, trend, isUp, icon: Icon, iconBg, iconColor }: TrainerStatCardProps) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        {trend !== undefined && (
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
            }`}
          >
            {isUp ? <TrendingUp className='h-3 w-3' /> : <TrendingDown className='h-3 w-3' />}
            {trend}%
          </span>
        )}
      </div>
      <p className='text-2xl font-bold text-gray-900'>{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className='mt-1 text-sm text-gray-500'>{title}</p>
    </div>
  )
}
