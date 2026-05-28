import { StatusBadge } from "./StatusBadge"

type Status = 'completed' | 'unconfirmed' | 'settled' | 'disputed'

export interface Activity {
  id: string
  client_name: string
  plan_type: string
  trainer_name: string
  timestamp: string
  duration: string
  amount: number
  status: Status
}

interface ActivityRowProps {
  activity: Activity
}

export function ActivityRow({ activity }: ActivityRowProps) {
  const { client_name, plan_type, trainer_name, timestamp, duration, amount, status } = activity

  return (
    <div className='flex items-center gap-4 py-3'>
      <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-[9999px] bg-gray-100 text-sm font-semibold text-gray-600'>
        {client_name.charAt(0)}
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-gray-900'>
          <span>{client_name}</span>{' '}
          <span className='font-normal text-gray-500'>
            {plan_type} with <span className='font-medium text-gray-700'>{trainer_name}</span>
          </span>
        </p>
        <p className='text-xs text-gray-400'>
          {timestamp} · {duration} · ${amount}
        </p>
      </div>
      <StatusBadge status={status} />
    </div>
  )
}