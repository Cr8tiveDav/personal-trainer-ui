import { cn } from '@/utils'

export const EMPTY_STATE_IMAGE_PATHS = {
  recentActivity: '/images/empty-state/recent-activities.svg',
  topTrainer: '/images/empty-state/top-trainer.svg',
  client: '/images/empty-state/client.svg',
  trainer: '/images/empty-state/trainer.svg',
  manualEntry: '/images/empty-state/manual-entry.svg',
  confirmationQueue: '/images/empty-state/confirmation-queue.png',
  missedSessions: '/images/empty-state/missed-sessions.png',
  income: '/images/empty-state/income.svg',
  allTransactions: '/images/empty-state/all-transactions.svg',
  notification: '/images/empty-state/notification.svg',
  sessions: '/images/empty-state/manual-entry.svg',
  reviews: '/images/empty-state/notification.svg',
  availability: '/images/empty-state/client.svg',
} as const

type EmptyStateProps = {
  imageSrc: string
  imageAlt: string
  title: string
  description?: string
  className?: string
}

export function EmptyState({
  imageSrc,
  imageAlt,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[220px] flex-col items-center justify-center px-4 py-8 text-center',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className='mb-4 h-auto w-full max-w-[240px] object-contain'
      />
      <h3 className='text-sm font-semibold text-gray-900'>{title}</h3>
      {description ? (
        <p className='mt-1.5 max-w-xs text-sm text-gray-500'>{description}</p>
      ) : null}
    </div>
  )
}
