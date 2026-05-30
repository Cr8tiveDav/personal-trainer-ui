'use client'

import { useState, type FormEvent } from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface CancelSessionModalProps {
  isOpen: boolean
  onClose: () => void
  sessionId: string | null
  isSubmitting?: boolean
  onConfirmCancel: (id: string, reason: string) => void | Promise<void>
}

const CANCELLATION_REASONS = [
  { value: 'admin override', label: 'Admin override' },
  { value: 'client requested cancellation', label: 'Client requested cancellation' },
  { value: 'trainer unavailable', label: 'Trainer unavailable' },
  { value: 'scheduling conflict', label: 'Scheduling conflict' },
  { value: 'duplicate booking', label: 'Duplicate booking' },
] as const

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

export function CancelSessionModal({
  isOpen,
  onClose,
  sessionId,
  isSubmitting = false,
  onConfirmCancel,
}: CancelSessionModalProps) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  if (!isOpen || !sessionId) return null

  const handleClose = () => {
    if (isSubmitting) return
    setReason('')
    setError('')
    onClose()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!reason) {
      setError('Please select a cancellation reason.')
      return
    }

    setError('')

    try {
      await onConfirmCancel(sessionId, reason)
      setReason('')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not cancel session.')
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm animate-fade-in'>
      <div className='relative flex w-full max-w-md flex-col rounded-[16px] bg-white p-6 text-xs text-[#111111] shadow-2xl animate-in fade-in zoom-in-95 duration-150'>
        <div className='flex items-center justify-between border-b border-gray-100 pb-3.5'>
          <div>
            <h2 className='text-sm font-bold text-gray-900'>Cancel Session</h2>
            <p className='mt-0.5 text-[11px] text-gray-400' title={`#${sessionId}`}>
              Cancelling session #{formatSessionId(sessionId)}
            </p>
          </div>
          <button
            type='button'
            onClick={handleClose}
            disabled={isSubmitting}
            className='rounded-[9999px] p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-60'
            aria-label='Close cancel session modal'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div className='space-y-1.5'>
            <label htmlFor='cancel-session-reason' className='block font-semibold text-gray-700'>
              Cancellation Reason *
            </label>
            <select
              id='cancel-session-reason'
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                if (error) setError('')
              }}
              className='h-10 w-full rounded-[8px] border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 focus:border-[#0b4d8d] focus:outline-none focus:ring-1 focus:ring-[#0b4d8d]'
            >
              <option value=''>Select a reason</option>
              {CANCELLATION_REASONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='flex gap-3 rounded-[10px] border border-[#f0a8b2] bg-[#fff5f6] p-3 text-[#9c1e1c]'>
            <AlertTriangle className='mt-0.5 h-4 w-4 shrink-0' />
            <p className='text-[11px] font-semibold leading-relaxed'>
              Warning: cancelling this session cannot be undone.
            </p>
          </div>

          {error && <p className='text-[11px] font-medium text-red-500'>{error}</p>}

          <div className='mt-2 flex justify-end gap-2 border-t border-gray-100 pt-3.5'>
            <button
              type='button'
              onClick={handleClose}
              disabled={isSubmitting}
              className='h-9 rounded-[8px] border border-gray-200 bg-white px-4 font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              Keep Session
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='h-9 rounded-[8px] bg-[#c7374a] px-4 font-semibold text-white transition-colors hover:bg-[#a92f3f] disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isSubmitting ? 'Cancelling...' : 'Confirm Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
