'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Menu, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useLogout } from '@/api/auth'
import {
  EMPTY_STATE_IMAGE_PATHS,
  EmptyState,
} from '@/components/ui/EmptyState'

interface AdminHeaderProps {
  userName: string
  userAvatar?: string
  userType?: string
  onMenuClick?: () => void
}

export function AdminHeader({
  userName,
  userAvatar,
  userType,
  onMenuClick,
}: AdminHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const logout = useLogout(
    userType === 'trainer' ? '/trainers/login' : '/admin/login',
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className='flex h-[75px] shrink-0 items-center gap-4 border border-gray-100 bg-white px-4 md:px-6'>
      <div className='flex flex-1 items-center gap-2'>
        <button
          onClick={onMenuClick}
          className='flex md:hidden h-12 w-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors'
        >
          <Menu className='h-5 w-5 text-gray-500' />
        </button>
      </div>

      <div className='ml-auto flex items-center gap-3'>
        <div ref={notifRef} className='relative'>
          <button
            type='button'
            onClick={() => {
              setNotifOpen((prev) => !prev)
              setProfileOpen(false)
            }}
            aria-label='Notifications'
            className='relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors'
          >
            <Bell className='h-5 w-5 text-gray-500' />
          </button>
          {notifOpen && (
            <div className='absolute right-0 top-11 z-50 w-[min(400px,calc(100vw-2rem))] rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden'>
              <p className='border-b border-gray-100 px-5 py-4 text-base font-semibold text-gray-900'>
                Notifications
              </p>
              <EmptyState
                imageSrc={EMPTY_STATE_IMAGE_PATHS.notification}
                imageAlt='No notifications'
                title='No notifications yet'
                description='Alerts about sessions, clients, and payouts will appear here.'
                className='min-h-[280px] py-10 px-6 [&_img]:max-w-[220px] [&_h3]:text-base [&_p]:max-w-sm'
              />
            </div>
          )}
        </div>

        <div ref={profileRef} className='relative'>
          <button
            type='button'
            onClick={() => {
              setProfileOpen((prev) => !prev)
              setNotifOpen(false)
            }}
            className='flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors'
          >
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                width={36}
                height={36}
                className='object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-primary text-sm font-semibold text-white'>
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>
          {profileOpen && (
            <div className='absolute right-0 top-11 z-50 w-[200px] rounded-xl border border-gray-100 bg-white p-4 shadow-lg'>
              <p className='text-sm font-semibold text-gray-900'>{userName}</p>
              <p className='mt-0.5 mb-4 text-xs text-gray-400 capitalize'>
                {userType || '—'}
              </p>
              <button
                type='button'
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50'
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
