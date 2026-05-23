import type { SessionStatus } from './types'

const STYLES: Record<SessionStatus, { dot: string; text: string; bg: string }> = {
  Completed: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  Upcoming: { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  Cancelled: { dot: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50' },
}

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const { dot, text, bg } = STYLES[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  )
}
