'use client'

import { useMemo, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/utils'
import {
  useCreateDiscoverySlot,
  useDeleteDiscoverySlot,
  useDiscoverySlots,
  useUpdateDiscoverySlot,
  type DiscoverySlot,
  type DiscoverySlotPayload,
} from '@/api/discovery-slots'
import { Time12HourSelect } from '@/components/availability/Time12HourSelect'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  dayLabel,
  sortByWeekOrder,
  WEEK_DAYS,
} from '@/lib/availability/week-days'
import { normalizeTime24, snapToTimeOption, to12HourLabel } from '@/lib/availability/time-12h'
import { DiscoverySlotsPageSkeleton } from './DiscoverySlotsPageSkeleton'

const DEFAULT_TIMEZONE = 'Africa/Lagos'

function getDefaultTimezone() {
  if (typeof window === 'undefined') return DEFAULT_TIMEZONE
  return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIMEZONE
}

function formatTimezoneLabel(timezone: string) {
  if (!timezone) return 'Not set'
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'long',
    }).formatToParts(new Date())
    const name = parts.find((p) => p.type === 'timeZoneName')?.value
    const city = timezone.split('/').pop()?.replace(/_/g, ' ')
    if (name && city) return `${city} ${name}`
    return timezone.replace(/_/g, ' ')
  } catch {
    return timezone.replace(/_/g, ' ')
  }
}

function emptyFormState() {
  return {
    dayOfWeek: null as number | null,
    startTime: '',
    endTime: '',
    timezone: getDefaultTimezone(),
  }
}

function slotToFormState(slot: DiscoverySlot) {
  return {
    dayOfWeek: slot.day_of_week,
    startTime: snapToTimeOption(slot.start_time),
    endTime: snapToTimeOption(slot.end_time),
    timezone: slot.timezone || DEFAULT_TIMEZONE,
  }
}

function buildPayload(form: ReturnType<typeof emptyFormState>): DiscoverySlotPayload | null {
  if (form.dayOfWeek === null) return null
  const start_time = normalizeTime24(form.startTime)
  const end_time = normalizeTime24(form.endTime)
  if (!start_time || !end_time || !form.timezone) return null

  return {
    day_of_week: form.dayOfWeek,
    start_time,
    end_time,
    timezone: form.timezone,
    is_active: true,
  }
}

