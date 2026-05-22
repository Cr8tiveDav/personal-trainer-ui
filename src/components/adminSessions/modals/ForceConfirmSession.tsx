'use client'

import { useState } from 'react'
import { User, UserRoundCheck, UsersRound, X } from 'lucide-react'
import { Session } from '../session'

interface ForceConfirmSessionModalProps {
  session: Session | null
  onClose: () => void
  onConfirm: (sessionId: string) => void
}

const behalfOptions = [
  {
    key: 'client',
    title: 'Client Only',
    description: 'Trainer already confirmed. Client has not responded.',
    icon: User,
  },
  {
    key: 'trainer',
    title: 'Trainer Only',
    description: 'Client already confirmed. Trainer has not responded.',
    icon: UserRoundCheck,
  },
  {
    key: 'both',
    title: 'Both Parties',
    description: 'Neither has confirmed. Admin confirms for both.',
    icon: UsersRound,
  },
] as const

const reasons = [
  'Trainer confirmed via WhatsApp or external message',
  'Client confirmed via email or external message',
  'Both parties confirmed outside the app',
  'Confirmation window expired - session independently verified',
  'Technical issue prevented one or both parties from confirming',
]

export function ForceConfirmSessionModal({ session, onClose, onConfirm }: ForceConfirmSessionModalProps) {
  const [behalf, setBehalf] = useState<(typeof behalfOptions)[number]['key']>('client')
  const [reason, setReason] = useState(reasons[1])
  const [notes, setNotes] = useState('')

  if (!session) return null

  const handleConfirm = () => {
    void [behalf, reason, notes]
    onConfirm(session.id)
  }

  const typeStyles: Record<string, string> = {
    'Free Trial': 'bg-[#fffbeb] text-[#d97706]',
    'One Time': 'bg-gray-50 text-gray-500',
    Monthly: 'bg-[#eff8ff] text-[#175cd3]',
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm'>
      <div className='relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl'>
        <div className='flex items-start justify-between border-b border-gray-100 p-6 pb-4'>
          <div>
            <h2 className='text-sm font-bold text-gray-900'>Force Confirm Session</h2>
            <p className='mt-1 text-[11px] font-medium text-gray-400'>Admin override - this will mark the session as Completed</p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <div className='overflow-y-auto px-6 py-5'>
          <div className='space-y-3 border-b border-gray-100 pb-5 text-xs'>
            {[
              { label: 'Session ID', value: `#${session.id}` },
              { label: 'Client', value: `${session.client.name} (${session.client.country})` },
              { label: 'Trainer', value: session.trainer.name },
              { label: 'Type of Subscription', value: session.type, isBadge: true },
              { label: 'Scheduled', value: session.scheduled },
              { label: 'Duration', value: session.duration },
              { label: 'Amount', value: `$${session.amount}` },
            ].map((item) => (
              <div key={item.label} className='flex items-center justify-between gap-4'>
                <span className='font-medium text-gray-400'>{item.label}</span>
                {item.isBadge ? (
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${typeStyles[item.value] ?? 'bg-gray-50 text-gray-500'}`}>
                    {item.value}
                  </span>
                ) : (
                  <span className='font-bold text-gray-900'>{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <div className='mt-5 space-y-5'>
            <div>
              <p className='mb-3 text-xs font-bold text-gray-900'>Who Are You Confirming On Behalf Of?</p>
              <div className='grid gap-3 md:grid-cols-3'>
                {behalfOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = behalf === option.key

                  return (
                    <button
                      key={option.key}
                      type='button'
                      onClick={() => setBehalf(option.key)}
                    className={`rounded-lg border p-4 text-center transition-colors ${
                      isSelected
                        ? 'border-[#0b4d8d] bg-[#eff8ff]'
                        : 'border-gray-100 bg-white hover:bg-gray-50'
                    }`}
                  >
                      <span className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${isSelected ? 'bg-[#0b4d8d] text-white' : 'bg-[#eff8ff] text-[#0b4d8d]'}`}>
                        <Icon className='h-4 w-4' />
                      </span>
                      <span className='mt-2 block text-xs font-bold text-gray-900'>{option.title}</span>
                      <span className='mt-1 block text-[10px] leading-relaxed text-gray-400'>{option.description}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className='mb-2 text-xs font-bold text-gray-900'>Why Are You Force Confirming?</p>
              <div className='space-y-2'>
                {reasons.map((item) => (
                  <label key={item} className='flex cursor-pointer items-center gap-2 rounded-md py-1 text-xs font-medium text-gray-500'>
                    <input
                      type='radio'
                      name='force-confirm-reason'
                      value={item}
                      checked={reason === item}
                      onChange={(event) => setReason(event.target.value)}
                      className='h-3.5 w-3.5 accent-[#0b4d8d]'
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className='mb-1 block text-xs font-bold text-gray-900'>Additional notes (optional)</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder='Add internal notes for this audit trail...'
                className='min-h-20 w-full resize-none rounded-lg border border-gray-100 px-3 py-2 text-xs outline-none focus:border-[#0b4d8d]'
              />
            </div>

            <div className='rounded-md border border-[#ffeccc] bg-[#fffcf5] px-3 py-2 text-[11px] font-medium leading-relaxed text-[#b25e00]'>
              Once you confirm, the trainer will be paid for this session at the end of the month. This cannot be reversed, and your name will be recorded as the admin who approved it.
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-2 border-t border-gray-100 p-4'>
          <button
            type='button'
            onClick={onClose}
            className='h-9 rounded-md border border-gray-200 px-4 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            className='h-9 rounded-md bg-[#0b4d8d] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#093e71]'
          >
            Confirm & Mark as Completed
          </button>
        </div>
      </div>
    </div>
  )
}
