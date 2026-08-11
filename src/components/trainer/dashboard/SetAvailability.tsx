'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/utils'

import {
  useMyTrainerAvailability,
  useSetMyTrainerAvailability,
  useUpdateMyTrainerAvailability,
  useToggleMyTrainerAvailability,
  useDeleteMyTrainerAvailabilitySlot,
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
  const { data, isLoading, isError, isSuccess } =
    useMyTrainerAvailability()
  const slots = data?.slots || []
  const initialGlobalState = data?.isAvailable ?? false
  const setAvailability = useSetMyTrainerAvailability()
  const updateAvailability = useUpdateMyTrainerAvailability()
  const toggleMutation = useToggleMyTrainerAvailability()
  const deleteAvailabilitySlot = useDeleteMyTrainerAvailabilitySlot()

  const [isGloballyAvailable, setIsGloballyAvailable] = useState<boolean>(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (isSuccess && !hasInitialized) {
      const stored = localStorage.getItem('trainer-availability');
      if (stored !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsGloballyAvailable(stored === 'true');
      } else {
        setIsGloballyAvailable(initialGlobalState);
      }
      setHasInitialized(true);
    }
  }, [isSuccess, initialGlobalState, hasInitialized]);

  const handleToggle = (val: boolean) => {
    setIsGloballyAvailable(val);
    localStorage.setItem('trainer-availability', String(val));
    toggleMutation.mutate(val, {
      onError: () => {
        setIsGloballyAvailable(!val);
        localStorage.setItem('trainer-availability', String(!val));
      }
    });
  };

  const formKey =
    slots.length > 0
      ? slots.map((s) => `${s.day_of_week}-${s.start_time}-${s.end_time}`).join('|')
      : 'empty'

  if (isLoading && slots.length === 0) {
    return <AvailabilityTabSkeleton />
  }

  if (isError || !isSuccess) {
    return (
      <div className='rounded-[12px] border border-gray-100 bg-white '>
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
      <div className='rounded-[12px] border border-gray-100 bg-white overflow-hidden'>
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
      <div className="bg-white rounded-[12px] border border-gray-100 p-5 flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-gray-900">
            {isGloballyAvailable ? 'Currently available' : 'Currently unavailable'}
          </h3>
          <p className="text-xs text-gray-500">
            {isGloballyAvailable
              ? 'Toggle off to pause bookings. Clients will not be able to book sessions.'
              : 'Toggle on to open bookings. Clients will be able to book sessions.'}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isGloballyAvailable}
          onClick={() => handleToggle(!isGloballyAvailable)}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 items-center rounded-[9999px] transition-colors focus:outline-none',
            isGloballyAvailable ? 'bg-primary' : 'bg-gray-200',
          )}
        >
          <span className="sr-only">Toggle availability</span>
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-[9999px] bg-white shadow transition-transform',
              isGloballyAvailable ? 'translate-x-6' : 'translate-x-1',
            )}
          />
        </button>
      </div>

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
