'use client'

import SessionsList from "@/components/adminSessions/SessionList"
import { SessionsStatsSection } from "@/components/adminSessions/SessionsStatCard"




const SessionsPage = () => {
  return (
    <div className='w-full max-w-350 mx-auto space-y-6 px-4 pb-6'>
     
      <SessionsStatsSection />
      <SessionsList />
    </div>
  )
}

export default SessionsPage