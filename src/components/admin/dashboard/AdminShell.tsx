'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

interface AdminShellProps {
  userName: string
  userEmail: string
  userAvatar?: string
  userType?: string
  children: React.ReactNode
}

export function AdminShell({
  userName,
  userEmail,
  userAvatar,
  userType,
  children,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className='flex h-dvh w-full overflow-hidden bg-gray-50'>
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className='flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'>
        <AdminHeader
          userName={userName}
          userAvatar={userAvatar}
          userType={userType}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className='min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-6 px-4 md:px-6 lg:px-8'>
          <div className='w-full'>{children}</div>
        </main>
      </div>
    </div>
  )
}
