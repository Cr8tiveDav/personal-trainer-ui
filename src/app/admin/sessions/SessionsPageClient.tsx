'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAdminSessions } from '@/api/sessions';
import { LogSessionForm } from '@/components/adminSessions/LogSessionForm';
import SessionsList from '@/components/adminSessions/SessionList';
import { SessionsPageSkeleton } from '@/components/adminSessions/SessionsPageSkeleton';
// import { SessionsStatsSection } from '@/components/adminSessions/SessionsStatCard'
import { Session } from '@/components/adminSessions/session';

export function SessionsPageClient() {
  const { data, isLoading } = useAdminSessions();
  const showSkeleton = isLoading && !data;

  const [isLoggingSession, setIsLoggingSession] = useState(false);
  const [loggedSessions, setLoggedSessions] = useState<Session[]>([]);
  const [sessionUpdates, setSessionUpdates] = useState<
    Record<string, Partial<Session>>
  >({});

  const handleLogSession = (session: Session) => {
    setLoggedSessions((current) => [session, ...current]);
    setIsLoggingSession(false);
  };

  if (isLoggingSession) {
    return (
      <div className='w-full max-w-350 mx-auto space-y-6 md:px-4 lg:px-10 pb-6'>
        <button
          type='button'
          onClick={() => setIsLoggingSession(false)}
          className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors'
        >
          <ChevronLeft className='h-4 w-4' />
          Back to Sessions
        </button>

        <div>
          <h1 className='text-2xl font-bold text-muted-foreground'>
            Log session
          </h1>
          <p className='mb-8 text-sm text-muted'>
            Add the session details to review, track, and manage sessions on
            FitCall.
          </p>
        </div>

        <LogSessionForm
          onCancel={() => setIsLoggingSession(false)}
          onSubmit={handleLogSession}
        />
      </div>
    );
  }

  return (
    <div className='w-full space-y-6 md:px-4 lg:px-10 pb-6'>
      {/* <SessionsStatsSection /> */}
      {showSkeleton ? (
        <SessionsPageSkeleton />
      ) : (
        <SessionsList
          loggedSessions={loggedSessions}
          sessionUpdates={sessionUpdates}
          onUpdateSession={(sessionId, updates) => {
            setSessionUpdates((current) => ({
              ...current,
              [sessionId]: {
                ...current[sessionId],
                ...updates,
              },
            }));
          }}
        />
      )}
    </div>
  );
}
