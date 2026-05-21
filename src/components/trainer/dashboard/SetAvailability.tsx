'use client'

import { useState } from 'react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const PLATFORMS = ['Online (Video Call)', 'In-Person']

export function SetAvailability() {
  const [activeDays, setActiveDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const [activePlatforms, setActivePlatforms] = useState<string[]>(['Online (Video Call)'])

  function toggleDay(day: string) {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  function togglePlatform(platform: string) {
    setActivePlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    )
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
          <div className='flex flex-wrap gap-2'>
            {DAYS.map((day) => {
              const isActive = activeDays.includes(day)
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors border ${
                    isActive
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
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

        <button className='w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors'>
          Save Availability
        </button>
      </div>
    </div>
  )
}
