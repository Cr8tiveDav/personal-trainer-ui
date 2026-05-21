'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, ChevronDown, Plus } from 'lucide-react'
import { SessionsTable } from './SessionsTable'
import { SessionDetailsDrawer } from './modals/SessionDetails'
import { RescheduleSessionModal } from './modals/Reschecdule'
import { DUMMY_SESSIONS, Session } from './session'

async function fetchSessionsData(): Promise<Session[]> {
  const res = await fetch('/api/v1/sessions')
  if (!res.ok) throw new Error('Failed to fetch sessions data')
  const data = await res.json()
  return data.data
}

const TABS = [
  { key: 'all', label: 'All Sessions' },
  { key: 'confirmation', label: 'Confirmation Queue', count: 1 },
  { key: 'missed', label: 'Missed Sessions' },
  { key: 'manual', label: 'Manual Entry' },
] as const

type TabKey = (typeof TABS)[number]['key']

export default function SessionsList() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['admin-sessions-list'],
    queryFn: fetchSessionsData,
  })

  const sessions: Session[] = data ?? DUMMY_SESSIONS

  const handleOpenDetails = (id: string) => {
    const target = sessions.find((s) => s.id === id)
    if (target) {
      setSelectedSession(target)
      setIsDetailsOpen(true)
    }
  }

  const handleOpenReschedule = (id: string) => {
    const target = sessions.find((s) => s.id === id)
    if (target) {
      setSelectedSession(target)
      setIsRescheduleOpen(true)
    }
  }

  const handleCancelSession = (id: string) => {
    console.log('Cancel session implementation triggered for:', id)
  }

  const handleConfirmReschedule = (id: string, newDate: string, newTime: string) => {
    console.log(`API dispatch -> Reschedule session ${id} to ${newDate} at ${newTime}`)
  }

  const filteredSessions = sessions.filter(
    (session) =>
      session.id.toLowerCase().includes(search.toLowerCase()) ||
      session.client.name.toLowerCase().includes(search.toLowerCase()) ||
      session.trainer.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='space-y-0 w-full text-xs text-muted-foreground'>
      <div className='border-b border-gray-200 bg-white'>
        <nav className='flex items-center gap-0 px-4'>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type='button'
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-1.5 px-3 py-3.5 text-xs font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.key
                  ? 'text-[#0b4d8d] border-b-2 border-[#0b4d8d] -mb-px'
                  : 'text-muted hover:text-gray-700 border-b-2 border-transparent -mb-px'
                }`}
            >
              {tab.label}
              {'count' in tab && tab.count > 0 && (
                <span className={`inline-flex items-center justify-center rounded-full text-[10px] font-bold h-4 min-w-[16px] px-1
                  ${activeTab === tab.key ? 'bg-[#0b4d8d]/10 text-[#0b4d8d]' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className='space-y-4 pt-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div className='relative flex-1 min-w-[280px] max-w-md'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by client, trainer, or session ID'
              className='w-full h-10 pl-9 pr-4 rounded-lg border border-gray-200 text-xs bg-white placeholder-gray-400 focus:outline-none focus:border-[#0b4d8d]'
            />
          </div>

          <div className='flex items-center gap-2'>
            <button type='button' className='flex items-center gap-1.5 px-3 h-10 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
              All States <ChevronDown className='h-3.5 w-3.5 text-gray-400' />
            </button>
            <button type='button' className='flex items-center gap-1.5 px-3 h-10 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
              All Trainers <ChevronDown className='h-3.5 w-3.5 text-gray-400' />
            </button>
          </div>
        </div>

        <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
          <div className='p-4 flex items-center justify-between border-b border-gray-100 bg-white'>
            <h3 className='font-bold text-gray-900 tracking-tight'>All sessions</h3>
            <button
              type='button'
              className='flex items-center gap-1.5 px-3.5 h-9 bg-[#0b4d8d] text-white font-semibold rounded-lg text-xs transition-all hover:bg-[#093e71]'
            >
              <Plus className='h-3.5 w-3.5' /> Log Session
            </button>
          </div>

          <SessionsTable
            sessions={filteredSessions}
            onSelectDetails={handleOpenDetails}
            onSelectReschedule={handleOpenReschedule}
            onSelectCancel={handleCancelSession}
          />
        </div>
      </div>

      <SessionDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        session={selectedSession}
        onReschedule={(id) => {
          setIsDetailsOpen(false)
          handleOpenReschedule(id)
        }}
        onCancel={handleCancelSession}
      />

      <RescheduleSessionModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        sessionId={selectedSession?.id ?? null}
        currentScheduledTime={selectedSession?.scheduled}
        onConfirmReschedule={handleConfirmReschedule}
      />
    </div>
  )
}