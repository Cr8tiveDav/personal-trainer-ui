'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, LogOut, Search } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useLogout } from '@/api/auth'
import { NotificationBell } from '@/components/notifications/NotificationBell'
import { isValidImageSrc } from '@/lib/utils'

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
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSessionsPage = pathname === '/admin/sessions'
  const sessionSearch = searchParams.get('sessionSearch') ?? ''

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

  const handleSessionSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('sessionSearch', value)
    } else {
      params.delete('sessionSearch')
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <header className='flex h-[75px] shrink-0 items-center gap-4 border border-gray-100 bg-white px-4 md:px-6'>
      <div className='flex flex-1 items-center gap-2'>
        <button
          onClick={onMenuClick}
          className='flex md:hidden h-12 w-9 items-center justify-center rounded-[8px] hover:bg-gray-100 transition-colors'
        >
          <Menu className='h-5 w-5 text-gray-500' />
        </button>
        {isSessionsPage && (
          <div className='relative ml-0 w-full max-w-3xl md:ml-2'>
            <Search className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300' />
            <input
              type='search'
              value={sessionSearch}
              onChange={(e) => handleSessionSearch(e.target.value)}
              aria-label='Search sessions'
              placeholder='Search'
              className='h-11 w-full rounded-[8px] border border-gray-200 bg-white pl-10 pr-4 text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:border-[#0b4d8d] focus:outline-none focus:ring-1 focus:ring-[#0b4d8d]'
            />
          </div>
        )}
      </div>

      <div className='ml-auto flex items-center gap-3'>
        <div ref={notifRef} className='relative'>
          <NotificationBell
            isOpen={notifOpen}
            onToggle={() => {
              setNotifOpen((prev) => !prev)
              setProfileOpen(false)
            }}
            emptyDescription='Alerts about sessions, clients, and payouts will appear here.'
          />
        </div>

        <div ref={profileRef} className='relative'>
          <button
            type='button'
            onClick={() => {
              setProfileOpen((prev) => !prev)
              setNotifOpen(false)
            }}
            className='flex h-9 w-9 items-center justify-center rounded-[9999px] overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors'
          >
            {userAvatar && isValidImageSrc(userAvatar) ? (
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
            <div className='absolute right-0 top-11 z-50 w-[200px] rounded-[12px] border border-gray-100 bg-white p-4 shadow-lg'>
              <p className='text-sm font-semibold text-gray-900'>{userName}</p>
              <p className='mt-0.5 mb-4 text-xs text-gray-400 capitalize'>
                {userType || '—'}
              </p>
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
