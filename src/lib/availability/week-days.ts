export const WEEK_DAYS = [
  { label: 'Mon', fullLabel: 'Monday', value: 1 },
  { label: 'Tues', fullLabel: 'Tuesday', value: 2 },
  { label: 'Weds', fullLabel: 'Wednesday', value: 3 },
  { label: 'Thurs', fullLabel: 'Thursday', value: 4 },
  { label: 'Fri', fullLabel: 'Friday', value: 5 },
  { label: 'Sat', fullLabel: 'Saturday', value: 6 },
  { label: 'Sun', fullLabel: 'Sunday', value: 0 },
] as const

export function dayLabel(dayOfWeek: number) {
  return WEEK_DAYS.find((d) => d.value === dayOfWeek)?.fullLabel ?? 'Unknown'
}

export function sortByWeekOrder<T extends { day_of_week: number }>(items: T[]) {
  const order: number[] = WEEK_DAYS.map((d) => d.value)
  return [...items].sort(
    (a, b) => order.indexOf(a.day_of_week) - order.indexOf(b.day_of_week),
  )
}
