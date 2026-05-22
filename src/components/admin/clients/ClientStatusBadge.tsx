import { cn } from '~/utils'
import type { ClientStatus } from './types'

const STATUS_STYLES: Record<ClientStatus, string> = {
  Active: 'bg-green-50 text-green-600',
  Paused: 'bg-orange-50 text-orange-500',
  Inactive: 'bg-gray-100 text-gray-500',
}

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  return (
    <span className={cn('rounded-full px-3 py-1 text-xs font-medium', STATUS_STYLES[status])}>
      {status}
    </span>
  )
}
