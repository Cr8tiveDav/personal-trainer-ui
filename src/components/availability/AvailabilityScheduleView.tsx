'use client'

import { useState } from 'react'
import { cn } from '@/utils'
import type { AvailabilitySlot } from '@/api/availability'
import { EditAvailabilityDayModal } from '@/components/availability/EditAvailabilityDayModal'
import { to12HourLabel } from '@/lib/availability/time-12h'
import { mergeDayIntoSchedule } from '@/lib/availability/merge-availability'
import { dayLabel } from '@/lib/availability/week-days'
import {
  formatHourAxisLabel,
  formatWeekDateLong,
  getCurrentWeekDayRows,
  getTimelineRange,
  slotBarPosition,
  type WeekDayRow,
} from '@/lib/availability/week-dates'

function slotForDay(slots: AvailabilitySlot[], dayOfWeek: number) {
  return slots.find((s) => s.day_of_week === dayOfWeek)
}

function buildTooltipLines(row: WeekDayRow, slot?: AvailabilitySlot, showEditHint?: boolean) {
  const lines = [dayLabel(row.dayOfWeek), formatWeekDateLong(row.date)]
  if (!slot) {
    lines.push('Day off')
    if (showEditHint) lines.push('Click to add hours')
  } else if (showEditHint) {
    lines.push('Click to edit')
  }
  return lines
}

