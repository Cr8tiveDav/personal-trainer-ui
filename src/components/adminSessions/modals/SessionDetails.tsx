'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Session } from '../session'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  session: Session | null
  onReschedule?: (id: string) => void
}

const formatSessionId = (id: string) => {
  if (id.length <= 12) return id
  return `${id.slice(0, 8)}...${id.slice(-4)}`
}

const DEFAULT_SESSION_TYPE = 'Monthly'
const DEFAULT_SESSION_AMOUNT = '$20'
const DEFAULT_SESSION_STATE = 'Scheduled'

export function SessionDetailsDrawer({ isOpen, onClose, session, onReschedule }: DrawerProps) {
  if (!isOpen || !session) return null

  const confStyle = (val: string) => {
    if (val === 'Yes') return 'bg-[#e7f6ec] text-[#0f973d]'
    if (val === 'Pending') return 'bg-[#fff4e5] text-[#f59e0b]'
    return 'bg-[#f2f4f7] text-[#aaa]'
  }

  const dotStyle = (val: string) => {
    if (val === 'Yes') return 'bg-[#0f973d]'
    if (val === 'Pending') return 'bg-[#f59e0b]'
    return ''
  }

  const details = [
    { label: 'Session ID', value: `#${formatSessionId(session.id)}` },
    { label: 'Client', value: `${session.client.name} (${session.client.country})` },
    { label: 'Trainer', value: session.trainer.name },
    {
      label: 'Type',
      value: (
        <span className='inline-flex rounded-[9999px] bg-[#eef6ff] px-2 py-0.5 text-[10px] font-semibold text-[#0b4d8d]'>
          {DEFAULT_SESSION_TYPE}
        </span>
      ),
    },
    { label: 'Scheduled', value: session.scheduled },
    { label: 'Duration', value: session.duration },
    { label: 'Amount', value: DEFAULT_SESSION_AMOUNT },
    {
      label: 'Client Confirmation',
      value: (
        <span className={`inline-flex items-center gap-1.5 rounded-[9999px] px-2 py-0.5 text-[11px] font-semibold ${confStyle(session.clientConf)}`}>
          {session.clientConf !== 'N/A' && (
            <span className={`h-1.5 w-1.5 rounded-[9999px] ${dotStyle(session.clientConf)}`} />
          )}
          {session.clientConf}
        </span>
      ),
    },
    {
      label: 'State',
      value: (
        <span className='inline-flex rounded-[9999px] bg-[#edf6ff] px-2 py-0.5 text-[11px] font-semibold text-[#2272ad]'>
          {DEFAULT_SESSION_STATE}
        </span>
      ),
    },
  ]

  const timelineSteps = [
    { title: 'Session booked', desc: 'Auto-created on platform', active: true },
    {
      title:
        session.clientConf === 'Yes'
          ? `${session.client.name} confirmed session`
          : `${session.client.name} confirmation pending`,
      desc: session.clientConf === 'Yes' ? '2h ago' : 'Pending',
      active: session.clientConf === 'Yes',
    },
    {
      title:
        session.trainerConf === 'Yes'
          ? `${session.trainer.name} confirmed session`
          : `${session.trainer.name} confirmation pending`,
      desc: session.trainerConf === 'Yes' ? '1h ago' : 'Pending',
      active: session.trainerConf === 'Yes',
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose()
    }}>
      <DialogContent className='flex h-[90vh] max-w-xl grid-rows-none flex-col gap-0 overflow-hidden rounded-[18px] border-0 bg-white p-0 shadow-2xl sm:rounded-[18px]'>
        <DialogHeader className='border-b border-gray-100 px-6 py-5 pr-14 text-left'>
          <DialogTitle className='text-sm font-bold text-gray-900'>
            <span title={`#${session.id}`}>#{formatSessionId(session.id)}</span> - {session.client.name} / {session.trainer.name}
          </DialogTitle>
        </DialogHeader>

        <div className='hide_scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6'>
          <div className='rounded-[14px] border border-gray-100 p-5'>
            <div className='space-y-5 text-xs text-gray-600'>
              {details.map((item) => (
                <div key={item.label} className='flex items-center justify-between gap-6'>
                  <span className='font-medium text-gray-500'>{item.label}</span>
                  <span className='text-right font-bold text-gray-900'>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-[14px] border border-gray-100 p-5'>
            <p className='mb-5 border-b border-gray-100 pb-4 text-xs font-bold uppercase text-gray-500'>Timeline</p>
            <div className='relative space-y-4 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-gray-200'>
              {timelineSteps.map((step) => (
                <div key={step.title} className='relative flex gap-3 pl-0.5 text-xs'>
                  <div className={`z-10 mt-1 h-2 w-2 shrink-0 rounded-[9999px] ${step.active ? 'bg-[#2fb344]' : 'bg-gray-300'}`} />
                  <div>
                    <p className='font-bold text-gray-900'>{step.title}</p>
                    <p className='mt-0.5 text-[11px] text-gray-400'>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-5'>
          <button
            type='button'
            onClick={() => onReschedule?.(session.id)}
            className='h-9 min-w-36 rounded-[8px] border border-[#d8a21c] bg-[#fffaf0] px-4 text-xs font-semibold text-[#b7791f] transition-colors hover:bg-[#fff4da]'
          >
            Re-schedule
          </button>
          <button
            type='button'
            disabled
            title='Coming soon'
            className='h-9 min-w-36 cursor-not-allowed rounded-[8px] border border-[#f0a8b2] bg-white px-4 text-xs font-semibold text-[#c7374a] opacity-70'
          >
            Cancel Session
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
