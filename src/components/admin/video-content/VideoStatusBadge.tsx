import type { VideoStatus } from './mock-data'

const STYLES: Record<VideoStatus, string> = {
  Approved: 'bg-green-50 text-green-600',
  Pending: 'bg-yellow-50 text-yellow-600',
  Missing: 'bg-red-50 text-red-500',
}

export function VideoStatusBadge({ status }: { status: VideoStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}>
      {status}
    </span>
  )
}
