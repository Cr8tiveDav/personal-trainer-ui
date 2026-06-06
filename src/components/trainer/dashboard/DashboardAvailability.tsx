'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Video } from 'lucide-react'
import { useMyTrainerAvailability } from '@/api/availability'
import type { AvailabilitySlot } from '@/api/types/availability'
import { DashboardAvailabilitySidebarSkeleton } from './dashboard-skeleton-parts'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'
import { WEEK_DAYS } from '@/lib/availability/week-days'
import { snapToTimeOption } from '@/lib/availability/time-12h'
import { cn } from '@/utils'

const PLATFORMS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'meet', label: 'Google Meet' },
  { id: 'zoom', label: 'Zoom' },
  { id: 'in-app', label: 'Video Call (In-App)', icon: true },
] as const

function formatTimeRange(start: string, end: string): string {
  const from = snapToTimeOption(start)
  const to = snapToTimeOption(end)
  if (!from || !to) return '—'
  return `${from}-${to}`
}

function slotByDay(slots: AvailabilitySlot[]) {
  const map = new Map<number, AvailabilitySlot>()
  for (const slot of slots) {
    map.set(slot.day_of_week, slot)
  }
  return map
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-[9999px] transition-colors',
        checked ? 'bg-[#06365F]' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 left-0.5 h-5 w-5 rounded-[9999px] bg-white shadow transition-transform',
          checked && 'translate-x-5',
        )}
      />
    </button>
  )
}

export function DashboardAvailability({ className }: { className?: string }) {
  const { data: slots = [], isLoading, isError, isSuccess } =
    useMyTrainerAvailability()

  const [platforms, setPlatforms] = useState<Record<string, boolean>>({
    whatsapp: true,
    meet: true,
    zoom: true,
    'in-app': true,
  })

  const dayMap = useMemo(() => slotByDay(slots), [slots])
  const hasSlots = slots.length > 0

  if (isLoading && !hasSlots) {
    return (
      <DashboardAvailabilitySidebarSkeleton
        className={cn('h-full min-h-0 flex-1', className)}
      />
    )
  }

  if (isError || !isSuccess || !hasSlots) {
    return (
      <div className={cn('flex h-full min-h-0 flex-col', className)}>
        <div className='flex min-h-0 flex-1 flex-col rounded-[12px] border border-gray-100 bg-white'>
          <EmptyState
            imageSrc={EMPTY_STATE_IMAGE_PATHS.availability}
            imageAlt='No availability'
            title='No availability set yet'
            description='Your schedule will appear here once availability is configured.'
            className='min-h-[200px] py-8'
          />
          <div className='border-t border-gray-100 px-5 pb-5 text-center'>
            <Link
              href='/trainer/availability'
              className='text-sm font-medium text-primary hover:underline'
            >
              Set availability →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex h-full min-h-0 flex-col gap-4', className)}>
      <div className='flex min-h-0 flex-1 flex-col rounded-[12px] border border-gray-100 bg-white'>
        <div className='border-b border-gray-100 px-5 py-4'>
          <h3 className='text-sm font-semibold text-gray-900'>Set Your Availability</h3>
          <p className='mt-0.5 text-xs text-gray-500'>
            Update when you&apos;re available for new sessions
          </p>
        </div>
        <div className='divide-y divide-gray-50 px-5'>
          {WEEK_DAYS.map((day) => {
            const slot = dayMap.get(day.value)
            const enabled = Boolean(slot)
            return (
              <div
                key={day.value}
                className='flex items-center justify-between gap-3 py-3'
              >
                <span className='text-sm font-medium text-gray-800'>{day.fullLabel}</span>
                <div className='flex items-center gap-3'>
                  {enabled && slot ? (
                    <span className='text-xs text-gray-500'>
                      {formatTimeRange(slot.start_time, slot.end_time)}
                    </span>
                  ) : (
                    <span className='text-xs text-gray-400'>Off</span>
                  )}
                  <Toggle checked={enabled} onChange={() => {}} disabled />
                </div>
              </div>
            )
          })}
        </div>
        <div className='border-t border-gray-100 px-5 py-3 text-right'>
          <Link
            href='/trainer/availability'
            className='text-xs font-medium text-primary hover:underline'
          >
            Edit availability →
          </Link>
        </div>
      </div>

      <div className='shrink-0 rounded-[12px] border border-gray-100 bg-white'>
        <div className='border-b border-gray-100 px-5 py-4'>
          <h3 className='text-sm font-semibold text-gray-900'>Set Your Availability</h3>
          <p className='mt-0.5 text-xs text-gray-500'>
            Update when you&apos;re available for new sessions
          </p>
        </div>
        <div className='space-y-3 px-5 py-4'>
          {PLATFORMS.map((platform) => (
            <label
              key={platform.id}
              className='flex cursor-pointer items-center gap-3'
            >
              <input
                type='checkbox'
                checked={platforms[platform.id] ?? false}
                onChange={() =>
                  setPlatforms((prev) => ({
                    ...prev,
                    [platform.id]: !prev[platform.id],
                  }))
                }
                className='h-4 w-4 rounded-[4px] border-gray-300 text-primary focus:ring-primary'
              />
              <span className='flex items-center gap-2 text-sm text-gray-700'>
                {'icon' in platform && platform.icon ? (
                  <Video className='h-4 w-4 text-gray-900' />
                ) : null}
                {platform.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
