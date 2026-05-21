import type { VideoStatus } from './mock-data'

const STYLES: Record<VideoStatus, { dot: string; text: string }> = {
  Approved: { dot: 'bg-green-500', text: 'text-green-600' },
  Pending: { dot: 'bg-orange-400', text: 'text-orange-500' },
  Missing: { dot: 'bg-red-500', text: 'text-red-500' },
}

export function VideoStatusBadge({ status }: { status: VideoStatus }) {
  const { dot, text } = STYLES[status]
  return (
    <span className={`flex items-center gap-1.5 text-sm font-medium ${text}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status}
    </span>
  )
}
