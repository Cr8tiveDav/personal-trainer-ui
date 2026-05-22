'use client'

import { useEffect, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { useAdminSessions } from '@/hooks/adminSessions/useAdminSessions'
import { SessionsTable } from './SessionsTable'
import { SessionDetailsDrawer } from './modals/SessionDetails'
import { ForceConfirmSessionModal } from './modals/ForceConfirmSession'
import { RescheduleSessionModal } from './modals/Reschecdule'
import { Session } from './session'

interface SessionsListProps {
  loggedSessions?: Session[]
  sessionUpdates?: Record<string, Partial<Session>>
  onUpdateSession: (sessionId: string, updates: Partial<Session>) => void
}

const TABS = [
  { key: 'all', label: 'All Sessions' },
  { key: 'manual', label: 'Manual Entry' },
] as const

type TabKey = (typeof TABS)[number]['key']
const ROWS_PER_PAGE = 11

const filterSessionsByTab = (sessions: Session[], tab: TabKey) => {
  switch (tab) {
    case 'manual':
      return sessions.filter((session) => session.id.startsWith('S-MAN-'))
    case 'all':
    default:
      return sessions
  }
}

const normalizeSearchValue = (value: string) => value.trim().toLowerCase().replace(/^#/, '')

export default function SessionsList({
  loggedSessions = [],
  sessionUpdates = {},
  onUpdateSession
}: SessionsListProps) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedTrainer, setSelectedTrainer] = useState('all')
  const [isTrainerMenuOpen, setIsTrainerMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [forceConfirmSession, setForceConfirmSession] = useState<Session | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)

  const { data, isError, isLoading } = useAdminSessions()

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1)
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [search])

  const baseSessions: Session[] = data ?? []
  const sessions: Session[] = [...loggedSessions, ...baseSessions].map((session) => ({
    ...session,
    ...sessionUpdates[session.id],
  }))
  const tabCounts: Record<TabKey, number> = {
    all: sessions.length,
    manual: filterSessionsByTab(sessions, 'manual').length,
  }

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

  const handleCancelSession = (_id: string) => {
    void _id
  }

  const formatRescheduledTime = (newDate: string, newTime: string) => {
    const date = new Date(`${newDate}T00:00:00`)
    const formattedDate = Number.isNaN(date.getTime())
      ? newDate
      : date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        })

    return `${formattedDate}, ${newTime}`
  }

  const handleConfirmReschedule = (id: string, newDate: string, newTime: string) => {
    onUpdateSession(id, {
      scheduled: formatRescheduledTime(newDate, newTime),
      state: 'Scheduled',
    })
  }

  const handleForceConfirmSession = (sessionId: string) => {
    onUpdateSession(sessionId, {
      state: 'Completed',
      clientConf: 'Yes',
      trainerConf: 'Yes',
    })
    setForceConfirmSession(null)
  }

  const tabSessions = filterSessionsByTab(sessions, activeTab)
  const trainerNames = Array.from(
    new Set(
      tabSessions
        .map((session) => session.trainer.name)
        .filter((name) => name && name !== 'Unknown Trainer')
    )
  ).sort((a, b) => a.localeCompare(b))
  const normalizedSearch = normalizeSearchValue(debouncedSearch)
  const isFiltered = Boolean(normalizedSearch) || selectedTrainer !== 'all'
  const filteredSessions = tabSessions.filter(
    (session) =>
      (selectedTrainer === 'all' || session.trainer.name === selectedTrainer) &&
      (
        !normalizedSearch ||
        normalizeSearchValue(session.id).includes(normalizedSearch) ||
        normalizeSearchValue(session.client.name).includes(normalizedSearch) ||
        normalizeSearchValue(session.trainer.name).includes(normalizedSearch)
      )
  )
  const totalPages = Math.max(1, Math.ceil(filteredSessions.length / ROWS_PER_PAGE))
  const activePage = Math.min(currentPage, totalPages)
  const pageStartIndex = (activePage - 1) * ROWS_PER_PAGE
  const paginatedSessions = filteredSessions.slice(pageStartIndex, pageStartIndex + ROWS_PER_PAGE)

  return (
    <div className='space-y-0 w-full text-xs text-muted-foreground'>
      <div className='border-b border-gray-200 bg-white'>
        <nav className='flex items-center gap-0 px-4'>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type='button'
              onClick={() => {
                setActiveTab(tab.key)
                setSelectedTrainer('all')
                setIsTrainerMenuOpen(false)
                setCurrentPage(1)
              }}
              className={`relative flex items-center gap-1.5 px-3 py-3.5 text-xs font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.key
                  ? 'text-[#0b4d8d] border-b-2 border-[#0b4d8d] -mb-px'
                  : 'text-muted hover:text-gray-700 border-b-2 border-transparent -mb-px'
                }`}
            >
              {tab.label}
              {tabCounts[tab.key] > 0 && (
                <span className={`inline-flex items-center justify-center rounded-full text-[10px] font-bold h-4 min-w-[16px] px-1
                  ${activeTab === tab.key ? 'bg-[#0b4d8d]/10 text-[#0b4d8d]' : 'bg-gray-100 text-gray-500'}`}>
                  {tabCounts[tab.key]}
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
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              placeholder='Search by client, trainer, or session ID'
              className='w-full h-10 pl-9 pr-4 rounded-lg border border-gray-200 text-xs bg-white placeholder-gray-400 focus:outline-none focus:border-[#0b4d8d]'
            />
          </div>

          <div className='flex items-center gap-2'>
            <div className='relative'>
              <button
                type='button'
                onClick={() => setIsTrainerMenuOpen((isOpen) => !isOpen)}
                className='flex h-10 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 font-medium text-gray-700 transition-colors hover:bg-gray-50'
              >
                {selectedTrainer === 'all' ? 'All Trainers' : selectedTrainer}
                <ChevronDown className='h-3.5 w-3.5 text-gray-400' />
              </button>

              {isTrainerMenuOpen && (
                <div className='absolute right-0 top-11 z-30 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl'>
                  <button
                    type='button'
                    onClick={() => {
                      setSelectedTrainer('all')
                      setIsTrainerMenuOpen(false)
                      setCurrentPage(1)
                    }}
                    className={`block w-full px-3 py-2 text-left text-xs font-semibold transition-colors hover:bg-gray-50 ${
                      selectedTrainer === 'all' ? 'text-[#0b4d8d]' : 'text-gray-600'
                    }`}
                  >
                    All Trainers
                  </button>

                  {trainerNames.map((trainerName) => (
                    <button
                      key={trainerName}
                      type='button'
                      onClick={() => {
                        setSelectedTrainer(trainerName)
                        setIsTrainerMenuOpen(false)
                        setCurrentPage(1)
                      }}
                      className={`block w-full px-3 py-2 text-left text-xs font-semibold transition-colors hover:bg-gray-50 ${
                        selectedTrainer === trainerName ? 'text-[#0b4d8d]' : 'text-gray-600'
                      }`}
                    >
                      {trainerName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
          <div className='p-4 flex items-center justify-between border-b border-gray-100 bg-white'>
            {activeTab === 'all' ? (
              <h3 className='font-bold text-gray-900 tracking-tight'>All sessions</h3>
            ) : (
              <span aria-hidden='true' />
            )}
          </div>

          <SessionsTable
            sessions={paginatedSessions}
            variant={activeTab}
            isError={isError}
            isLoading={isLoading}
            isFiltered={isFiltered}
            currentPage={activePage}
            pageSize={ROWS_PER_PAGE}
            totalSessions={filteredSessions.length}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onForceConfirm={setForceConfirmSession}
            onMarkMissed={(id) => onUpdateSession(id, { state: 'Missed' })}
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

      <ForceConfirmSessionModal
        session={forceConfirmSession}
        onClose={() => setForceConfirmSession(null)}
        onConfirm={handleForceConfirmSession}
      />
    </div>
  )
}
