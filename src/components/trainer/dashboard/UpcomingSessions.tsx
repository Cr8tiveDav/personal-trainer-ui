import Link from 'next/link'
import type { UpcomingSession } from './types'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { cn } from '@/utils'

function PlatformIcon({ platform }: { platform: UpcomingSession['platform'] }) {
  const colors: Record<UpcomingSession['platform'], string> = {
    zoom: 'bg-blue-500',
    whatsapp: 'bg-emerald-500',
    meet: 'bg-green-600',
    'in-app': 'bg-gray-900',
  }

  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] text-[9px] font-bold text-white ${colors[platform]}`}
    >
      {platform === 'zoom' ? 'Z' : platform === 'whatsapp' ? 'W' : platform === 'meet' ? 'G' : '▶'}
    </span>
  )
}

export function UpcomingSessions({
  sessions,
  className,
}: {
  sessions: UpcomingSession[]
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col pb-20 rounded-[12px] border border-gray-100 bg-white ",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Upcoming sessions
        </h3>
        <Link
          href="/trainer/sessions"
          className="text-xs font-medium text-primary hover:underline"
        >
          View Schedule →
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {sessions.length === 0 ? (
          <EmptyState
            imageSrc={EMPTY_STATE_IMAGE_PATHS.sessions}
            imageAlt="No upcoming sessions"
            title="No upcoming sessions"
            description="Scheduled sessions that are coming up will be listed here."
            className="flex-1 py-6"
          />
        ) : (
          <div className="divide-y divide-gray-50">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[8px] bg-gray-50 text-center">
                  <span className="text-[10px] font-semibold uppercase text-gray-400">
                    {session.monthLabel}
                  </span>
                  <span className="text-lg font-bold leading-none text-gray-900">
                    {session.dateLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {session.clientName}
                  </p>
                  <p className="text-xs text-gray-500">{session.timeRange}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <PlatformIcon platform={session.platform} />
                  <span className="text-xs text-gray-500">
                    {session.platformLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
