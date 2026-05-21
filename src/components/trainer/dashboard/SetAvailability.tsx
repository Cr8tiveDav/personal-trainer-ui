'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getTrainerAvailability, saveTrainerAvailability, AvailabilitySlot } from '@/actions/trainerAvailability'

const DAYS: { label: string; value: number }[] = [
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
  { label: 'Sun', value: 0 },
]

const PLATFORMS = ['Online (Video Call)', 'In-Person']
const DEFAULT_START = '09:00'
const DEFAULT_END = '17:00'

export function SetAvailability() {
  const [activeDays, setActiveDays] = useState<number[]>([1, 2, 3, 4, 5])
  const [activePlatforms, setActivePlatforms] = useState<string[]>(['Online (Video Call)'])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrainerAvailability().then((slots) => {
      if (slots.length > 0) {
        setActiveDays(slots.map((s) => s.day_of_week))
      }
      setLoading(false)
    })
  }, [])

  function toggleDay(day: number) {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  function togglePlatform(platform: string) {
    setActivePlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    )
  }

  async function handleSave() {
    setSaving(true)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

    const slots: AvailabilitySlot[] = activeDays.map((day) => ({
      day_of_week: day,
      start_time: DEFAULT_START,
      end_time: DEFAULT_END,
      timezone,
    }))

    const result = await saveTrainerAvailability(slots)

    if (result.success) {
      toast.success('Availability saved!')
    } else {
      toast.error(result.error || 'Failed to save availability')
    }

    setSaving(false)
  }

  return (
    <div className='rounded-xl border border-gray-100 bg-white shadow-sm h-full'>
      <div className='border-b border-gray-100 px-5 py-4'>
        <h3 className='text-sm font-semibold text-gray-900'>Set Your Availability</h3>
        <p className='text-xs text-gray-400 mt-0.5'>Select the days and platforms you&apos;re available</p>
      </div>
      <div className='px-5 py-5 space-y-6'>
        <div>
          <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3'>Available Days</p>
          {loading ? (
            <div className='flex gap-2'>
              {DAYS.map((d) => (
                <div key={d.value} className='h-9 w-12 rounded-lg bg-gray-100 animate-pulse' />
              ))}
            </div>
          ) : (
            <div className='flex flex-wrap gap-2'>
              {DAYS.map((day) => {
                const isActive = activeDays.includes(day.value)
                return (
                  <button
                    key={day.value}
                    onClick={() => toggleDay(day.value)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors border ${
                      isActive
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {day.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3'>Platform</p>
          <div className='space-y-2.5'>
            {PLATFORMS.map((platform) => {
              const isActive = activePlatforms.includes(platform)
              return (
                <label key={platform} className='flex items-center gap-3 cursor-pointer'>
                  <div
                    onClick={() => togglePlatform(platform)}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      isActive ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isActive && (
                      <svg className='h-3 w-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    )}
                  </div>
                  <span className='text-sm text-gray-700'>{platform}</span>
                </label>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className='w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {saving ? 'Saving...' : 'Save Availability'}
        </button>
      </div>
    </div>
  )
}
