// Raw shape returned by GET /api/v1/admin/sessions
export interface ApiSession {
  id: string
  session_id: string
  booking_status: 'pending' | 'completed' | 'cancelled'
  client_id: string
  client_name: string
  client_email: string
  trainer_id: string
  trainer_name: string
  trainer_email: string
  scheduled_start: string
  scheduled_end: string
  session_platform: string
  timezone: string
  zoom_meeting_link: string
}

export interface Session {
  id: string
  client: { name: string; avatar?: string; country: string }
  trainer: { name: string; avatar?: string; country: string }
  type: 'Monthly' | 'Free Trial' | 'One Time'
  scheduled: string
  duration: string
  amount: number
  clientConf: 'Yes' | 'Pending' | 'N/A'
  trainerConf: 'Yes' | 'Pending' | 'N/A'
  state: 'Completed' | 'Unconfirmed' | 'Scheduled' | 'Settled' | 'Disputed' | 'Missed' | 'Cancelled'
  // Extra metadata from API — used for filtering, not rendered in table
  trainerId?: string
  scheduledStartISO?: string
  zoomLink?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatScheduled(isoStr: string, timezone?: string): string {
  try {
    const date = new Date(isoStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone || undefined,
    })
  } catch {
    return isoStr
  }
}

function formatDuration(startISO: string, endISO: string): string {
  try {
    const diffMs = new Date(endISO).getTime() - new Date(startISO).getTime()
    const totalMins = Math.round(diffMs / 60000)
    if (totalMins <= 0) return '--'
    const hrs = totalMins / 60
    if (totalMins < 60) return `${totalMins}min`
    if (hrs % 1 === 0) return `${hrs}hr${hrs > 1 ? 's' : ''}`
    return `${hrs}hrs`
  } catch {
    return '--'
  }
}

export function mapApiSession(api: ApiSession): Session {
  const now = new Date()
  const start = new Date(api.scheduled_start)

  let state: Session['state']
  if (api.booking_status === 'completed') {
    state = 'Completed'
  } else if (api.booking_status === 'cancelled') {
    state = 'Cancelled'
  } else if (start > now) {
    state = 'Scheduled'
  } else {
    state = 'Unconfirmed'
  }

  return {
    id: api.id.slice(0, 8).toUpperCase(),
    client: { name: api.client_name, country: '' },
    trainer: { name: api.trainer_name, country: '' },
    type: 'One Time',
    scheduled: formatScheduled(api.scheduled_start, api.timezone),
    duration: formatDuration(api.scheduled_start, api.scheduled_end),
    amount: 0,
    clientConf: 'N/A',
    trainerConf: 'N/A',
    state,
    trainerId: api.trainer_id,
    scheduledStartISO: api.scheduled_start,
    zoomLink: api.zoom_meeting_link,
  }
}

// ─── Dummy fallback (used when API is unavailable) ────────────────────────────

export const DUMMY_SESSIONS: Session[] = [
  {
    id: 'S-0901',
    client: { name: 'Amara J.', avatar: 'https://i.pravatar.cc/150?u=1', country: 'US' },
    trainer: { name: 'Tunde B.', avatar: 'https://i.pravatar.cc/150?u=99', country: 'NG' },
    type: 'Monthly',
    scheduled: 'Today, 10:50AM',
    duration: '1.5hrs',
    amount: 20,
    clientConf: 'Yes',
    trainerConf: 'Yes',
    state: 'Completed',
  },
  {
    id: 'S-0900',
    client: { name: 'Cara K.', avatar: 'https://i.pravatar.cc/150?u=2', country: 'UK' },
    trainer: { name: 'Tunde B.', avatar: 'https://i.pravatar.cc/150?u=99', country: 'NG' },
    type: 'Monthly',
    scheduled: 'Today, 10:00AM',
    duration: '1hr',
    amount: 20,
    clientConf: 'Yes',
    trainerConf: 'Pending',
    state: 'Unconfirmed',
  },
  {
    id: 'S-0899',
    client: { name: 'Helen E.', avatar: 'https://i.pravatar.cc/150?u=3', country: 'US' },
    trainer: { name: 'Sam B.', avatar: 'https://i.pravatar.cc/150?u=88', country: 'NG' },
    type: 'Free Trial',
    scheduled: 'Today, 9:00AM',
    duration: '1hr',
    amount: 0,
    clientConf: 'N/A',
    trainerConf: 'N/A',
    state: 'Scheduled',
  },
  {
    id: 'S-0898',
    client: { name: 'Dani K.', avatar: 'https://i.pravatar.cc/150?u=4', country: 'UK' },
    trainer: { name: 'Victor F.', avatar: 'https://i.pravatar.cc/150?u=77', country: 'NG' },
    type: 'One Time',
    scheduled: 'Yesterday, 11:45AM',
    duration: '2hrs',
    amount: 20,
    clientConf: 'Yes',
    trainerConf: 'Yes',
    state: 'Settled',
  },
  {
    id: 'S-0897',
    client: { name: 'Sally V.', avatar: 'https://i.pravatar.cc/150?u=5', country: 'US' },
    trainer: { name: 'Tunde B.', avatar: 'https://i.pravatar.cc/150?u=99', country: 'NG' },
    type: 'Monthly',
    scheduled: 'Yesterday, 11:00AM',
    duration: '1.5hrs',
    amount: 20,
    clientConf: 'Pending',
    trainerConf: 'Yes',
    state: 'Disputed',
  },
  {
    id: 'S-0896',
    client: { name: 'Jade K.', avatar: 'https://i.pravatar.cc/150?u=6', country: 'US' },
    trainer: { name: 'Sandy B.', avatar: 'https://i.pravatar.cc/150?u=66', country: 'NG' },
    type: 'Monthly',
    scheduled: 'May 1, 6:00PM',
    duration: '--',
    amount: 20,
    clientConf: 'Pending',
    trainerConf: 'Pending',
    state: 'Missed',
  },
]
