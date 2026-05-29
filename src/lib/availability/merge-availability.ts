import type { AvailabilitySlot } from '@/api/availability'

/** Replace or remove one day in the weekly schedule, then return the full list for PUT/POST. */
export function mergeDayIntoSchedule(
  slots: AvailabilitySlot[],
  dayOfWeek: number,
  next: Pick<AvailabilitySlot, 'start_time' | 'end_time' | 'timezone'> | null,
  defaultTimezone: string,
): AvailabilitySlot[] {
  const withoutDay = slots.filter((s) => s.day_of_week !== dayOfWeek)

  if (
    !next ||
    !next.start_time?.trim() ||
    !next.end_time?.trim()
  ) {
    return withoutDay
  }

  return [
    ...withoutDay,
    {
      day_of_week: dayOfWeek,
      start_time: next.start_time,
      end_time: next.end_time,
      timezone: next.timezone?.trim() || defaultTimezone,
    },
  ]
}

/** Append only days not already in the saved schedule (for the add-days form). */
export function mergeNewDaysIntoSchedule(
  existing: AvailabilitySlot[],
  added: AvailabilitySlot[],
): AvailabilitySlot[] {
  const taken = new Set(existing.map((s) => s.day_of_week))
  const additions = added.filter((s) => !taken.has(s.day_of_week))
  return [...existing, ...additions]
}
