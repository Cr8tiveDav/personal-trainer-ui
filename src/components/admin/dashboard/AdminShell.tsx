'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';

interface AdminShellProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  children: React.ReactNode;
}

export function AdminShell({
  userName,
  userEmail,
  userAvatar,
  children,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className='flex h-screen w-full bg-gray-50 overflow-hidden'>
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className='flex flex-1 flex-col h-full min-w-0 overflow-hidden'>
        <AdminHeader
          userName={userName}
          userAvatar={userAvatar}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className='flex-1 overflow-y-auto py-6 px-4 md:px-6 lg:px-8'>
          <div className='max-w-[1440px] mx-auto w-full h-full'>{children}</div>
        </main>
      </div>
    </div>
  );
}
