import { TrendingUp, TrendingDown } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface StatCardProps {
  title: string
  value: number | string
  trend?: number
  isUp?: boolean
  isLoading?: boolean
}

export function StatCard({
  title,
  value,
  trend,
  isUp = true,
  isLoading = false,
}: StatCardProps) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <h6 className='text-sm text-[#1C1C1C] '>{title}</h6>
        {trend !== undefined &&
          (isLoading ? (
            <Skeleton className='h-5 w-12 rounded-full' />
          ) : (
            <span
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
              }`}
            >
              {isUp ? (
                <TrendingUp className='h-3 w-3' />
              ) : (
                <TrendingDown className='h-3 w-3' />
              )}
              {trend}%
            </span>
          ))}
      </div>
      {isLoading ? (
        <Skeleton className='h-9 w-24' />
      ) : (
        <p className='text-3xl font-bold text-gray-900'>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      )}
    </div>
  )
}