import { Activity } from "@/api/types/dashboard"
import { StatusBadge } from "./StatusBadge"

interface ActivityRowProps {
  activity: Activity
}

function formatName(fullName: string) {
  if (!fullName) return '';
  const parts = fullName.split(' ');
  if (parts.length <= 1) return fullName;
  return `${parts[0]} ${parts[1].charAt(0)}.`;
}

function formatActivityTime(occurredAt: string) {
  const date = new Date(occurredAt)
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const timeString = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(/\s/g, '')

  if (compareDate.getTime() === today.getTime()) {
    return `Today, ${timeString}`
  } else if (compareDate.getTime() === yesterday.getTime()) {
    return `Yesterday, ${timeString}`
  } else {
    const diffTime = Math.abs(today.getTime() - compareDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 7) {
      return `${diffDays} days ago, ${timeString}`
    } else {
      const dateString = date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      })
      return `${dateString}, ${timeString}`
    }
  }
}

const EVENT_DESCRIPTIONS: Record<string, string> = {
  booking_completed: 'completed session with',
  booking_rescheduled: 'rescheduled session with',
  booking_created: 'booked session with',
  booking_cancelled: 'cancelled session with',
}

export function ActivityRow({ activity }: ActivityRowProps) {
  const { actor, trainer, occurred_at, type } = activity

  const clientName = actor?.name ? formatName(actor.name) : 'Client'
  const trainerName = trainer?.name ? formatName(trainer.name) : 'Trainer'
  const actionText = EVENT_DESCRIPTIONS[type] || 'updated session with'

  const formattedTime = formatActivityTime(occurred_at)

  const subtitle = formattedTime

  return (
    <div className='flex items-center gap-4 py-4'>
      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-[9999px] bg-gray-200 text-sm font-semibold text-gray-500 select-none'>
        {clientName.charAt(0)}
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-[15px] font-medium text-muted leading-normal'>
          <span className='text-base text-muted-foreground'>{clientName}</span>{' '}
          <span className='font-normal text-muted'>{actionText}</span>{' '}
          <span className='text-base text-muted-foreground'>{trainerName}</span>
        </p>
        <p className='text-xs text-muted mt-1 font-medium'>
          {subtitle}
        </p>
      </div>
      <StatusBadge type={type} />
    </div>
  )
}
