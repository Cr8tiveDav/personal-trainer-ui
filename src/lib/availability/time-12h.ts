/** Availability window: 6:00 AM through 7:00 PM only */

export const AVAILABILITY_START_MINUTES = 6 * 60 // 6:00 AM
export const AVAILABILITY_END_MINUTES = 19 * 60 // 7:00 PM
export const AVAILABILITY_TIMELINE_END_MINUTES = 20 * 60 // end of 7pm hour block on grid

export const AVAILABILITY_START_HOUR = 6
export const AVAILABILITY_END_HOUR = 19 // 7pm label

function buildTimeOptions(minMinutes: number, maxMinutes: number) {
  const options: { value: string; label: string }[] = []

  for (let total = minMinutes; total <= maxMinutes; total += 30) {
    const hour = Math.floor(total / 60)
    const minute = total % 60
    const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    const period = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    const label = `${hour12}:${String(minute).padStart(2, '0')} ${period}`
    options.push({ value, label })
  }

  return options
}

/** From / until dropdowns: 6:00 AM – 7:00 PM */
export const AVAILABILITY_TIME_OPTIONS = buildTimeOptions(
  AVAILABILITY_START_MINUTES,
  AVAILABILITY_END_MINUTES,
)

/** @deprecated Use AVAILABILITY_TIME_OPTIONS */
export const TIME_12H_OPTIONS = AVAILABILITY_TIME_OPTIONS

export function timeToMinutesFromString(time: string): number {
  const [h, m] = time.split(':').map(Number)
  if (Number.isNaN(h)) return 0
  return h * 60 + (m ?? 0)
}

/** API times may be HH:mm or HH:mm:ss */
export function normalizeTime24(value?: string): string {
  if (!value) return ''
  const [h, m] = value.split(':')
  if (!h || m === undefined) return ''
  return `${h.padStart(2, '0')}:${m.padStart(2, '0').slice(0, 2)}`
}

export function to12HourLabel(value?: string): string {
  const normalized = normalizeTime24(value)
  if (!normalized) return ''

  const match = AVAILABILITY_TIME_OPTIONS.find((o) => o.value === normalized)
  if (match) return match.label

  const [h, m] = normalized.split(':').map(Number)
  if (Number.isNaN(h)) return value ?? ''
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 || 12
  return `${hour12}:${String(m ?? 0).padStart(2, '0')} ${period}`
}

function clampMinutes(minutes: number) {
  return Math.max(
    AVAILABILITY_START_MINUTES,
    Math.min(AVAILABILITY_END_MINUTES, minutes),
  )
}

/** Snap API times into the 6am–7pm window */
export function snapToTimeOption(value?: string): string {
  const normalized = normalizeTime24(value)
  if (!normalized) return ''

  const exact = AVAILABILITY_TIME_OPTIONS.find((o) => o.value === normalized)
  if (exact) return exact.value

  const clamped = clampMinutes(timeToMinutesFromString(normalized))
  let closest = AVAILABILITY_TIME_OPTIONS[0].value
  let minDiff = Infinity

  for (const opt of AVAILABILITY_TIME_OPTIONS) {
    const diff = Math.abs(timeToMinutesFromString(opt.value) - clamped)
    if (diff < minDiff) {
      minDiff = diff
      closest = opt.value
    }
  }

  return closest
}
