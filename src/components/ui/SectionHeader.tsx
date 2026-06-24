'use client'
import { cn } from '@/lib/utils'

import { ReactNode } from 'react'

interface SectionHeaderProps {
  badge?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

const SectionHeader = ({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col md:mb-16',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
        className,
      )}
    >
      {badge && (
        <span
          className={cn(
            'mb-4 inline-flex items-center rounded-[9999px] bg-[#EDF4FD] px-4 py-2 text-[12px] uppercase tracking-widest text-primary',
          )}
        >
          {badge}
        </span>
      )}

      <h2
        className={cn(
          'text-3xl font-bold tracking-tight text-muted-foreground lg:text-4xl lg:leading-[1.1]',
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-muted leading-relaxed opacity-90 md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
