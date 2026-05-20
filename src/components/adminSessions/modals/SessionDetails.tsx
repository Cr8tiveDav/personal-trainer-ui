'use client'

import { X, Check } from 'lucide-react'
import { Session } from '../session'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  session: Session | null
  onReschedule?: (id: string) => void
  onCancel?: (id: string) => void
}

export function SessionDetailsDrawer({ isOpen, onClose, session, onReschedule, onCancel }: DrawerProps) {
  if (!isOpen || !session) return null

  const isCompletedLayout = ['Completed', 'Settled', 'Disputed', 'Missed'].includes(session.state)

  const stateBadgeStyles: Record<Session['state'], string> = {
    Completed: 'bg-[#e7f6ec] text-[#0f973d]',
    Unconfirmed: 'bg-[#fff4e5] text-[#f59e0b]',
    Scheduled: 'bg-[#eff8ff] text-[#175cd3]',
    Settled: 'bg-[#e7f6ec] text-[#0f973d]',
    Disputed: 'bg-[#fef3f2] text-[#d92d20]',
    Missed: 'bg-[#f2f4f7] text-[#475467]',
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in'>
      <div className='relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150'>
        
        {/* Header Section */}
        <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
          <h2 className='text-xs font-bold text-gray-900'>
            #{session.id} — {session.client.name} / {session.trainer.name}
          </h2>
          <button type='button' onClick={onClose} className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors'>
            <X className='h-4 w-4' />
          </button>
        </div>

        {/* Info Grid Metadata Block */}
        <div className='py-4 space-y-5 text-xs text-gray-600'>
          {[
            { label: 'Session ID', value: `#${session.id}`, isBold: true },
            { label: 'Client', value: `${session.client.name} (${session.client.country})` },
            { label: 'Trainer', value: session.trainer.name },
            { label: 'Type of Subscription', value: session.type, isBadge: true },
            { label: 'Scheduled', value: session.scheduled, isBold: true },
            { label: 'Duration', value: session.duration, isBold: true },
            { label: 'Amount', value: `$${session.amount}`, isBold: true },
          ].map((item, idx) => (
            <div key={idx} className='flex justify-between items-center'>
              <span className='text-muted font-medium'>{item.label}</span>
              {item.isBadge ? (
                <span className='rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 uppercase'>{item.value}</span>
              ) : (
                <span className={item.isBold ? 'font-bold text-gray-900' : 'font-medium text-muted-foreground'}>{item.value}</span>
              )}
            </div>
          ))}

          {/* Context Styles Matrix for Core Action Layout Fields */}
          <div className='flex justify-between items-center'>
            <span className='text-gray-muted font-medium'>State</span>
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${stateBadgeStyles[session.state]}`}>{session.state}</span>
          </div>

          {['Client Confirmation', 'Trainer Confirmation'].map((label, index) => {
            const confValue = index === 0 ? session.clientConf : session.trainerConf
            return (
              <div key={label} className='flex justify-between items-center'>
                <span className='text-gray-muted font-medium'>{label}</span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${confValue === 'Yes' ? 'text-[#0f973d]' : 'text-gray-400'}`}>
                  {confValue === 'Yes' && <Check className='h-3.5 w-3.5' />} {confValue === 'Yes' ? 'Confirmed' : confValue}
                </span>
              </div>
            )
          })}
        </div>

        {/* Timeline Historical Activity Logger Block */}
        <div className='mt-2 rounded-xl border border-gray-100 p-4'>
          <p className='text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-4'>Timeline</p>
          <div className='space-y-4 relative before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-0.5 before:bg-gray-200'>
            {[
              { title: 'Session booked', desc: 'Auto-created on platform', active: true },
              { title: `${session.client.name} confirmed session`, desc: '2h ago', active: true },
              { title: `${session.trainer.name} confirmed session`, desc: '1h ago', active: session.trainerConf === 'Yes' },
            ].map((step, idx) => (
              <div key={idx} className='flex gap-3 pl-0.5 text-xs relative'>
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 z-10 ${step.active ? 'bg-[#0f973d]' : 'bg-gray-300'}`} />
                <div>
                  <p className='font-bold text-gray-900'>{step.title}</p>
                  <p className='text-[11px] text-gray-400 mt-0.5'>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action Bar Logic Wrapper */}
        {!isCompletedLayout && (
          <div className='mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4'>
            <button
              type='button'
              onClick={() => onReschedule?.(session.id)}
              className='px-4 h-9 rounded-lg border border-orange-200 bg-white text-xs font-semibold text-orange-600 hover:bg-orange-50/50 transition-colors'
            >
              Reschedule
            </button>
            <button
              type='button'
              onClick={() => onCancel?.(session.id)}
              className='px-4 h-9 rounded-lg border border-red-200 bg-white text-xs font-semibold text-red-600 hover:bg-red-50/50 transition-colors'
            >
              Cancel Session
            </button>
          </div>
        )}

      </div>
    </div>
  )
}