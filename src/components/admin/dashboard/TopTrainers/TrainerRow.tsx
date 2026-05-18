import { TrendingUp, Star } from 'lucide-react'
import { cn } from '~/utils'

export interface Trainer {
  rank: number
  initial: string
  name: string
  rating: number
  total_sessions: number
  trend: 'up' | 'down' | 'neutral'
}

interface TrainerRowProps {
  trainer: Trainer
}

const RANK_COLORS: Record<number, string> = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-orange-400',
}

export function TrainerRow({ trainer }: TrainerRowProps) {
  const { rank, initial, name, rating, total_sessions, trend } = trainer

  return (
    <div className='flex items-center gap-4 py-3'>
      <span className={cn('w-6 text-sm font-bold', RANK_COLORS[rank] ?? 'text-gray-500')}>
        #{rank}
      </span>
      {trend === 'up' && <TrendingUp className='h-3 w-3 shrink-0 text-green-500' />}
      <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600'>
        {initial}
      </div>
      <p className='flex-1 text-sm font-medium text-gray-900'>{name}</p>
      <div className='flex items-center gap-1'>
        <span className='text-sm font-semibold text-gray-700'>{rating}</span>
        <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
      </div>
      <p className='w-16 text-right text-xs text-gray-400'>
        {total_sessions} <br /> sessions
      </p>
    </div>
  )
}