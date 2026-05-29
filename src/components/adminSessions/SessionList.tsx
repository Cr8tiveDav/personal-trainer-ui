'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, ChevronDown, Plus } from 'lucide-react'
import { SessionsTable } from './SessionsTable'
import { SessionDetailsDrawer } from './modals/SessionDetails'
import { RescheduleSessionModal } from './modals/Reschecdule'
import { ApiSession, DUMMY_SESSIONS, Session, mapApiSession } from './session'

async function fetchAllSessions(): Promise<Session[]> {
  const res = await fetch('/api/admin/sessions')
  if (!res.ok) throw new Error('Failed to fetch sessions')
  const { data } = await res.json()
  return (data as ApiSession[]).map(mapApiSession)
}

const TABS = [
  { key: 'all', label: 'All Sessions' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
] as const

type TabKey = (typeof TABS)[number]['key']

function filterByTab(sessions: Session[], tab: TabKey): Session[] {
  if (tab === 'upcoming') return sessions.filter((s) => s.state === 'Scheduled')
  if (tab === 'completed') return sessions.filter((s) => s.state === 'Completed')
  if (tab === 'cancelled') return sessions.filter((s) => s.state === 'Cancelled')
  return sessions
}

export default function SessionsList() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [trainerFilter, setTrainerFilter] = useState<string>('all')
  const [stateFilter, setStateFilter] = useState<string>('all')
  const [trainerDropdownOpen, setTrainerDropdownOpen] = useState(false)
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)

  const { data, isError } = useQuery({
    queryKey: ['admin-sessions-list'],
    queryFn: fetchAllSessions,
    retry: 1,
  })

  const sessions: Session[] = isError ? DUMMY_SESSIONS : (data ?? [])

  // Tab counts derived from full (unfiltered) list
  const tabCounts = useMemo(
    () => ({
      all: sessions.length,
      upcoming: sessions.filter((s) => s.state === 'Scheduled').length,
      completed: sessions.filter((s) => s.state === 'Completed').length,
      cancelled: sessions.filter((s) => s.state === 'Cancelled').length,
    }),
    [sessions]
  )

  // Unique trainers for the dropdown
  const uniqueTrainers = useMemo(() => {
    const map = new Map<string, string>()
    sessions.forEach((s) => {
      if (s.trainerId) map.set(s.trainerId, s.trainer.name)
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [sessions])

  // All possible states in the current session list
  const uniqueStates = useMemo(() => {
    return Array.from(new Set(sessions.map((s) => s.state))).sort()
  }, [sessions])

  // Apply all filters in sequence
  const filteredSessions = useMemo(() => {
    let result = filterByTab(sessions, activeTab)

    if (trainerFilter !== 'all') {
      result = result.filter((s) => s.trainerId === trainerFilter)
    }

    if (stateFilter !== 'all') {
      result = result.filter(
        (s) => s.state.toLowerCase() === stateFilter.toLowerCase()
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.client.name.toLowerCase().includes(q) ||
          s.trainer.name.toLowerCase().includes(q)
      )
    }

    return result
  }, [sessions, activeTab, trainerFilter, stateFilter, search])

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
    console.log('Cancel session triggered for:', id)
  }

  const handleConfirmReschedule = (id: string, newDate: string, newTime: string) => {
    console.log(`Reschedule ${id} → ${newDate} at ${newTime}`)
  }

  const selectedTrainerLabel =
    trainerFilter === 'all'
      ? 'All Trainers'
      : (uniqueTrainers.find((t) => t.id === trainerFilter)?.name ?? 'All Trainers')

  const selectedStateLabel =
    stateFilter === 'all' ? 'All States' : stateFilter

  return (
    <div className='space-y-0 w-full text-xs text-muted-foreground'>
      {/* Tabs */}
      <div className='border-b border-gray-200 bg-white'>
        <nav className='flex items-center gap-0 px-4'>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type='button'
              onClick={() => {
                setActiveTab(tab.key)
                setTrainerFilter('all')
                setStateFilter('all')
              }}
              className={`relative flex items-center gap-1.5 px-3 py-3.5 text-xs font-medium transition-colors whitespace-nowrap
                ${
                  activeTab === tab.key
                    ? 'text-[#0b4d8d] border-b-2 border-[#0b4d8d] -mb-px'
                    : 'text-muted hover:text-gray-700 border-b-2 border-transparent -mb-px'
                }`}
            >
              {tab.label}
              {tabCounts[tab.key] > 0 && (
                <span
                  className={`inline-flex items-center justify-center rounded-full text-[10px] font-bold h-4 min-w-[16px] px-1
                  ${
                    activeTab === tab.key
                      ? 'bg-[#0b4d8d]/10 text-[#0b4d8d]'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {tabCounts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className='space-y-4 pt-4'>
        {/* Search + filter bar */}
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
            {/* State filter */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => {
                  setStateDropdownOpen((v) => !v)
                  setTrainerDropdownOpen(false)
                }}
                className='flex items-center gap-1.5 px-3 h-10 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors'
              >
                {selectedStateLabel}
                <ChevronDown className='h-3.5 w-3.5 text-gray-400' />
              </button>
              {stateDropdownOpen && (
                <div className='absolute right-0 mt-1 w-40 rounded-xl border border-gray-100 bg-white shadow-xl z-50 py-1'>
                  <button
                    type='button'
                    onClick={() => {
                      setStateFilter('all')
                      setStateDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium ${stateFilter === 'all' ? 'text-[#0b4d8d]' : 'text-gray-700'}`}
                  >
                    All States
                  </button>
                  {uniqueStates.map((state) => (
                    <button
                      key={state}
                      type='button'
                      onClick={() => {
                        setStateFilter(state)
                        setStateDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium ${stateFilter === state ? 'text-[#0b4d8d]' : 'text-gray-700'}`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trainer filter */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => {
                  setTrainerDropdownOpen((v) => !v)
                  setStateDropdownOpen(false)
                }}
                className='flex items-center gap-1.5 px-3 h-10 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors max-w-[160px]'
              >
                <span className='truncate'>{selectedTrainerLabel}</span>
                <ChevronDown className='h-3.5 w-3.5 text-gray-400 shrink-0' />
              </button>
              {trainerDropdownOpen && (
                <div className='absolute right-0 mt-1 w-52 rounded-xl border border-gray-100 bg-white shadow-xl z-50 py-1 max-h-60 overflow-y-auto'>
                  <button
                    type='button'
                    onClick={() => {
                      setTrainerFilter('all')
                      setTrainerDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium ${trainerFilter === 'all' ? 'text-[#0b4d8d]' : 'text-gray-700'}`}
                  >
                    All Trainers
                  </button>
                  {uniqueTrainers.map((t) => (
                    <button
                      key={t.id}
                      type='button'
                      onClick={() => {
                        setTrainerFilter(t.id)
                        setTrainerDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 font-medium truncate ${trainerFilter === t.id ? 'text-[#0b4d8d]' : 'text-gray-700'}`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
          <div className='p-4 flex items-center justify-between border-b border-gray-100 bg-white'>
            <div>
              <h3 className='font-bold text-gray-900 tracking-tight'>
                {TABS.find((t) => t.key === activeTab)?.label}
              </h3>
              <p className='text-[10px] text-gray-400 mt-0.5'>
                {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              type='button'
              className='flex items-center gap-1.5 px-3.5 h-9 bg-[#0b4d8d] text-white font-semibold rounded-lg text-xs transition-all hover:bg-[#093e71]'
            >
              <Plus className='h-3.5 w-3.5' /> Log Session
            </button>
          </div>

          {filteredSessions.length === 0 ? (
            <div className='py-16 text-center text-sm text-gray-400 font-medium'>
              No sessions match your current filters.
            </div>
          ) : (
            <SessionsTable
              sessions={filteredSessions}
              onSelectDetails={handleOpenDetails}
              onSelectReschedule={handleOpenReschedule}
              onSelectCancel={handleCancelSession}
            />
          )}
        </div>
      </div>

      {/* Click-outside handler for dropdowns */}
      {(trainerDropdownOpen || stateDropdownOpen) && (
        <div
          className='fixed inset-0 z-40'
          onClick={() => {
            setTrainerDropdownOpen(false)
            setStateDropdownOpen(false)
          }}
        />
      )}

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
