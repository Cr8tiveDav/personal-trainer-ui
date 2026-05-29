import {
  AVAILABILITY_END_HOUR,
  AVAILABILITY_START_HOUR,
  AVAILABILITY_START_MINUTES,
  AVAILABILITY_TIMELINE_END_MINUTES,
  timeToMinutesFromString,
} from './time-12h'

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const

const DAY_SHORT: Record<number, string> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Weds',
  4: 'Thurs',
  5: 'Fri',
  6: 'Sat',
}

export type WeekDayRow = {
  dayOfWeek: number
  date: Date
  label: string
  dateLabel: string
  isToday: boolean
}

/** Mon–Sun rows for the current calendar week with real dates */
export function getCurrentWeekDayRows(): WeekDayRow[] {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const currentDow = today.getDay()
  const mondayOffset = currentDow === 0 ? -6 : 1 - currentDow
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset)

  return DAY_ORDER.map((dow, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    const isToday = date.getTime() === today.getTime()
    const short = DAY_SHORT[dow]

    return {
      dayOfWeek: dow,
      date,
      label: isToday ? `${short} NOW` : short,
      dateLabel: date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      }),
      isToday,
    }
  })
}

export function formatWeekDateLong(date: Date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatHourAxisLabel(hour: number): string {
  if (hour === 0 || hour === 24) return '12am'
  if (hour === 12) return '12pm'
  if (hour < 12) return `${hour}am`
  return `${hour - 12}pm`
}

/** Fixed timeline: 6am through 7pm only */
export function getTimelineRange() {
  const startHour = AVAILABILITY_START_HOUR
  const endHour = AVAILABILITY_END_HOUR
  const hourCount = endHour - startHour + 1
  const hours = Array.from({ length: hourCount }, (_, i) => startHour + i)
  const gridStartMins = AVAILABILITY_START_MINUTES
  const gridEndMins = AVAILABILITY_TIMELINE_END_MINUTES
  const spanMins = gridEndMins - gridStartMins

  return { startHour, endHour, hours, gridStartMins, gridEndMins, spanMins }
}

function clampToWindow(minutes: number, gridStartMins: number) {
  return Math.max(
    gridStartMins,
    Math.min(AVAILABILITY_TIMELINE_END_MINUTES, minutes),
  )
}

export function slotBarPosition(
  startTime: string,
  endTime: string,
  gridStartMins: number,
  spanMins: number,
) {
  const startMins = clampToWindow(timeToMinutesFromString(startTime), gridStartMins)
  const endMins = clampToWindow(timeToMinutesFromString(endTime), gridStartMins)
  const left = ((startMins - gridStartMins) / spanMins) * 100
  const width = ((endMins - startMins) / spanMins) * 100
  return {
    left: Math.max(0, Math.min(100, left)),
    width: Math.max(2, Math.min(100 - left, width)),
  }
}
