'use client'

import { useState, useEffect } from 'react'

import {
  useSetTrainerAvailabilityById,
  useTrainerAvailabilityById,
  useUpdateTrainerAvailabilityById,
  useDeleteTrainerAvailabilitySlotById,
} from '@/api/availability'
import { AvailabilitySetupPanel } from '@/components/availability/AvailabilitySetupPanel'
import { AvailabilityScheduleView } from '@/components/availability/AvailabilityScheduleView'
import { AvailabilityTabSkeleton } from '@/components/availability/AvailabilityTabSkeleton'

interface AvailabilityTabProps {
  trainerId: string
  enabled?: boolean
}

const AvailabilityTab = ({ trainerId, enabled = true }: AvailabilityTabProps) => {
  const { data, isLoading, isError, isSuccess } =
    useTrainerAvailabilityById(trainerId, enabled)
  const slots = data?.slots || []
  const initialGlobalState = data?.isAvailable ?? false

  const setAvailability = useSetTrainerAvailabilityById(trainerId)
  const updateAvailability = useUpdateTrainerAvailabilityById(trainerId)
  const deleteAvailabilitySlot = useDeleteTrainerAvailabilitySlotById(trainerId)

  // We don't have the true backend toggle state, so we infer it visually.
  const [isGloballyAvailable, setIsGloballyAvailable] = useState<boolean>(true)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (isSuccess && !hasInitialized) {
      setIsGloballyAvailable(initialGlobalState)
      setHasInitialized(true)
    }
  }, [isSuccess, initialGlobalState, hasInitialized])

  const formKey =
    slots.length > 0
      ? slots.map((s) => `${s.day_of_week}-${s.start_time}-${s.end_time}`).join('|')
      : 'empty'

  if (isLoading) {
    return <AvailabilityTabSkeleton />
  }

  if (isError) {
    return (
      <div className='rounded-[12px] border border-gray-100 bg-white p-8 text-center text-sm text-red-500'>
        Failed to load availability. Please try again.
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
    <div className='flex flex-col gap-8'>
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
          isGloballyAvailable={isGloballyAvailable}
        />
      </div>

      <AvailabilityScheduleView
        slots={slots}
        editable
        onUpdate={(availability) => updateAvailability.mutate(availability)}
        onDeleteSlot={(slotId) => deleteAvailabilitySlot.mutate(slotId)}
        isSaving={updateAvailability.isPending || deleteAvailabilitySlot.isPending}
        isOffline={!isGloballyAvailable}
      />
    </div>
  )
}

export default AvailabilityTab