function TimelineDayTooltip({
  row,
  slot,
  showEditHint,
  className,
  style,
  children,
}: {
  row: WeekDayRow
  slot?: AvailabilitySlot
  showEditHint?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const lines = buildTooltipLines(row, slot, showEditHint)

  return (
    <div
      className={cn('relative group/tip', className)}
      style={style}
    >
      {children}
      <div
        role='tooltip'
        className='pointer-events-none absolute top-full left-1/2 z-30 mt-1.5 hidden -translate-x-1/2 group-hover/tip:block'
      >
        <div className='absolute left-1/2 bottom-full h-0 w-0 -translate-x-1/2 border-x-[6px] border-x-transparent border-b-[6px] border-b-gray-900' />
        <div className='rounded-[8px] border border-gray-700 bg-gray-900 px-3 py-2.5 text-left shadow-lg min-w-[180px]'>
          <p className='text-[11px] font-semibold text-white leading-snug'>
            {lines[0]}
          </p>
          <p className='text-[11px] text-gray-300 mt-0.5 leading-snug'>{lines[1]}</p>
          {lines.slice(2).map((line) => (
            <p
              key={line}
              className='text-[10px] text-gray-400 mt-1.5 pt-1.5 border-t border-gray-700 leading-snug'
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function AvailabilityTimelineGrid({
  slots,
  editable,
  onDayClick,
}: {
  slots: AvailabilitySlot[]
  editable?: boolean
  onDayClick?: (row: WeekDayRow, slot?: AvailabilitySlot) => void
}) {
  const weekRows = getCurrentWeekDayRows()
  const { hours, gridStartMins, spanMins } = getTimelineRange()

  return (
    <div className='overflow-x-auto -mx-1 px-1'>
      <div className='min-w-[640px]'>
        <div className='flex items-end gap-2 mb-1'>
          <div className='w-[88px] shrink-0' />
          <div
            className='flex-1 grid'
            style={{
              gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))`,
            }}
          >
            {hours.map((hour) => (
              <div
                key={hour}
                className='text-center text-[10px] font-medium text-gray-400'
              >
                {formatHourAxisLabel(hour)}
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          {weekRows.map((row) => (
            <TimelineDayRow
              key={row.dayOfWeek}
              row={row}
              slot={slotForDay(slots, row.dayOfWeek)}
              hours={hours}
              gridStartMins={gridStartMins}
              spanMins={spanMins}
              editable={editable}
              onDayClick={onDayClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TimelineDayRow({
  row,
  slot,
  hours,
  gridStartMins,
  spanMins,
  editable,
  onDayClick,
}: {
  row: WeekDayRow
  slot?: AvailabilitySlot
  hours: number[]
  gridStartMins: number
  spanMins: number
  editable?: boolean
  onDayClick?: (row: WeekDayRow, slot?: AvailabilitySlot) => void
}) {
  const bar =
    slot && spanMins > 0
      ? slotBarPosition(slot.start_time, slot.end_time, gridStartMins, spanMins)
      : null

  const track = (
    <div
      className={cn(
        'relative flex-1 h-10 min-w-0 rounded-[6px] overflow-visible bg-gray-50/80 hover:z-50',
        editable && 'cursor-pointer',
      )}
      onClick={
        editable
          ? (e) => {
              e.stopPropagation()
              onDayClick?.(row, slot)
            }
          : undefined
      }
      onKeyDown={
        editable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onDayClick?.(row, slot)
              }
            }
          : undefined
      }
      role={editable ? 'button' : undefined}
      tabIndex={editable ? 0 : undefined}
      aria-label={
        editable
          ? slot
            ? `Edit ${dayLabel(row.dayOfWeek)} availability`
            : `Add availability for ${dayLabel(row.dayOfWeek)}`
          : undefined
      }
    >
      <div
        className='absolute inset-0 grid pointer-events-none overflow-hidden rounded-[6px]'
        style={{
          gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))`,
        }}
      >
        {hours.map((hour) => (
          <div
            key={hour}
            className='border-r border-gray-200/80 last:border-r-0 bg-white/60'
          />
        ))}
      </div>

      {bar ? (
        <TimelineDayTooltip
          row={row}
          slot={slot}
          showEditHint={editable}
          className='absolute top-1 bottom-1 z-10 min-w-[48px]'
          style={{
            left: `${bar.left}%`,
            width: `${bar.width}%`,
          }}
        >
          <div className='flex h-full w-full items-center justify-center rounded-[6px] bg-[#0b4d8d] px-2 shadow-sm'>
            <span className='text-[10px] font-medium text-white whitespace-nowrap truncate'>
              {to12HourLabel(slot!.start_time)} – {to12HourLabel(slot!.end_time)}
            </span>
          </div>
        </TimelineDayTooltip>
      ) : (
        <div className='absolute inset-0 z-10 flex items-center justify-center pointer-events-none'>
          <span className='text-xs text-gray-400'>Day off</span>
        </div>
      )}
    </div>
  )

  return (
    <div className='flex items-center gap-2'>
      <div className='w-[88px] shrink-0 flex flex-col justify-center py-1'>
        <span
          className={cn(
            'text-xs font-semibold',
            row.isToday ? 'text-[#0b4d8d]' : 'text-gray-700',
          )}
        >
          {row.label}
        </span>
        <span className='text-[10px] text-gray-400'>{row.dateLabel}</span>
      </div>

      {track}
    </div>
  )
}

type AvailabilityScheduleViewProps = {
  slots: AvailabilitySlot[]
  editable?: boolean
  onUpdate?: (availability: AvailabilitySlot[]) => void
  onDeleteSlot?: (slotId: string) => void
  isSaving?: boolean
  isOffline?: boolean
}

export function AvailabilityScheduleView({
  slots,
  editable = false,
  onUpdate,
  onDeleteSlot,
  isSaving = false,
  isOffline = false,
}: AvailabilityScheduleViewProps) {
  const timezone = slots[0]?.timezone ?? 'Africa/Lagos'
  const activeDayCount = slots.length
  const today = new Date().getDay()
  const todaySlot = slotForDay(slots, today)

  const [editOpen, setEditOpen] = useState(false)
  const [editRow, setEditRow] = useState<WeekDayRow | null>(null)
  const [editSlot, setEditSlot] = useState<AvailabilitySlot | undefined>()
  function openDayEditor(row: WeekDayRow, slot?: AvailabilitySlot) {
    setEditRow(row)
    setEditSlot(slot)
    setEditOpen(true)
  }

  function handleDaySave(
    next: Pick<AvailabilitySlot, 'start_time' | 'end_time' | 'timezone'> | null,
  ) {
    if (!editRow) return
    
    if (next === null) {
      let slotId = editSlot?.id || editSlot?.slot_id || (editSlot as Record<string, unknown>)?.uuid || (editSlot as Record<string, unknown>)?._id;
      
      if (!slotId && editSlot) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        for (const key of Object.keys(editSlot)) {
          if (typeof (editSlot as Record<string, unknown>)[key] === 'string' && uuidRegex.test((editSlot as Record<string, unknown>)[key])) {
            slotId = (editSlot as Record<string, unknown>)[key];
            break;
          }
        }
      }

      if (slotId && onDeleteSlot) {
        onDeleteSlot(slotId)
      } else if (onDeleteSlot && editSlot) {
        alert("Failed to find slot ID! Please share this with your developer. Keys available: " + Object.keys(editSlot).join(', '));
      } else if (onUpdate) {
        const merged = mergeDayIntoSchedule(slots, editRow.dayOfWeek, next, timezone)
        onUpdate(merged)
      }
      setEditOpen(false)
      return
    }

    if (!onUpdate) return
    const merged = mergeDayIntoSchedule(slots, editRow.dayOfWeek, next, timezone)
    onUpdate(merged)
    setEditOpen(false)
  }

  return (
    <>
      <div className='bg-white rounded-[12px] border border-gray-100 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-1'>Weekly availability</h3>
            <p className='text-xs text-gray-500'>
              {editable
                ? 'Hover a bar for details. Click a bar or empty day to update hours.'
                : 'Calendar week with hours by day — bars match start and end times.'}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            {isOffline ? (
              <span className='text-xs font-semibold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-[6px] border border-yellow-200'>
                Currently Offline
              </span>
            ) : (
              <>
                <span className='w-2 h-2 rounded-[9999px] bg-[#0b4d8d]' />
                <span className='text-xs text-gray-600'>Available days = {activeDayCount}</span>
              </>
            )}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <div className={cn('flex-1 border border-gray-100 rounded-[12px] p-4 sm:p-6 transition-opacity relative', isOffline && 'opacity-60 grayscale')}>
            {isOffline && (
              <div className='absolute inset-0 z-20 flex items-center justify-center pointer-events-none'>
                <div className='bg-white/90 backdrop-blur-sm px-4 py-2 rounded-[8px] border border-gray-200 shadow-sm'>
                  <span className='text-sm font-semibold text-gray-900'>Schedule Paused</span>
                </div>
              </div>
            )}
            <AvailabilityTimelineGrid
              slots={slots}
              editable={editable && !isOffline}
              onDayClick={editable && !isOffline ? openDayEditor : undefined}
            />
          </div>

          <div className='w-full lg:w-64 flex flex-col gap-4'>
            <div className='border border-gray-100 rounded-[12px] p-5'>
              <div className='flex items-center justify-between mb-4'>
                <h4 className='text-sm font-semibold text-gray-900'>Today</h4>
                <div
                  className={cn(
                    'flex items-center gap-1.5 px-2 py-0.5 rounded-[9999px] border',
                    todaySlot
                      ? 'bg-[#14561C]/10 border-[#14561C]/20'
                      : 'bg-gray-100 border-gray-200',
                  )}
                >
                  <div
                    className={cn(
                      'w-1 h-1 rounded-[9999px]',
                      todaySlot ? 'bg-[#14561C]' : 'bg-gray-400',
                    )}
                  />
                  <span
                    className={cn(
                      'text-[10px] font-semibold uppercase',
                      todaySlot ? 'text-[#14561C]' : 'text-gray-500',
                    )}
                  >
                    {todaySlot ? 'Available' : 'Off'}
                  </span>
                </div>
              </div>
              {todaySlot ? (
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-xs text-gray-500 mb-1'>Opens</p>
                    <p className='text-sm font-medium text-gray-900'>
                      {to12HourLabel(todaySlot.start_time)}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500 mb-1 text-right'>Closes</p>
                    <p className='text-sm font-medium text-gray-900 text-right'>
                      {to12HourLabel(todaySlot.end_time)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className='text-xs text-gray-500'>No hours scheduled for today.</p>
              )}
            </div>

            <div className='border border-gray-100 rounded-[12px] p-5'>
              <h4 className='text-sm font-semibold text-gray-900 mb-4'>Schedule details</h4>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Time zone</span>
                  <span className='text-xs font-medium text-gray-900 text-right max-w-[140px] truncate'>
                    {timezone ?? '—'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Days configured</span>
                  <span className='text-xs font-medium text-gray-900'>{activeDayCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editable && (
        <EditAvailabilityDayModal
          open={editOpen}
          onOpenChange={setEditOpen}
          row={editRow}
          slot={editSlot}
          timezone={timezone}
          isSaving={isSaving}
          onSave={handleDaySave}
        />
      )}
    </>
  )
}
