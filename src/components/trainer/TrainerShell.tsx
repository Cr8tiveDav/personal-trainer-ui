'use client'

import { useState } from 'react'
import { TrainerSidebar } from './sidebar'
import { TrainerHeader } from './header'

interface TrainerShellProps {
  userName: string
  userEmail: string
  userAvatar?: string
  children: React.ReactNode
}

export function TrainerShell({ userName, userEmail, userAvatar, children }: TrainerShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className='flex h-screen max-w-[1440px] mx-auto bg-gray-50 overflow-hidden'>
      <TrainerSidebar
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className='flex flex-1 flex-col h-full min-w-0 overflow-hidden'>
        <TrainerHeader
          userName={userName}
          userAvatar={userAvatar}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className='flex-1 overflow-y-auto py-6'>
          {children}
        </main>
      </div>
    </div>
  )
}