export function DiscoverySlotsManager() {
  const { data: slots = [], isLoading, isError } = useDiscoverySlots()
  const createSlot = useCreateDiscoverySlot()
  const updateSlot = useUpdateDiscoverySlot()
  const deleteSlot = useDeleteDiscoverySlot()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyFormState)
  const [editingTimezone, setEditingTimezone] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DiscoverySlot | null>(null)

  const sortedSlots = useMemo(() => sortByWeekOrder(slots), [slots])

  const takenDays = useMemo(() => {
    const set = new Set<number>()
    for (const slot of slots) {
      if (editingId && slot.id === editingId) continue
      set.add(slot.day_of_week)
    }
    return set
  }, [slots, editingId])

  const isSaving = createSlot.isPending || updateSlot.isPending
  const payload = buildPayload(form)
  const canSubmit =
    !!payload &&
    !isSaving &&
    (editingId !== null || !takenDays.has(form.dayOfWeek ?? -1))

  function resetForm() {
    setEditingId(null)
    setForm(emptyFormState())
    setEditingTimezone(false)
  }

  function startEdit(slot: DiscoverySlot) {
    setEditingId(slot.id)
    setForm(slotToFormState(slot))
    setEditingTimezone(false)
  }

  function handleSubmit() {
    if (!payload) return

    if (editingId) {
      updateSlot.mutate({ id: editingId, payload }, { onSuccess: resetForm })
      return
    }

    createSlot.mutate(payload, { onSuccess: resetForm })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteSlot.mutate(deleteTarget.id, {
      onSuccess: () => {
        if (editingId === deleteTarget.id) resetForm()
        setDeleteTarget(null)
      },
    })
  }

  if (isLoading) {
    return <DiscoverySlotsPageSkeleton />
  }

  if (isError) {
    return (
      <div className='rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-red-500'>
        Failed to load discovery slots. Please refresh and try again.
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-xl font-semibold text-gray-900'>Discovery call slots</h1>
        <p className='mt-1 text-sm text-gray-500 max-w-2xl'>
          Set when clients can book discovery calls with trainers. Each day can have one
          slot window with its own hours and timezone.
        </p>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white overflow-hidden'>
        <div className='border-b border-gray-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3'>
          <div>
            <h2 className='text-sm font-semibold text-gray-900'>
              {editingId ? 'Edit slot' : 'Add slot'}
            </h2>
            <p className='text-xs text-gray-500 mt-0.5'>
              {editingId
                ? 'Update the selected day, then save.'
                : 'Pick a day and set discovery call hours.'}
            </p>
          </div>
          {editingId && (
            <button
              type='button'
              onClick={resetForm}
              className='text-xs font-medium text-[#0b4d8d] hover:underline'
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className='p-6'>
          <p className='text-xs font-medium text-gray-700 mb-3'>Day of week</p>
          <div className='flex flex-wrap gap-2 mb-6'>
            {WEEK_DAYS.map((day) => {
              const isSelected = form.dayOfWeek === day.value
              const isTaken = takenDays.has(day.value)

              return (
                <button
                  key={day.value}
                  type='button'
                  disabled={isTaken}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, dayOfWeek: day.value }))
                  }
                  className={cn(
                    'min-w-[72px] rounded-lg border px-3 py-3 text-sm font-medium transition-all',
                    isTaken && 'cursor-not-allowed opacity-40',
                    isSelected
                      ? 'bg-[#0b4d8d] border-[#0b4d8d] text-white shadow-sm'
                      : 'bg-[#f5f5f5] border-transparent text-gray-700 hover:bg-gray-100',
                  )}
                >
                  {day.label}
                </button>
              )
            })}
          </div>

          {form.dayOfWeek !== null ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mb-6'>
              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>
                  From
                </label>
                <Time12HourSelect
                  value={form.startTime}
                  onChange={(v) => setForm((prev) => ({ ...prev, startTime: v }))}
                  maxTime={form.endTime || undefined}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>
                  Until
                </label>
                <Time12HourSelect
                  value={form.endTime}
                  onChange={(v) => setForm((prev) => ({ ...prev, endTime: v }))}
                  minTime={form.startTime || undefined}
                />
              </div>
            </div>
          ) : (
            <p className='text-xs text-gray-500 mb-6'>Select a day to set hours.</p>
          )}

          <div className='mb-6 max-w-md'>
            <div className='min-w-[200px]'>
              <p className='text-sm font-semibold text-gray-900 mb-2'>Time zone</p>
              {editingTimezone ? (
                <div className='space-y-2'>
                  <input
                    type='text'
                    value={form.timezone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, timezone: e.target.value }))
                    }
                    className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#0b4d8d]'
                    autoFocus
                  />
                  <button
                    type='button'
                    onClick={() => setEditingTimezone(false)}
                    className='text-xs font-medium text-[#0b4d8d] hover:underline'
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  onClick={() => setEditingTimezone(true)}
                  className='text-left text-sm text-gray-800 hover:text-[#0b4d8d] transition-colors'
                >
                  {formatTimezoneLabel(form.timezone)}
                </button>
              )}
            </div>
          </div>

          <div className='flex justify-end'>
            <Button
              type='button'
              variant='default'
              className='mt-0 min-w-[140px] rounded-lg bg-[#0b4d8d] hover:bg-[#093d73]'
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              {isSaving
                ? 'Saving…'
                : editingId
                  ? 'Update slot'
                  : 'Create slot'}
            </Button>
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-100'>
          <h2 className='text-sm font-semibold text-gray-900'>Configured slots</h2>
          <p className='text-xs text-gray-500 mt-0.5'>
            {sortedSlots.length === 0
              ? 'No discovery slots yet. Add one above.'
              : `${sortedSlots.length} slot${sortedSlots.length === 1 ? '' : 's'} configured`}
          </p>
        </div>

        {sortedSlots.length === 0 ? (
          <div className='px-6 py-12 text-center text-sm text-gray-500'>
            <Plus className='mx-auto h-8 w-8 text-gray-300 mb-3' />
            Create your first discovery call slot using the form above.
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-400'>
                  <th className='px-6 py-3'>Day</th>
                  <th className='px-6 py-3'>Hours</th>
                  <th className='px-6 py-3'>Timezone</th>
                  <th className='px-6 py-3 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedSlots.map((slot) => (
                  <tr
                    key={slot.id}
                    className={cn(
                      'border-b border-gray-50 last:border-0',
                      editingId === slot.id && 'bg-blue-50/40',
                    )}
                  >
                    <td className='px-6 py-4 font-medium text-gray-900'>
                      {dayLabel(slot.day_of_week)}
                    </td>
                    <td className='px-6 py-4 text-gray-700'>
                      {to12HourLabel(slot.start_time)} – {to12HourLabel(slot.end_time)}
                    </td>
                    <td className='px-6 py-4 text-gray-600'>
                      {formatTimezoneLabel(slot.timezone)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex justify-end gap-2'>
                        <button
                          type='button'
                          onClick={() => startEdit(slot)}
                          className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50'
                          aria-label={`Edit ${dayLabel(slot.day_of_week)}`}
                        >
                          <Pencil className='h-4 w-4' />
                        </button>
                        <button
                          type='button'
                          onClick={() => setDeleteTarget(slot)}
                          className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-red-600 hover:bg-red-50'
                          aria-label={`Delete ${dayLabel(slot.day_of_week)}`}
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Delete discovery slot?</DialogTitle>
            <DialogDescription>
              {deleteTarget
                ? `This removes the ${dayLabel(deleteTarget.day_of_week)} slot (${to12HourLabel(deleteTarget.start_time)} – ${to12HourLabel(deleteTarget.end_time)}). This cannot be undone.`
                : ''}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-2 sm:gap-0'>
            <Button
              type='button'
              variant='outline'
              className='mt-0'
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type='button'
              variant='destructive'
              className='mt-0'
              disabled={deleteSlot.isPending}
              onClick={confirmDelete}
            >
              {deleteSlot.isPending ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
