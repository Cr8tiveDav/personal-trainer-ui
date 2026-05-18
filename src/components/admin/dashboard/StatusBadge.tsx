import { cn } from '~/utils'

type Status = 'completed' | 'unconfirmed' | 'settled' | 'disputed'

interface StatusBadgeProps {
  status: Status
}

const STATUS_STYLES: Record<Status, string> = {
  completed: 'bg-green-50 text-green-600 border border-green-200',
  unconfirmed: 'bg-orange-50 text-orange-500 border border-orange-200',
  settled: 'bg-blue-50 text-blue-500 border border-blue-200',
  disputed: 'bg-red-50 text-red-500 border border-red-200',
}

const STATUS_LABELS: Record<Status, string> = {
  completed: 'Completed',
  unconfirmed: 'Unconfirmed',
  settled: 'Settled',
  disputed: 'Disputed',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium',
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}