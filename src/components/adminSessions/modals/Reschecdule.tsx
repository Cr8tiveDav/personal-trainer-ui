'use client'

import { useState } from 'react'
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react'

interface RescheduleModalProps {
  isOpen: boolean
  onClose: () => void
  sessionId: string | null
  currentScheduledTime?: string
  onConfirmReschedule: (id: string, newDate: string, newTime: string) => void
}

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export function RescheduleSessionModal({
  isOpen,
  onClose,
  sessionId,
  currentScheduledTime = 'Today, 9:00AM',
  onConfirmReschedule
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [error, setError] = useState('')

  if (!isOpen || !sessionId) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDate || !newTime) {
      setError('Please select both a valid date and time slot.')
      return
    }
    setError('')
    onConfirmReschedule(sessionId, newDate, newTime)
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in'>
      <div className='relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl flex flex-col text-xs text-[#111111] animate-in fade-in zoom-in-95 duration-150'>
        
        {/* Modal Header */}
        <div className='flex items-center justify-between border-b border-gray-100 pb-3.5'>
          <div>
            <h2 className='text-sm font-bold text-gray-900'>Reschedule Session</h2>
            <p className='text-[11px] text-gray-400 mt-0.5' title={`#${sessionId}`}>
              Modifying appointment rules for session #{formatSessionId(sessionId)}
            </p>
          </div>
          <button 
            type='button' 
            onClick={onClose} 
            className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          {/* Current Schedule Banner Warning */}
          <div className='rounded-lg bg-gray-50 border border-gray-100 p-3 flex justify-between items-center text-gray-600 font-medium'>
            <span className='text-gray-400'>Current Time</span>
            <span className='font-semibold text-gray-800'>{currentScheduledTime}</span>
          </div>

          {/* Date Input Entry Component */}
          <div className='space-y-1.5'>
            <label className='block font-semibold text-gray-700'>Choose New Date *</label>
            <div className='relative'>
              <CalendarIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
              <input 
                type='date'
                value={newDate}
                onChange={(e) => {
                  setNewDate(e.target.value)
                  if(error) setError('')
                }}
                className='w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#0b4d8d] focus:ring-1 focus:ring-[#0b4d8d]'
              />
            </div>
          </div>

          {/* Time Selector Dropdown block */}
          <div className='space-y-1.5'>
            <label className='block font-semibold text-gray-700'>Select Time Slot *</label>
            <div className='relative'>
              <Clock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
              <select
                value={newTime}
                onChange={(e) => {
                  setNewTime(e.target.value)
                  if(error) setError('')
                }}
                className='w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 bg-white appearance-none focus:outline-none focus:border-[#0b4d8d] focus:ring-1 focus:ring-[#0b4d8d]'
              >
                <option value=''>Select operational session time</option>
                <option value='08:00 AM'>08:00 AM</option>
                <option value='09:30 AM'>09:30 AM</option>
                <option value='11:00 AM'>11:00 AM</option>
                <option value='01:30 PM'>01:30 PM</option>
                <option value='03:00 PM'>03:00 PM</option>
                <option value='04:30 PM'>04:30 PM</option>
              </select>
            </div>
          </div>

          {/* Validation Feedback Line */}
          {error && <p className='text-red-500 font-medium text-[11px]'>{error}</p>}

          {/* Action Panel Actions Wrapper */}
          <div className='flex justify-end gap-2 border-t border-gray-100 pt-3.5 mt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 h-9 border border-gray-200 bg-white rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors'
            >
              Discard Changes
            </button>
            <button
              type='submit'
              className='px-4 h-9 bg-[#0b4d8d] hover:bg-[#093e72] text-white font-semibold rounded-lg shadow-none transition-all'
            >
              Confirm Reschedule
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
