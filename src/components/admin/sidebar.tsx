'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Settings,
  ChevronRight,
  X,
  Video,
  PhoneCall,
} from 'lucide-react'
import { SidebarItem } from './sidebarItem'
import { cn } from '~/utils'
import { AnimatePresence, motion } from 'motion/react'
import {
  DashboardIcon,
  TrainersIcon,
  ClientsIcon,
  SessionIcon,
  PaymentIcon,
} from '@/components/icons'

const NAV_SECTIONS = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: DashboardIcon },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { label: 'Trainers', href: '/admin/trainers', icon: TrainersIcon },
      { label: 'Clients', href: '/admin/users', icon: ClientsIcon },
      { label: 'Sessions', href: '/admin/sessions', icon: SessionIcon },
      {
        label: 'Discovery slots',
        href: '/admin/discovery-slots',
        icon: PhoneCall,
      },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { label: 'Payments', href: '/admin/payments', icon: PaymentIcon },
    ],
  },
  {
    label: 'PLATFORM',
    items: [
      { label: 'Media Content', href: '/admin/media', icon: Video },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

interface SidebarProps {
  userName: string
  userEmail: string
  userAvatar?: string
  mobileOpen?: boolean
  onMobileClose?: () => void
}

interface SidebarInnerProps {
  userName: string
  userEmail: string
  userAvatar?: string
  collapsed: boolean
  onCollapse: () => void
  onMobileClose?: () => void
  isMobile?: boolean
}

function SidebarInner({
  userName,
  userEmail,
  userAvatar,
  collapsed,
  onCollapse,
  onMobileClose,
  isMobile,
}: SidebarInnerProps) {
  return (
    <>
      <div className={cn('mb-8 flex items-center border-b border-gray-200 pb-3 h-12', collapsed ? 'justify-center' : 'justify-between px-1')}>
        {!collapsed && (
          <Image src='/images/trainer/logo.svg' alt='Fitcall' width={100} height={24} />
        )}
        {isMobile ? (
          <button onClick={onMobileClose} className='text-gray-400 hover:text-gray-600'>
            <X className='h-5 w-5' />
          </button>
        ) : (
          <button
            onClick={onCollapse}
            className='flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors'
          >
            {collapsed ? <ChevronRight className='h-4 w-4' /> : <Image src="/collapse.svg" alt='collapse' width={20} height={20} className='h-4 w-4' />}
          </button>
        )}
      </div>

      <nav className='flex flex-1 flex-col gap-6 overflow-y-auto'>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className='mb-2 px-3 text-[10px] font-semibold tracking-widest uppercase text-gray-400'>
                {section.label}
              </p>
            )}
            <div className='flex flex-col gap-1'>
              {section.items.map((item) => (
                <SidebarItem key={item.href} {...item} collapsed={collapsed} onClick={onMobileClose} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={cn('flex items-center gap-3 rounded-[8px] border border-gray-100 p-3', collapsed && 'justify-center')}>
        {userAvatar ? (
          <Image src={userAvatar} alt={userName} width={36} height={36} className='rounded-[9999px] object-cover shrink-0' />
        ) : (
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-[9999px] bg-primary text-sm font-semibold text-white'>
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
        {!collapsed && (
          <div className='min-w-0'>
            <p className='truncate text-sm font-semibold text-gray-900'>{userName}</p>
            <p className='truncate text-xs text-gray-400'>{userEmail}</p>
          </div>
        )}
      </div>
    </>
  )
}

export function Sidebar({ userName, userEmail, userAvatar, mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <aside
        className={cn(
          'hidden md:flex h-full shrink-0 flex-col overflow-hidden border border-gray-100 bg-white px-4 py-6 transition-all duration-300',
          collapsed ? 'w-[68px]' : 'w-[280px]'
        )}
      >
        <SidebarInner
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          collapsed={collapsed}
          onCollapse={() => setCollapsed(prev => !prev)}
        />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className='fixed inset-0 z-50 md:hidden'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 bg-black/40'
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='relative flex h-full w-[280px] flex-col border-r border-gray-100 bg-white px-4 py-6'
            >
              <SidebarInner
                userName={userName}
                userEmail={userEmail}
                userAvatar={userAvatar}
                collapsed={false}
                onCollapse={() => {}}
                onMobileClose={onMobileClose}
                isMobile
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}