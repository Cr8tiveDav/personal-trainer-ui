'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~/utils'
import React from 'react'

interface SidebarItemProps {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  collapsed?: boolean
}

export function SidebarItem({ label, href, icon: Icon, collapsed }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(`${href}/`))

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        'flex items-center gap-3 rounded-[8px] px-3 py-2 text-sm font-medium transition-colors',
        collapsed && 'justify-center px-2',
        isActive
          ? 'bg-primary text-white'
          : 'text-muted-foreground hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      <Icon className='h-4 w-4 shrink-0' />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}