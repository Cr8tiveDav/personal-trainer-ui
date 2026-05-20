'use client'

import SessionsList from "@/components/adminSessions/SessionList"
import { SessionsStatsSection } from "@/components/adminSessions/SessionsStatCard"
const SessionsPage = () => {
  return (
    <div className='w-full space-y-6 px-4 lg:px-10 pb-6'>
     
      <SessionsStatsSection />
      <SessionsList />
    </div>
  )
}
export default SessionsPage
