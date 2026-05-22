'use client'

import { useEffect, useState } from 'react'
import type { AvailabilitySlot } from '@/api/availability'
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
import { dayLabel } from '@/lib/availability/week-days'
import { formatWeekDateLong, type WeekDayRow } from '@/lib/availability/week-dates'
import { normalizeTime24, snapToTimeOption, to12HourLabel } from '@/lib/availability/time-12h'
import { cn } from '@/utils'

type EditAvailabilityDayModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  row: WeekDayRow | null
  slot?: AvailabilitySlot
  timezone: string
  isSaving?: boolean
  onSave: (next: Pick<AvailabilitySlot, 'start_time' | 'end_time' | 'timezone'> | null) => void
}

export function EditAvailabilityDayModal({
  open,
  onOpenChange,
  row,
  slot,
  timezone,
  isSaving = false,
  onSave,
}: EditAvailabilityDayModalProps) {
  const [enabled, setEnabled] = useState(!!slot)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    if (!open || !row) return
    setEnabled(!!slot)
    setStartTime(slot ? snapToTimeOption(slot.start_time) : '')
    setEndTime(slot ? snapToTimeOption(slot.end_time) : '')
  }, [open, row, slot])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!enabled) {
      onSave(null)
      return
    }
    const start_time = normalizeTime24(startTime)
    const end_time = normalizeTime24(endTime)
    if (!start_time || !end_time) return
    onSave({ start_time, end_time, timezone })
  }

  if (!row) return null

  const fullDate = formatWeekDateLong(row.date)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-white sm:max-w-md' onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>
            {slot ? 'Update' : 'Add'} availability — {dayLabel(row.dayOfWeek)}
          </DialogTitle>
          <DialogDescription>{fullDate}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/80 px-4 py-3'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Available this day</p>
              <p className='text-xs text-gray-500 mt-0.5'>
                Turn off to remove hours for {dayLabel(row.dayOfWeek)}.
              </p>
            </div>
            <button
              type='button'
              role='switch'
              aria-checked={enabled}
              onClick={() => setEnabled((v) => !v)}
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
                enabled ? 'bg-[#0b4d8d]' : 'bg-gray-200',
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
                  enabled ? 'translate-x-6' : 'translate-x-1',
                )}
              />
            </button>
          </div>

          {enabled && (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>From</label>
                <Time12HourSelect
                  value={startTime}
                  onChange={setStartTime}
                  maxTime={endTime || undefined}
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-900 mb-2'>Until</label>
                <Time12HourSelect
                  value={endTime}
                  onChange={setEndTime}
                  minTime={startTime || undefined}
                />
              </div>
            </div>
          )}

          {slot && enabled && (
            <p className='text-xs text-gray-500'>
              Current: {to12HourLabel(slot.start_time)} – {to12HourLabel(slot.end_time)}
            </p>
          )}

          <DialogFooter className='gap-2 sm:gap-0 pt-1'>
            <Button
              type='button'
              variant='outline'
              className='mt-0'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='mt-0 bg-[#0b4d8d] hover:bg-[#093d73]'
              disabled={isSaving || (enabled && (!startTime || !endTime))}
            >
              {isSaving ? 'Saving…' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
