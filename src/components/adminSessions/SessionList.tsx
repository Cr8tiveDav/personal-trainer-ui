'use client'

import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { useAdminSessions } from '@/api/sessions'
import { ReusableTabs } from '@/components/ui/ReusableTabs'
import { SessionsTable } from './SessionsTable'
import { SessionDetailsDrawer } from './modals/SessionDetails'
import { ForceConfirmContext, ForceConfirmSessionModal } from './modals/ForceConfirmSession'
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
  const [selectedTrainer, setSelectedTrainer] = useState('all')
  const [isTrainerMenuOpen, setIsTrainerMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [forceConfirmSession, setForceConfirmSession] = useState<Session | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)

  const { data, isError, isLoading } = useAdminSessions()

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

  const handleForceConfirmSession = (sessionId: string, context: ForceConfirmContext) => {
    onUpdateSession(sessionId, {
      state: 'Completed',
      clientConf: 'Yes',
      trainerConf: 'Yes',
      forceConfirmation: {
        ...context,
        confirmedAt: new Date().toISOString(),
      },
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
  const normalizedSearch = normalizeSearchValue(search)
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

  const sessionTabs = TABS.map((tab) => ({
    id: tab.key,
    label: tab.label,
    count: tabCounts[tab.key],
  }))

  const listKey = `${activeTab}-${search}-${selectedTrainer}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className='w-full space-y-0 text-xs text-muted-foreground'
    >
      <div className='border-b border-gray-200 bg-white px-4'>
        <ReusableTabs
          tabs={sessionTabs}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab)
            setSelectedTrainer('all')
            setIsTrainerMenuOpen(false)
            setCurrentPage(1)
          }}
          layoutId='sessions-filter-tabs'
          className='border-gray-200'
        />
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
                setCurrentPage(1)
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

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'
        >
          <div className='flex items-center justify-between border-b border-gray-100 bg-white p-4'>
            {activeTab === 'all' ? (
              <h3 className='font-bold tracking-tight text-gray-900'>All sessions</h3>
            ) : (
              <span aria-hidden='true' />
            )}
          </div>

          <SessionsTable
            listKey={listKey}
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
          />
        </motion.div>
      </div>

      <SessionDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        session={selectedSession}
        onReschedule={(id) => {
          setIsDetailsOpen(false)
          handleOpenReschedule(id)
        }}
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
    </motion.div>
  )
}
