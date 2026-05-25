'use client'

import { Clock } from 'lucide-react'
import { cn } from '@/utils'
import {
  AVAILABILITY_TIME_OPTIONS,
  timeToMinutesFromString,
} from '@/lib/availability/time-12h'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Time12HourSelectProps = {
  id?: string
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  /** Only show times strictly after this (24h HH:mm) — for “until” */
  minTime?: string
  /** Only show times strictly before this (24h HH:mm) — for “from” */
  maxTime?: string
}

function filterTimeOptions(minTime?: string, maxTime?: string) {
  const minMins = minTime ? timeToMinutesFromString(minTime) : null
  const maxMins = maxTime ? timeToMinutesFromString(maxTime) : null

  return AVAILABILITY_TIME_OPTIONS.filter((opt) => {
    const mins = timeToMinutesFromString(opt.value)
    if (minMins !== null && mins <= minMins) return false
    if (maxMins !== null && mins >= maxMins) return false
    return true
  })
}

export function Time12HourSelect({
  id,
  value,
  onChange,
  disabled = false,
  placeholder = 'Select time',
  className,
  minTime,
  maxTime,
}: Time12HourSelectProps) {
  const options = filterTimeOptions(minTime, maxTime)

  return (
    <Select
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        className={cn(
          'h-11 w-full gap-2 rounded-[8px] border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-none focus:border-[#0b4d8d] focus:ring-2 focus:ring-[rgba(11,77,141,0.1)] disabled:cursor-not-allowed disabled:opacity-70 [&>span]:line-clamp-1',
          className,
        )}
      >
        <Clock className='h-4 w-4 shrink-0 text-gray-400' />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='max-h-60 bg-white'>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
