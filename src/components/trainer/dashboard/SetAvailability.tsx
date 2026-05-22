'use client'

import {
  useSetTrainerAvailability,
  useTrainerAvailability,
  useUpdateTrainerAvailability,
} from '@/api/availability'
import { AvailabilitySetupPanel } from '@/components/availability/AvailabilitySetupPanel'
import { AvailabilityScheduleView } from '@/components/availability/AvailabilityScheduleView'
import { AvailabilityTabSkeleton } from '@/components/availability/AvailabilityTabSkeleton'

export function SetAvailability() {
  const { data: slots = [], isLoading, isSuccess } = useTrainerAvailability()
  const setAvailability = useSetTrainerAvailability()
  const updateAvailability = useUpdateTrainerAvailability()

  const formKey =
    slots.length > 0
      ? slots.map((s) => `${s.day_of_week}-${s.start_time}-${s.end_time}`).join('|')
      : 'empty'

  if (isLoading) {
    return <AvailabilityTabSkeleton />
  }

  if (!isSuccess) {
    return (
      <div className='rounded-xl border border-gray-100 bg-white p-6 text-sm text-red-500'>
        Could not load your availability. Please try again.
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <AvailabilitySetupPanel
        initialSlots={[]}
        onSave={(availability) => setAvailability.mutate(availability)}
        isSaving={setAvailability.isPending}
      />
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <div>
          <h3 className='text-sm font-semibold text-gray-900'>Add availability</h3>
          <p className='text-xs text-gray-500 mt-1'>
            Add new days below. Days already set are locked here — edit them on the calendar.
          </p>
        </div>
        <AvailabilitySetupPanel
          key={formKey}
          existingSlots={slots}
          onSave={(availability) => updateAvailability.mutate(availability)}
          isSaving={updateAvailability.isPending}
        />
      </div>

      <AvailabilityScheduleView
        slots={slots}
        editable
        onUpdate={(availability) => updateAvailability.mutate(availability)}
        isSaving={updateAvailability.isPending}
      />
    </div>
  )
}
