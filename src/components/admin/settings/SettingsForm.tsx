'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

const DEFAULT_CATEGORIES = ['Strength', 'Yoga', 'HIIT', 'Pilates', 'Endurance', 'Weight loss', 'Mobility']

export function SettingsForm() {
  const [sessionDuration, setSessionDuration] = useState('60')
  const [maxTrainers, setMaxTrainers] = useState('6')
  const [requireVideo, setRequireVideo] = useState(true)
  const [autoAssign, setAutoAssign] = useState(false)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [newCategory, setNewCategory] = useState('')

  function removeCategory(cat: string) {
    setCategories((prev) => prev.filter((c) => c !== cat))
  }

  function addCategory() {
    const trimmed = newCategory.trim()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed])
      setNewCategory('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addCategory()
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Settings</h1>
          <p className='mt-1 text-sm text-gray-500'>Configure how FitCall handles bookings, trainers, and content.</p>
        </div>
        <button className='shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90'>
          Save Changes
        </button>
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='text-base font-bold text-gray-900'>General</h2>
        <p className='mt-0.5 text-sm text-gray-400'>Defaults applied to every booking and listing.</p>

        <div className='mt-5 space-y-5'>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Default Session Duration</p>
              <p className='mt-0.5 text-xs text-gray-400'>Used when a client doesn&apos;t specify a length.</p>
            </div>
            <div className='relative'>
              <select
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className='w-44 appearance-none rounded-lg border border-gray-200 px-4 py-2 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20'
              >
                <option value='30'>30 minutes</option>
                <option value='45'>45 minutes</option>
                <option value='60'>60 minutes</option>
                <option value='90'>90 minutes</option>
                <option value='120'>120 minutes</option>
              </select>
              <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>▾</span>
            </div>
          </div>

          <div className='border-t border-gray-100' />

          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Max Trainers Displayed</p>
              <p className='mt-0.5 text-xs text-gray-400'>Maximum trainers shown on the client discovery page.</p>
            </div>
            <div className='relative'>
              <select
                value={maxTrainers}
                onChange={(e) => setMaxTrainers(e.target.value)}
                className='w-44 appearance-none rounded-lg border border-gray-200 px-4 py-2 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20'
              >
                {['3', '4', '5', '6', '8', '10', '12'].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>▾</span>
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='text-base font-bold text-gray-900'>Trainer Rules</h2>
        <p className='mt-0.5 text-sm text-gray-400'>Control which trainers are eligible to be listed and assigned.</p>

        <div className='mt-5 space-y-5'>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Require video before listing</p>
              <p className='mt-0.5 text-xs text-gray-400'>Hide any trainer that does not have an active intro video.</p>
            </div>
            <button
              onClick={() => setRequireVideo((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
                requireVideo ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
                  requireVideo ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className='border-t border-gray-100' />

          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Auto-assign trainer</p>
              <p className='mt-0.5 text-xs text-gray-400'>Automatically match new requests to the best available trainer.</p>
            </div>
            <button
              onClick={() => setAutoAssign((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
                autoAssign ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
                  autoAssign ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='text-base font-bold text-gray-900'>Categories</h2>
        <p className='mt-0.5 text-sm text-gray-400'>Specialties available for trainers and client requests.</p>

        <div className='mt-5 flex flex-wrap gap-2'>
          {categories.map((cat) => (
            <span
              key={cat}
              className='flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700'
            >
              {cat}
              <button onClick={() => removeCategory(cat)} className='text-gray-400 hover:text-gray-600'>
                <X className='h-3.5 w-3.5' />
              </button>
            </span>
          ))}
        </div>

        <div className='mt-4 flex items-center gap-3'>
          <input
            type='text'
            placeholder='Add a category...'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
          />
          <button
            onClick={addCategory}
            disabled={!newCategory.trim()}
            className='flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40'
          >
            <Plus className='h-4 w-4' />
            Add category
          </button>
        </div>
      </div>
    </div>
  )
}
