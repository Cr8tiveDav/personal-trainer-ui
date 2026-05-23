'use client'

import { useCurrentTrainerId } from '@/api/trainer-dashboard'
import {
  useSetTrainerAvailabilityById,
  useTrainerAvailabilityById,
  useUpdateTrainerAvailabilityById,
} from '@/api/availability'
import { AvailabilitySetupPanel } from '@/components/availability/AvailabilitySetupPanel'
import { AvailabilityScheduleView } from '@/components/availability/AvailabilityScheduleView'
import { AvailabilityTabSkeleton } from '@/components/availability/AvailabilityTabSkeleton'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'

type SetAvailabilityProps = {
  /** Show working-days form when no slots exist (e.g. dedicated availability page). */
  showSetupForm?: boolean
}

export function SetAvailability({ showSetupForm = false }: SetAvailabilityProps) {
  const { data: trainerId, isLoading: idLoading } = useCurrentTrainerId()
  const { data: slots = [], isLoading, isError, isSuccess } =
    useTrainerAvailabilityById(trainerId ?? '', !!trainerId)
  const setAvailability = useSetTrainerAvailabilityById(trainerId ?? '')
  const updateAvailability = useUpdateTrainerAvailabilityById(trainerId ?? '')

  const formKey =
    slots.length > 0
      ? slots.map((s) => `${s.day_of_week}-${s.start_time}-${s.end_time}`).join('|')
      : 'empty'

  if (idLoading || (isLoading && slots.length === 0)) {
    return <AvailabilityTabSkeleton />
  }

  if (!trainerId) {
    return (
      <div className='rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500'>
        Could not load your trainer profile. Please sign out and log in again.
      </div>
    )
  }

  if (isError || !isSuccess) {
    return (
      <div className='rounded-xl border border-gray-100 bg-white shadow-sm'>
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.availability}
          imageAlt='Availability unavailable'
          title='Could not load availability'
          description='Please refresh the page or try again in a moment.'
          className='min-h-[280px] py-10'
        />
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className='rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden'>
        <EmptyState
          imageSrc={EMPTY_STATE_IMAGE_PATHS.availability}
          imageAlt='No availability set'
          title='No availability set yet'
          description={
            showSetupForm
              ? 'Add your weekly hours so clients can book sessions with you.'
              : 'Your schedule will appear here once availability is configured.'
          }
          className='min-h-[200px] py-8'
        />
        {showSetupForm ? (
          <div className='border-t border-gray-100 px-5 pb-5'>
            <AvailabilitySetupPanel
              initialSlots={[]}
              onSave={(availability) => setAvailability.mutate(availability)}
              isSaving={setAvailability.isPending}
            />
          </div>
        ) : null}
      </div>
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
