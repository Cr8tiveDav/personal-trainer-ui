'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Menu, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useLogout } from '@/api/auth'
import { TRAINER_LOGIN_PATH } from '@/lib/auth/trainer-routes'
import { NotificationBell } from '@/components/notifications/NotificationBell'

interface TrainerHeaderProps {
  userName: string
  userAvatar?: string
  onMenuClick?: () => void
}

export function TrainerHeader({ userName, userAvatar, onMenuClick }: TrainerHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const logout = useLogout(TRAINER_LOGIN_PATH)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className='flex h-[75px] items-center gap-2 border border-gray-100 bg-white px-3 sm:gap-4 sm:px-4 md:px-6'>
      <div className='flex min-w-0 flex-1 items-center gap-2'>
        <button
          onClick={onMenuClick}
          aria-label='Open menu'
          className='flex h-12 w-9 shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-gray-100 md:hidden'
        >
          <Menu className='h-5 w-5 text-gray-500' />
        </button>

        <div className='flex min-w-0 flex-1 items-center gap-2 rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2 md:max-w-4xl'>
          <Search className='h-4 w-4 shrink-0 text-gray-400' />
          <input
            type='text'
            placeholder='Search'
            aria-label='Search'
            className='min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400'
          />
        </div>
      </div>

      <div className='flex shrink-0 items-center gap-2 sm:gap-3'>
        <div ref={notifRef} className='relative'>
          <NotificationBell
            isOpen={notifOpen}
            onToggle={() => { setNotifOpen(prev => !prev); setProfileOpen(false) }}
            emptyDescription='Session reminders and updates will show up here.'
          />
        </div>

        <div ref={profileRef} className='relative'>
          <button
            onClick={() => { setProfileOpen(prev => !prev); setNotifOpen(false) }}
            aria-label='Profile menu'
            className='flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] border-2 border-gray-200 transition-colors hover:border-primary'
          >
            {userAvatar ? (
              <Image src={userAvatar} alt={userName} width={36} height={36} className='object-cover' />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-primary text-sm font-semibold text-white'>
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>
          {profileOpen && (
            <div className='absolute right-0 top-11 z-50 w-[200px] rounded-[12px] border border-gray-100 bg-white p-4 shadow-lg'>
              <p className='text-sm font-semibold text-gray-900'>{userName}</p>
              <p className='mt-0.5 mb-4 text-xs text-gray-400'>Trainer</p>
              <button
                type='button'
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className='flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50'
              >
                <LogOut className='h-4 w-4' />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
