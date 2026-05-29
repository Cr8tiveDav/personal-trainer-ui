import { Star } from 'lucide-react'
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
  1: 'text-[#FBBD23]',
  2: 'text-[#6D6A81]',
  3: 'text-[#D48A0C]',
  4: 'text-[#D48A0C]',
  5: 'text-[#D48A0C]',
}

export function TrainerRow({ trainer }: TrainerRowProps) {
  const { rank, initial, name, rating, total_sessions, trend } = trainer

  return (
    <div className='flex items-center gap-4 py-3.5'>
      <span className={cn('w-8 text-sm font-bold', RANK_COLORS[rank] ?? 'text-gray-500')}>
        #{rank}
      </span>

      <div className='flex items-center gap-1.5'>
        <span className='w-4 flex justify-center shrink-0 select-none'>
          {trend === 'up' && (
            <span className='text-[#1E7829] text-[13px] font-bold'>▲</span>
          )}
          {trend === 'down' && (
            <span className='text-[#C42D2B] text-[13px] font-bold'>▼</span>
          )}
        </span>

        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-[99999px] border border-[#EBEBEB] bg-white text-sm font-bold text-muted-foreground select-none'>
          {initial}
        </div>
      </div>

      <p className='flex-1 text-sm font-semibold text-muted-foreground'>{name}</p>

      <div className='flex items-center gap-1.5'>
        <span className='text-sm font-semibold text-[#D48A0C]'>{rating.toFixed(1)}</span>
        <Star className='h-3.5 w-3.5 fill-[#D48A0C] text-[#D48A0C]' />
      </div>

      <p className='w-16 text-right text-xs text-gray-900 font-medium leading-tight select-none ml-6'>
        <span className='text-sm font-semibold text-gray-900'>{total_sessions}</span> <br />
        <span className='text-sm text-muted-foreground font-medium'>{total_sessions === 1 ? 'Session' : 'Sessions'}</span>
      </p>
    </div>
  )
}
